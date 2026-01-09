import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Search from '../pages/Search';
import NoMatch from './NoMatch';

/**
 * @description Handle all the routes
 */

const Router: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route component={NoMatch} />
        </Switch>
    );
};

export default Router;
