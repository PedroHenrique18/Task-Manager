import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';


const AppRoutes: React.FC = () => (
        <Switch>
            <Route path="/" exact component={Layout}/>
        </Switch>
);

export default AppRoutes;