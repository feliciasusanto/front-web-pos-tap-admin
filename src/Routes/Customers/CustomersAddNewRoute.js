import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import CustomersAddNew from '../../Components/Customers/Customers-AddNew.js'

function CustNew() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <CustomersAddNew />
        </div>
    )
}

export default CustNew