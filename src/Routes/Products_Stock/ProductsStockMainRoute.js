import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductsStockMain from '../../Components/Products_Stock/ProductsStock-Main.js'

function ProductStkMain() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductsStockMain />
        </div>
    )
}

export default ProductStkMain