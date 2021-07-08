import React,{Component,Fragment} from 'react';
// import Search from './../components/Search'
import Cart from './../components/Cart/Cart'
import CartResult from './../components/Cart/CartResult'
import CartItem from './../components/Cart/CartItem'
import {connect} from 'react-redux'
import * as actions from './../actions/index'
import * as Message from './../constants/Message'
import {Link} from 'react-router-dom'
class CartContainer extends Component {
    renderCart(cart){
        var result=<tr><td colSpan="8" ><div className="text-align"><p className="text-info text-align"><span className="mr-3">{Message.MSG_CART_EMPTY}</span><Link type="button" to={`/shop`} className="text-success">Tiếp tục mua sắm !!!</Link></p></div></td></tr>;
        if(cart.length>0){
            result=cart.map((cartItem,index)=>{
                return <CartItem key={index}
                         cartItem={cartItem}
                        onDeleteProductToCart={this.props.onDeleteProductToCart}
                        //  onChangeMessage={this.props.onChangeMessage}
                        onUpdateProductToCart={this.props.onUpdateProductToCart} />
            })
        }
        return result;
    }
    renderTotalMount(cart){
      var result=null;
      var total=0;
      if(cart.length>0){
          for(var i=0;i<cart.length;i++){
              total+=cart[i].price*cart[i].quantity;
          }
          result =<CartResult total={total}/>
      }
      return result;
  }
  render(){
      var {cart}=this.props;

    return (
        <Fragment >
            <Cart >
                {this.renderCart(cart.products)}
                {this.renderTotalMount(cart.products)}
            </Cart>
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
        onAddToCart:(product)=>{
          dispatch(actions.onAddToCart(product));
      },
      onDeleteProductToCart:(product)=>{
        dispatch(actions.onDeleteProductToCart(product));
      }
      ,
      onUpdateProductToCart:(product)=>{
        dispatch(actions.onUpdateProductToCart(product));
      }
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(CartContainer);
