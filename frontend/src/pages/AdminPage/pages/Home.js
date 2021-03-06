import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom'

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            allBillsCount: 0,
            processingBillsCount: 0,
            productCount: 0,
            categoryCount: 0,
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/bills/count'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    allBillsCount: res.data
                })
            }
        })

        axios({
            method: 'GET',
            url: '/api/bills/count?status=0'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    processingBillsCount: res.data
                })
            }
        })

        axios({
            method: 'GET',
            url: '/api/products/count?'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    productCount: res.data
                })
            }
        })

        axios({
            method: 'GET',
            url: '/api/categories/count'
        }).then(res => {
            if(res && res.status === 200) {
                this.setState({
                    categoryCount: res.data
                })
            }
        })
    }

    displayLoading = () => {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        let data = {
            name: document.getElementById('name').value,
            slug: document.getElementById('slug').value,
            desc: document.getElementById('desc').value
        }
        axios({
            method: 'POST',
            url: '/api/categories',
            data: data,
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res && res.status === 200) {
                alert("Th??m danh m???c th??nh c??ng!!!");
                document.getElementById('name').value = '';
                document.getElementById('slug').value = '';
                document.getElementById('desc').value = '';
            } else {
                alert("C?? l???i x???y ra, vui l??ng th??? l???i!!!");
            }
        }).catch(error => {
            if(error.response) {
                alert("L???i: " + error.response.data.message);
                this.setState({
                    loading: false
                });
            }
        })
    }

    render() {
        return (
            <Fragment>
                <div className="row mx-0">
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>????n h??ng ch??a x??? l??</h5>
                            <p>C?? {this.state.processingBillsCount} ????n h??ng ch??a x??? l??</p>
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>????n h??ng</h5>
                            <p>C?? t???ng c???ng {this.state.allBillsCount} ????n h??ng</p>
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>S???n ph???m</h5>
                            <p>C?? t???ng c???ng {this.state.productCount} s???n ph???m</p>
                        </div>
                    </div>
                    <div className="col-6 p-3">
                        <div className="box">
                            <h5>Danh m???c</h5>
                            <p>C?? t???ng c???ng {this.state.categoryCount} danh m???c</p>
                        </div>
                    </div>
                </div>
                { this.displayLoading() }
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ...state.authorization
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            dispatch(actions.setToken(token));
        },
        setAdmin: (isAdmin) => {
            dispatch(actions.setAdmin(isAdmin));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCategory));