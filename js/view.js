// Importo las clases que necesito para construir mi interfaz
import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

// Exporto la clase View, que se encargará de mostrar todo
export default class View {
  constructor() {
    this.model = null; // Aún no tengo modelo, lo asignaré después
    this.table = document.getElementById('table'); // Busco la tabla donde voy a mostrar las tareas
    this.addTodoForm = new AddTodo(); // Instancio el formulario de agregar tarea
    this.modal = new Modal(); // Instancio el modal para editar tareas
    this.filters = new Filters(); // Instancio los filtros de búsqueda
 
    // Conecto el botón de agregar con el método addTodo
    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));

    // Conecto el botón del modal con el método editTodo
    this.modal.onClick((id, values) => this.editTodo(id, values));

    // Conecto el botón de buscar con el método filter
    this.filters.onClick((filters) => this.filter(filters));
  }

  // Asocio el modelo a la vista para poder manipular los datos
  setModel(model) {
    this.model = model;
    this.updatePendingCounter(); // Mostrar contador al asociar el modelo
  }

  // Pinto en pantalla todos los todos que estén guardados
  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo)); // Por cada todo creo una fila
  }

  // Filtro las filas de la tabla según los criterios que me manden
  filter(filters) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName('tr'); // Me salto el encabezado
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      // Si escribieron palabras, busco si están en el título o descripción
      if (words) {
        shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
      }

      // Comparo si el todo debería estar completado o no
      const shouldBeCompleted = type === 'completed';
      const isCompleted = completed.children[0].checked;

      if (type !== 'all' && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      // Muestro u oculto la fila según corresponda
      if (shouldHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }

  // Agrego una nueva tarea tanto en el modelo como en la vista
  addTodo(title, description) {
    const todo = this.model.addTodo(title, description); // Primero la agrego en el modelo
    this.createRow(todo); // Luego la dibujo en la tabla
    this.updatePendingCounter(); // Actualizar contador
  }

  // Alterno el estado de completado de una tarea
  toggleCompleted(id) {
    this.model.toggleCompleted(id); // Actualizo el estado en el modelo
    this.updatePendingCounter(); // Actualizar contador
  }

  // Edito una tarea tanto en el modelo como en la tabla
  editTodo(id, values) {
    this.model.editTodo(id, values); // Actualizo en el modelo
    const row = document.getElementById(id);
    row.children[0].innerText = values.title; // Actualizo título
    row.children[1].innerText = values.description; // Actualizo descripción
    row.children[2].children[0].checked = values.completed; // Actualizo si está completado
  }

  // Elimino una tarea tanto del modelo como de la tabla
  removeTodo(id) {
    this.model.removeTodo(id); // Borro en el modelo
    document.getElementById(id).remove(); // Borro la fila de la tabla
    this.updatePendingCounter(); // Actualizar contador
  }

  // Creo una fila nueva en la tabla para representar un todo
  createRow(todo) {
    const row = this.table.insertRow(); // Corregido: this.table, no table
    row.setAttribute('id', todo.id); // Le pongo como id el id del todo
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-right"></td>
    `;

    // Creo el checkbox para marcar como completado
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id); // Al hacer click cambio su estado
    row.children[2].appendChild(checkbox);

    // Creo el botón de editar
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'mb-1');
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#modal');
    editBtn.onclick = () => this.modal.setValues({
      id: todo.id,
      title: row.children[0].innerText,
      description: row.children[1].innerText,
      completed: row.children[2].children[0].checked,
    });
    row.children[3].appendChild(editBtn);

    // Creo el botón de eliminar
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);
  }

  // Método para actualizar el contador de tareas pendientes
  updatePendingCounter() {
    if (!this.model) return; // Evitar error si el modelo aún no está asignado

    const pendingTasks = this.model.getTodos().filter(todo => !todo.completed).length;
    const counterElement = document.getElementById('pending-counter');

    // Actualizar texto y color según la cantidad
    counterElement.textContent = `Tienes ${pendingTasks} tarea${pendingTasks !== 1 ? 's' : ''} pendiente${pendingTasks !== 1 ? 's' : ''}`;

    // Cambiar color si hay más tareas
    if (pendingTasks > 10) {
      counterElement.classList.remove('badge-info', 'badge-warning');
      counterElement.classList.add('badge-danger'); // Rojo
    } 
    else if (pendingTasks > 5) {
      counterElement.classList.remove('badge-info', 'badge-danger');
      counterElement.classList.add('badge-warning'); // Amarillo
    } 
    else {
      counterElement.classList.remove('badge-warning', 'badge-danger');
      counterElement.classList.add('badge-info'); // Azul (default)
    }
  }
}
