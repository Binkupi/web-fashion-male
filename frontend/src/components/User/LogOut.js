import React,{Component,Fragment} from 'react';
import * as actions from './../../actions'
import {connect} from 'react-redux'
class LogOut extends Component {
    onClick=()=>{
        var {user,history}=this.props;
        this.props.onLogOut(user.id_User);
        this.props.logoutCart();
        this.props.setToken('');
        history.replace('/');
    }
  render(){
      var {user}=this.props;
    return (
        <Fragment>
            <h2 className="text-center mb-4">Đăng xuất</h2>
            <form >
                <div className="row mx-0">   
                    <div className="col-2 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-8 px-0 text-center">
                        <h3 class="text-info">Xin chào: {user.username}</h3>
                        
                    </div>
                    <div className="col-2 py-0 text-right px-0"> 
                    </div> 
                </div>
                <div className="row mx-0">
                    <div className="col-4 py-0 text-right px-0">
                        
                    </div>       
                    <div className="col-4 py-0 text-center px-0">
                        <button type="button" onClick={this.onClick} className="btn btn-success">Đăng xuất</button>
                    </div>
                    <div className="col-4 py-0 text-right px-0">
                        
                    </div>    
                </div>     
            </form>
        </Fragment>
        
    );
  }
  
}

const mapStateToProps=(state)=>{
    return {
        user:state.user,
        
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
       onLogOut:(id_User)=>{
            dispatch(actions.logOut(id_User));
        },
        setToken: (token) => {
            dispatch(actions.setToken(token));
        },
        logoutCart:() => {
            dispatch(actions.logoutCart());
        }
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
