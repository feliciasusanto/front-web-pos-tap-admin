import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class PointBenefitAddNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = { benefitName: '', minPoint: '', discountBenefit: '', activeStatus: 'Aktif', redirect: false }
        this.roleListCombo = this.roleListCombo.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        
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
        if(this.state.benefitName.trim().length === 0){
            alert('Harap mengisi nama benefit.')
        }
        else if(this.state.benefitName.trim().length > 10){
            alert('Nama benefit tidak boleh melebihi 10 karakter.')
        }
        else if(this.state.minPoint.trim().length === 0){
            alert('Harap mengisi minimum poin atau transaksi.')
        }
        else if(this.state.discountBenefit.trim().length === 0){
            alert('Harap mengisi diskon benefit (dalam satuan persen).')
        }
        else{
            let token = sessionStorage.getItem('token')
            axios.post('https://backend-pos-tap.herokuapp.com/admin/point-benefits/add-new', { benefitName: this.state.benefitName, minPoint: parseInt(this.state.minPoint), discountBenefit: parseFloat(this.state.discountBenefit), activeStatus: this.state.activeStatus }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    if(res.data === 'Benefit name has been registered previously.'){
                        alert(`Nama benefit ${this.state.benefitName} sudah terdaftar sebelumnya.`)
                    }
                    else if(res.data === 'Minimum point value existed.'){
                        alert(`Benefit dengan minimal poin ${parseInt(this.state.minPoint)} sudah terdaftar sebelumnya.`)
                    }
                    else if(res.data === 'Discount value existed.'){
                        alert(`Benefit dengan diskon benefit ${parseFloat(this.state.discountBenefit)}% sudah terdaftar sebelumnya.`)
                    }
                    else{
                        alert(`Benefit dengan nama ${this.state.benefitName} berhasil disimpan.`)
                        this.setState({
                            redirect : true
                        })
                    }
                })
                .catch((err) => {
                    alert(JSON.stringify(err))
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
            <select name='role' onChange={this.handleSelectChange} style={{ width: '50%', background: 'lightgrey', border: 'none', borderRadius: '5px', padding: '0.3vh 0' }}>
                {iterateItem(role_arr)}
            </select>
        )
    }

    render() {
        let inputStyle = { background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/point-benefit/point-benefit-list' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Point Benefit</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Tambah Benefit</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Nama Benefit</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' name='benefitName' value={this.state.benefitName} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Minimal poin/ transaksi</label>
                        </div>
                        <div className='col-4'>
                            <input type='number' step='5' min='0' name='minPoint' value={this.state.minPoint} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Diskon Benefit (%)</label>
                        </div>
                        <div className='col-4'>
                            <input type='number' step='0.01' min='0.00' name='discountBenefit' value={this.state.discountBenefit} onChange={this.handleInputChange} style={inputStyle} />
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
                            <Link to='/point-benefit/point-benefit-list'>
                                <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PointBenefitAddNew