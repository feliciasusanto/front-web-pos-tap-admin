import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state = { oldPassword: '', newPassword: '', confirmNewPassword: '', redirect: false }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if(this.state.oldPassword === ''){
            alert('Harap mengisi kolom kata sandi lama.')
        }
        else if(this.state.newPassword === ''){
            alert('Harap mengisi kolom kata sandi baru.')
        }
        else if (this.state.newPassword.length < 8) {
            alert('Kata sandi baru harus terdiri dari 8 atau lebih karakter.')
        }
        else if (this.state.confirmNewPassword !== this.state.newPassword) {
            alert('Kata sandi baru harus sama dengan konfirmasi kata sandi.')
        }
        else {
            let token = sessionStorage.getItem('token')
            axios.post('https://backend-pos-tap.herokuapp.com/admin/change-password', { oldPassword: this.state.oldPassword, newPassword: this.state.newPassword, confirmNewPassword: this.state.confirmNewPassword }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    // alert(JSON.stringify(res))
                    alert('Kata sandi baru berhasil disimpan.')
                    this.setState({
                        redirect: true
                    })
                })
                .catch((err) => {
                    if (err.response.data === 'Existing password does not match.') {
                        alert('Kata sandi lama anda salah. Harap diperiksa kembali.')
                    }
                    else if (err.response.data === 'New password should must not be the same as old password.') {
                        alert('Kata sandi baru tidak boleh sama dengan kata sandi lama.')
                    }
                    else {
                        alert(JSON.stringify(err.response))
                    }
                })
        }

    }

    render() {
        let inputStyle = { background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Pengguna</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Ubah Kata Sandi</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kata sandi lama</label>
                        </div>
                        <div className='col-4'>
                            <input type='password' name='oldPassword' value={this.state.oldPassword} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kata sandi baru</label>
                        </div>
                        <div className='col-4'>
                            <input type='password' name='newPassword' value={this.state.newPassword} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Konfirmasi kata sandi baru</label>
                        </div>
                        <div className='col-4'>
                            <input type='password' name='confirmNewPassword' value={this.state.confirmNewPassword} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '5vh 0 2vh 0' }}>
                        <div className='col-2 text-center'>
                            <input type='submit' value='Simpan' onClick={this.handleSubmit} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                        </div>
                        <div className='col-2 text-center'>
                            <Link to='/dashboard'>
                                <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangePass