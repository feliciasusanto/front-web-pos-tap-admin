import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductUpdateData from '../../Components/Products_Stock/Products-UpdateProductData.js'

function ProductUpdate() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductUpdateData />
        </div>
    )
}

export default ProductUpdate