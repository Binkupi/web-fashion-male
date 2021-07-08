import React, { Component } from 'react'; 
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './../../actions'


class SD_RelatedSection extends Component {

    renderStarRate(star){
        let result=[];
        star = Math.round(star);
        for(let i=1;i<=star;i++){
            result.push(<i key={i} className="fa fa-star"></i>);
            
        }
        for(let i=1;i<=5-star;i++){
            result.push(<i key={i+5} className="fa fa-star-o"></i>);
        }
        return result;
    }
    onClick=(product)=>{
       // e.preventDefault();
        var {token,history}=this.props;
        if(!token){
            history.replace('/login');
        }else{
            const{sku,slug,price,name,images,options}=product;
        let i = 0;
        while(options[i].remaining === 0)
            i++;
        var size=options[i].size;
        var inventory=options[i].quantity;
        var quantity=inventory===0?0:1;
        
        const cartItem={
            sku:sku,
            name:name,
            images:images,
            slug:slug,
            price:price,
            size:size,
            inventory:inventory,
            quantity:quantity,
            options:options,
            index:0,

        }    
                        
        this.props.onAddToCart(cartItem);
        }
         
    }
    render() {
        var {listProduct} = this.props;
        
        var product = listProduct.slice(0, 4).map((product,index) => {
            var images = product.images;
            var image = images.map((image,index) => {
                if (index === 0){
                    return (
                        <div key={index}
                            className="product__item__pic set_bg" 
                            data-setbg={process.env.REACT_APP_API_URL + image} 
                            style={{backgroundImage: "url("+process.env.REACT_APP_API_URL + image+")"}}
                        >
                            <span className="label">Mới</span>
                            <ul className="product__hover">
                                <li><a href="/"><img src="img/icon/heart.png" alt="" /></a></li> 
                                <li><a href="/"><img src="img/icon/search.png" alt="" /></a></li>
                            </ul>
                        </div>
                    )
                }
                
            })
            var star = product.rating.grade;
            return(
                <div className="col-lg-3 col-md-6 col-sm-6 col-sm-6" key={index}>
                    <div className="product__item">
                        {image}
                        <div className="product__item__text">
                            <h6 >
                                <Link to={`/${product.sku}`}>
                                    {product.name}
                                </Link>
                            </h6>
                            <p  onClick={()=>this.onClick(product)} className="add-cart">+ Thêm vào giỏ hàng</p>
                            <div className="rating">
                                {this.renderStarRate(star)}
                            </div>
                            <h5>{product.price}</h5> 
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <section className="related spad"> 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3 className="related-title">Sản phẩm liên quan</h3>
                        </div>
                    </div>
                    <div className="row">
                        {product}
                        
                    </div>
                </div>
            </section>
        );
    }
}
const mapStateToProps=(state)=>{
    return {
        ...state.authorization,
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
        onAddToCart:(product)=>{
            dispatch(actions.onAddToCart(product));
          }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SD_RelatedSection);
