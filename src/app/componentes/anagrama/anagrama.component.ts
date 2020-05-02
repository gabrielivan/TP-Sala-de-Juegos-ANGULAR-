import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../../servicios/firebase-service.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  palabras = [
    [//jugar
      { letraElegida: '', letraCorrecta: 'j' },
      { letraElegida: '', letraCorrecta: 'u' },
      { letraElegida: '', letraCorrecta: 'g' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'r' }
    ],
    [//ganar
      { letraElegida: '', letraCorrecta: 'g' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'n' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'r' }
    ],
    [//perder
      { letraElegida: '', letraCorrecta: 'p' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'r' },
      { letraElegida: '', letraCorrecta: 'd' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'r' }
    ],
    [//resolver
      { letraElegida: '', letraCorrecta: 'r' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 's' },
      { letraElegida: '', letraCorrecta: 'o' },
      { letraElegida: '', letraCorrecta: 'l' },
      { letraElegida: '', letraCorrecta: 'v' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'r' }
    ],
    [//palabra
      { letraElegida: '', letraCorrecta: 'p' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'l' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'b' },
      { letraElegida: '', letraCorrecta: 'r' },
      { letraElegida: '', letraCorrecta: 'a' }
    ],
    [//ordenar
      { letraElegida: '', letraCorrecta: 'o' },
      { letraElegida: '', letraCorrecta: 'r' },
      { letraElegida: '', letraCorrecta: 'd' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'n' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'r' }
    ],
    [ //desafio
      { letraElegida: '', letraCorrecta: 'd' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 's' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'f' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 'o' }

    ],
    [ //diversion
      { letraElegida: '', letraCorrecta: 'd' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 'v' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'r' },
      { letraElegida: '', letraCorrecta: 's' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 'o' },
      { letraElegida: '', letraCorrecta: 'n' }
    ],
    [ //concentracion
      { letraElegida: '', letraCorrecta: 'c' },
      { letraElegida: '', letraCorrecta: 'o' },
      { letraElegida: '', letraCorrecta: 'n' },
      { letraElegida: '', letraCorrecta: 'c' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'n' },
      { letraElegida: '', letraCorrecta: 't' },
      { letraElegida: '', letraCorrecta: 'r' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'c' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 'o' },
      { letraElegida: '', letraCorrecta: 'n' }
    ],
    [//felicitacion
      { letraElegida: '', letraCorrecta: 'f' },
      { letraElegida: '', letraCorrecta: 'e' },
      { letraElegida: '', letraCorrecta: 'l' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 'c' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 't' },
      { letraElegida: '', letraCorrecta: 'a' },
      { letraElegida: '', letraCorrecta: 'c' },
      { letraElegida: '', letraCorrecta: 'i' },
      { letraElegida: '', letraCorrecta: 'o' },
      { letraElegida: '', letraCorrecta: 'n' }
    ]
  ];

  palabra = [];
  nivel = 0;

  letras = [];
  alert = { message: '', type: '', action: '' };
  showAlert = false;

  constructor(private firebaseService: FirebaseServiceService) { }

  //desordena a this.palabra
  desordenarPalabra() {

    do {
      this.letras = this.palabra
        .map(function (item) { return item.letraCorrecta })
        .sort(function () { return Math.random() - 0.5 });

    } while (this.tieneMismoOrden())

  }

  //true si this.letras es como this.palabra con las letras correctas
  tieneMismoOrden() {

    for (let index = 0; index < this.letras.length; index++) {


      this.palabra[index].letraElegida = this.letras[index];

    }
    let gana = this.gana();
    this.palabra.forEach(item => {
      item.letraElegida = '';
    });
    return gana;
  }


  ngOnInit() {
    this.palabra = this.palabras[0];
    this.desordenarPalabra();
  }

  //true si gano
  gana() {
    return !this.palabra.some(function (item) {
      return item.letraCorrecta != item.letraElegida;
    });

  }
  elegirLetra(letra, checked) {

    for (let index = 0; index < this.palabra.length; index++) {
      if (checked && this.palabra[index].letraElegida == '') {
        this.palabra[index].letraElegida = letra;
        break;
      }
      else if (!checked && this.palabra[index].letraElegida == letra) {
        this.palabra[index].letraElegida = '';
        break;
      }
    }

    if (this.gana()) {
      this.alert.message = 'Bien hecho!';
      this.alert.type = 'success';
      this.alert.action = 'continuar';
      this.firebaseService.saveResult('ANAGRAMA', true);
      this.showAlert = true;
    }
    else if (!this.palabra.some(function (item) {
      return item.letraElegida == '';
    })) {
      this.alert.message = 'Intentalo de nuevo';
      this.alert.type = 'danger';
      this.alert.action = 'reintentar';
      this.firebaseService.saveResult('ANAGRAMA', false);
      this.showAlert = true;

    }

  }

  continue() {
    this.showAlert = false;
    if (this.alert.action == 'continuar') {
      //siguiente palabra
      this.nivel++;
      this.palabra = this.palabras[this.nivel];
      this.desordenarPalabra();
    }


  }

}
