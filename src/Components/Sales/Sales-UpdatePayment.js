import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class SalesUpdatePaymentStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = { invoice_no: window.location.pathname.split('/')[3], soldItems: [], invoiceData: {}, paidStatus: '', redirect: false, redirectDashboard: false }
        this.soldItemsTable = this.soldItemsTable.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get(`https://backend-pos-tap.herokuapp.com/admin/sales/update-paid-status/${this.state.invoice_no}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    invoiceData: res.data.mainData,
                    soldItems: res.data.soldItems,
                    paidStatus: res.data.mainData.paid_status
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

    handleSelectChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleClickSubmit = (event) => {
        event.preventDefault()
        let token = sessionStorage.getItem('token')
        axios.post(`https://backend-pos-tap.herokuapp.com/admin/sales/update-paid-status/${this.state.invoice_no}`, { paidStatus: this.state.paidStatus }, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                alert(`Status pembayaran untuk nomor penjualan ${this.state.invoiceData.invoice_no} berhasil diubah menjadi ${this.state.paidStatus.toLowerCase()}.`)
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                alert(JSON.stringify(err.response))
                if(err.response.status == 422 && err.response.data == 'No data changed.'){
                    alert('Tidak ada perubahan status pembayaran. Gagal menyimpan.')
                }
                else if (err.response.status === 403) {
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

    soldItemsTable = (soldItems_arr) => {
        const iterateItem = (items) => {
            return items.map((item, i) => {
                return (
                    <tr key={i}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i + 1}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0' }}>{item.product_code}</td>
                        <td style={{ border: '1px double black', width: '14%', textAlign: 'center', padding: '0' }}>{item.product_name}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.sold_qty}</td>
                        <td style={{ border: '1px double black', width: '14%', textAlign: 'center', padding: '0' }}>{item.unit_price}</td>
                        <td style={{ border: '1px double black', width: '16%', textAlign: 'center', padding: '0' }}>{item.total_unit_price}</td>

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
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '14%', textAlign: 'center', padding: '0' }}>Nama Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Kuantitas</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '14%', textAlign: 'center', padding: '0' }}>Harga Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '16%', textAlign: 'center', padding: '0' }}>Total Harga Barang</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(soldItems_arr)}
                </tbody>
            </table>
        )
    }

    render() {
        let inputStyle = { color: 'black', width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/sales/sales-list' />)
        }

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
                        <h5>Ubah Status Pembayaran</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row'>
                        <div className='container col-5' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>No. Penjualan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='invoiceNo' value={this.state.invoiceData.invoice_no} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Tanggal Penjualan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='invoiceDate' value={this.state.invoiceData.invoice_date} style={inputStyle} disabled={true} />
                                </div>
                            </div>

                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Nama Pelanggan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='custCodeName' value={`${this.state.invoiceData.cust_code} - ${this.state.invoiceData.cust_name}`} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>No. PO Pelanggan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='custPONum' value={this.state.invoiceData.cust_po} style={inputStyle} disabled={true} />
                                </div>
                            </div>


                        </div>

                        <div className='container col-7' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Total Penjualan</label>
                                </div>
                                <div className='col-5'>
                                    <input type='text' name='invoiceTotal' value={this.state.invoiceData.invoice_total} style={inputStyle} disabled={true} />
                                </div>
                                <div className='col-3 text-center'>
                                    <input type='submit' value='Simpan' onClick={this.handleClickSubmit} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Dasar Pengenaan Pajak</label>
                                </div>
                                <div className='col-5'>
                                    <input type='text' name='DPP' value={this.state.invoiceData.sales_total} style={inputStyle} disabled={true} />
                                </div>
                                <div className='col-3 text-center'>
                                    <Link to='/sales/sales-list'>
                                        <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                                    </Link>
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>PPN</label>
                                </div>
                                <div className='col-5'>
                                    <input type='text' name='tax' value={this.state.invoiceData.tax} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Status Pembayaran</label>
                                </div>
                                <div className='col-5'>
                                    <select name='paidStatus' value={this.state.paidStatus} onChange={this.handleSelectChange} style={inputStyle}>
                                        <option value='Lunas'>Lunas</option>
                                        <option value='Belum lunas'>Belum lunas</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='container col-5' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Benefit</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='benefitName' value={this.state.invoiceData.cust_benefit_name} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Diskon Benefit</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='benefitDisc' value={`${this.state.invoiceData.cust_benefit_disc}%`} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Catatan</label>
                                </div>
                                <div className='col-7'>
                                    <textarea type='text' name='remarks' value={this.state.invoiceData.sales_remarks} style={{ width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', minHeight: '15vh', color: 'black' }} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Dibuat Oleh</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='createdBy' value={this.state.invoiceData.created_by} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Dibuat pada</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='createdAt' value={this.state.invoiceData.created_at} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Terakhir Diubah Oleh</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='paidStatusLastUpdateBy' value={this.state.invoiceData.paidstatus_last_updated_by} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Terakhir Diubah pada</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='paidStatusLastUpdateAt' value={this.state.invoiceData.paidstatus_last_updated_at} style={inputStyle} disabled={true} />
                                </div>
                            </div>

                        </div>

                        <div className='container col-7' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-12'>
                                    <label style={{ textDecoration: 'underline', fontWeight: '500' }}>Daftar Barang</label>
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                {this.soldItemsTable(this.state.soldItems)}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SalesUpdatePaymentStatus