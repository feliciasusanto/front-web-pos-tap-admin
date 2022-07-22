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
        axios.post('https://backend-pos-tap.herokuapp.com/admin/login', { username: this.state.username, password: this.state.password })
        .then((res) => {
            alert(res.data.token)
            
        })
        .catch((err=>{
            alert(err.response.status)
        }))
        // let valid = true
        // if (this.state.username.length < 5 || this.state.username.length > 10) {
        //     alert('Username harus terdiri dari 5-10 karakter.')
        //     valid = false
        // }
        // else if (this.state.password.length < 8) {
        //     alert('Kata sandi harus terdiri dari 8 atau lebih karakter.')
        //     valid = false
        // }
        // else if (this.state.password != this.state.retype_pass) {
        //     alert('Kata sandi harus sama dengan konfirmasi kata sandi.')
        //     valid = false
        // }
        // else {
        //     axios.post('https://backend-pos-tap.herokuapp.com/admin/register', { username: this.state.username, password: this.state.password })
        //         .then((resp) => {
        //             if (resp.data === '' && resp.status == 200) {
        //                 this.setState({
        //                     redirect: true
        //                 })
        //             }
        //         })
        //         .catch((err) => {
        //             if (err.response.status == 401) {
        //                 alert('Sudah ada pengguna yang sudah terdaftar. Harap hubungi administrator untuk menambahkan pengguna baru.')
        //                 this.setState({
        //                     redirect: true
        //                 })
        //             }
        //         })
        // }
    }

    render() {
        // if (this.state.redirect == true) {
        //     return (<Navigate to='/login' />)
        // }
        return (
            <div className='container-fluid' style={{ background: 'linear-gradient(146deg, rgba(163,247,127,0.5) 12%, rgba(103, 133, 246,0.5) 100%)', height: '100vh', verticalAlign: 'middle' }}>
                <div className='row' style={{ verticalAlign: 'center', padding: '10vh 20vh' }}>
                    <div className='col'></div>
                    <div className='col-7' style={{ textAlign: 'center', padding: '3.5vh 0', background: 'rgba(89, 123, 245, 10%)', borderRadius: '10px' }} >
                        <h1 style={{ fontSize: '4.5vh' }}>POS PT. Teknologi Air Perkasa</h1>
                        <img src={logo} style={{ width: '30vh', height: '30vh' }} alt='logo-tap' />
                        <h2 style={{ fontSize: '4vh', marginTop: '2vh' }}>Administrator Login</h2>
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