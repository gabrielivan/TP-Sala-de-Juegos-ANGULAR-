import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FirebaseServiceService } from '../../servicios/firebase-service.service';


@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  faCircleNotch = faCircleNotch;
  faTimes = faTimes;
  alert = {message:'',type:''};
  gameOver = false;

  grilla = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];


  constructor(private firebaseService: FirebaseServiceService) { }

  ngOnInit() {
    this.gameOver = false;

  this.grilla = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  }

  intentarGanar(bando) {
    let posicionGanadora = null;
    for (let i = 0; i < this.grilla.length; i++) {
      if (posicionGanadora)
        break;
      for (let j = 0; j < this.grilla[i].length; j++) {
        let tieneDerecha = false;
        let tieneIzquierda = false;
        let tieneArriba = false;
        let tieneAbajo = false;
        let tieneArribaDerecha = false;
        let tieneArribaIzquierda = false;
        let tieneAbajoDerecha = false;
        let tieneAbajoIzquierda = false;
        if (this.grilla[i][j] == null) {
          if (this.grilla[i][j + 1] == bando)//tiene a su derecha
          {
            tieneDerecha = true;
            if (this.grilla[i][j + 2] == bando)//tiene dos a su derecha!
            {
              //gana                
              posicionGanadora = { i: i, j: j };
              break;
            }
          }
          if (this.grilla[i][j - 1] == bando)//tiene a su izquierda
          {
            tieneIzquierda = true;
            if (this.grilla[i][j - 2] == bando)//tiene dos a su izquierda!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }

          if (this.grilla[i - 1] != undefined && this.grilla[i - 1][j] == bando)//tiene arriba
          {
            tieneArriba = true;
            if (this.grilla[i - 2] != undefined && this.grilla[i - 2][j] == bando)//tiene dos arriba!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }
          if (this.grilla[i + 1] != undefined && this.grilla[i + 1][j] == bando)//tiene abajo
          {
            tieneAbajo = true;
            if (this.grilla[i + 2] != undefined && this.grilla[i + 2][j] == bando)//tiene dos abajo!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }

          if (this.grilla[i - 1] != undefined && this.grilla[i - 1][j - 1] == bando)//tiene arriba izquierda
          {
            tieneArribaIzquierda = true;
            if (this.grilla[i - 2] != undefined && this.grilla[i - 2][j - 2] == bando)//tiene dos arriba izquierda!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }
          if (this.grilla[i - 1] != undefined && this.grilla[i - 1][j + 1] == bando)//tiene arriba derecha
          {
            tieneArribaDerecha = true;
            if (this.grilla[i - 2] != undefined && this.grilla[i - 2][j + 2] == bando)//tiene dos arriba derecha!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }

          if (this.grilla[i + 1] != undefined && this.grilla[i + 1][j - 1] == bando)//tiene abajo izquierda
          {
            tieneAbajoIzquierda = true;
            if (this.grilla[i + 2] != undefined && this.grilla[i + 2][j - 2] == bando)//tiene dos abajo izquierda!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }
          if (this.grilla[i + 1] != undefined && this.grilla[i + 1][j + 1] == bando)//tiene abajo derecha
          {
            tieneAbajoDerecha = true;
            if (this.grilla[i + 2] != undefined && this.grilla[i + 2][j + 2] == bando)//tiene dos abajo derecha!
            {
              //gana
              posicionGanadora = { i: i, j: j };
              break;
            }
          }
          //si todavia no gano capaz tenga a sus costados
          if ((tieneAbajo && tieneArriba)
            || (tieneDerecha && tieneIzquierda)
            || (tieneArribaDerecha && tieneAbajoIzquierda)
            || (tieneArribaIzquierda && tieneAbajoDerecha)) {
            //gana
            posicionGanadora = { i: i, j: j };
            break;
          }

        }
      }
    }
    return posicionGanadora;
  }

  juegaLaMaquina() {
    let ganaMaquina = false;
    //intenta ganar la maquina
    let posicionGanadoraMaquina = this.intentarGanar(0);

    if (posicionGanadoraMaquina) {
      this.grilla[posicionGanadoraMaquina.i][posicionGanadoraMaquina.j] = 0;
      ganaMaquina = true;
    }
    else //si no hay manera de ganar entonces impide que gane el jugador
    {
      let posicionGanadoraJugador = this.intentarGanar(1);
      if (posicionGanadoraJugador) {
        this.grilla[posicionGanadoraJugador.i][posicionGanadoraJugador.j] = 0;
      }
      else {//si nadie gana aun entonces me fijo si puedo poner en el medio, sino en una diagonal y sino por default
        if (this.grilla[1][1] == null)
          this.grilla[1][1] = 0;
        else if (this.grilla[0][0] == null)
          this.grilla[0][0] = 0;
        else if (this.grilla[0][2] == null)
          this.grilla[0][2] = 0;
        else if (this.grilla[2][0] == null)
          this.grilla[2][0] = 0;
        else if (this.grilla[2][2] == null)
          this.grilla[2][2] = 0;
        else {
          for (let i = 0; i < this.grilla.length; i++) {
            for (let j = 0; j < this.grilla[i].length; j++) {
              if (this.grilla[i][j] == null) {
                this.grilla[1][1] = 0;
              }
            }
          }
        }
      }
    }
    return ganaMaquina;
  }

  elegirCelda(i, j) {
    this.grilla[i][j] = 1;

    let ganaMaquina = this.juegaLaMaquina();
    //resultado
    if (ganaMaquina) {
      this.alert.message = 'GANA LA MAQUINA';
      this.alert.type = 'danger';
      //guardar resultado
      this.firebaseService.saveResult('TATETI', false);
      this.gameOver = true;
    }
    else if(this.esEmpate()) {
      this.alert.message = 'EMPATE';
      this.alert.type = 'default';   
      this.gameOver = true;   
    }
  }

  esEmpate() {
    for (let i = 0; i < this.grilla.length; i++) {
      for (let j = 0; j < this.grilla[i].length; j++) {
        if (this.grilla[i][j] == null) {
          return false;
        }
      }
    }
    return true;
  }


}
