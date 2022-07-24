import MainHeader from '../../Components/MainHeader.js'
import MainSidebar from '../../Components/MainSideBar.js'
import ProductsStockReport from '../../Components/Products_Stock/ProductsStock-StockReport.js'

function ProductStkRpt() {
    return (
        <div>
            <div className='container-flex'>
                <MainHeader />
            </div>
            <MainSidebar />
            <ProductsStockReport />
        </div>
    )
}

export default ProductStkRpt