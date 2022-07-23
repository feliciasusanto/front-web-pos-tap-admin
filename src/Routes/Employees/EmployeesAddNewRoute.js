import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import EmployeesAddNew from '../../Components/Employees/Employee-AddNew.js'

function EmployeeNew() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <EmployeesAddNew />
        </div>
    )
}

export default EmployeeNew