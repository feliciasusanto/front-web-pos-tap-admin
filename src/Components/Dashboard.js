import React from 'react'
import axios from 'axios'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = { daily: '', monthly: '', yearly: ''}
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    daily: res.data.daily,
                    monthly: res.data.monthly,
                    yearly: res.data.yearly
                })
            })
    }

    render() {
        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '2vh' }}></div>
                <div className='row cards' style={{ textAlign: 'center' }}>
                    <div className='col'></div>
                    <div className='col-3' style={{ background: '#E0FDF3', padding: '2vw 2vh', borderRadius: '10px' }}>
                        <p style={{fontWeight: '600'}}>Total Penjualan Hari ini</p>
                        <p style={{ fontWeight: 'bold', fontSize: '3vh' }}>{this.state.daily}</p>
                    </div>
                    <div className='col'></div>
                    <div className='col-3' style={{ background: '#FFF8BD', padding: '2vw 2vh', borderRadius: '10px' }}>
                        <p style={{fontWeight: '600'}}>Total Penjualan Bulan ini</p>
                        <p style={{ fontWeight: 'bold', fontSize: '3vh' }} >{this.state.monthly}</p>
                    </div>
                    <div className='col'></div>
                    <div className='col-3' style={{ background: '#FFD9BD', padding: '2vw 2vh', borderRadius: '10px' }}>
                        <p style={{fontWeight: '600'}}>Total Penjualan Tahun ini</p>
                        <p style={{ fontWeight: 'bold', fontSize: '3vh' }}>{this.state.yearly}</p>
                    </div>
                    <div className='col'></div>
                </div>
            </div>

        )
    }
}

export default Dashboard