import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductSearchStock from '../../Components/Products_Stock/Products-SearchStock.js'

function ProductSearchStk() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductSearchStock />
        </div>
    )
}

export default ProductSearchStk