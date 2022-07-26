import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import SalesUpdatePayment from '../../Components/Sales/Sales-UpdatePayment.js'

function SalesUpdatePayStatus() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <SalesUpdatePayment />
        </div>
    )
}

export default SalesUpdatePayStatus