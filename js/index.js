// Importo las clases Model y View que necesito para la aplicación
import Model from './model.js';
import View from './view.js';

// Espero a que todo el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Creo una instancia del modelo, donde se va a manejar la lógica de datos
  const model = new Model();
  // Creo una instancia de la vista, que se va a encargar de mostrar las cosas en pantalla
  const view = new View();
  
  // Conecto el modelo con la vista, para que el modelo sepa a quién actualizar
  model.setView(view);
  // Conecto la vista con el modelo, para que la vista pueda pedir datos al modelo
  view.setModel(model);

  // Finalmente, le digo a la vista que se dibuje en la pantalla
  view.render();
});
