import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import EmployeesMain from '../../Components/Employees/Employee-Main.js'

function EmployeeMain() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <EmployeesMain />
        </div>
    )
}

export default EmployeeMain