import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ico_edit from './../../assets/images/edit.png'

class PointBenefitMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = { benefits: []}
        this.usersListTable = this.benefitListTable.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/point-benefits/list', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    benefits: res.data
                })
            })
    }

    benefitListTable = (users_arr) => {
        const iterateItem = (items) => {
            let i = 0
            return items.map((item) => {
                i++
                return (
                    <tr key={item.id}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i}</td>
                        <td style={{ border: '1px double black', width: '4%', textAlign: 'center', padding: '0' }}>{item.id}</td>
                        <td style={{ border: '1px double black', width: '9%', textAlign: 'center', padding: '0' }}>{item.name}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.minimum_point} transaksi</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.disc_percent}%</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.active_status}</td>
                        <td style={{ border: '1px double black', width: '4%', textAlign: 'center' }}><Link to={`/point-benefit/update-data/${item.id}`}><img src={ico_edit} alt='Edit' style={{ width: '4vh', height: '4vh' }} /></Link></td>
                    </tr>
                )
            })
        }
        return (
            <table className='col-8' style={{tableLayout: 'fixed'}}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '3%', textAlign: 'center', padding: '0' }}>#</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '4%', textAlign: 'center', padding: '0' }}>Id</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '9%', textAlign: 'center', padding: '0' }}>Nama Benefit</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Minimal Poin</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Diskon Benefit</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Status Aktif</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '4%', textAlign: 'center', padding: '0' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {iterateItem(users_arr)}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Point Benefit</h4>
                        <hr style={{ background: 'black' }} />
                    </div>
                    <div className='col-2'>
                        <Link to='/point-benefit/add-new-benefit' style={{ color: 'black', textDecoration: 'none', padding: '0.8vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }}>Tambah</Link>
                    </div>
                    <div className='col-12'>
                        <h5 style={{ marginTop: '3vh' }}>Daftar Benefit</h5>
                    </div>
                </div>
                {this.benefitListTable(this.state.benefits)}
                <div className='row' style={{ height: '5vh' }}></div>
            </div>
        )
    }
}

export default PointBenefitMain