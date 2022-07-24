import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductReadDetail from '../../Components/Products_Stock/Products-ReadDetail.js'

function ProductDetail() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductReadDetail />
        </div>
    )
}

export default ProductDetail