import React,{Component,Fragment} from 'react';
import SearchContainer from '../../containers/SearchContainer';
import CheckoutContainer from '../../containers/CheckoutContainer';
import InfoUserContainer from '../../containers/InfoUserContainer';
import * as Message from './../../constants/Message';
import {Link }from 'react-router-dom'
import {connect} from 'react-redux';
import { Redirect } from 'react-router'
// import * as actions from './../../actions/index'
class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,
        }
        ;
    }

    render(){
        var {cart,token}=this.props;
        if(!token){
            return (<Redirect to='/login'/>)
        }else{
            if(cart.length===0){
                return (
                    <Fragment> 
                    {/* <!-- Breadcrumb Section Begin --> */}
                    <section className="breadcrumb-option">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb__text">
                                        <h4>Thanh toán</h4>
                                        <div className="breadcrumb__links">
                                            <a href="./index.html">Trang chủ</a>
                                            <a href="./shop.html">Cửa hàng</a>
                                            <span>Thanh toán</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Breadcrumb Section End -->
    
                    <!-- Checkout Section Begin --> */}
                    <section className="checkout spad">
                        <div className="container">
                            <div className="checkout__form">
                            <p><span>{Message.MSG_ORDER_EMPTY} </span><Link type="button" to={`/shop`} >Tiếp tục mua sắm!!!</Link></p>
    
                            </div>
                        </div>
                    </section>
                    {/* <!-- Checkout Section End --> */}
                    
                    <SearchContainer />
                </Fragment>
                )
            }
            return (
                <Fragment> 
                    {/* <!-- Breadcrumb Section Begin --> */}
                    <section className="breadcrumb-option">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb__text">
                                        <h4>Thanh toán</h4>
                                        <div className="breadcrumb__links">
                                            <a href="./index.html">Trang chủ</a>
                                            <a href="./shop.html">Cửa hàng</a>
                                            <span>Thanh toán</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Breadcrumb Section End -->
    
                    <!-- Checkout Section Begin --> */}
                    <section className="checkout spad">
                        <div className="container">
                            <div className="checkout__form">
                                <div className="row">
                                    <div className="col-lg-8 col-md-6">
                                        <InfoUserContainer history={this.props.history}/> 
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <CheckoutContainer /> 
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </section>
                    {/* <!-- Checkout Section End --> */}
                    
                    <SearchContainer />
                </Fragment>
            );
        }
        }
        
  
}
const mapStateToProps=(state)=>{
    return {
        cart:state.cart,
        ...state.authorization,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckoutPage);
