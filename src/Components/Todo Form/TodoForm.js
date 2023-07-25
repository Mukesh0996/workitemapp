import React, {  useState } from 'react';
import todoFormStyle from './TodoForm.module.css';

const TodoForm = ({addItemHandler}) => {

    const [workItem, setWorkItem] = useState({todo_item:"",todo_deadline: '', status:""});

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(workItem.name !== "") {
            addItemHandler(workItem);
            setWorkItem({todo_item:"", status:"" , todo_deadline:''});
        }
    };

    const updateData = (e) => {
        if(e.target.value !== "") {
            setWorkItem({...workItem, [e.target.name]: e.target.value, status: "pending", id: new Date().getTime().toString()});
        }
    };
   
    return (
        <div className={todoFormStyle.todo_form_div}>
            <h2>Add Todo</h2>
            <hr/>
            <form className={todoFormStyle.todo_form} onSubmit={onSubmitHandler}>
                <div className={todoFormStyle.formItem}>
                    <label htmlFor='todo'>Todo Name:</label>
                    <input id='todo' type='text' value={workItem.todo_item} className='todo_item' name='todo_item' placeholder='Enter your work item...' onChange={updateData}/>
                </div>
                <div className={todoFormStyle.formItem}>
                    <label htmlFor='enddate'>End Date:</label>
                    <input id='enddate' type='date' className='todo_deadline' value={workItem.todo_deadline} name='todo_deadline' onChange={updateData}/>
                </div>
                <div className={todoFormStyle.formbtn}>
                    <button className={todoFormStyle.submit_btn} type='submit'>Add Todo</button>
                </div>
            </form>

        </div>
    );
};

export default TodoForm;