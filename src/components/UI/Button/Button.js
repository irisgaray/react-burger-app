import React from 'react';
import classes from './Button.css';

const button = (props) => {
    return (
        <button disabled = {props.disabled}
            className = {[classes.Button, classes[props.btnType]].join(' ')} // Join is to convert the array into an array of strings
            onClick = {props.clicked}>
            {props.children}
        </button>
    )
}

export default button;