import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import ico_read from './../../assets/images/binoculars.png'
import ico_edit from './../../assets/images/edit.png'
import ico_invoice from './../../assets/images/receipt.png'
import ico_delivery from './../../assets/images/delivery-box.png'

class SalesMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = { invoices: [], redirectDashboard: false }
        this.salesListTable = this.salesListTable.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/sales/sales_list', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    invoices: res.data
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

    salesListTable = (invoices_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <tr key={item.invoice_no}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0' }}>{item.invoice_no}</td>
                        <td style={{ border: '1px double black', width: '15%', textAlign: 'center', padding: '0' }}>{item.sales_date}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0' }}>{item.cust_code}</td>
                        <td style={{ border: '1px double black', width: '12%', textAlign: 'center', padding: '0' }}>{item.cust_name}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0'}}>{item.cust_po}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0'}}>{item.invoice_total}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0'}}>{item.paid_status}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0'}}>{item.created_by}</td>
                        <td style={{ border: '1px double black', width: '20%', textAlign: 'center' }}>
                            <Link to={`/sales/sales-details/${item.invoice_no}`} style={{ display: 'inline-block', marginRight: '1vw' }}>
                                <img src={ico_read} alt='See' style={{ width: '4vh', height: '4vh' }} />
                            </Link>
                            <Link to={`/sales/update-payment-status/${item.invoice_no}`} style={{ display: 'inline-block' }}>
                                <img src={ico_edit} alt='Edit' style={{ width: '4vh', height: '4vh' }} />
                            </Link>
                            <Link to={`/sales/invoice/${item.invoice_no}`} style={{ display: 'inline-block', marginLeft: '1vw' }}>
                                <img src={ico_invoice} alt='Invoice' style={{ width: '4vh', height: '4vh' }} />
                            </Link>
                            <Link to={`/sales/delivery-note/${item.invoice_no}`} style={{ display: 'inline-block', marginLeft: '1vw'  }}>
                                <img src={ico_delivery} alt='Edit' style={{ width: '4vh', height: '4vh' }} />
                            </Link>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <table className='col-12' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '3%', textAlign: 'center', padding: '0' }}>#</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>No. Penjualan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>Tanggal</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>Kode Pelanggan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '15%', textAlign: 'center', padding: '0' }}>Nama Pelanggan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>No. PO Pelanggan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>Total Penjualan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '9%', textAlign: 'center', padding: '0' }}>Status Bayar</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '9%', textAlign: 'center', padding: '0' }}>Dibuat Oleh</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '15%', textAlign: 'center', padding: '0' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(invoices_arr)}
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
                        <h4>Penjualan</h4>
                        <hr style={{ background: 'black' }} />
                    </div>
                </div>
                <div className='row' style={{ textAlign: 'right' }}>
                    <Link className='col-2' to='/sales/add-new-sales' style={{ textAlign: 'center', color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none', marginLeft: '1vw' }}>Tambah Penjualan</Link>
                    <div className='col-1'></div>
                    <Link className='col-2' to='/sales/sales-report' style={{ textAlign: 'center', color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Laporan Penjualan</Link>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h5>Daftar Penjualan</h5>
                    </div>
                </div>
                {this.salesListTable(this.state.invoices)}
                <div className='row' style={{ height: '5vh' }}></div>
            </div>
        )
    }
}

export default SalesMain