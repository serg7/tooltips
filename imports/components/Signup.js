import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            error: ''
        }
    }

    onSubmit(e)
    {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Accounts.createUser({ email, password }, (error) => {
            console.log("Signup callback", error);
        });
    }

    render()
    {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Signup Page</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined }

                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input ref="email" type="email" name="email" placeholder="Email" />
                        <input ref="password" type="password" name="password" placeholder="Password"  />
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Login</Link>
                </div>
            </div>

        );
    }

}