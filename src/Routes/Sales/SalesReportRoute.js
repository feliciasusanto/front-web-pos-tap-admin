import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import SalesReport from '../../Components/Sales/Sales-SalesReport.js'

function SalesRpt() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <SalesReport />
        </div>
    )
}

export default SalesRpt