import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

class EmployeesUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user_id: parseInt(window.location.pathname.split('/')[3]), roles: [], username: '', password: '', confirmPassword: '', role: 'Superuser', activeStatus: 'Aktif', redirect: false, redirectDashboard: false }
        this.roleListCombo = this.roleListCombo.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        // load role list
        axios.get('https://backend-pos-tap.herokuapp.com/admin/users/user_roles', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    roles: res.data,
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
        // load previous user data 
        axios.get(`https://backend-pos-tap.herokuapp.com/admin/users/update-data/${this.state.user_id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                    this.setState({
                        username: res.data[0].username,
                        password: res.data[0].password,
                        confirmPassword: res.data[0].password,
                        role: res.data[0].role_name,
                        activeStatus: res.data[0].active_status
                    })
                }
            )
            .catch((err) =>{
                if (err.response.status == 403) {
                    alert('Tidak dapat mengubah data dari pengguna anda sendiri.')
                    this.setState({
                        redirect: true
                    })
                }
                else{
                    alert(JSON.stringify(err))
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
        if (this.state.username.trim().length < 5 || this.state.username.trim().length > 10) {
            alert('Username harus terdiri dari 5-10 karakter.')
        }
        else if (this.state.password !== this.state.confirmPassword) {
            alert('Kata sandi harus sama dengan konfirmasi kata sandi.')
        }
        else if (this.state.password.length < 8) {
            alert('Kata sandi harus terdiri dari 8 atau lebih karakter.')
        }
        else if (this.state.role === '') {
            alert('Mohon melakukan pemilihan peran.')
        }
        else if (this.state.activeStatus === '') {
            alert('Mohon melakukan pemilihan status keaktifan.')
        }
        else {
            axios.post(`https://backend-pos-tap.herokuapp.com/admin/users/update-data/${this.state.user_id}`, { username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: this.state.role, activeStatus: this.state.activeStatus }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    if (res.data === 'Username existed.') {
                        alert('Sudah terdapat pengguna/ karyawan dengan username tersebut.')
                    }
                    else if (res.data === 'OK'){
                        alert('Data pengguna/ karyawan berhasil diubah.')
                        this.setState({redirect: true})
                    }
                })
                .catch((err) => {
                    if (err.response.data === 'Username existed.') {
                        alert('Username tidak boleh sama dengan yang sudah terdaftar sebelumnya.')
                    }
                    else {
                        alert(JSON.stringify(err.response))
                    }
                })
        }
    }

    roleListCombo = (role_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <option value={item.role_name}>{item.role_name}</option>
                )
            })
        }
        return (
            <select name='role' value={this.state.role} onChange={this.handleSelectChange} style={{ width: '50%', background: 'lightgrey', border: 'none', borderRadius: '5px', padding: '0.3vh 0' }}>
                {iterateItem(role_arr)}
            </select>
        )
    }

    render() {
        let inputStyle = { background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/employees/roles-employees-list' />)
        }

        if (this.state.redirectDashboard == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Karyawan</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Ubah Data Karyawan</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Username</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kata sandi baru</label>
                        </div>
                        <div className='col-4'>
                            <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 0 0' }}>
                        <div className='col-2'>
                            <label>Konfirmasi kata sandi baru</label>
                        </div>
                        <div className='col-4'>
                            <input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 0 0' }}>
                        <div className='col-6'>
                            <p style={{ color: 'red', fontSize: '1vw' }}>Harap untuk tidak mengubah isi dari kolom kata sandi baru dan konfirmasi kata sandi baru jika tidak ingin melakukan reset/ ubah kata sandi secara paksa.</p>
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Peran</label>
                        </div>
                        <div className='col-4'>
                            {this.roleListCombo(this.state.roles)}
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Status aktif</label>
                        </div>
                        <div className='col-4'>
                            <select name='activeStatus' value={this.state.activeStatus} onChange={this.handleSelectChange} style={{ width: '50%', background: 'lightgrey', border: 'none', borderRadius: '5px', padding: '0.3vh 0' }}>
                                <option value='Aktif'>Aktif</option>
                                <option value='Tidak aktif'>Tidak aktif</option>
                            </select>
                        </div>
                    </div>

                    <div className='row' style={{ margin: '5vh 0 2vh 0' }}>
                        <div className='col-2 text-center'>
                            <input type='submit' value='Simpan' onClick={this.handleClickSubmit} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                        </div>
                        <div className='col-2 text-center'>
                            <Link to='/employees/roles-employees-list'>
                                <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EmployeesUpdate