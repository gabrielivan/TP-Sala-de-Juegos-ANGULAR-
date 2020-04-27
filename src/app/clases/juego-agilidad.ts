import { Juego } from '../clases/juego';

export class JuegoAgilidad extends Juego {
    numeroIngresado: number = 0;
    primerNumero: number = 0;
    operador: String = '';
    segundoNumero: number = 0;
    resultado: number = 0;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Agilidad con aritmetica", gano, jugador);
    }

    public verificar(): boolean {
        if (this.numeroIngresado == this.resultado) {
            this.gano = true;
        }

        if (this.gano) {
            return true;
        }
        else {
            return false;
        }
    }

    public generar() {
        this.primerNumero = Math.floor((Math.random() * 100) + 1);
        this.segundoNumero = Math.floor((Math.random() * 100) + 1);
        this.resultado = this.operar();
        console.info('Resultado:' + this.resultado);
        this.gano = false;
    }

    public operar(): number {
        let operador = Math.floor(Math.random() * (4 - 1)) + 1;

        switch (operador) {
            case 1:
                this.operador = '+';
                return this.primerNumero + this.segundoNumero;
            case 2:
                this.operador = '-';
                return this.primerNumero - this.segundoNumero;
            case 3:
                this.operador = '*';
                return this.primerNumero * this.segundoNumero;
            case 4:
                this.operador = '/';
                if (this.segundoNumero > 0) {
                    return this.primerNumero + this.segundoNumero;
                }
                return 0;
        }
    }

}
