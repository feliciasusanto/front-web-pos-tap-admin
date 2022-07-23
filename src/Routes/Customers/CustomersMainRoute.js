import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import CustomersMain from '../../Components/Customers/Customers-Main.js'

function CustMain() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <CustomersMain />
        </div>
    )
}

export default CustMain