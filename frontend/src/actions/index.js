
//Lấy các action types
import * as types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller'

//xử lý render list sản phẩm
export const fetchProducts=(products)=>{
    return {
        type:types.FETCH_PRODUCTS,
        products,//products=products
    }
}

//Lên API lấy dữ liệu products về
export const fetchProductsRequest=(limit, skip)=>{
    
    return (dispatch)=>{
        let query = '?';

        if(limit)
            query += `limit=${limit}&`;
        
        if(skip)
            query += `skip=${skip}&`;
        
        

        return callApi(`products${ query }`,'GET',null)
                        .then(res=>{
                            dispatch(fetchProducts(res.data));
                        })
    }
}

//xử lý trang index đang gọi product
export const getDataPage=(data)=>{
    return {
        type:types.PAGE_INDEX,
        data,//products=products
    }
}

//xử lý tìm kiếm
export const onSearch=(keyword)=>{
    return {
        type:types.SEARCH,
        keyword,//products=products
    }
}

//xử lý sort theo giá
export const onSort=(status)=>{
    return {
        type:types.SORT,
        status,//products=products
    }
}

//Xử lý giỏ hàng
export const onAddToCart=(product)=>{
    return {
        type:types.ADD_TO_CART,
        product,//products=products
    }
}

//xóa sản phẩm khỏi giỏ hàng
export const onDeleteProductToCart=(product)=>{
    return{
        type:types.DELETE_PRODUCT_TO_CART,
        product
    }
}

//cập nhật sản phẩm khỏi giỏ hàng
export const onUpdateProductToCart=(product)=>{
    return{
        type:types.UPDATE_PRODUCT_TO_CART,
        product

    }
}

//add thông tin user vào order
export const addInfoUserToOrder=(infoUser)=>{
    return{
        type:types.ADD_INFO_USER_TO_ORDER,
        infoUser

    }
}

//add thông tin user vào order
export const addCouponToOrder=(infoCoupon)=>{
    return{
        type:types.ADD_COUPON_TO_ORDER,
        infoCoupon

    }
}

//Thêm sản phẩm
export const saveBill=(bill)=>{
    return{
        type:types.SAVE_BILL,
        bill,
    }
}

export const addBillRequest=(newOrder)=>{
        return callApi('bills','POST',{
            products: newOrder.products,
             totalPrice: newOrder.totalPrice
             ,
             nameCustomer:newOrder.nameCustomer,
             id_User: newOrder.id_User,
             coupon: newOrder.coupon,
             address:newOrder.address,
             email:newOrder.email,
             orderNote: newOrder.orderNote,
             paymentMethod: newOrder.paymentMethod,
             phone:newOrder.phone,
        })
}

//add bill success
export const addBillSucess=(isCheck)=>{
    return{
        type:types.ADD_BILL_SUCCESS,
        isCheck
    }
}

//xử lý render list sản phẩm
export const fetchBillsByUser=(bills)=>{
    return {
        type:types.FETCH_BILLS_BY_USER,
        bills,//products=products
    }
}

//Lên API lấy dữ liệu products về
export const fetchBillsByUserRequest=(id_User)=>{
    return (dispatch)=>{
        return callApi(`bills/user/${id_User}`,'GET',null)
                        .then(res=>{
                            dispatch(fetchBillsByUser(res.data));
                        })
    }
}

export const deleteBill=(id_Bill)=>{
    return callApi('bills/cancel-bill','POST',{
        id_Bill:id_Bill
    })
}

export const changePassword=(id,contentUser)=>{
    return callApi(`users/${id}`,'PUT',{
        contentUser
    })
}


//xử lý render list sản phẩm
export const fetchUserById=(user)=>{
    return {
        type:types.FETCH_USER_BY_ID,
        user,//products=products
    }
}

//Lên API lấy dữ liệu products về
export const fetchUserByIdRequest=(id_User)=>{
    return (dispatch)=>{
        return callApi(`users/${id_User}`,'GET',null)
                        .then(res=>{
                            dispatch(fetchUserById(res.data));
                        })
    }
}
//Thêm sản phẩm
export const changeStatusBill=(bill)=>{
    return{
        type:types.CHANGE_STATUS_BILL,
        bill,
    }
}


//Đăng xuất
export const logOut=(id_User)=>{
    return{
        type:types.LOG_OUT,
        id_User
    }
}

// Set jwt token
export const setToken=(token) => {
    return {
        type: types.SET_TOKEN,
        token
    }
}

// Check is Admin
export const setAdmin=(isAdmin) => {
    return {
        type: types.SET_ADMIN,
        isAdmin
    }
}

// Check is Admin
export const loginCart=() => {
    return {
        type: types.LOGIN_CART,

    }
}
// Check is Admin
export const logoutCart=() => {
    return {
        type: types.LOGOUT_CART,

    }
}
export const getUserLogin=(user)=>{
    return {
        type: types.LOGIN_USER,
        user

    }
}




export const changeCartInDTB=(cart)=>{
    return callApi(`carts/create`,'post',{
        id_User:cart.id_User,
        products:cart.products
    })
}

//xử lý render list sản phẩm
export const fetchCartByIdUser=(cart)=>{

    return {
        type:types.FETCH_CART_BY_ID_USER,
        cart,//products=products
    }
}

//Lên API lấy dữ liệu products về
export const fetchCartByIdUserRequest=(id_User)=>{
    return (dispatch)=>{
        return callApi(`carts/${id_User}`,'GET',null)
                        .then(res=>{
                        
                            dispatch(fetchCartByIdUser(res.data));
                        })
    }
}