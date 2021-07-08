import React, { Component } from 'react';
import SDBreadcrumb from './SD_Breadcrumb';
import SDPictures from './SD_Pictures';
import SDProductDetails from './SD_ProductDetails';
import SDProductDetailsTab from './SD_ProductDetailsTab';

class SD_DetailsSection extends Component {
    render() { 
        
        let options = [];
        if (this.props.product.options)
            options = this.props.product.options; 
        return (
            <section className="shop-details"> 
                <div className="product__details__pic">
                    <div className="container">
                        <SDBreadcrumb product={this.props.product}/>
                        <SDPictures images={this.props.product.images}/>
                    </div>
                </div>
                <div className="product__details__content">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <SDProductDetails  product={this.props.product} options={options}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <SDProductDetailsTab product={this.props.product}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SD_DetailsSection;