import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

class PointBenefitUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = { benefit_id: parseInt(window.location.pathname.split('/')[3]), benefitName: '', minPoint: '', discountBenefit: '', activeStatus: 'Aktif', redirect: false, redirectDashboard: false }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        // load previous data 
        axios.get(`https://backend-pos-tap.herokuapp.com/admin/point-benefits/update-benefit/${this.state.benefit_id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                this.setState({
                    benefitName: res.data[0].name,
                    minPoint: (res.data[0].minimum_point).toString(),
                    discountBenefit: res.data[0].disc_percent,
                    activeStatus: res.data[0].active_status
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
            axios.post(`https://backend-pos-tap.herokuapp.com/admin/point-benefits/update-benefit/${this.state.benefit_id}`, { benefitName: this.state.benefitName, minPoint: parseInt(this.state.minPoint), discountBenefit: parseFloat(this.state.discountBenefit), activeStatus: this.state.activeStatus }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((res) => {
                    if(res.data === 'Benefit name existed.'){
                        alert(`Nama benefit ${this.state.benefitName} sudah terdaftar sebelumnya.`)
                    }
                    else if(res.data === 'Minimum point existed.'){
                        alert(`Benefit dengan minimal poin ${parseInt(this.state.minPoint)} sudah terdaftar sebelumnya.`)
                    }
                    else if(res.data === 'Discount existed.'){
                        alert(`Benefit dengan diskon benefit ${parseFloat(this.state.discountBenefit)}% sudah terdaftar sebelumnya.`)
                    }
                    else{
                        alert(`Benefit dengan nama ${this.state.benefitName} berhasil diubah.`)
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

    render() {
        let inputStyle = { background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/point-benefit/point-benefit-list' />)
        }

        if (this.state.redirectDashboard == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Point Benefit</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Ubah Benefit</h5>
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

export default PointBenefitUpdate