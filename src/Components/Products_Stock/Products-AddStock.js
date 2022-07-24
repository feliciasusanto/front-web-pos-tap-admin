import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class ProductReadDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: [], productCode: '', selectedItem: {}, newStockNum: 0, redirect: false, redirectDashboard: false }
        this.itemsListCombo = this.itemsListCombo.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/products/add-stock', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    items: res.data,
                    selectedItem: res.data[0],
                    productCode: res.data[0].code
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
            [name]: value,
        })
        let item = this.state.items.find(item => item.code === value)
        this.setState({
            selectedItem: item
        })
    }

    handleClickSubmit = (event) => {
        event.preventDefault()
        if(this.state.newStockNum=== '' || parseInt(this.state.newStockNum) === 0){
            alert('Harap memasukkan jumlah stok yang akan ditambahkan.')
        }
        // check is decimal
        else if(this.state.newStockNum.indexOf('.') != -1){
            alert('Harap memasukkan angka bulat yang valid untuk jumlah stok yang akan ditambahkan.')
        }
        else{
            let token = sessionStorage.getItem('token')
            axios.post('https://backend-pos-tap.herokuapp.com/admin/products/add-stock', {productCode: this.state.productCode, newStockNum: parseInt(this.state.newStockNum)}, { headers: { 'Authorization': `Bearer ${token}` } })
            .then( (res) => {
                alert('Stok berhasil ditambahkan.')
                // refresh page
                window.location.reload(false)
            })
            .catch((err) =>{
                alert(err.response)
            })
        }
    }

    itemsListCombo = (items_arr) => {
        const iterateItem = (items) => {
            return items.map((item) => {
                return (
                    <option key={item.id} value={item.code}>{item.code} - {item.name}</option>
                )
            })
        }
        return (
            <select name='productCode' onChange={this.handleSelectChange} style={{ width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', padding: '0.3vh 0' }}>
                {iterateItem(items_arr)}
            </select>
        )
    }

    render() {
        let inputStyle = { color: 'black', width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px' }

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
                        <h5>Tambah Stok Barang</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Kode Barang</label>
                        </div>
                        <div className='col-3'>
                            {this.itemsListCombo(this.state.items)}
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Nama Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemName' value={this.state.selectedItem.name} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Merk Barang</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemBrand' value={this.state.selectedItem.brand} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Supplier</label>
                        </div>
                        <div className='col-3'>
                            <input type='text' name='itemSupplier' value={this.state.selectedItem.supplier_name} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Deskripsi/ Keterangan Barang</label>
                        </div>
                        <div className='col-3'>
                            <textarea type='text' name='itemDescription' value={this.state.selectedItem.description} onChange={this.handleInputChange} style={{ color: 'black', width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', minHeight: '15vh' }} disabled={true} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Stok Tersedia</label>
                        </div>
                        <div className='col-3'>
                            <input type='number' name='stockQty' value={this.state.selectedItem.stock_qty} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                        </div>
                    </div>
                    <div className='row' style={{ margin: '0 0 2vh 0' }}>
                        <div className='col-2'>
                            <label>Jumlah Stok yang akan Ditambahkan</label>
                        </div>
                        <div className='col-3'>
                            <input type='number' name='newStockNum' step={1} min={0} value={this.state.newStockNum} onChange={this.handleInputChange} style={inputStyle} />
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
                <div>{JSON.stringify(this.state)}</div>
            </div>
        )
    }
}

export default ProductReadDetail