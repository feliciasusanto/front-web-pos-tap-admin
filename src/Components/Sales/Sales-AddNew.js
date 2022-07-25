import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import ico_delete from './../../assets/images/delete.png'

class SalesAddNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesNo: '', salesDate: '', custs: [], productCode: '', selectedCust: { disc: 0 },
            purchaseOrderNum: '', dpp: 0, tax: 0, salesTotal: 0, remarks: '', items: [], selectedItem: {},
            soldQty: 1, unitPrice: 0, unitPriceDisc: 0, soldItems: [], redirect: false, redirectDashboard: false
        }
        this.custsListCombo = this.custsListCombo.bind(this)
        this.itemsListCombo = this.itemsListCombo.bind(this)
        this.soldItemsTable = this.soldItemsTable.bind(this)
        this.handleCustSelectChange = this.handleCustSelectChange.bind(this)
        this.handleItemSelectChange = this.handleItemSelectChange.bind(this)
        this.handleUnitPriceChange = this.handleUnitPriceChange.bind(this)
        this.handleQtyChange = this.handleQtyChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClickAdd = this.handleClickAdd.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
        this.thousands = this.thousands.bind(this)
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
        axios.get('https://backend-pos-tap.herokuapp.com/admin/sales/add-new/get-default-values', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    salesNo: res.data.invoice_no,
                    salesDate: res.data.date
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
        axios.get('https://backend-pos-tap.herokuapp.com/admin/sales/add-new/get-customer-list', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    custs: res.data,
                    selectedCust: res.data[0]
                })
            })
            .catch((err) => {
                if (err.response.status === 403 || err.response.status === 401) { }
                else {
                    JSON.stringify(err.response)
                }
            })
        axios.get('https://backend-pos-tap.herokuapp.com/admin/sales/add-new/get-available-product', { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    items: res.data,
                    selectedItem: res.data[0]
                })
            })
            .catch((err) => {
                if (err.response.status === 403 || err.response.status === 401) { }
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

    handleCustSelectChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value,
        })
        let cust = this.state.custs.find(cust => cust.cust_id === parseInt(value))
        this.setState({
            selectedCust: cust
        })
    }

    handleItemSelectChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value,
        })
        let item = this.state.items.find(item => item.id === parseInt(value))
        this.setState({
            selectedItem: item
        })
    }

    handleClickAdd = (event) => {
        let soldItemId = this.state.selectedItem.id
        let soldItemCode = this.state.selectedItem.code
        let soldItemName = this.state.selectedItem.name
        let soldQty = this.state.soldQty
        let unitPrice = parseInt(this.state.unitPrice)
        let discPrice = this.state.unitPriceDisc
        let total = parseFloat(soldQty) * parseFloat(discPrice)

        let soldItemObj = { id: soldItemId, code: soldItemCode, name: soldItemName, soldQty: soldQty, unitPrice: unitPrice, discPrice: discPrice, totalPrice: total }
        let newSoldItems = [...this.state.soldItems]
        newSoldItems.push(JSON.stringify(soldItemObj))

        let dpp = 0
        newSoldItems.forEach(soldItem => {
            soldItem = JSON.parse(soldItem)
            dpp += soldItem.totalPrice
        })
        let tax = Math.round((11 / 100) * dpp)
        let total_sales = dpp + tax
        this.setState({
            soldItems: newSoldItems,
            dpp: dpp,
            tax: tax,
            salesTotal: total_sales
        })
    }
    
    handleUnitPriceChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        if (parseInt(value) < 0 || value.indexOf('.') != -1) {
            alert('Harap memasukkan angka bulat yang valid kolom harga barang.')
        }
        else {
            let unitPriceDisc = parseFloat(target.value) - ((parseFloat(this.state.selectedCust.disc) / 100.0 * parseFloat(parseInt(target.value))))
            this.setState({
                [name]: value,
                unitPriceDisc: Math.round(unitPriceDisc)
            })
        }
    }

    handleQtyChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({
            [name]: value,
        })

        if (parseInt(value) === 0) {
            alert('Kuantitas minimal 1.')
        }
        else if (value === '' || value.indexOf('.') != -1) {
            alert('Harap memasukkan angka bulat yang valid dengan minimal 1 untuk kolom kuantitas.')
        }
    }

    handleClickSubmit = (event) => {
        event.preventDefault()

        if (this.state.soldItems.length === 0) {
            alert('Harap menambahkan barang yang dijual terlebih dahulu.')
        }
        else if (this.state.salesTotal === 0) {
            alert('Total penjualan tidak boleh 0.')
        }
        else {
            let datas = {
                custId: this.state.selectedCust.cust_id, benefitName: this.state.selectedCust.benefit_name, benefitDisc: this.state.selectedCust.disc,
                purchaseOrderNum: this.state.purchaseOrderNum, remarks: this.state.remarks, soldItems: this.state.soldItems
            }
            let token = sessionStorage.getItem('token')
            axios.post('https://backend-pos-tap.herokuapp.com/admin/sales/add-new', datas, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    this.setState({
                        redirect: true
                    })
                })
                .catch((err) => {
                    if (err.response.status === 422) {
                        if (err.response.data.substring(0, ('Insufficent for item').length) === 'Insufficent for item') {
                            alert(`Stok barang tidak mencukupi untuk barang dengan nama ${err.response.data.substring(('Insufficent for item ').length)}`)
                        }
                    }
                    else if (err.response.status === 401) {
                        this.setState({
                            redirectDashboard: true
                        })
                    }
                    else {
                        JSON.stringify(err.response)
                    }
                })
        }
    }

    handleDeleteClick = (index) => {
        let newSoldItems = [...this.state.soldItems]
        newSoldItems.splice(index, 1)

        let dpp = 0
        newSoldItems.forEach(soldItem => {
            soldItem = JSON.parse(soldItem)
            dpp += soldItem.totalPrice
        })
        let tax = Math.round((11 / 100) * dpp)
        let total_sales = dpp + tax
        this.setState({
            soldItems: newSoldItems,
            dpp: dpp,
            tax: tax,
            salesTotal: total_sales
        })
    }

    custsListCombo = (custs_arr) => {
        const iterateItem = (custs) => {
            return custs.map((cust) => {
                return (
                    <option key={cust.cust_id} value={cust.cust_id}>{cust.cust_code} - {cust.cust_name}</option>
                )
            })
        }
        return (
            <select name='custId' onChange={this.handleCustSelectChange} style={{ width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', padding: '0.3vh 0' }}>
                {iterateItem(custs_arr)}
            </select>
        )
    }

    thousands = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    itemsListCombo = (items_arr) => {
        const iterateItem = (items) => {
            return items.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            })
        }
        return (
            <select name='itemId' onChange={this.handleItemSelectChange} style={{ width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', padding: '0.3vh 0' }}>
                {iterateItem(items_arr)}
            </select>
        )
    }
    // received stringify sold items array
    soldItemsTable = (soldItems_arr) => {
        {/* received stringify sold items array */ }
        const iterateItem = (items) => {
            // let i = 0
            return items.map((item, i) => {
                // to use stringified json, use json parse
                item = JSON.parse(item)
                // i++
                return (
                    <tr key={i}>
                        <td style={{ border: '1px double black', width: '3%', textAlign: 'center', padding: '0' }}>{i + 1}</td>
                        <td style={{ border: '1px double black', width: '10%', textAlign: 'center', padding: '0' }}>{item.code}</td>
                        <td style={{ border: '1px double black', width: '12%', textAlign: 'center', padding: '0' }}>{item.name}</td>
                        <td style={{ border: '1px double black', width: '8%', textAlign: 'center', padding: '0' }}>{item.soldQty}</td>
                        <td style={{ border: '1px double black', width: '14%', textAlign: 'center', padding: '0' }}>Rp {this.thousands(item.discPrice)}</td>
                        <td style={{ border: '1px double black', width: '16%', textAlign: 'center', padding: '0' }}>Rp {this.thousands(item.totalPrice)}</td>
                        <td style={{ border: '1px double black', width: '4%', textAlign: 'center', padding: '0' }}>
                            <img onClick={() => this.handleDeleteClick(i)} src={ico_delete} alt='ico_delete' style={{ width: '65%', cursor: 'pointer' }} />
                        </td>
                    </tr>
                )
            })
        }
        return (
            <table className='col-12' style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr style={{ background: 'lightblue' }}>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '3%', textAlign: 'center', padding: '0' }}>#</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '10%', textAlign: 'center', padding: '0' }}>Kode Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '12%', textAlign: 'center', padding: '0' }}>Nama Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '8%', textAlign: 'center', padding: '0' }}>Kuantitas</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '14%', textAlign: 'center', padding: '0' }}>Harga Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '16%', textAlign: 'center', padding: '0' }}>Total Harga Barang</th>
                        <th style={{ border: '1px double black', fontWeight: 'normal', width: '4%', textAlign: 'center', padding: '0' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {/* send stringify sold items array to iterate items*/}
                    {iterateItem(soldItems_arr)}
                </tbody>
            </table>
        )
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
                        <h5>Tambah Penjualan</h5>
                    </div>
                </div>
                <div className='row' style={{ height: '3vh' }}></div>
                <form>
                    <div className='row'>
                        <div className='container col-5' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>No. Penjualan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='salesNo' value={this.state.salesNo} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Tanggal Penjualan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='salesDate' value={this.state.salesDate} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>

                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Nama Pelanggan</label>
                                </div>
                                <div className='col-7'>
                                    {this.custsListCombo(this.state.custs)}
                                </div>
                            </div>

                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Benefit</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='benefitName' value={this.state.selectedCust.benefit_name} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Diskon Benefit (%)</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='benefitDisc' value={`${this.state.selectedCust.disc}`} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                        </div>

                        <div className='container col-7' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Kode Barang</label>
                                </div>
                                <div className='col-5'>
                                    <input type='text' name='selectedItem' value={this.state.selectedItem.code} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Nama Barang</label>
                                </div>
                                <div className='col-5'>
                                    {this.itemsListCombo(this.state.items)}
                                </div>
                                <div className='col-3 text-center'>
                                    <input type='button' value='Tambah' onClick={this.handleClickAdd} style={{ padding: '0.5vh 1.5vw', background: '#FBF337', borderRadius: '5px', border: 'none' }} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Kuantitas</label>
                                </div>
                                <div className='col-5'>
                                    <input type='number' name='soldQty' step={1} min={'1'} max={this.state.selectedItem.stock_qty} value={this.state.soldQty} onChange={this.handleQtyChange} style={inputStyle} />
                                </div>
                                <div className='col-3 text-center'>
                                    <input type='button' value='Simpan' onClick={this.handleClickSubmit} style={{ padding: '0.5vh 1.5vw', background: '#f28149', borderRadius: '5px', border: 'none' }} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>

                                <div className='col-4'>
                                    <label>Harga Barang<br />(exclude PPN)</label>
                                </div>
                                <div className='col-5'>
                                    <input type='number' name='unitPrice' min={0} step={10000} value={this.state.unitPrice} onChange={this.handleUnitPriceChange} style={inputStyle} />
                                </div>
                                <div className='col-3 text-center'>
                                    <Link to='/sales/sales-list'>
                                        <input type='button' value='Kembali' style={{ padding: '0.5vh 1.5vw', background: '#37FB62', borderRadius: '5px', border: 'none' }} />
                                    </Link>
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>

                                <div className='col-4'>
                                    <label>Harga Barang Setelah Diskon Benefit</label>
                                </div>
                                <div className='col-5'>
                                    <input type='number' name='unitPriceDisc' value={this.state.unitPriceDisc} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='container col-5' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>No. PO Pelanggan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='purchaseOrderNum' value={this.state.purchaseOrderNum} onChange={this.handleInputChange} style={inputStyle} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Dasar Pengenaan Pajak</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='benefitName' value={`Rp ${this.thousands(this.state.dpp)}`} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>PPN</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='tax' value={`Rp ${this.thousands(this.state.tax)}`} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Total Penjualan</label>
                                </div>
                                <div className='col-7'>
                                    <input type='text' name='salesTotal' value={`Rp ${this.thousands(this.state.salesTotal)}`} onChange={this.handleInputChange} style={inputStyle} disabled={true} />
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-4'>
                                    <label>Catatan</label>
                                </div>
                                <div className='col-7'>
                                    <textarea type='text' name='remarks' value={this.state.remarks} onChange={this.handleInputChange} style={{ width: '100%', background: 'lightgrey', border: 'none', borderRadius: '5px', minHeight: '15vh' }} />
                                </div>
                            </div>
                        </div>

                        <div className='container col-7' style={{ display: 'inline-block', margin: '0', padding: '0' }}>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                <div className='col-12'>
                                    <label style={{ textDecoration: 'underline', fontWeight: '500' }}>Daftar Barang</label>
                                </div>
                            </div>
                            <div className='row' style={{ margin: '0 0 2vh 0' }}>
                                {this.soldItemsTable(this.state.soldItems)}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SalesAddNew