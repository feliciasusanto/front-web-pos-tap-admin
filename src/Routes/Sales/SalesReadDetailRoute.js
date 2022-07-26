import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import SalesReadDetail from '../../Components/Sales/Sales-ReadDetail.js'

function SalesRead() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <SalesReadDetail />
        </div>
    )
}

export default SalesRead