import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            error: ''
        };
    }

    onSubmit(e)
    {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

       Meteor.loginWithPassword({ email }, password, (error) => {
           console.log('Login callback', error);
       });
    }

    render()
    {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login Page</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined }

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