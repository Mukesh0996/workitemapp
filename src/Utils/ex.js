
const getTodos = () => JSON.parse(localStorage.getItem('todo_items'));

const setTodos = (todos) => {
    localStorage.setItem('todo_items', JSON.stringify(todos));
}

const deleteTodo = (todoId, cb) => {
    let existingTodos = getTodos();
    let filteredTodos = existingTodos.filter((todo, index) => todo.id !== todoId);
    cb(filteredTodos); 
    setTodos(filteredTodos); 

}

module.exports = {
    getTodos,
    deleteTodo,
    setTodos
}