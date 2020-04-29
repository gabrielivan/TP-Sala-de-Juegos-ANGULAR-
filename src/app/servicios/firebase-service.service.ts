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

  AddUser(jugador: Jugador) {
    this.db.collection("jugadores").add({
      email: jugador.email,
      clave: jugador.clave
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}
