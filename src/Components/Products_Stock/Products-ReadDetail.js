import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class ProductReadDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  product_code: window.location.pathname.split('/')[3], item: {}, itemCode: '', itemName: '', itemBrand: '', itemSupplier: '', itemDescription: '', stockQty: 0, createdAt: '', createdBy: '', lastUpdatedAt: '', lastUpdatedBy: '', redirect: false, redirectDashboard: false }
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get(`https://backend-pos-tap.herokuapp.com/admin/products/product-detail/${this.state.product_code}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => { 
                this.setState({
                    item: res.data,
                    itemCode: res.data.code,
                    itemName: res.data.name,
                    itemBrand: res.data.brand,
                    itemSupplier: res.data.supplier_name, 
                    itemDescription: res.data.description,
                    stockQty: res.data.stock_qty,
                    createdAt: res.data.created_at,
                    createdBy: res.data.created_by,
                    lastUpdatedAt: res.data.last_updated_at,
                    lastUpdatedBy: res.data.last_updated_by 
                })
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    alert('Anda tidak memiliki akses untuk bagian ini.')
                    this.setState({
                        redirectDashboard: true
                    })
                }
                else if (err.response.status === 401) {

                }
                else {
                    JSON.stringify(err.response)
                }
            })
    }

    render() {
        let inputStyle = { color: 'black', width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/products/product-stock-list' />)
        }

        if (this.state.redirectDashboard == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Barang dan Stok</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Data Lengkap Barang</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kode Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemCode' value={this.state.itemCode.toUpperCase()} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Dibuat Oleh</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='createdBy' value={this.state.createdBy} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Nama Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemName' value={this.state.itemName} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Dibuat pada</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='createdAt' value={this.state.createdAt} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Merk Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemBrand' value={this.state.itemBrand} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Terakhir Diubah Oleh</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='lastUpdatedBy' value={this.state.lastUpdatedBy} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Supplier</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemSupplier' value={this.state.itemSupplier} onChange={this.handleInputChange} style={inputStyle}  disabled={true}/>
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Terakhir Diubah Pada</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='lastUpdatedAt' value={this.state.lastUpdatedAt} onChange={this.handleInputChange} style={inputStyle} disabled={true}/>
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Deskripsi/ Keterangan Barang</label>
                        </div>
                        <div className='col-3'>
                            <textarea type='text' name='itemDescription' value={this.state.itemDescription} onChange={this.handleInputChange} style={{ color: 'black', width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', minHeight: '15vh' }} disabled={true}/>
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Stok Tersedia</label>
                        </div>
                        <div className='col-3'>
                            <input type='number' name='stockQty' value={this.state.stockQty} onChange={this.handleInputChange} style={inputStyle}  disabled={true}/>
                        </div>
                    </div>

                    <div className='row' style={{ margin: '5vh 0 2vh 0' }}>
                        <div className='col-12 text-center'>
                            <Link to='/products/product-stock-list'>
                                <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductReadDetail