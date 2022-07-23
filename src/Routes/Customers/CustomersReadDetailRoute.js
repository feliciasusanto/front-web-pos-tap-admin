import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import CustomersReadDetail from '../../Components/Customers/Customers-ReadDetail.js'

function CustReadDetail() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <CustomersReadDetail />
        </div>
    )
}

export default CustReadDetail