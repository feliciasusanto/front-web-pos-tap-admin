import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class CustomersAddNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = { custCode: ' ', password: '', confirmPassword: '', custName: ' ', taxId: ' ', billToAddress: ' ', shipToAddress: ' ', phone: ' ', email: ' ', ctcPersonName: ' ', ctcPersonPhone: ' ', ctcPersonEmail: ' ', remarks: ' ', redirect: false, redirectDashboard: false }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/customers/list', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    custs: res.data
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert('Anda tidak memiliki akses untuk bagian ini.')
                    this.setState({
                        redirectDashboard: true
                    })
                }
                else {
                    alert(JSON.stringify(err.response))
                }
            })
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleClickSubmit = (event) => {
        event.preventDefault()

        if (this.state.taxId === '') {
            this.setState({
                taxId: '00.000.000.0-000.000'
            })
        }
        else if (this.state.custCode.trim().length < 5 || this.state.custCode.trim().length > 8) {
            alert('Kode pelanggan harus terdiri dari 5-8 karakter.')
        }
        else if (this.state.custName.trim().length === 0) {
            alert('Harap mengisi kolom nama pelanggan.')
        }
        else if (this.state.taxId.trim().length != 20) {
            alert('Nomor NPWP salah. Harap diperiksa kembali.')
        }
        else if (this.state.billToAddress.trim().length === 0) {
            alert('Harap mengisi alamat penagihan sesuai NPWP.')
        }
        else if (this.state.shipToAddress.trim().length === 0) {
            alert('Harap mengisi alamat pengiriman.')
        }
        else if (this.state.phone.trim().length === 0) {
            alert('Harap mengisi kolom nomor telepon pelanggan.')
        }
        else if (this.state.phone.trim().length < 7) {
            alert('Nomor telepon yang dimasukkan salah. Harap diperiksa kembali.')
        }
        else if (this.state.ctcPersonName.trim().length === 0) {
            alert('Harap mengisi kolom contact person.')
        }
        else if (this.state.ctcPersonPhone.trim().length > 0 && this.state.ctcPersonPhone.trim().length < 7) {
            alert('Nomor telepon contact person yang dimasukkan salah. Harap diperiksa kembali.')
        }
        else if (this.state.password !== this.state.confirmPassword) {
            alert('Kata sandi harus sama dengan konfirmasi kata sandi.')
        }
        else if (this.state.password.length < 8) {
            alert('Kata sandi harus terdiri dari 8 atau lebih karakter.')
        }
        else {
            let token = sessionStorage.getItem('token')
            axios.post('https://backend-pos-tap.herokuapp.com/admin/customers/add-new', {custCode: this.state.custCode.toUpperCase(), password: this.state.password, confirmPassword: this.state.confirmPassword, custName: this.state.custName, taxId: this.state.taxId, billToAddress: this.state.billToAddress, shipToAddress: this.state.shipToAddress, phone: this.state.phone, email: this.state.email, ctcPersonName: this.state.ctcPersonName, ctcPersonPhone:this.state.ctcPersonPhone, ctcPersonEmail: this.state.ctcPersonEmail, remarks: this.state.remarks}, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                if(res.data === 'Customer code existed.'){
                    alert(`Kode pelanggan ${this.state.custCode.trim().toUpperCase()} sudah terdaftar sebelumnya.`)
                }
                else{
                    alert('Data pelanggan baru berhasil disimpan.')
                    this.setState({
                        redirect: true
                    })
                }
            })
            .catch((err) => {
                alert(JSON.stringify(err))
            })
        }
    }

    render() {
        let inputStyle = { background: 'lightgrey', border: 'none', borderRadius: '5px', width: '75%' }

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
                        <h5>Tambah Pelanggan</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kode Pelanggan</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' name='custCode' value={this.state.custCode} tabIndex='1' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                        <div className='col-2'>
                            <label>Contact Person</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' name='ctcPersonName' value={this.state.ctcPersonName} tabIndex='8' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Nama Pelanggan</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' name='custName' value={this.state.custName} tabIndex='2' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                        <div className='col-2'>
                            <label>Telepon Contact Person</label>
                        </div>
                        <div className='col-4'>
                            <input type='tel' name='ctcPersonPhone' value={this.state.ctcPersonPhone} tabIndex='9' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>NPWP</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' name='taxId' value={this.state.taxId} tabIndex='3' onChange={this.handleInputChange} style={inputStyle} placeholder='00.000.000.0-000.000' />
                        </div>
                        <div className='col-2'>
                            <label>Email Contact Person</label>
                        </div>
                        <div className='col-4'>
                            <input type='email' name='ctcPersonEmail' value={this.state.ctcPersonEmail} tabIndex='10' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Alamat Penagihan</label>
                        </div>
                        <div className='col-4'>
                            <textarea name='billToAddress' value={this.state.billToAddress} tabIndex='4' onChange={this.handleInputChange} style={{ background: 'lightgrey', border: 'none', borderRadius: '5px', width: '75%', minHeight: '12vh' }} />
                        </div>
                        <div className='col-2'>
                            <label>Catatan</label>
                        </div>
                        <div className='col-4'>
                            <textarea type='text' name='remarks' value={this.state.remarks} tabIndex='11' onChange={this.handleInputChange} style={{ background: 'lightgrey', border: 'none', borderRadius: '5px', width: '75%', minHeight: '12vh' }} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Alamat Kirim</label>
                        </div>
                        <div className='col-4'>
                            <textarea name='shipToAddress' value={this.state.shipToAddress} tabIndex='5' onChange={this.handleInputChange} style={{ background: 'lightgrey', border: 'none', borderRadius: '5px', width: '75%', minHeight: '12vh' }} />
                        </div>
                        <div className='col-2'>
                            <label>Kata Sandi</label>
                            <br /><br />
                            <label>Ulangi Kata Sandi</label>
                        </div>
                        <div className='col-4'>
                            <input type='password' name='password' value={this.state.password} tabIndex='12' onChange={this.handleInputChange} style={inputStyle} />
                            <br /><br />
                            <input type='password' name='confirmPassword' value={this.state.confirmPassword} tabIndex='13' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Telepon</label>
                        </div>
                        <div className='col-4'>
                            <input type='tel' name='phone' value={this.state.phone} tabIndex='6' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Email</label>
                        </div>
                        <div className='col-4'>
                            <input type='email' name='email' value={this.state.email} tabIndex='7' onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '5vh 0 2vh 0' }}>
                        <div class='col-12 text-center'>
                            <input type='submit' value='Simpan' onClick={this.handleClickSubmit} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none', margin: '0 2.5vw' }} />
                            <Link to='/customers/customers-list'>
                                <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CustomersAddNew