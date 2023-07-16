import React from 'react';
import TodoCategoryContainerStyles from './TodoCategory.module.css';

const TodoCategoryContainer = (props) => {

    return <div className={TodoCategoryContainerStyles.container}>{props.children}</div>
}

export default TodoCategoryContainer;