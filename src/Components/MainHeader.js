import React from 'react'
import logo from './../assets/images/logo-tap.png'
import { Link, Navigate} from 'react-router-dom'
import axios from 'axios'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', today_date: '', isLoading: true, redirect: false}
        this.onLogoutClicked = this.onLogoutClicked.bind(this)
    }

    componentDidMount(){
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/get-profile', {headers: {'Authorization' : `Bearer ${token}`}})
        .then((res) => {
            this.setState({
                username : res.data.username,
                today_date: res.data.current_date,
                isLoading: false
            })
        })
    }

    onLogoutClicked = (event) => {
        sessionStorage.clear()
        this.setState({
            redirect: true
        })
    }

    render() {
        const {isLoading, username, today_date} = this.state 
        if(isLoading){
            <div className='row fixed-top' style={{ background: '#C8F6A4', height: '8vh', verticalAlign: 'middle', top: 0 }}>
                <div className='col-3'>
                    <Link to='/dashboard'>
                        <img src={logo} alt='logo-tap' style={{ height: '7vh', width: '7vh', display: 'inline-block', verticalAlign: 'middle', margin: '0' }} />
                        <h1 style={{ color: 'black', fontSize: '3.5vh', display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>POS TAP</h1>
                    </Link>
                </div>
                <div className='col'><br /></div>
                <div className='col-5 dropdown' style={{ textAlign: 'right', verticalAlign: 'middle', height: '8vh' }} ></div>
            </div>
        }

        if (this.state.redirect == true) {
            return (<Navigate to='/login' />)
        }

        return (
            <div className='row fixed-top' style={{ background: '#C8F6A4', height: '8vh', verticalAlign: 'middle', top: 0 }}>
                <div className='col-3'>
                    <Link to='/dashboard'>
                        <img src={logo} alt='logo-tap' style={{ height: '7vh', width: '7vh', display: 'inline-block', verticalAlign: 'middle', margin: '0' }} />
                        <h1 style={{ color: 'black', fontSize: '3.5vh', display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>POS TAP</h1>
                    </Link>
                </div>
                <div className='col'><br /></div>
                <div className='col-5 dropdown' style={{ textAlign: 'right', verticalAlign: 'middle', height: '8vh' }} >
                    <button style={{ background: 'none', border: '1px none' }} data-bs-toggle='dropdown' aria-expanded='false'>
                        <p style={{ display: 'inline-block', textAlign: 'right', verticalAlign: 'middle', margin: '0 0 0 1vw' }}><span style={{ fontWeight: 'bold' }}>{username}</span><br />{today_date}</p>
                        <div style={{ display: 'inline-block', textAlign: 'right', verticalAlign: 'middle', margin: '0 0 0 5px' }}>
                            <div style={{ display: 'inline-block', textAlign: 'center', height: '7vh', width: '7vh', margin: '0', verticalAlign: 'middle', borderRadius: '100px', background: 'white' }}>
                                <p style={{ lineHeight: '7vh', fontSize: '4vh', fontWeight: 'normal' }}>{username[0]}</p>
                            </div>
                        </div>
                    </button>
                    <ul className='dropdown-menu'>
                        <li><Link to='/change-password' className='dropdown-item'>Ubah kata sandi</Link></li>
                        <li><a className='dropdown-item' onClick={this.onLogoutClicked} >Keluar</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header