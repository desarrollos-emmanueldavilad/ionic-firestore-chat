import { Component, OnInit} from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})

export class ChatComponent implements OnInit{
  mensaje = '';
  nombre = '';
  elemnto: any;
  constructor(public cs: ChatService) {
    this.cs.cargarMensajes();
   }

   ngOnInit(){
     this.elemnto = document.getElementById('app-mensajes')
   }

  enviar_mensaje() {
    console.log( this.mensaje);
    if (this.mensaje.length == 0) {
      return;
    } else {
    this.cs.agregarMensaje(this.mensaje,this.nombre)
    .then(() => {
      this.mensaje = '';
      this.nombre = '';
    })
    .catch((err) => {
    });
  }

  }
}
