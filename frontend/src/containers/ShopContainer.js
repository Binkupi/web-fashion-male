import React,{Component,Fragment} from 'react';
import ProductList from '../components/ProductList'
import {connect} from 'react-redux'
import ProductItem from '../components/ProductItem';
import { withRouter } from "react-router";
import * as actions from './../actions/index';
class ShopContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      option:3,
    }
  }
  renderProductItems(products){
    var result=null;
    const onPage=this.props.onPage;
    if(products.length>0){
        result=products.map((product,index)=>{
          if(onPage===1){
            if(product.status!==0){
                return (<ProductItem
                    key={index}
                    index={index}
                    product={product}
                    onChange={this.state.option}
                    onPage={this.props.onPage}
                    onSort={this.props.onSort}
                    onAddToCart={this.props.onAddToCart}
                    history={this.props.history}
                />)
            } 
          } 
          if(onPage===0){
            return (<ProductItem
                key={index}
                index={index}
                product={product}
                onChange={this.state.option}
                onPage={this.props.onPage}
                onSort={this.props.onSort}
                onAddToCart={this.props.onAddToCart}
                history={this.props.history}
            />)
          }
        return null;          
        })
    }
    return result;
    
}
  onClick(option){
      this.setState({
        option:option
      })
  }
  render(){
    var {products,keyword,sort}=this.props;
     var {match}=this.props;
    let query= new URLSearchParams(this.props.location.search);
    var filter=match.params.filter;
    if(filter){
      
        if(filter==='categories'){
        
            products=products.filter(product=>{
            return product.category===query.get("value");
            })
      
        }else if(filter==='branding'){
            products=products.filter(product=>{
            return product.brand===query.get("value");
        })
        }else if(filter==='tags'){
            products=products.filter(product=>{
            var result=false;
            product.tags.map(element => {
                if(element===query.get("value")){
                result=true;
                }
                return null;
            });
            if(result){
                return 1;
            }        
            return 0;
        })
      }
      else if(filter==='sizes'){
        products=products.filter(product=>{
          var result=false;
          product.options.map(element => {
            if(element.size===query.get("value")){
              result=true;
            }
            
          });
          if(result){
            return 1;
          }        
          return 0;
      })
      }
      else if(filter==='search'){
          
          keyword=query.get("value").toLowerCase();
        products=products.filter(product=>{
            return product.name.toLowerCase().indexOf(keyword)!==-1;
          })
    }
    }
//     //xử lý sự kiện search
//     if(keyword){
//       products=products.filter(product=>{
//         keyword=keyword.toLowerCase()
          
//       })
     
//   }
  //xử lý sự kiện sort
  sort=Number(sort);
  if(sort===1){
    
    products=products.sort(function(product1, product2) {
      if (product1.price > product2.price) return 1;
      else if (product1.price < product2.price) return -1;
      return 0;
      })
    }else if(sort===2){
      products=products.sort(function(product1, product2) {
        if (product1.price < product2.price) return 1;
        else if (product1.price > product2.price) return -1;
        return 0;
    })
    }else if(sort ===3){
      products=products.filter((product,index)=>{
        return product.price<=500000;
      })
      products=products.sort(function(product1, product2) {
        if (product1.price > product2.price) return 1;
        else if (product1.price < product2.price) return -1;
        return 0;
    })
    }else if(sort ===4){
      products=products.filter((product,index)=>{
        return product.price>500000;
      })
      products=products.sort(function(product1, product2) {
        if (product1.price > product2.price) return 1;
        else if (product1.price < product2.price) return -1;
        return 0;
    })
    }
    return (
        <Fragment>       
          <ProductList >
              {this.renderProductItems(products)}
          </ProductList>  
        </Fragment>
        
    );
  }
  
}

const mapStateToProps=(state)=>{
  return {
      products:state.products,
      onPage:state.page,
      keyword:state.search,
      sort:state.sort,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    onAddToCart:(product)=>{
      dispatch(actions.onAddToCart(product));
    }
      }
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ShopContainer));
