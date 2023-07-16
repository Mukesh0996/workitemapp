import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteTodo, setTodos } from '../../Utils/ex';
import TodoCategoryContainerStyles from './TodoCategory.module.css';
import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoCategory = ({ status, todos, updateTodos }) => {

    let classStyles = `${TodoCategoryContainerStyles.container_child} ${TodoCategoryContainerStyles.pending}`;
    let categoryText = "Pending";
    let Category = `${TodoCategoryContainerStyles.container_status} ${TodoCategoryContainerStyles.container_pending_status}`;

    if(status === "completed") {  
        classStyles = `${TodoCategoryContainerStyles.container_child} ${TodoCategoryContainerStyles.completed}`;
        categoryText = "Completed";
        Category = `${TodoCategoryContainerStyles.container_status} ${TodoCategoryContainerStyles.container_completed_status}`;
    }   
    let innerHtml;
     const filteredTodos = todos.filter((todo) => todo.status === status);

    function handleDragStart(e) {
        let target = e.currentTarget
        target.style.opacity = '0.2';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("Text", e.target.id);
        target.classList.add(TodoCategoryContainerStyles.over); 
    }

    function handleDragOver (e) {
        e.preventDefault();
    }

    function handleDragEnd (e) {
        e.currentTarget.style.opacity = "";
        e.currentTarget.classList.remove(TodoCategoryContainerStyles.over); 
    }

    function handleDragLeave (e) {
        e.currentTarget.classList.remove(TodoCategoryContainerStyles.over);   
    }

    function handleDrop (e) {
        e.preventDefault();
        let processTodos = [...todos], status, processedTodos; 
        const data = e.dataTransfer.getData("Text");
        let requiredTodo = processTodos.find((todo, index) => todo.id === data);
        if(requiredTodo.status === "completed") {
            status = 'pending';
        } else {
            status = 'completed';
        }
      requiredTodo = {
        ...requiredTodo,
        status
      };
      let filter = processTodos.filter((todo, index) => todo.id !== data);
      processedTodos = [...filter, requiredTodo];
      setTodos(processedTodos);
      updateTodos(processedTodos);

      setTimeout(() => {
        e.target.appendChild(document.getElementById(data));
      }, 100);

    }

    const onSuccesshandler = (updatedTodoList) => {
       updateTodos(updatedTodoList)

    }
    if(filteredTodos.length === 0) {

       innerHtml = <h4 style={{marginTop:'41%', textAlign:'center', textTransform:'capitalize', fontStyle:'italic', fontWeight:'lighter'}}>No {status} todos available</h4>
   
    } else {

        innerHtml = filteredTodos.map((todo, index)=> <div data-todo-status={`${todo.status === "completed" ? 'completed' : 'pending' }`}
        onDragStart={handleDragStart} 
        onDragLeave={handleDragLeave} 
        onDragEnd={handleDragEnd} 
        key={index}
        id={todo.id}
        className={`${TodoCategoryContainerStyles.todo_item} ${todo.status === 'pending' ? TodoCategoryContainerStyles.pending_todo_item : TodoCategoryContainerStyles.completed_todo_item}`} draggable={true}> 
        <h4 className={TodoCategoryContainerStyles.todoText}>{todo.todo_item}</h4> 
        <span className={`${TodoCategoryContainerStyles.status} ${todo.status === 'pending' ? TodoCategoryContainerStyles.pendingstatus : TodoCategoryContainerStyles.completedstatus}`}>{todo.status}</span>  
        <div className={TodoCategoryContainerStyles.deleteicon} onClick={()=> {deleteTodo(todo.id , onSuccesshandler)}}>
         <FontAwesomeIcon icon={faTrash} />
        </div>
     </div>
    );
    }

    return ( <div className={classStyles} onDrop={handleDrop}  onDragOver={handleDragOver} >
                <div className={Category}>{categoryText}</div>
                {
                    innerHtml
                }
            </div>);
};

export default TodoCategory;