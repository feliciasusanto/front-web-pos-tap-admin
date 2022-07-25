import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import SalesAddNew from '../../Components/Sales/Sales-AddNew.js'

function SalesNew() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <SalesAddNew />
        </div>
    )
}

export default SalesNew