import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import EmployeesUpdate from '../../Components/Employees/Employee-Update.js'

function EmployeeNew(props) {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <EmployeesUpdate />
        </div>
    )
}

export default EmployeeNew