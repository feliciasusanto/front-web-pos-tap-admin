import React from 'react'
import { Link } from 'react-router-dom'
import ico_employee from './../assets/images/employee.png'
import ico_point from './../assets/images/point.png'
import ico_cust from './../assets/images/customers.png'
import ico_sales from './../assets/images/sales.png'
import ico_warehouse from './../assets/images/warehouse.png'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hover: false }
    }

    render() {
        let linkStyle = { padding: '0 0.5vw', fontSize: '1.9vh', textDecoration: 'none', color: 'black', textAlign: 'center' }

        return (
            <div style={{ margin: '8vh 0 0 0', width: '5.3vw', height: '92vh', background: '#63B4FF', display: 'inline-block', position: 'fixed' }}>
                <div class="btn-group dropend">
                    <div class="" data-bs-toggle="dropdown" aria-expanded="false" style={{ textAlign: 'center', padding: '0.5vh 0.5vw' }}>
                        <img src={ico_employee} alt='employee-ico' style={{ width: '3vw', height: '3vw', margin: '0' }} />
                        <p style={{ fontSize: '1vw', margin: '0' }}>Karyawan</p>
                    </div>

                    <ul class="dropdown-menu">
                        <li style={{textAlign: 'center'}}><Link to='/employees/roles-employees-list' style={linkStyle}>Daftar Peran & Pengguna</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/employees/add-new-employee' style={linkStyle}>Tambah Pengguna</Link></li>
                    </ul>
                </div>
                <div class="btn-group dropend">
                    <div class="" data-bs-toggle="dropdown" aria-expanded="false" style={{ textAlign: 'center', padding: '0.5vh 0.5vw' }}>
                        <img src={ico_point} alt='point_-ico' style={{ width: '3vw', height: '3vw', margin: '0' }} />
                        <p style={{ fontSize: '1vw', margin: '0' }}>Point Benefit</p>
                    </div>

                    <ul class="dropdown-menu">
                        <li style={{textAlign: 'center'}}><Link to='/point-benefit/point-benefit-list' style={linkStyle}>Daftar Point Benefit</Link></li>
                    </ul>
                </div>
                <div class="btn-group dropend">
                    <div class="" data-bs-toggle="dropdown" aria-expanded="false" style={{ textAlign: 'center', padding: '0.5vh 0.5vw' }}>
                        <img src={ico_cust} alt='customer-ico' style={{ width: '3vw', height: '3vw', margin: '0' }} />
                        <p style={{ fontSize: '1vw', margin: '0' }}>Pelanggan</p>
                    </div>

                    <ul class="dropdown-menu">
                        <li style={{textAlign: 'center'}}><Link to='/customers/customers-list' style={linkStyle}>Daftar Pelanggan</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/customers/add-new-customer' style={linkStyle}>Tambah Pelanggan</Link></li>
                    </ul>
                </div>
                <div class="btn-group dropend">
                    <div class="" data-bs-toggle="dropdown" aria-expanded="false" style={{ textAlign: 'center', padding: '0.5vh 0.5vw' }}>
                        <img src={ico_sales} alt='sales-ico' style={{ width: '3vw', height: '3vw', margin: '0' }} />
                        <p style={{ fontSize: '1vw', margin: '0' }}>Penjualan</p>
                    </div>

                    <ul class="dropdown-menu">
                        <li style={{textAlign: 'center'}}><Link to='/sales/sales-list' style={linkStyle}>Daftar Penjualan</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/sales/add-new-sales' style={linkStyle}>Tambah Penjualan</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/sales/sales-report' style={linkStyle}>Laporan Penjualan</Link></li>
                    </ul>
                </div>
                <div class="btn-group dropend">
                    <div class="" data-bs-toggle="dropdown" aria-expanded="false" style={{ textAlign: 'center', padding: '0.5vh 0.5vw' }}>
                        <img src={ico_warehouse} alt='sales-ico' style={{ width: '3vw', height: '3vw', margin: '0' }} />
                        <p style={{ fontSize: '1vw', margin: '0' }}>Barang & Stok</p>
                    </div>

                    <ul class="dropdown-menu">
                        <li style={{textAlign: 'center'}}><Link to='/products/product-stock-list' style={linkStyle}>Daftar Barang dan Stok</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/products/search-product-stock' style={linkStyle}>Cari Barang dan Stok</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/products/add-new-product' style={linkStyle}>Tambah Barang</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/products/add-new-product-stock' style={linkStyle}>Tambah Stok</Link></li>
                        <hr class="dropdown-divider"></hr>
                        <li style={{textAlign: 'center'}}><Link to='/products/product-stock-report' style={linkStyle}>Laporan Stok Barang</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar