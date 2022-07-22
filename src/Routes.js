import React from "react";
import {Switch, Route} from 'react-router-dom'

import Register from "./Routes/RegisterRoute";

const Main = () => {
    return(
        <Switch>
            <Route exact path="/register" component={Register}></Route>
        </Switch>
    )
}

export default Main