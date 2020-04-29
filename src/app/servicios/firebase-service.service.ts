import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { Jugador } from '../clases/jugador';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor() { }

  db = firebase.firestore();

  AddUser(email, clave, nombre) {
    var dbRef = this.db;
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
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });



  }

  login(email, password) {
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
          });
      });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }


}
