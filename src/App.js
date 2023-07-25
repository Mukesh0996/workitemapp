import React, { useEffect, useState } from 'react';
import TodoForm from './Components/Todo Form/TodoForm';
import TodoCategoryContainer from './Components/Todo Category/TodoCategoryContainer';
import TodoCategory from './Components/Todo Category/TodoCategory';
import { getTodos, setTodos } from './Utils/ex';
import Header from './Components/Header/Header';

function App() {

  let todo_status = ["pending", "completed"];
  const [todolist_items, setTodolist_items] = useState([]);

  useEffect(() => {

    let todos = getTodos();
    if(todos === null) {
      localStorage.setItem('todo_items', JSON.stringify(todolist_items));
    }
    setTodolist_items(todos);

  },[]);

  const addItemToListHandler = (addedTodo) => {  
    setTodolist_items(()=> [...todolist_items, addedTodo]); // update state
    setTodos(todolist_items); //add todo to localstorge
  };

  // setInterval(() => {
  //   let date = new Date();
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let seconds = date.getSeconds();
  //   let meri = "AM"

  //   if(hours >12) {
  //     hours = hours - 12;
  //     meri = "PM"
  //   }

  //   if(seconds < 10) {
  //     seconds = "0" + seconds;
  //   }

  //   console.log(`${hours}:${minutes}:${seconds} ${meri}` );
  // }, 1000);

  return (
    <div className="App">
      <Header/>
      <TodoForm addItemHandler={addItemToListHandler}/>
      <TodoCategoryContainer> 
        {
          todo_status.map((status, index) => <TodoCategory updateTodos={setTodolist_items} key={index} status={status} todos={todolist_items}/>)
        }
        </TodoCategoryContainer>
    </div>
  );
}

export default App;