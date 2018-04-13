import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('[orderHandler]')
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Wagner Faria do Amaral',
                address: {
                    street: 'Rua Salém, nº 52, Bairro Jd. Califórnia, Cuiabá-MT',
                    zipCode: '78070-448',
                    country: 'Brasil'
                },
                email: 'wagnerfaria1601@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', orders).then(response => {
            console.log(response);
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    render() {
        let form = (
            <form >
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your E-Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
