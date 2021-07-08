import React,{Component,Fragment} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
class InfoUser extends Component {
  render(){
      var {user}=this.props;
    return (
        <Fragment>
            <h2 className="text-center mb-4">Tài khoản của tôi</h2>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-6 d-flex align-items-center">
                            <h5 >Tài khoản của tôi:</h5>
                            </div>
                            <div className="col-6 d-flex text-center px-0">
                            <h5 className="text-info">{user.username}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                </div>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-6 d-flex align-items-center">
                            <h5 >Số điện thoại:</h5>
                            </div>
                            <div className="col-6 d-flex text-center px-0">
                            <h5 className="text-info">{user.phone}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                </div>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-6 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-6 d-flex align-items-center">
                            <h5 >Email:</h5>
                            </div>
                            <div className="col-6 d-flex text-center px-0">
                            <h5 className="text-info">{user.email}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 py-0 text-right px-0">
                    </div> 
                </div>
                <div className="row mx-0">   
                    <div className="col-3 py-0 text-right px-0">
                        
                    </div> 
                    <div className="col-9 px-0">
                        <div className="row form-group mx-0">
                            <div className="col-4 d-flex align-items-center">
                            <h5 >Địa chỉ:</h5>
                            </div>
                            <div className="col-8 d-flex text-center px-0">
                            <h5 className="text-info">{user.address}</h5>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="row mx-0">   

                    <div className="col-12 px-0 text-center mt-5">
                        <Link to={'/user/change-pasword'} className="btn btn-info">Thay đổi mật khẩu</Link>
                    </div>

                </div>
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

        }
    }
  export default connect(mapStateToProps,mapDispatchToProps)(InfoUser);

