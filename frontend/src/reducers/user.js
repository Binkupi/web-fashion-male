import * as types from'../constants/ActionTypes'
var result=localStorage.getItem('user');
var init_user=result?JSON.parse(result):{
    id_User: '',
     username:'',
     phone:'',
     address:'',
     email:'',
};

var initialState={
     id_User: init_user.id_User,
     username:init_user.username,
     phone:init_user.phone,
     address:init_user.address,
     email:init_user.email,
};

const user=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCH_USER_BY_ID:
            return action.user; 
        case types.LOGIN_USER:
            
            return action.user;  
        case types.LOG_OUT:
            
             var newUser={
                id_User:'',
                username:' ',
                phone:' ',
                address:' ',
                email:' ',
            }  
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            return newUser;       
        default:
            return state;
    }

}
export default user;