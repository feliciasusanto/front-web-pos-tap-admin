import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import CustomersUpdate from '../../Components/Customers/Customers-Update'

function CustUpdate() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <CustomersUpdate />
        </div>
    )
}

export default CustUpdate