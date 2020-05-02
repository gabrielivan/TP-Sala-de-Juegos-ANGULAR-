import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { Jugador } from '../clases/jugador';
import { switchAll } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  user = null;

  constructor(private router: Router) { }

  db = firebase.firestore();

  AddUser(email, clave, nombre) {
    var dbRef = this.db;
    var router = this.router;
    firebase.auth().createUserWithEmailAndPassword(email, clave)
      .then(function (credential) {
        console.log(credential.user.uid);//este dato lo debe tener el jugador para relacionarse con el registro de auth
        dbRef.collection("jugadores").add({
          email: email,
          uid: credential.user.uid,
          nombre: nombre
        })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert("Se registro correctamente");
            credential.user.getIdToken()
              .then(function (token) {
                localStorage.setItem('token', token);
                router.navigate(['/']);
              });

          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
            alert("Ocurrio un error al registrarse");
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Ocurrio un error al registrarse");
        // ...
      });



  }

  login(email, password) {
    var router = this.router;
    var dbRef = this.db;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (credential) {
        console.log(credential);
        dbRef.collection("jugadores")
          .where("uid", "==", credential.user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              alert("Se logio correctamente");
              credential.user.getIdToken()
                .then(function (token) {
                  localStorage.setItem('token', token);
                  router.navigate(['/']);
                });

            });
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Ocurrio un error al logiarse");
        // ...
      });
  }

  isAuthenticated() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem('token');
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  async saveResult(juego, gano) {
    await this.getCurrentUser();
    var db = firebase.firestore();
    let resultados = db.collection('resultados')
    let activeRef = await resultados
      .where('usuarioId', '==', this.user.uid)
      .where('juego', '==', juego)
      .get();

    if (activeRef.empty) {
      //add
      db.collection("resultados").add({
        usuarioId: this.user.uid,
        juego: juego,
        victorias: gano ? 1 : 0,
        derrotas: gano ? 0 : 1
      });
    }
    else {
      //update
      activeRef.docs.forEach(function (doc) {
        let victorias = doc.data().victorias + (gano ? 1 : 0);
        let derrotas = doc.data().derrotas + (gano ? 0 : 1);
        db.collection("resultados").doc(doc.id)
          .update({ victorias: victorias, derrotas: derrotas });
      });
    }
  }

  async getCurrentUser() {
    firebase.auth().onAuthStateChanged(async user => {
      this.user = user;
    });
  }

}
