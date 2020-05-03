import { Juego } from '../clases/juego'
import { FirebaseServiceService } from '../servicios/firebase-service.service';

export class JuegoAdivina extends  Juego {
    numeroSecreto: number = 0;
    numeroIngresado = 0;
    constructor(private firebaseService: FirebaseServiceService, nombre?: string, gano?: boolean, jugador?:string) {
        super("Adivina el número",gano,jugador);
     
    
      
      }
    public verificar() {
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
        }
        if (this.gano) {
          this.firebaseService.saveResult('ADIVINA', true);
          return true;
        } else {
          this.firebaseService.saveResult('ADIVINA', false);
          return false;
        }
     }
     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        this.gano = false;
      }
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasate";
      }
}
