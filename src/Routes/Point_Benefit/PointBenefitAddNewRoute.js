import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import PointBenefitAddNew from '../../Components/Point_Benefit/PointBenefit-AddNew.js'

function PBNew() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <PointBenefitAddNew />
        </div>
    )
}

export default PBNew