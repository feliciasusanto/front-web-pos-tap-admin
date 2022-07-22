import MainHeader from '../Components/MainHeader.js'
import MainSidebar from '../Components/MainSideBar.js'
import ChangePass from '../Components/ChangePass'

function ChangePassword() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ChangePass />
        </div>
    )
}

export default ChangePassword