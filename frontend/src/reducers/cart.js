
import * as types from'./../constants/ActionTypes'
import {changeCartInDTB}  from'./../actions'
var user=localStorage.getItem('user');

 user=user?JSON.parse(user):{
    id_User: '',
     username:'',
     phone:'',
     address:'',
     email:'',
};

var initialState={
    id_User:user.id_User,
    products:[]
}
var findProductInCartByIndex=(cart,product)=>{
    var index=-1;
    cart.map((cartItem,i)=>{
        if(cartItem.index===product.index){
            index=i;
        }
        return cartItem;
    });
    return index;
}
var findProductInCartBySize=(cart,product)=>{
    var index=-1;
    cart.map((cartItem,i)=>{
        if(cartItem.sku===product.sku&&cartItem.size===product.size){
            index=i;
        }
        return cartItem;
    });
    return index;
}
var getMaxIndex=(cart)=>{
    var result=0;
    cart.forEach(cartItem=>{
        result=cartItem.index;
    })
    return result;
}
const cart=(state=initialState,action)=>{
    var replaceState;
    var index;




    
    let {product}=action;
    switch(action.type){
        case types.ADD_TO_CART:
            replaceState={...state};
            index=findProductInCartBySize(replaceState.products,product);
            if(index===-1){
                product.index=getMaxIndex(replaceState.products)+1;
                replaceState.products.push(product);
            }else{
                if(product.inventory!==0){
                replaceState.products[index].quantity+=1;
            }
                
            }
            changeCartInDTB(replaceState);
            
            return replaceState;
        case types.DELETE_PRODUCT_TO_CART:
            replaceState={...state};
            
            index=findProductInCartByIndex(replaceState.products,product);
            if(index!==-1){
                replaceState.products.splice(index,1);
            }
            changeCartInDTB(replaceState);
            return replaceState;
        case types.UPDATE_PRODUCT_TO_CART:
            replaceState={...state};
            index=findProductInCartByIndex(replaceState.products,product);
            if(index!==-1){
                var inventory=0;

                //option chứa size và quantity của sản pham
                product.options.forEach(item=>{
                    inventory=item.size===product.size?item.remaining:inventory 
                })
                product.quantity=inventory===0?0:product.quantity;
                product.inventory=inventory;
                replaceState.products[index]=product;
            }
            
            changeCartInDTB(replaceState);
            return replaceState;
        case types.ADD_BILL_SUCCESS:  
            replaceState={...state};
            if(action.isCheck===true){
                replaceState.products=[]; 
                changeCartInDTB(replaceState);
            }
            return replaceState; 
        case types.LOGOUT_CART:
            replaceState={...state};
            replaceState.id_User='';
            replaceState.products=[];
            return replaceState; 
        case types.FETCH_CART_BY_ID_USER:  
            replaceState={...state};
            replaceState.products=action.cart.products; 
            
        return replaceState;  
        default:
            
            return state;
    }

}
export default cart;