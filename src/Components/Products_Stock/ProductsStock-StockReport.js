import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class ProductsStockReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = { time: '', items: [], redirectDashboard: false }
        this.productsListTable = this.productsListTable.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/products/stock-report', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    time: res.data.current_time,
                    items: res.data.items
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
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.stock_qty}</td>
                        <td style={{ border: '1px double black', width: '18%', textAlign: 'center', whiteSpace: 'pre-line' }}>{item.description}</td>
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
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '18%', textAlign: 'center', padding: '0' }}>Deskripsi/ Keterangan</th>
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
                <div className='row'>
                    <div className='col-12'>
                        <h5>Laporan Stok</h5>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <p>Tanggal dan waktu laporan : {this.state.time}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-2'>
                        <input type='submit' value='Download' onClick={this.handleClickSubmit} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'><br/></div>
                </div>
                {this.productsListTable(this.state.items)}
            </div>
        )
    }
}

export default ProductsStockReport