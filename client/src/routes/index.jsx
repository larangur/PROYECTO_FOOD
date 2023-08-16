import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
    // AboutPage,
    DetailPage,
    HomePage,
    LandingPage,
    NotFound,
} from '../pages';

export const AppRoutes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/home">
                    <HomePage />
                </Route>

                <Route path="/recipes/:recipeId">
                    <DetailPage />
                </Route>
                <Route path="/*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
};
