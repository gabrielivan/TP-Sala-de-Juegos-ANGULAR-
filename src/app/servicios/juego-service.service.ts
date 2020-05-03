import { Injectable } from '@angular/core';
import { Juego } from '../clases/Juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { MiHttpService } from './mi-http/mi-http.service';
import { FirebaseServiceService } from '../servicios/firebase-service.service'; 

@Injectable()
export class JuegoServiceService {

  peticion:any;
  constructor(private firebaseService: FirebaseServiceService, public miHttp: MiHttpService ) {
    this.peticion = this.miHttp.httpGetO("http://localhost:3003");
//    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  public listar(): Array<Juego> {
   this.miHttp.httpGetP("https://restcountries.eu/rest/v2/all")
    .then( data => {
      console.log( data );
    })
    .catch( err => {
      console.log( err );
    });
   
  
    this.peticion
    .subscribe( data => {
      console.log("En listar");
      console.log( data );
    }, err => {
      console.info("error: " ,err );
    })

    let miArray: Array<Juego> = new Array<Juego>();

    miArray.push(new JuegoAdivina(this.firebaseService, "Juego 1", false));
    miArray.push(new JuegoAdivina(this.firebaseService, "Pepe", true));
    miArray.push(new JuegoAdivina(this.firebaseService, "Juego 3", false));
    miArray.push(new JuegoAdivina(this.firebaseService, "Juego 4", false));
    miArray.push(new JuegoAdivina(this.firebaseService, "Juego 5", false));
    miArray.push(new JuegoAdivina(this.firebaseService, "Juego 6", false));
    return miArray;
  }

  public listarPromesa(): Promise<Array<Juego>> {
    this.peticion
    .subscribe( data => {
      console.log("En listarPromesa");
      console.log( data );
    }, err => {
      console.log( err );
    })
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      let miArray: Array<Juego> = new Array<Juego>();
      miArray.push(new JuegoAdivina(this.firebaseService, "JuegoPromesa 1", false,"promesa"));
      miArray.push(new JuegoAdivina(this.firebaseService, "PepePromesa", true));
      miArray.push(new JuegoAdivina(this.firebaseService, "JuegoPromesa 3", false));
      miArray.push(new JuegoAdivina(this.firebaseService, "JuegoPromesa 4", false));
      miArray.push(new JuegoAdivina(this.firebaseService, "JuegoPromesa 5", false));
      miArray.push(new JuegoAdivina(this.firebaseService, "JuegoPromesa 6", false));
      resolve(miArray);
    });

    return promesa;
  }

}
