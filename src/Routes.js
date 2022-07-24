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
import CustomersMain from './Routes/Customers/CustomersMainRoute.js'
import CustomersNew from './Routes/Customers/CustomersAddNewRoute.js'
import CustomersReadDetail from './Routes/Customers/CustomersReadDetailRoute.js'
import CustomersUpdate from './Routes/Customers/CustomersUpdateRoute.js'
import ProductsMain from './Routes/Products_Stock/ProductsStockMainRoute.js'
import ProductsAddNewProduct from './Routes/Products_Stock/ProductsAddNewProductRoute.js'
import ProductsDetail from './Routes/Products_Stock/ProductsReadDetailProductRoute.js'
import ProductsUpdateData from './Routes/Products_Stock/ProductsUpdateDataRoute.js'
import ProductsAddStock from './Routes/Products_Stock/ProductsAddStockRoute.js'
import ProductsSearchStock from './Routes/Products_Stock/ProductsSearchStockRoute.js'
import ProductStockReport from './Routes/Products_Stock/ProductsStockReportRoute.js'

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
            <Route exact path='/customers/customers-list' element={<CustomersMain/>}></Route>
            <Route exact path='/customers/add-new-customer' element={<CustomersNew/>}></Route>
            <Route exact path='/customers/customer-details/:id' element={<CustomersReadDetail />}></Route>
            <Route exact path='/customers/update-data/:id' element={<CustomersUpdate />}></Route>
            <Route exact path='/products/product-stock-list' element={<ProductsMain/>}></Route>
            <Route exact path='/products/add-new-product' element={<ProductsAddNewProduct/>}></Route>
            <Route exact path='/products/product-details/:id' element={<ProductsDetail/>}></Route>
            <Route exact path='/products/update-data/:id' element={<ProductsUpdateData/>}></Route>
            <Route exact path='/products/add-product-stock' element={<ProductsAddStock/>}></Route>
            <Route exact path='/products/search-product-stock' element={<ProductsSearchStock/>}></Route>
            <Route exact path='/products/stock-report' element={<ProductStockReport/>}></Route>
        </Routes>
    )
}

export default AppRoutes