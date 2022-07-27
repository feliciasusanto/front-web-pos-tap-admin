import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class SalesReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = { invoice_no: window.location.pathname.split('/')[3], startDate: '', endDate: '', redirect: false, redirectDashboard: false }
        this.handleInputStartChange = this.handleInputStartChange.bind(this)
        this.handleInputEndDate = this.handleInputEndDate.bind(this)
    }

    componentDidMount() {
        const date = new Date(Date.now())
        date.setHours(date.getHours() + 7)
        this.setState({
            startDate: date.toISOString().split('T')[0],
            endDate: date.toISOString().split('T')[0]
        })
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/check-role-access-valid/superuser-sales', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {

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

    handleInputStartChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        let today = new Date(Date.now())
        today.setHours(today.getHours() + 7)
        let start = new Date(value)
        if(start > today){
            alert('Kolom dari tanggal tidak boleh lebih besar daripada tanggal hari ini.')
        }
        else{
            this.setState({
                [name]: value
            })
        }
    }

    handleInputEndDate = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        let today = new Date(Date.now())
        today.setHours(today.getHours() + 7)
        let end = new Date(value)
        let start = new Date(this.state.startDate)
        if(end > today){
            alert('Kolom hingga tanggal tidak boleh lebih besar daripada tanggal hari ini.')
        }
        else if(end < start){
            alert('Kolom hingga tanggal tidak boleh lebih kecil daripada kolom dari tanggal.')
        }
        else{
            this.setState({
                [name]: value
            })
        }
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
                        <h5>Laporan Penjualan</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form action='https://backend-pos-tap.herokuapp.com/admin/sales/sales-report' method='post'>
                    <div className='row'>
                        <div className='container col-5' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <input type='hidden' name='token' value={sessionStorage.getItem('token')} />
                                <div className='col-4'>
                                    <label>Dari tanggal</label>
                                </div>
                                <div className='col-7'>
                                    <input type='date' name='startDate' value={this.state.startDate} onChange={this.handleInputStartChange} style={inputStyle} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Hingga tanggal</label>
                                </div>
                                <div className='col-7'>
                                    <input type='date' name='endDate' value={this.state.endDate} onChange={this.handleInputEndDate} style={inputStyle} />
                                </div>
                            </div>

                            <div className='row' style={{ height: '3vh' }}></div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col'></div>
                                <div className='col-3 text-center'>
                                    <input type='submit' value='Export' style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                                </div>
                                <div className='col-3 text-center'>
                                    <Link to='/sales/sales-list'>
                                        <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                                    </Link>
                                </div>
                                <div className='col'></div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default SalesReport