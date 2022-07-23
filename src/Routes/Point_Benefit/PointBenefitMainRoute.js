import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import PointBenefitMain from '../../Components/Point_Benefit/PointBenefit-Main.js'

function PBMain() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <PointBenefitMain />
        </div>
    )
}

export default PBMain