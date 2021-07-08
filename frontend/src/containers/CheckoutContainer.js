import React,{Component,Fragment} from 'react';
import ListOrder from './../components/Checkout/ListOrder'
import {connect} from 'react-redux'
import * as actions from './../actions/index'
import * as Message from './../constants/Message'
import convertToMoney from './../utils/convertMoney'
class CheckoutContainer extends Component {

    renderOrderItem(cart){
        var result=<li>{Message.MSG_ORDER_EMPTY}</li>;
        if(cart.length>0){
            result=cart.map((cartItem,index)=>{
              if(cartItem.quantity!==0)
                return <li key={index}>{index}. {cartItem.name} <br></br>(size:{cartItem.size})<span>{cartItem.quantity} x  {convertToMoney(cartItem.price)}VND</span></li>
                return false;
            })
            
        }
        return result;
    }
    totalPrice(cart){
        var result=0;
        if(cart.length>0){
            cart.forEach((cartItem,index)=>{
                result+=cartItem.price*cartItem.quantity;
            })
        }
        return result;
    }
  render(){
      var {cart}=this.props;
    return (
        <Fragment >
            <ListOrder renderOrderItem={this.renderOrderItem(cart.products)}
            totalPrice={this.totalPrice(cart.products)}
            onAddCouponToOrder={this.props.onAddCouponToOrder}
            
            />
        </Fragment>
        
    );
  }
  
}
const mapStateToProps = (state)=>{
  return{
      cart:state.cart,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
        onAddCouponToOrder:(infoCoupon)=>{
          dispatch(actions.addCouponToOrder(infoCoupon));
        }
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(CheckoutContainer);
