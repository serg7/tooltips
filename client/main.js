import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';

import Signup from '../imports/components/Signup';
import ImageList from '../imports/components/ImageList';
import NotFound from '../imports/components/NotFound';
import Login from '../imports/components/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/images'];

const onEnterPublicPage = () => {
    if (Meteor.userId())
    {
        history.pushState({}, '', '/images');
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId())
    {
        history.pushState({}, '', '/');
    }
}

console.log('User id : ' + Meteor.userId());


const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} onEnter={onEnterPublicPage} />
            <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
            <Route path="/images" component={ImageList} onEnter={onEnterPrivatePage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

const onAuthChange = (isAuthenticated) => {
    const pathname = location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated)
    {
        history.pushState({}, '', '/images');
    }
    else if (isAuthenticatedPage && !isAuthenticated)
    {
        history.pushState({}, '', '/');
    }
}

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});