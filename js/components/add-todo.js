// Importo la clase Alert desde el archivo alert.js
import Alert from './alert.js';

// Defino la clase AddTodo que me va a ayudar a agregar tareas
export default class AddTodo {
  constructor() {
    // Obtengo el botón "add" por su id
    this.btn = document.getElementById('add');
    // También obtengo los inputs para el título y la descripción
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');

    // Creo una instancia de Alert, que usaré para mostrar mensajes de error
    this.alert = new Alert('alert');
  }

  // Creo un método llamado onClick que recibe un callback (una función que se va a ejecutar cuando haga clic)
  onClick(callback) {
    // Cuando se haga clic en el botón...
    this.btn.onclick = () => {
      // Verifico si el título o la descripción están vacíos
      if (title.value === '' || description.value === '') {
        // Si alguno está vacío, muestro una alerta diciendo que son requeridos
        this.alert.show('Title and description are required');
      } else {
        // Si los dos campos están llenos, oculto la alerta
        this.alert.hide();
        // Llamo al callback que recibí y le paso el título y la descripción como argumentos
        callback(this.title.value, this.description.value);
      }
    }
  }
}
