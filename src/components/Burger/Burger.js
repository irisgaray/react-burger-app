import React from 'react';
// import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients) //Object.Keys() => returns an array of the key values of an object // Javascript method
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => { // _ means that the value is blank(?)
                return <BurgerIngredient key={igKey + i} type = {igKey} />;
            }) // An array with the quantity of the ingredients for each value of the object -> {chees: 2}
        })
        .reduce((arr, el) => { // reduce() Applies a function against an acumulator and each element in the array (left to right) to reduce it to a single value
            return arr.concat(el);
        }, []); // transform an array into sth else
    
        if(transformedIngredients.length === 0){
            transformedIngredients = <p> Please start adding some ingredients!</p>
        }

    return (
        // The wrapper for the ingredients (ingredients just returns each ingredient individually)
        <div className = {classes.Burger}> 
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}           
            <BurgerIngredient type="bread-bottom"/>
        </div>
        
    );

}

export default burger; 
// export default withRouter(burger); //withRouter: Allows to the burger component to have all the properties
// from 'Router'. Only BurgerBuilder was declared using a Route comp. and with this BurgerBuilder had
// all the Router properties but no their childs.