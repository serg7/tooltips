import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            error: '',
            redirectToImagesPage: false
        };
    }

    onSubmit(e)
    {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

       Meteor.loginWithPassword({ email }, password, (error) => {
           !error ? this.setState({ redirectToImagesPage: true }) : this.setState({ error: error.reason });
       });
    }

    render()
    {
        const { redirectToImagesPage } = this.state;
        console.log('render Login');

        return (
            <div className="boxed-view">
                {redirectToImagesPage && <Redirect to="/images" />}
                <div className="boxed-view__box">
                    <h1>Login</h1>
                    <h3>{this.state.error ? <p>{this.state.error}</p> : undefined }</h3>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input ref="email" type="email" name="email" placeholder="Email" />
                        <input ref="password" type="password" name="password" placeholder="Password"  />
                        <button className="button">Login</button>
                    </form>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        );
    }

}