
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { FirebaseServiceService } from '../../servicios/firebase-service.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listado: Array<any>;


  constructor(private firebaseService: FirebaseServiceService) {
   }

  ngOnInit() {
    this.TraerTodos();
  }

  ver() {
    console.info(this.listado);
  }

  async TraerTodos(){
    var rtdos  = await this.firebaseService.getResultados();
    var usrs  = await this.firebaseService.getUsers();
     this.listado = rtdos.docs.map(function(x){
        return x.data();
      });
      var usuarios = usrs.docs.map(function(x){
        return x.data();
      });
      
      this.listado.forEach(rtdo => {
        let userResult = usuarios.find(usr => {
          return usr.uid === rtdo.usuarioId;
        });
        rtdo.usuario = userResult.nombre;
      });
  }

}
