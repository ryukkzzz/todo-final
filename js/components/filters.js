// Exporto la clase Filters para poder usarla en otros archivos
export default class Filters {
  constructor() {
    // Obtengo el formulario que tiene el id 'filters'
    this.form = document.getElementById('filters');
    // También obtengo el botón de búsqueda que tiene el id 'search'
    this.btn = document.getElementById('search');
  }

  // Defino el método onClick que recibe un callback para ejecutar cuando hagan clic
  onClick(callback) {
    // Cuando alguien haga clic en el botón de búsqueda...
    this.btn.onclick = (e) => {
      // Prevengo que el formulario se envíe de manera tradicional (evito recargar la página)
      e.preventDefault();
      // Creo un FormData a partir del formulario para capturar sus datos
      const data = new FormData(this.form);
      // Llamo al callback y le paso un objeto con los datos que obtuve
      callback({
        type: data.get('type'),   // El tipo que el usuario seleccionó
        words: data.get('words'), // Las palabras que el usuario escribió
      });
    }
  }
}
