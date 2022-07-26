import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import ico_edit from './../../assets/images/edit.png'

class EmployeesMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = { roles: [], users: [], redirect: false, redirectDashboard: false }
        this.roleListTable = this.roleListTable.bind(this)
        this.usersListTable = this.usersListTable.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/users/user_roles', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    roles: res.data
                })
            })
            .catch((err)=>{
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

        axios.get('https://backend-pos-tap.herokuapp.com/admin/users/users_list', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    users: res.data
                })
            })
    }

    roleListTable = (role_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <tr key={item.id} style={{ border: '1px solid black' }}>
                        <td style={{ border: '1px solid black', width: '15%', textAlign: 'center', padding: '0 1vw' }}>{i}</td>
                        <td style={{ border: '1px solid black', width: '25%', textAlign: 'center', padding: '0 1vw' }}>{item.id}</td>
                        <td style={{ border: '1px solid black', width: '50%', padding: '0 1vw' }}>{item.role_name}</td>
                    </tr>
                )
            })
        }
        return (
            <table style={{ margin: '0 0 6vh 0' }}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '15%', textAlign: 'center', padding: '0 1vw' }}>#</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '25%', textAlign: 'center', padding: '0 1vw' }}>Id</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '50%', textAlign: 'center', padding: '0 1vw' }}>Nama Peran</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(role_arr)}
                </tbody>
            </table>
        )
    }

    usersListTable = (users_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <tr key={item.id}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i}</td>
                        <td style={{ border: '1px double black', width: '4%', textAlign: 'center', padding: '0' }}>{item.id}</td>
                        <td style={{ border: '1px double black', width: '9%', textAlign: 'center', padding: '0' }}>{item.username}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.role_name}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.active_status}</td>
                        <td style={{ border: '1px double black', width: '11%', textAlign: 'center', padding: '0' }}>{item.last_login}</td>
                        <td style={{ border: '1px double black', width: '11%', textAlign: 'center', padding: '0' }}>{item.last_password_change}</td>
                        <td style={{ border: '1px double black', width: '4%', textAlign: 'center' }}><Link to={`/employees/update-data/${item.id}`}><img src={ico_edit} alt='Edit' style={{ width: '4vh', height: '4vh' }} /></Link></td>
                    </tr>
                )
            })
        }
        return (
            <table style={{tableLayout: 'fixed'}}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th className='col-1' style={{ border: '1px double black', fontWeight: 'normal', width: '3%', textAlign: 'center', padding: '0' }}>#</th>
                        <th className='col-1' style={{ border: '1px double black', fontWeight: 'normal', width: '4%', textAlign: 'center', padding: '0' }}>Id</th>
                        <th className='col-1' style={{ border: '1px double black', fontWeight: 'normal', width: '9%', textAlign: 'center', padding: '0' }}>Username</th>
                        <th className='col-1' style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Peran</th>
                        <th className='col-1' style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Status Aktif</th>
                        <th className='col-3' style={{ border: '1px double black', fontWeight: 'normal', width: '11%', textAlign: 'center', padding: '0' }}>Login Terakhir</th>
                        <th className='col-3' style={{ border: '1px double black', fontWeight: 'normal', width: '11%', textAlign: 'center', padding: '0' }}>Ganti Password Terakhir</th>
                        <th className='col-1' style={{ border: '1px double black', fontWeight: 'normal', width: '4%', textAlign: 'center', padding: '0' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(users_arr)}
                </tbody>
            </table>
        )
    }

    render() {
        
        if (this.state.redirect == true) {
            return (<Navigate to='/dashboard' />)
        }

        if (this.state.redirectDashboard == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Peran</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Daftar Peran</h5>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        {this.roleListTable(this.state.roles)}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Karyawan</h4>
                        <hr style={{ background: 'black' }} />
                    </div>
                    <div className='col-2'>
                        <Link to='/employees/add-new-employee' style={{ color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Tambah</Link>
                    </div>
                    <div className='col-12'>
                        <h5 style={{ marginTop: '3vh' }}>Daftar Karyawan</h5>
                    </div>
                </div>
                {this.usersListTable(this.state.users)}
                <div className='row' style={{ height: '5vh' }}></div>
            </div>
        )
    }
}

export default EmployeesMain