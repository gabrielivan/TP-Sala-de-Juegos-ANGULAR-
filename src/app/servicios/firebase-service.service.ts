import { Injectable } from '@angular/core';
import swal from'sweetalert2';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import { firebaseConfig } from "../../environments/environment";

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

  AddUser(email, clave, nombre, edad, sexo) {
    var dbRef = this.db;
    var router = this.router;
    firebase.auth().createUserWithEmailAndPassword(email, clave)
      .then(function (credential) {
        console.log(credential.user.uid);//este dato lo debe tener el jugador para relacionarse con el registro de auth
        dbRef.collection("jugadores").add({
          email: email,
          uid: credential.user.uid,
          nombre: nombre,
          edad: edad,
          sexo: sexo
        })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            swal.fire({
              title: 'EXISTO.',
              text: 'Se registro correctamente',
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false,
              icon: "success"
            });
            credential.user.getIdToken()
              .then(function (token) {
                localStorage.setItem('token', token);
                router.navigate(['/']);
              });

          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
            swal.fire({
              title: 'ERROR.',
              text: 'Ocurrio un error al registrarse',
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false,
              icon: "error"
            });
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal.fire({
          title: 'ERROR.',
          text: 'Ocurrio un error al registrarse',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          icon: "error"
        });
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
              swal.fire({
                title: 'EXISTO.',
                text: 'Se logeo correctamente',
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
                icon: "success"
              });
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
        swal.fire({
          title: 'ERROR.',
          text: 'Ocurrio un error al logearse',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
          icon: "error"
        });
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

  async getUsers() {
    // return await db.collection("usuarios").get();
    let usrsRef = await this.db.collection('jugadores').get();
    return usrsRef;
    // for(let u of usrsRef.docs) {
    //     console.log(u.id, u.data())
    // } 
  }

  async getResultados() {
    // return await db.collection("usuarios").get();
    let resultados = await this.db.collection('resultados').get();
    return resultados;

  }

}
