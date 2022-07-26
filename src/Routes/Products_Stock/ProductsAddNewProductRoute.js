import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductAddNew from '../../Components/Products_Stock/Products-AddNewProduct.js'

function ProductNew() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductAddNew />
        </div>
    )
}

export default ProductNew