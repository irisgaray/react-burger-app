import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() { // 
        const query = new URLSearchParams(this.props.location.search); //URLSearch: looks for the params that are being passes in the URL
        const ingredients = {};
        let price = 0;

        for(let param of query.entries()){
            
            if(param[0] === 'price'){ // if key = 'price'
                price = param[1];
            } else {
                // ['salad', '1'];
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    chekoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        //replace: Replaces the current route with another one
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients = {this.state.ingredients}
                    onCheckoutCancelled = {this.checkoutCancelledHandler}
                    onCheckoutContinued = {this.chekoutContinuedHandler} 
                />
                <Route path = {this.props.match.path + '/contact-data'} 
                       render = {(props) => 
                        (<ContactData ingredients = {this.state.ingredients} 
                            price = {this.state.totalPrice} {...props}/>
                        )}
                />
            </div>
        );
    }
}

export default Checkout;