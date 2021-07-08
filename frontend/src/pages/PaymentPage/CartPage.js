import React,{Component,Fragment} from 'react';
import SearchContainer from '../../containers/SearchContainer';
import CartContainer from '../../containers/CartContainer';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'
// import * as actions from './../../actions/index'
class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,
        }
        ;
    }

    render(){
        var {token}=this.props;
        if(!token){
            return ( <Redirect to='/login'/>)
        }else{
            return (
                <Fragment> 
                    {/* <!-- Breadcrumb Section Begin --> */}
                    <section className="breadcrumb-option">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb__text">
                                        <h4>Giỏ hàng</h4>
                                        <div className="breadcrumb__links">
                                            <a href="./Cart.html">Trang chủ</a>
                                            <a href="./shop.html">Shop</a>
                                            <span>Giỏ hàng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                         {/* <!-- Breadcrumb Section End -->
                        <!-- Checkout Section Begin --> */}
                     <section className="section">
                        <div className="table-responsive">
                            <CartContainer />
                        </div>
                    </section>
                    
                    <SearchContainer />
                </Fragment>
            );
        }
        
    }
  
}
const mapStateToProps=(state)=>{
    return {
        ...state.authorization,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartPage);
