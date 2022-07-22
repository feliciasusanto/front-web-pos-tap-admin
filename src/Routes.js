import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'

import Register from "./Routes/RegisterRoute.js";
import Login from './Routes/LoginRoute.js'

const Main = () => {
    return(
        <Routes>
            <Route path='/' element={<Navigate to='/login'/>}></Route>
            <Route exact path="/register" element={<Register/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
        </Routes>
    )
}

export default Main