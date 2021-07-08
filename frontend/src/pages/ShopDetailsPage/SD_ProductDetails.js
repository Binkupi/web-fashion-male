import React, { Component } from 'react';
import $ from 'jquery';
import {Helmet } from 'react-helmet'

class SD_ProductDetails extends Component {
    componentDidUpdate() {
        $(".shop__sidebar__size label, .product__details__option__size label").on('click', function () {
            $(".shop__sidebar__size label, .product__details__option__size label").removeClass('active');
            $(this).addClass('active');
        });
    }

    render() {
        var product = this.props.product; 
        let options = this.props.options;
        let displaySize = [];
        if (options){
            // console.log(options);
            displaySize = options.map((option,index) => {
                return (
                    <label key={index}
                    
                        className={ index === 0 ? "active" : "" }
                    >{option.size}
                        <input type="radio" id={option.size} key={index}/>
                    </label>
                )
            })
        }
        // console.log
        
        return (
            <div className="product__details__text">
                <Helmet>
                    <title>{product.name}</title> 
                </Helmet> 
                {/* <h1>{displaySize}</h1> */}
                <h4>{product.name}</h4>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                    <span> - 5 Đánh giá</span>
                </div>
                <h3>{product.price}</h3>
                <p>{product.shortDesc}</p>
                <div className="product__details__option">
                    <div className="product__details__option__size">
                        <span>Kích cỡ:</span>
                        {displaySize} 
                    </div>
                    
                </div>
                <div className="product__details__cart__option">
                    <div className="quantity">
                        <div className="pro-qty">
                            <input type="text"   />
                            {/* <input type="text" value="1"  /> */}
                        </div>
                    </div>
                    <a href="/" className="primary-btn">Thêm vào giỏ hàng</a>
                </div>
                <div className="product__details__last__option">
                    <h5><span>Các kênh thanh toán</span></h5>
                    <img src="img/shop-details/details-payment.png" alt="" />
                    <ul>
                        <li><span>SKU:</span> {product.sku}</li>
                        <li><span>Loại:</span> {product.category}</li>
                        <li><span>Nhãn:</span> {product.tags}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SD_ProductDetails;