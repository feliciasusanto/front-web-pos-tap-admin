import MainHeader from '../Components/MainHeader.js'
import MainSidebar from '../Components/MainSideBar.js'
import Dashboard from '../Components/Dashboard.js'

function Main() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <Dashboard />
        </div>
    )
}

export default Main