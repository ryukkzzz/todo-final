// Importo la clase Alert para poder usar mensajes de alerta en el modal
import Alert from './alert.js';

// Exporto la clase Modal para usarla en otros archivos
export default class Modal {
  constructor() {
    // Obtengo los elementos del modal: título, descripción, botón de guardar y checkbox de completado
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.btn = document.getElementById('modal-btn');
    this.completed = document.getElementById('modal-completed');
    // Creo una alerta específica para el modal
    this.alert = new Alert('modal-alert');

    
    // Inicializo this.todo como null, aquí voy a guardar la tarea que se está editando
    this.todo = null;
  }

  // Creo un método para asignar valores al modal cuando quiero editar una tarea
  setValues(todo) {
    this.todo = todo; // Guardo el objeto todo para usarlo luego
    this.title.value = todo.title; // Pongo el título del todo en el input
    this.description.value = todo.description; // Pongo la descripción en el input
    this.completed.checked = todo.completed; // Marco el checkbox si el todo está completado
  }

  // Creo un método onClick que ejecuta una función cuando presiono el botón del modal
  onClick(callback) {
    this.btn.onclick = () => {
      // Si el título o la descripción están vacíos, muestro una alerta y salgo
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required');
        return;
      }

      // Si todo está bien, cierro el modal usando jQuery
      $('#modal').modal('toggle');

      // Llamo al callback, pasándole el id del todo y los nuevos valores actualizados
      callback(this.todo.id, {
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked,
      });
    }
  }
}
