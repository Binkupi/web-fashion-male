import React,{Component,Fragment} from 'react';
import SearchContainer from '../../containers/SearchContainer';
import FilterNameContainer from '../../containers/FilterContainer/FilterNameContainer';
// import FilterContainer from '../../containers/FilterContainer/FilterContainer';
import SortContainer from '../../containers/SortContainer';
import ShopContainer from '../../containers/ShopContainer';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';
import callApi from '../../utils/apiCaller';

import * as actions from '../../actions/index'
class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:0,
            categoriesList: [],
            tagsList: [],
            pageNumber: 1,
            productsOnPage: 2,
            productsNumber: 0
        };
    }

    componentDidMount(){
        this.props.fetchProductsRequest(this.state.pageNumber * this.state.productsOnPage);
        this.props.getDataPage(this.state.page);
        callApi('categories', 'GET')
            .then(res => {
                if(res && res.status === 200)
                    this.setState({
                        categoriesList: res.data
                    });
            })
            .catch(err => {
                if(err && err.response)
                    alert(err.response.data);
            })
        callApi('tags', 'GET')
            .then(res => {
                if(res && res.status === 200)
                    this.setState({
                        tagsList: res.data
                    });
            })
            .catch(err => {
                if(err && err.response)
                    alert(err.response.data);
            })
        callApi('products/count', 'GET')
            .then(res => {
                if(res && res.status === 200) {
                    this.setState({
                        productsNumber: res.data
                    });

                    if(this.props.products.length === res.data)
                        document.getElementById("loadMoreBtn").setAttribute('disabled', true);
                }
            })
            .catch(err => {
                if(err && err.response)
                    alert(err.response.data);
            })
    }

    displayFilterCategories = () => {
        return this.state.categoriesList.map((category,index) => {
            return (
                <li key={index}><Link type="button" to={`/shop/categories?value=${ category.name }`}>{ category.name }</Link></li>
            )
        })
    }

    displayFilterTags = () => {
        return this.state.tagsList.map((tag,index) => {
            return (
                <Link key={index} type="button" to={`/shop/tags?value=${ tag.name }`}>{ tag.name }</Link>
            )
        })
    }

    loadMoreProducts = event => {
        event.preventDefault();
        
        const limit = (this.state.pageNumber + 1) * this.state.productsOnPage;
        this.props.fetchProductsRequest(limit);

        this.setState({
            pageNumber: this.state.pageNumber + 1
        })
    }

    componentDidUpdate() {
        if(this.state.productsNumber <= this.state.productsOnPage * this.state.pageNumber)
            document.getElementById("loadMoreBtn").setAttribute('disabled', true);
        else 
            document.getElementById("loadMoreBtn").removeAttribute('disabled');
    }

    
    render(){
        return (
            <Fragment>
                <Helmet>
                    <title>Cửa hàng</title>
                </Helmet>
                
                {/* <!-- Breadcrumb Section Begin --> */}
                <section className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__text">
                                    <h4>Cửa hàng</h4>
                                    <div className="breadcrumb__links">
                                        <a href="/#" >Trang chủ</a>
                                        <span>Cửa hàng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Breadcrumb Section End --> */}

                {/* <!-- Shop Section Begin --> */}
                <section className="shop spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="shop__sidebar">
                                    <div className="shop__sidebar__search">
                                        < FilterNameContainer history={this.props.history}/>
                                    </div>
                                    <div className="shop__sidebar__accordion">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a href="/#" data-toggle="collapse" data-target="#collapseOne">Thể loại</a>
                                                </div>
                                                <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="shop__sidebar__categories">
                                                        <ul className="nice-scroll">
                                                            { this.displayFilterCategories() }
                                                        </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="card">
                                                <div className="card-heading">
                                                    <a href="/#" data-toggle="collapse" data-target="#collapseTwo">Nhãn hiệu</a>
                                                </div>
                                                <div id="collapseTwo" className="collapse show" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="shop__sidebar__brand">
                                                            <ul>
                                                                <li><Link type="button" to={`/shop/branding?value=Louis Vuitton`}>Louis Vuitton </Link></li>
                                                                <li><Link type="button" to={`/shop/branding?value=Chanel`}>Chanel </Link></li>
                                                                <li><Link type="button" to={`/shop/branding?value=Hermes`}>Hermes </Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>              */}
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a href="/#" data-toggle="collapse" data-target="#collapseFour">Kích thước</a>
                                                </div>
                                                <div id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="shop__sidebar__size">
                                                            <Link type="button" to={`/shop/sizes?value=XS`}>
                                                                <label >xs
                                                                    <input type="radio" id="xs"/>
                                                                </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/sizes?value=S`}>
                                                                <label >s
                                                                    <input type="radio" id="s"/>
                                                                </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/sizes?value=M`}>
                                                                <label >m
                                                                    <input type="radio" id="m"/>
                                                                </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/sizes?value=L`}>
                                                                <label >l
                                                                    <input type="radio" id="l"/>
                                                                </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/sizes?value=XL`}>
                                                                <label >xl
                                                                    <input type="radio" id="xl"/>
                                                                </label>
                                                            </Link>
                                                            {/* <Link type="button" to={`/shop/sizes?value=2XL`}>
                                                                <label >2xl
                                                                    <input type="radio" id="2xl"/>
                                                                </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/sizes?value=3XL`}>
                                                                <label >3xl
                                                                    <input type="radio" id="3xl"/>
                                                                </label>
                                                            </Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="card">
                                                <div className="card-heading">
                                                    <a data-toggle="collapse" href="/#" data-target="#collapseFive">Colors</a>
                                                </div>
                                                <div id="collapseFive" className="collapse show" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="shop__sidebar__color">
                                                            <Link type="button" to={`/shop/colors?value=black`}>
                                                            <label className="c-1" >
                                                                <input type="radio" id="sp-1"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=blue`}>
                                                            <label className="c-2" >
                                                                <input type="radio" id="sp-2"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=orange`}>
                                                            <label className="c-3" >
                                                                <input type="radio" id="sp-3"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=cinereous`}>
                                                            <label className="c-4" >
                                                                <input type="radio" id="sp-4"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=gray`}>
                                                            <label className="c-5" >
                                                                <input type="radio" id="sp-5"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=pink`}>
                                                            <label className="c-6" >
                                                                <input type="radio" id="sp-6"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=violet`}>
                                                            <label className="c-7" >
                                                                <input type="radio" id="sp-7"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=red`}>
                                                            <label className="c-8" >
                                                                <input type="radio" id="sp-8"/>
                                                            </label>
                                                            </Link>
                                                            <Link type="button" to={`/shop/colors?value=white`}>
                                                            <label className="c-9" >
                                                                <input type="radio" id="sp-9"/>
                                                            </label>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="card">
                                                <div className="card-heading">
                                                    <a href="/#" data-toggle="collapse" data-target="#collapseSix">Nhãn</a>
                                                </div>
                                                <div id="collapseSix" className="collapse show" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="shop__sidebar__tags">
                                                            { this.displayFilterTags() }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="shop__product__option">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            {/* <div className="shop__product__option__left">
                                                <p>Showing 1–12 of 126 results</p>
                                            </div> */}
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <SortContainer />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    < ShopContainer history={this.props.history}/>
                                </div>
                                
                                <button className="btn btn-danger d-block mx-auto" id="loadMoreBtn" onClick={ this.loadMoreProducts }>
                                        Hiển thị thêm
                                </button>
                                {/* <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product__pagination">
                                            <a href="/#" className="active">1</a>
                                            <a href="/#" >2</a>
                                            <a href="/#" >3</a>
                                            <span>...</span>
                                            <a href="/#" >21</a>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Shop Section End --></div> */}
                <SearchContainer history={this.props.history}/>
            </Fragment>
        );
    }
  
}
const mapStateToProps=(state)=>{
    return {
        products:state.products,
        page:state.page
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        fetchProductsRequest:(limit, skip)=>{
            dispatch(actions.fetchProductsRequest(limit, skip));
        },
        getDataPage:(data)=>{
            dispatch(actions.getDataPage(data));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);
