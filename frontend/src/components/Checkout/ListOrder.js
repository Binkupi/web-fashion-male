import React,{Component,Fragment} from 'react';
// import $ from "jquery";
import convertToMoney from './../../utils/convertMoney'
class ListOrder extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            coupon:'',
            salePrice:0,
            infoCheckout:'',
        }
    }
    onChange=(event)=>
    {
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.setState({
            [name]:value
        });
    }
    isCheckCoupon=(coupon,price)=>{
        var salePrice=0;
        if(coupon==='quocdeptrai'){
            salePrice=price*5/100;
           this.setState({
            coupon:coupon,
            salePrice:salePrice,
            infoCheckout:'Bạn được 5% cho hóa đơn của bạn!!!'
            })

            this.props.onAddCouponToOrder(
                {coupon:coupon,
                salePrice:salePrice});
        }else{
            this.setState({
                coupon:'',
                salePrice:0,
                infoCheckout:'Mã khuyến mãi của bạn không đúng hoặc đã hết thời hạn!!!'
                })
        }
       
        
    }
  render(){
      const {coupon,salePrice,infoCheckout}=this.state;
    return (
        <Fragment>
            <div className="checkout__order">
                <h4 className="order__title">Hóa đơn của bạn</h4>
                <div className="checkout__order__products">Sản phẩm <span>Tổng cộng</span></div>
                <ul className="checkout__total__products">
                    {this.props.renderOrderItem}
                </ul>
                <ul className="checkout__total__all">
                    <li>Tổng phụ <span>{convertToMoney(this.props.totalPrice)}VND</span></li>
                    <li>Khuyến mãi <span>{convertToMoney(salePrice)}VND</span></li>
                    <li>Số tiền phải trả <span>{convertToMoney(this.props.totalPrice-salePrice)}VND</span></li>
                </ul>
                <p>Nhập mã khuyến mãi tại đây</p>
                <div className="row">     
                    <div className="col-lg-6">
                        <div className="checkout__input">  
                            <input type="text" name="coupon" value={coupon} onChange={this.onChange} />

                        </div>
                    </div>
                        <div className="col-lg-6">
                            <button type="button" onClick={()=>this.isCheckCoupon(coupon,this.props.totalPrice)}>Kiểm tra</button>
                        </div>
                        <p></p>
                </div>
                <div className="row">     
                    <label className="text-success">{infoCheckout}</label>
                </div>
            </div>
        </Fragment>
        
    );
  }
  
}


export default ListOrder;
