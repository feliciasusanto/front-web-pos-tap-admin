import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import ico_read from './../../assets/images/binoculars.png'
import ico_edit from './../../assets/images/edit.png'

class CustomersMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = { custs: [], redirectDashboard: false}
        this.custsListTable = this.custsListTable.bind(this)
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

    custsListTable = (custs_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <tr key={item.id}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i}</td>
                        <td style={{ border: '1px double black', width: '4%', textAlign: 'center', padding: '0' }}>{item.id}</td>
                        <td style={{ border: '1px double black', width: '15%', textAlign: 'center', padding: '0' }}>{item.code}</td>
                        <td style={{ border: '1px double black', width: '21%', textAlign: 'center', padding: '0' }}>{item.cust_name}</td>
                        <td style={{ border: '1px double black', width: '20%', textAlign: 'center', padding: '0' }}>{item.taxid}</td>
                        <td style={{ border: '1px double black', width: '29%', textAlign: 'center', padding: '0', whiteSpace: 'pre-line'}}>{item.bill_to_address}</td>
                        <td style={{ border: '1px double black', width: '15%', textAlign: 'center', padding: '0' }}>{item.phone}</td>
                        <td style={{ border: '1px double black', width: '12%', textAlign: 'center', padding: '0' }}>{item.benefit_name}</td>
                        <td style={{ border: '1px double black', width: '12%', textAlign: 'center' }}><Link to={`/customers/customer-details/${item.id}`} style={{display: 'inline-block', marginRight:'1vw'}}><img src={ico_read} alt='See' style={{ width: '4vh', height: '4vh'}} /></Link><Link to={`/customers/update-data/${item.id}`} style={{display: 'inline-block'}}><img src={ico_edit} alt='Edit' style={{ width: '4vh', height: '4vh' }} /></Link></td>
                    </tr>
                )
            })
        }
        return (
            <table className='col-12' style={{tableLayout: 'fixed'}}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '3%', textAlign: 'center', padding: '0' }}>#</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '4%', textAlign: 'center', padding: '0' }}>Id</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '15%', textAlign: 'center', padding: '0' }}>Kode Pelanggan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '21%', textAlign: 'center', padding: '0' }}>Nama Pelanggan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '20%', textAlign: 'center', padding: '0' }}>NPWP</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '29%', textAlign: 'center', padding: '0' }}>Alamat Penagihan</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '15%', textAlign: 'center', padding: '0' }}>Telepon</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '12%', textAlign: 'center', padding: '0' }}>Benefit</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '12%', textAlign: 'center', padding: '0' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(custs_arr)}
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
                        <h4>Pelanggan</h4>
                        <hr style={{ background: 'black' }} />
                    </div>
                    <div className='col-2'>
                        <Link to='/customers/add-new-customer' style={{ color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Tambah</Link>
                    </div>
                    <div className='col-12'>
                        <h5 style={{ marginTop: '3vh' }}>Daftar Pelanggan</h5>
                    </div>
                </div>
                {this.custsListTable(this.state.custs)}
                <div className='row' style={{ height: '5vh' }}></div>
            </div>
        )
    }
}

export default CustomersMain