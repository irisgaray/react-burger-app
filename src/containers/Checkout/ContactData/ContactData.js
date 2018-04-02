import React, { Component } from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: '',
                validation: {}, // this will return undefined
                valid: true // this field will always be valid in the form
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {

        event.preventDefault(); // To prevent send the request and reload the page
        this.setState({loading: true});

        const formData = {};

        for(let formElementIdentifier in this.state.orderForm){ // create key-value pairs to access to the value the user enter
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // alert('On Build!!');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // Is recomendable to make calculations on server side
            orderData: formData
        }; 
        axios.post('/orders.json', order) // .json is required when using Firebase
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/'); // To redirect to the root page after save data on firebase
                console.log('after then POST');
            })
            .catch(error => {
                console.log('error sending POST: ', error)
                this.setState({loading: false});                
            })

    }

    // Method to check the validation of each field in the form
    checkValidaty(value, rules) {

        let isValid = true;

        if(!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) { // To check the length of the field
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) { // To check the length of the field
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }; 
        
        // to access to the object deeply and not just the first object 
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] // inputIdentifier = elementType
            // It access to the object nested in the elementType
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidaty(updatedFormElement.value, updatedFormElement.validation); // return true or false
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit = {this.orderHandler}>
                    {/* When using 'inputType', throws a case sentitive error, the property should be written in lower case */}
                    {/* <Input elementType = "..." elementConfig = "..." value = "..." /> */}
                    {formElementsArray.map(formElement => (
                        <Input 
                            key = {formElement.id}
                            elementType = {formElement.config.elementType} 
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            invalid = {!formElement.config.valid} // asks if the value is not valid
                            shouldValidate = {formElement.config.validation} // if 'validation' property is not defined, this will return false 
                            touched = {formElement.config.touched}
                            valueType = {formElement.id}
                            changed = {(event) => {this.inputChangedHandler(event, formElement.id)}}
                        />
                    ))}
                    <Button btnType = "Success"disabled = {!this.state.formIsValid} clicked = {this.orderHandler}>ORDER</Button>
                    {/* <Button btnType = "Cancel">CANCEL</Button> */}
            </form>
        );

        if(this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter contat data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;