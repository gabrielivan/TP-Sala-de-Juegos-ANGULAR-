import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { Jugador } from '../../clases/jugador';

import {FirebaseServiceService} from '../../servicios/firebase-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/

  jugador:Jugador = new Jugador();
  clave: string;

  constructor(public firebaseServiceService:FirebaseServiceService) { }

  ngOnInit() {
  }

  register(){
    this.firebaseServiceService.AddUser(this.jugador.email,this.clave, this.jugador.nombre, this.jugador.edad, this.jugador.sexo);
  }

}
