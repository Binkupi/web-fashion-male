import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux'
import $ from "jquery";
import convertToMoney from './../utils/convertMoney'
import * as actions from './../actions/index';
import {
    Link,
    NavLink,
  } from "react-router-dom";

class Header extends Component {
componentDidMount() {
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });
    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });
    var {user}=this.props;
    if(user.id_User!==''){
        this.props.fetchCartByIdUserRequest(user.id_User);
    }
    
}
onClick=(event)=>{
    event.preventDefault();
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });
    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });
}
countPrice=(cart)=>{
    var result=0;
    
    cart.forEach(item=>{
        result+=item.price*item.quantity;
    })
    return result;
}
renderSignin=(user)=>{
    if(!user.id_User){
        return <Link to={"/login"}>Đăng nhập</Link>
    }else{
        return <Link to={"/user"}>{user.username}</Link>
    }
}
  render(){
    return (
        
        <Fragment>
                {/* <!-- Header Section Begin --> */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7">
                                <div className="header__top__left">
                                    <p>Miễn phí vận chuyển, hoàn trả trong 30 ngày hoặc đảm bảo hoàn lại tiền.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="header__top__right">
                                    <div className="header__top__links">
                                        {this.renderSignin(this.props.user)}
                                        <a href="/">FAQs</a>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="header__logo">
                                <Link to="/"><img src="/img/logo.png" alt=""/></Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li ><NavLink exact to="/" activeClassName="active">Trang chủ</NavLink></li>
                                    <li><Link to={`/shop`}>Cửa hàng </Link></li>
                                    <li><NavLink exact to='/about' activeClassName="active">Về chúng tôi</NavLink></li>
                                    <li>
                                        <NavLink exact to="/contact" activeClassName="active">
                                            Liên hệ
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="header__nav__option">     
                                <Link to={''} onClick={this.onClick} className="search-switch"><img src="/img/icon/search.png" alt=""/></Link>
                                <Link type="button" to={`/shop/cart`}><img src="/img/icon/cart.png" alt=""/> <span>{ this.props.cart.products.length }</span></Link>
                                {/* <div className="price">{convertToMoney(this.countPrice(this.props.cart))}đ</div> */}

                            
                                <div className="price">{convertToMoney(this.countPrice(this.props.cart.products))}đ</div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open"><i className="fa fa-bars"></i></div>
                </div>
            </header>

        </Fragment>
        
    );
  }
  
}

const mapStateToProps = (state)=>{
    return{
        cart:state.cart,
        user:state.user,
    }
  }
  const mapDispatchToProps = (dispatch)=>{
    return{
        fetchCartByIdUserRequest:(id)=>{
            dispatch(actions.fetchCartByIdUserRequest(id));
        }
    }
  }
  export default connect (mapStateToProps,mapDispatchToProps)(Header);
