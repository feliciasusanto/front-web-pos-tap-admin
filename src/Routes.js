import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'

import Register from "./Routes/RegisterRoute.js";
import Login from './Routes/LoginRoute.js'
import Dashboard from './Routes/DashboardRoute.js'
import ChangePassword from "./Routes/ChangePassRoute.js";
import EmployeesMain from './Routes/Employees/EmployeesMainRoute.js'
import EmployeesNew from './Routes/Employees/EmployeesAddNewRoute.js'

const AppRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<Navigate to='/login'/>}></Route>
            <Route exact path="/register" element={<Register/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/dashboard' element={<Dashboard />}></Route>
            <Route exact path='/change-password' element={<ChangePassword />}></Route>
            <Route exact path='/employees/roles-employees-list' element={<EmployeesMain />}></Route>
            <Route exact path='/employees/add-new-employee' element={<EmployeesNew />}></Route>
        </Routes>
    )
}

export default AppRoutes