import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class CustomersReadDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cust_id: parseInt(window.location.pathname.split('/')[3]), cust: {}, redirect: false, redirectDashboard: false }
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get(`https://backend-pos-tap.herokuapp.com/admin/customers/detail/${this.state.cust_id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    cust: res.data
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

    render() {
        let inputStyle = { color: 'black', background: 'lightgrey', border: 'none', borderRadius: '5px', width: '100%' }

        if (this.state.redirect == true) {
            return (<Navigate to='/customers/customers-list' />)
        }

        if (this.state.redirectDashboard == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Pelanggan</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Data Lengkap Pelanggan</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kode Pelanggan</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='custCode' value={this.state.cust.code} tabIndex='1' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Contact Person</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='ctcPersonName' value={this.state.cust.ctcperson} tabIndex='8' onChange={this.handleInputChange} style={inputStyle} disabled={true} />

                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Nama Pelanggan</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='custName' value={this.state.cust.name} tabIndex='2' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Telepon Contact Person</label>
                        </div>
                        <div className='col-3'>
                            <input type='tel' name='ctcPersonPhone' value={this.state.cust.ctcperson_phone} tabIndex='9' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <Link to='/customers/customers-list' className='col-1' style={{ display: 'inline-block' }}>
                            <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                        </Link>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>NPWP</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='taxId' value={this.state.cust.taxid} tabIndex='3' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Email Contact Person</label>
                        </div>
                        <div className='col-3'>
                            <input type='email' name='ctcPersonEmail' value={this.state.cust.ctcperson_email} tabIndex='10' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Alamat Penagihan</label>
                        </div>
                        <div className='col-3'>
                            <textarea name='billToAddress' value={this.state.cust.bill_to_address} tabIndex='4' onChange={this.handleInputChange} style={{ color: 'black', background: 'lightgrey', border: 'none', borderRadius: '5px', width: '100%', minHeight: '12vh' }} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Catatan</label>
                        </div>
                        <div className='col-3'>
                            <textarea type='text' name='remarks' value={this.state.cust.remarks} tabIndex='11' onChange={this.handleInputChange} style={{ color: 'black', background: 'lightgrey', border: 'none', borderRadius: '5px', width: '100%', minHeight: '12vh' }} disabled={true} />
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Alamat Kirim</label>
                        </div>
                        <div className='col-3'>
                            <textarea name='shipToAddress' value={this.state.cust.ship_to_address} tabIndex='5' onChange={this.handleInputChange} style={{ color: 'black', background: 'lightgrey', border: 'none', borderRadius: '5px', width: '100%', minHeight: '12vh' }} disabled={true} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Telepon</label>
                        </div>
                        <div className='col-3'>
                            <input type='tel' name='phone' value={this.state.cust.phone} tabIndex='6' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Dibuat Oleh</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='createdBy' value={this.state.cust.created_by} tabIndex='9' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Email</label>
                        </div>
                        <div className='col-3'>
                            <input type='email' name='email' value={this.state.cust.email} tabIndex='7' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Dibuat pada</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='createdAt' value={this.state.cust.created_at} tabIndex='9' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Jumlah Poin/ Transaksi</label>
                        </div>
                        <div className='col-3'>
                            <input type='number' name='benefitPoint' value={this.state.cust.benefit_point} tabIndex='7' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Terakhir Diubah Oleh</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='lastUpdatedBy' value={this.state.cust.last_updated_by} tabIndex='9' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Benefit</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='benefitName' value={this.state.cust.benefit_name} tabIndex='7' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                        <div className='col-2'>
                            <label>Terakhir Diubah pada</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='lastUpdatedAt' value={this.state.cust.last_updated_at} tabIndex='9' onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                        <div className='col'></div>
                    </div>
                </form>
                <div className='row' style={{ height: '5vh' }}>
                    <div className='col'></div>
                </div>
            </div>
        )
    }
}

export default CustomersReadDetail