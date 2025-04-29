// Exporto la clase Alert para poder usarla en otros archivos
export default class Alert {
  constructor(alertId) {
    // Guardo en this.alert el elemento HTML que tenga el id que me pasen
    this.alert = document.getElementById(alertId);
  }
    
  // Creo un método show que sirve para mostrar la alerta
  show(message) {
    // Le quito la clase 'd-none' para que la alerta se vea
    this.alert.classList.remove('d-none');
    // Cambio el texto interno del elemento para mostrar el mensaje que me pasaron
    this.alert.innerText = message;
  }

  // Creo un método hide que sirve para ocultar la alerta
  hide() {
    // Agrego la clase 'd-none' para que la alerta desaparezca
    this.alert.classList.add('d-none');
  }
}
