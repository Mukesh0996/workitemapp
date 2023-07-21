import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteTodo, setTodos } from '../../Utils/ex';
import TodoCategoryContainerStyles from './TodoCategory.module.css';
import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoCategory = ({ status, todos, updateTodos }) => {

    let innerHtml;
        // styles if todo status is pending
    let classStyles = `${TodoCategoryContainerStyles.container_child} ${TodoCategoryContainerStyles.pending}`;
    let categoryText = "Pending";
    let Category = `${TodoCategoryContainerStyles.container_status} ${TodoCategoryContainerStyles.container_pending_status}`;

    // styles if todo status is completed
    if(status === "completed") {  
        classStyles = `${TodoCategoryContainerStyles.container_child} ${TodoCategoryContainerStyles.completed}`;
        categoryText = "Completed";
        Category = `${TodoCategoryContainerStyles.container_status} ${TodoCategoryContainerStyles.container_completed_status}`;
    }   
  
    const filteredTodos = todos.filter((todo) => todo.status === status);

    // function to handle CSS styles when user has started dragging the HTML element
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
    // function to remove CSS styles when the user has dropped the HTML element
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
        // find the required todo
        let requiredTodo = processTodos.find((todo) => todo.id === data);
        let statusCheck = e.currentTarget.getAttribute('data-todo-status');
        
        if(requiredTodo.status.toLowerCase() === statusCheck.toLowerCase()){
            return;
        } else if(requiredTodo.status === "completed") {
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
    // if else condition to display content appropriate html content if todos are present/ not present
    if(filteredTodos.length === 0) {

       innerHtml = <h4 style={{marginTop:'41%', textAlign:'center', textTransform:'capitalize', fontStyle:'italic', fontWeight:'lighter'}}>
                        No {status} todos available
                    </h4>
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

    return ( <div data-todo-status={status} className={classStyles} onDrop={handleDrop}  onDragOver={handleDragOver} >
                <div className={Category}>{categoryText}</div>
                {
                    innerHtml
                }
            </div>);
};

export default TodoCategory;