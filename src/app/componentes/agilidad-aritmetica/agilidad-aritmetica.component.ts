import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import { Subscription } from "rxjs";
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Input() jugador: Jugador;
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  contador: number;
  jugo: Boolean;
  private subscription: Subscription;
  ngOnInit() {
  }
  constructor() {
    this.ocultarVerificar = true;
    this.Tiempo = 30;
    this.nuevoJuego = new JuegoAgilidad();
    // this.nuevoJuego.jugador = this.jugador.nombre;
    console.info("Inicio agilidad");
  }
  NuevoJuego() {
    this.jugo = false;
    this.nuevoJuego.generar();
    this.ocultarVerificar = false;
    this.repetidor = setInterval(() => {

      this.Tiempo--;
      if (this.Tiempo == 0) {
        this.verificar();
        clearInterval(this.repetidor);
        this.Tiempo = 5;
      }
    }, 900);

  }
  verificar() {
    this.jugo = true;
    if (this.nuevoJuego.verificar()) {
      this.enviarJuego.emit(this.nuevoJuego);
      this.ocultarVerificar = true;
    }
    else {
      this.enviarJuego.emit(this.nuevoJuego);
      this.ocultarVerificar = true;
    }

    console.info("Resultado:", this.nuevoJuego.resultado);
    clearInterval(this.repetidor);
  }

}
