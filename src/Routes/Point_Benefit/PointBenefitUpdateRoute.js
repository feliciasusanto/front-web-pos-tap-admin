import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import PointBenefitUpdate from '../../Components/Point_Benefit/PointBenefit-Update.js'

function PBUpdate(props) {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <PointBenefitUpdate />
        </div>
    )
}

export default PBUpdate