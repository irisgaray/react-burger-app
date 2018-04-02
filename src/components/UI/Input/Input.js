import React from 'react';

import classes from './Input.css';

const input = (props) => { // just when use {}, 'return' is needed. const input = (props) => (<p>Hi</p>);

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) { // if props.invalid = true
        inputClasses.push(classes.Invalid); // push Invalid css class
    }

    let validationError = null;
    if(props.invalid && props.touched) {
        validationError = <p className = {classes.ValidationError}>Please enter a valid {props.valueType}</p>
    }

    switch(props.elementType){ // When using 'inputType', throws a case sentitive error, the property should be written in lower case 
        case ('input'): 
            inputElement = <input 
                className = {inputClasses.join(' ')} 
                {...props.elementConfig} 
                value = {props.value}
                onChange = {props.changed}
            />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className = {inputClasses} 
                {...props.elementConfig} 
                value = {props.value}
                onChange = {props.changed}
            />;
            break;
            case('select'):
            inputElement = 
            <select 
                className = {inputClasses} 
                value = {props.value}
                onChange = {props.changed}
                >
                {props.elementConfig.options.map(option => (
                    <option key = {option.value} value = {option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input 
                className = {inputClasses} 
                {...props.elementConfig} 
                value = {props.value} 
            />;
    };

    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;