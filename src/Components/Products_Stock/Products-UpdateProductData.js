import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class ProductUpdateData extends React.Component {
    constructor(props) {
        super(props)
        this.state = { product_code: window.location.pathname.split('/')[3], item: {}, itemCode: '', itemName: '', itemBrand: '', itemSupplier: '', itemDescription: '', redirect: false, redirectDashboard: false }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get(`https://backend-pos-tap.herokuapp.com/admin/products/update-data/${this.state.product_code}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    item: res.data,
                    itemCode: res.data[0].code,
                    itemName: res.data[0].name,
                    itemBrand: res.data[0].brand,
                    itemSupplier: res.data[0].supplier_name,
                    itemDescription: res.data[0].description
                })
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
        if (this.state.itemCode.trim().length < 3) {
            alert('Kode barang harus terdiri dari minimal 3 karakter.')
        }
        else if (this.state.itemName.trim() < 3) {
            alert('Nama barang harus terdiri dari minimal 3 karakter.')
        }
        else {
            let token = sessionStorage.getItem('token')
            axios.post(`https://backend-pos-tap.herokuapp.com/admin/products/update-data/${this.state.product_code}`, { itemCode: this.state.itemCode.toUpperCase(), itemName: this.state.itemName, itemBrand: this.state.itemBrand, itemSupplier: this.state.itemSupplier, itemDescription: this.state.itemDescription }, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res) => {
                alert(`Data barang dengan kode ${this.state.itemCode.toUpperCase()} berhasil diubah.`)
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                if(err.response.data === 'Product code existed.'){
                    alert(`Kode barang ${this.state.itemCode.toLocaleUpperCase()} sudah terdaftar sebelumnya.`)
                }
                else{
                    alert(JSON.stringify(err.response))
                }
            })
        }
    }

    render() {
        let inputStyle = { width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px' }

        if (this.state.redirect == true) {
            return (<Navigate to='/products/product-stock-list' />)
        }

        if (this.state.redirectDashboard == true) {
            return (<Navigate to='/dashboard' />)
        }

        return (
            <div className='container-flex' style={{ margin: '8vh 0 0 5.3vw', width: '94.7vw', padding: '0 4vw', display: 'inline-block' }}>
                <div className='row' style={{ height: '3vh' }}></div>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Barang dan Stok</h4>
                        <hr style={{ background: 'black' }} />
                        <h5>Ubah Data Barang</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kode Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemCode' value={this.state.itemCode.toUpperCase()} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Nama Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemName' value={this.state.itemName} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Merk Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemBrand' value={this.state.itemBrand} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Supplier</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemSupplier' value={this.state.itemSupplier} onChange={this.handleInputChange} style={inputStyle} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Deskripsi/ Keterangan Barang</label>
                        </div>
                        <div className='col-3'>
                            <textarea type='text' name='itemDescription' value={this.state.itemDescription} onChange={this.handleInputChange} style={{ width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', minHeight: '15vh' }} />
                        </div>
                    </div>


                    <div className='row' style={{ margin: '5vh 0 2vh 0' }}>
                        <div className='col-2 text-center'>
                            <input type='submit' value='Simpan' onClick={this.handleClickSubmit} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                        </div>
                        <div className='col-2 text-center'>
                            <Link to='/products/product-stock-list'>
                                <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductUpdateData