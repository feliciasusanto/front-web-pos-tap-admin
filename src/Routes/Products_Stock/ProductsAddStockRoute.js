import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductAddStock from '../../Components/Products_Stock/Products-AddStock.js'

function ProductAddStk() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductAddStock />
        </div>
    )
}

export default ProductAddStk