import { Route, Switch, Redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import Home from '../components/Home'

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRoute

