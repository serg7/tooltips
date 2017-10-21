import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';

import Signup from '../imports/components/Signup';
import ImageList from '../imports/components/ImageList';
import NotFound from '../imports/components/NotFound';
import Login from '../imports/components/Login';

const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/images" render={() => !Meteor.userId() ? <Redirect to="/" /> : <ImageList /> } />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

console.log('User id : ' + Meteor.userId());

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});