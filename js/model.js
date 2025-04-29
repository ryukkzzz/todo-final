// Exporto la clase Model para manejar la lógica de los datos de mi app
export default class Model {
  constructor() {
    // Inicializo this.view como null (todavía no sé cuál va a ser la vista)
    this.view = null;
    
    // Intento cargar los todos que ya existían en el localStorage
    this.todos = JSON.parse(localStorage.getItem('todos'));
    
    
    // Si no hay datos o la lista está vacía, creo una tarea por defecto
    if (!this.todos || this.todos.length < 1) {
      this.todos = [
        {
          id: 0,
          title: 'Learn JS',
          description: 'Watch JS Tutorials',
          completed: false,
        }
      ];
      // Como ya tengo una tarea con id 0, el siguiente id será 1
      this.currentId = 1;
    } else {
      // Si ya había tareas, el siguiente id será el último id + 1
      this.currentId = this.todos[this.todos.length - 1].id + 1;
    }
  }

  // Asocio la vista con el modelo para poder actualizarla cuando haga falta
  setView(view) {
    this.view = view;
  }

  // Guardo el array de todos en el localStorage para que no se pierdan al recargar la página
  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Devuelvo una copia de la lista de todos para que no se modifique directamente
  getTodos() {
    return this.todos.map((todo) => ({ ...todo }));
  }

  // Busco el índice de un todo por su id
  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  // Cambio el estado de completado de un todo (si estaba incompleto lo marco, y si estaba marcado lo desmarco)
  toggleCompleted(id) {
    const index = this.findTodo(id);
    const todo = this.todos[index];
    todo.completed = !todo.completed;
    this.save(); // Después de cambiarlo, guardo en localStorage
  }

  // Edito un todo existente con nuevos valores
  editTodo(id, values) {
    const index = this.findTodo(id);
    // Combino los nuevos valores con los que ya tenía
    Object.assign(this.todos[index], values);
    this.save(); // Vuelvo a guardar
  }

  // Agrego un nuevo todo a la lista
  addTodo(title, description) {
    const todo = {
      id: this.currentId++, // Le asigno un id único
      title,
      description,
      completed: false, // Los nuevos todos empiezan como no completados
    }

    this.todos.push(todo); // Lo agrego a la lista
    console.log(this.todos); // (Para mí) imprimo la lista en consola para ver que sí se haya agregado
    this.save(); // Guardo en localStorage

    return { ...todo }; // Devuelvo una copia del nuevo todo
  }

  // Elimino un todo de la lista
  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1); // Lo quito del array
    this.save(); // Y guardo los cambios
  }
}
