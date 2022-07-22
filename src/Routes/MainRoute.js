import MainHeader from './../Components/MainHeader.js'
import MainSidebar from './../Components/MainSideBar.js'

function Main() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <div className='container-flex' style={{margin: '8vh 0 0 5.3vw', width: '94.7vw', background:'aquamarine', display: 'inline-block'}}>
                
            </div>
        </div>
    )
}

export default Main