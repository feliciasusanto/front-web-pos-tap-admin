import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import SalesMain from '../../Components/Sales/Sales-Main.js'

function SalesMainPage() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <SalesMain />
        </div>
    )
}

export default SalesMainPage