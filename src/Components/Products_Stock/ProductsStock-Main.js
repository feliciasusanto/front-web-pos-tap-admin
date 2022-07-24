import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import ico_read from './../../assets/images/binoculars.png'
import ico_edit from './../../assets/images/edit.png'

class ProductsStockMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = { products: [], redirectDashboard: false }
        this.productsListTable = this.productsListTable.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/products/product-list', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    products: res.data
                })
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    alert('Anda tidak memiliki akses untuk bagian ini.')
                    this.setState({
                        redirectDashboard: true
                    })
                }
                else if(err.response.status === 401){

                }
                else {
                    JSON.stringify(err.response)
                }
            })
    }

    productsListTable = (products_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <tr key={item.code}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0' }}>{item.code}</td>
                        <td style={{ border: '1px double black', width: '15%', textAlign: 'center', padding: '0' }}>{item.name}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0' }}>{item.brand}</td>
                        <td style={{ border: '1px double black', width: '12%', textAlign: 'center', padding: '0' }}>{item.supplier_name}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0'}}>{item.stock_qty}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center' }}><Link to={`/products/product-details/${item.code}`} style={{ display: 'inline-block', marginRight: '1vw' }}><img src={ico_read} alt='See' style={{ width: '4vh', height: '4vh' }} /></Link><Link to={`/products/update-data/${item.code}`} style={{ display: 'inline-block' }}><img src={ico_edit} alt='Edit' style={{ width: '4vh', height: '4vh' }} /></Link></td>
                    </tr>
                )
            })
        }
        return (
            <table className='col-12' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '3%', textAlign: 'center', padding: '0' }}>#</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>Kode Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '15%', textAlign: 'center', padding: '0' }}>Nama Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>Merk</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '12%', textAlign: 'center', padding: '0' }}>Supplier</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Stok Tersedia</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(products_arr)}
                </tbody>
            </table>
        )
    }

    render() {
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
                    </div>
                </div>
                <div className='row' style={{ height: '10vh', textAlign: 'right' }}>
                    <Link className='col-2' to='/products/add-new-product' style={{ textAlign: 'center', height: '5vh', width: '10vw', fontSize: '2.1vh', color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none', marginLeft: '1vw' }}>Tambah Barang</Link>
                    <div className='col-1'></div>
                    <Link className='col-2' to='/products/add-product-stock' style={{ textAlign: 'center', height: '5vh', width: '10vw', fontSize: '2.1vh', color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Tambah Stok</Link>
                    <div className='col-1'></div>
                    <Link className='col-2' to='/products/search-product-stock' style={{ textAlign: 'center', height: '5vh', width: '10vw', fontSize: '2.1vh', color: 'black', textDecoration: 'none', padding: '0.8vh 0.2vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Cari Barang dan Stok</Link>
                    <div className='col-1'></div>
                    <Link className='col-2' to='/products/product-stock-report' style={{ textAlign: 'center', height: '5vh', width: '10vw', fontSize: '2.1vh', color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Laporan Stok</Link>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h5>Daftar Pelanggan</h5>
                    </div>
                </div>
                {this.productsListTable(this.state.products)}
                <div className='row' style={{ height: '5vh' }}></div>
            </div>
        )
    }
}

export default ProductsStockMain