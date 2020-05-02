import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../../servicios/firebase-service.service';


@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  opciones = [
    { valor: 1, src: '../../assets/imagenes/piedra.jpg' },
    { valor: 2, src: '../../assets/imagenes/papel.jpg' },
    { valor: 3, src: '../../assets/imagenes/tijera.png' }
  ];
  eleccion = null;
  eleccionMaquina = null;
  playerWins = 0;
  cpuWins = 0;
  gameOver = false;
  results = [
    [null, 0, 1],
    [1, null, 0],
    [0, 1, null]
  ];
  resultado = null;
  alert = { message: '', type: '' };

  constructor(private firebaseService: FirebaseServiceService) { }

  ngOnInit() {
    this.eleccion = null;
    this.eleccionMaquina = null;
    this.playerWins = 0;
    this.cpuWins = 0;
    this.gameOver = false;
    this.resultado = null;
  }

  elegir(opcion) {
    this.eleccion = opcion;
    // this.eleccionMaquina = null;
  }

  jugar() {
    let random = Math.floor(Math.random() * 3) + 1;
    this.eleccionMaquina = this.opciones[random - 1];

    this.resultado = this.results[this.eleccion.valor - 1][random - 1];
    if (this.resultado) this.playerWins++;
    else if (this.resultado === 0) this.cpuWins++;

    if (this.playerWins === 3) {
      this.alert.message = 'HAS GANADO! FELICITACIONES!';
      this.alert.type = 'success';
      this.gameOver = true;
      //guardar resultado
      this.firebaseService.saveResult('PPT', true);
    }
    else if (this.cpuWins === 3) {
      this.alert.message = 'HAS PERDIDO ESTA VEZ';
      this.alert.type = 'danger';
      this.gameOver = true;
      //guardar resultado
      this.firebaseService.saveResult('PPT', false);
    }
  }

  estaSeleccionada(opcion) {
    return this.eleccion && this.eleccion.valor == opcion.valor;
  }

  getResultadoStr() {
    let rv = '';
    switch (this.resultado) {
      case 1:
        rv = 'GANASTE!';
        break;
      case 0:
        rv = 'PERDISTE';
        break;
      case null:
        rv = 'EMPATE';
        break;
    }
    return rv;
  }
}
