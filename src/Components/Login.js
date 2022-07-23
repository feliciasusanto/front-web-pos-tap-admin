import React from 'react'
import logo from './../assets/images/logo-tap.png'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

let inputStyle = { border: 'none', textAlign: 'center', padding: '1vh 3vh', width: '65%', borderRadius: '10px', margin: '1vh 0' }

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', redirect: false }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/token-validation', { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => {
            if(res.data.username !== ''){
                this.setState({
                    redirect: true
                })
            }
        })
        .catch((err) => {})
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        if (this.state.username.trim() !== '' && this.state.password !== '') {
            axios.post('https://backend-pos-tap.herokuapp.com/admin/login', { username: this.state.username, password: this.state.password })
                .then((res) => {
                    sessionStorage.setItem('token', res.data.token)
                    this.setState({
                        redirect: true
                    })
                })
                .catch((err => {
                    alert('Login Gagal. Harap periksa kembali username dan kata sandi.')
                }))
        }
        else{
            alert('Harap mengisi username dan kata sandi.')
        }
    }

    render() {
        if (this.state.redirect == true) {
            return (<Navigate to='/dashboard' />)
        }
        return (
            <div className='container-fluid' style={{ background: 'linear-gradient(146deg, rgba(163,247,127,0.5) 12%, rgba(103, 133, 246,0.5) 100%)', witdh: '100vw',height: '100vh', verticalAlign: 'middle' }}>
                <div className='row' style={{ verticalAlign: 'center', padding: '10vh 15vw' }}>
                    <div className='col'></div>
                    <div className='col-7' style={{ textAlign: 'center', padding: '3.5vh 0', background: 'rgba(89, 123, 245, 10%)', borderRadius: '10px' }} >
                        <h1 style={{ fontSize: '4vh' }}>POS PT. Teknologi Air Perkasa</h1>
                        <img src={logo} style={{ width: '30vh', height: '30vh' }} alt='logo-tap' />
                        <h2 style={{ fontSize: '3.8vh', marginTop: '2vh' }}>Administrator Login</h2>
                        <form>
                            <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} placeholder='Username' style={inputStyle} /><br />
                            <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder='Kata Sandi' style={inputStyle} /><br />
                            <input type='submit' value='Log In' onClick={this.handleClick} style={{ border: 'none', backgroundColor: '#2DDF3E', padding: '0.7vh 1.5vw', borderRadius: '5px', marginTop: '2.5vh' }} />
                        </form>
                    </div>
                    <div className='col'></div>
                </div>
            </div>
        )
    }
}

export default Login