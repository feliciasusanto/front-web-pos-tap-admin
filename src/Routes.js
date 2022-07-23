import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'

import Register from "./Routes/RegisterRoute.js";
import Login from './Routes/LoginRoute.js'
import Dashboard from './Routes/DashboardRoute.js'
import ChangePassword from "./Routes/ChangePassRoute.js";
import EmployeesMain from './Routes/Employees/EmployeesMainRoute.js'
import EmployeesNew from './Routes/Employees/EmployeesAddNewRoute.js'
import EmployeesUpdate from './Routes/Employees/EmployeesUpdateRoute.js'
import PointBenefitMain from './Routes/Point_Benefit/PointBenefitMainRoute.js'
import PointBenefitNew from './Routes/Point_Benefit/PointBenefitAddNewRoute.js'
import PointBenefitUpdate from './Routes/Point_Benefit/PointBenefitUpdateRoute.js'

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
            <Route exact path='/employees/update-data/:id' element={<EmployeesUpdate />}></Route>
            <Route exact path='/point-benefit/point-benefit-list' element={<PointBenefitMain/>}></Route>
            <Route exact path='/point-benefit/add-new-benefit' element={<PointBenefitNew/>}></Route>
            <Route exact path='/point-benefit/update-data/:id' element={<PointBenefitUpdate />}></Route>
        </Routes>
    )
}

export default AppRoutes