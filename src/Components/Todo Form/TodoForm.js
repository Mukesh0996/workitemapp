import React, {  useState } from 'react';
import todoFormStyle from './TodoForm.module.css';

const TodoForm = ({addItemHandler}) => {

    const [workItem, setWorkItem] = useState({todo_item:"", status:""});

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(workItem.name !== "") {
            addItemHandler(workItem);
            setWorkItem({todo_item:"", status:""});
        }
    };

    const updateData = (e) => {
        if(e.target.value !== "") {
            setWorkItem({...workItem, [e.target.name]: e.target.value, status: "pending", id: new Date().getTime().toString()});
        }
     
    };
   
    return (
        <div className={todoFormStyle.todo_form_div}>
            <form className={todoFormStyle.todo_form} onSubmit={onSubmitHandler}>
                <input type="text" 
                className="todo_item" 
                name="todo_item"
                placeholder='Enter your work item....' 
                onChange={updateData} value={workItem.todo_item}/>
                <button className={todoFormStyle.submit_btn} type='submit'>Add Todo</button>
            </form>

        </div>
    );
};

export default TodoForm;