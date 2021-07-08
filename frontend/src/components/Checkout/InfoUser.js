import React,{Component,Fragment} from 'react';
// import $ from "jquery";
import{addBillRequest} from './../../actions'
import { Link } from 'react-router-dom';
class InfoUser extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            nameCustomer:'',
            address:'',
            email:'',
            orderNote:'',
            paymentMethod: 'Trả tiền khi nhận hàng',
            phone:0,
            errInformation:''


        }
    }
    onChange=(event)=>
    {
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.setState({
            [name]:name==='phone'?Number(value):value
        });


    }
    onSubmit=(e)=>{
        e.preventDefault();

        var {history,cart}=this.props;
        var order=this.props.order;
        var {nameCustomer, address,email,orderNote,paymentMethod,phone}=this.state;
        var products=cart.products.map((item)=>{
            if(item.quantity>0){
                return{
                    sku:item.sku,
                    quantity:item.quantity,
                    price:item.price,
                    size:item.size,
                    name:item.name ,
                    image:item.images[0],
                }  
            } 
            return null;
        })
        products=products.filter((item)=>{
            return item!==null;
        })
        if(products.length===0){
            this.setState({
                errInformation:'Giỏ hàng của bạn trống hoặc bạn đã mua sản phẩm hết hàng. Vui lòng kiểm tra lại!!!',
            });
        }else{
            const price = cart.products.reduce((total, item) => {
                return total + item.quantity*item.price;
              }, 0);
            var newBill={
                products: products,
                 totalPrice: price-order.salePrice
                 ,
                 nameCustomer:nameCustomer,
                //  id_User: order.id_User,
                 coupon: order.coupon,
                 address: address,
                 email: email,
                 orderNote:orderNote===''?' ':orderNote,
                 paymentMethod: paymentMethod,
                 phone: phone,
                 id_User: JSON.parse(localStorage.getItem('user')).id_User
            };
            addBillRequest(newBill)
            .then(()=>{
                this.props.onAddBillSucess(true);
                history.replace('/');
            })
        }
        

    }
    checkCart=(key)=>{
        if(key!==''){
            return <Link to={'shop/cart'} className="text-info">Kiểm tra giỏ hàng</Link>
        }
    }
  render(){
      var {nameCustomer, address,email,orderNote,paymentMethod,phone,errInformation}=this.state;
    return (
        <Fragment>
            <h6 className="coupon__code"><span className="icon_tag_alt"></span>
            Chào mừng bạn đến với trang thanh toán</h6>
            <h6 className="checkout__title">Nhập thông tin khách hàng</h6>
            <form onSubmit={this.onSubmit}>
                <div className="checkout__input">
                    <p>Họ tên<span>*</span></p>
                    <input type="text" value={nameCustomer} name='nameCustomer' onChange={this.onChange} required/> 
                </div>
                <div className="checkout__input">
                    <p>Địa chỉ<span>*</span></p>
                    <input type="text" placeholder="Địa chỉ nhận hàng" 
                    onChange={this.onChange} className="checkout__input__add" value={address} name='address' required/>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>Số điện thoại<span>*</span></p>
                            <input type="number" value={phone} name='phone' onChange={this.onChange} required/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="checkout__input">
                            <p>Email<span>*</span></p>
                            <input type="email" value={email} name='email' onChange={this.onChange} required/>
                        </div>
                    </div>
                </div>
                <div className="checkout__input">
                    <select id="PaymentMethod" value={paymentMethod} name='paymentMethod' className="custom-select" onChange={this.onChange}>
                        <option value="Trả tiền khi nhận hàng">Trả tiền khi nhận hàng</option>
                        <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
                        <option value="Ví điện tử momo">Ví điện tử momo</option>
                        <option value="Cổng thanh toán VNPay">Cổng thanh toán VNPay</option>
                    </select>
                </div>
                
                <div className="checkout__input">
                    <p>Lưu ý khi giao hàng<span>*</span></p>
                    <input type="text"
                    placeholder="Chú ý khi giao hàng" 
                    onChange={this.onChange} value={orderNote} name='orderNote'/>
                </div>
                <div className="checkout__input">
                    <label className="text-danger">{errInformation}. {this.checkCart(errInformation)}</label>
                </div>
                <button type="submit" className="site-btn" >Đặt hàng</button>
            </form>
        </Fragment>
        
    );
  }
  
}


export default InfoUser;
