import React, { Component,Fragment } from 'react';
import SDDetailsSection from './SD_DetailsSection';
import SDRelatedSection from './SD_RelatedSection';
import $ from 'jquery';
import {Helmet } from 'react-helmet'
import axios from 'axios'; 
import ScrollToTop from '../../components/ScrollToTop';


class ShopDetailsPage extends Component { 

    // componentDidUpdate() {
    //     {ScrollToTop}
    // }

    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            product: {},
            sku:'',
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.sku !== prevState.sku) {
            return {sku: nextProps.match.params.sku};
            
        }
        
        return null;
    }
    
    componentDidUpdate(prevProps, prevState) {
        
        const {sku} = this.props.match.params;
        if (prevProps.match.params.sku !== sku) {
            var product={};
            var listProduct=[];
            if(this.props.match && this.props.match.params.sku){ 
                // window.location.reload();
                axios({
                    method: 'GET',
                    url: `/api/products/${this.props.match.params.sku}`
                }).then(response => {
                    if(response && response.status === 200) {
                        
                            product= response.data;
                            axios({
                                method: 'GET',
                                url: '/api/products',
                            }).then(response => {
                                if(response && response.status === 200) {
                                    
                                        listProduct= response.data;
                                        this.setState({
                                            listProduct: listProduct,
                                            product: product
                                        })
                                    
                                }
                            })
                           
                            
                        
                    }
                });
                
            }
            
        }
    }
    
    componentDidMount() { 

        // window.location.reload();
        var product={};
        var listProduct=[];
        if(this.props.match && this.props.match.params.sku){ 
            
            // window.location.reload();
            axios({
                method: 'GET',
                url: `/api/products/${this.state.sku}`
            }).then(response => {
                if(response && response.status === 200) {
                    
                        product= response.data;
                        axios({
                            method: 'GET',
                            url: '/api/products',
                        }).then(response => {
                            if(response && response.status === 200) {
                                
                                    listProduct= response.data;
                                    this.setState({
                                        listProduct: listProduct,
                                        product: product
                                    })
                                
                            }
                        })
                       
                        
                    
                }
            });
            
        }
        

        
        /*------------------
        Background Set
        --------------------*/

        $('.set_bg').each(function () {
            var bg = $(this).data('setbg'); 
            $(this).css('background-image', 'url(' + bg + ')');
        });

        /*-------------------
		Quantity change
        --------------------- */
        
        var proQty = $('.pro-qty');
        proQty.prepend('<span class="fa fa-angle-up dec qtybtn"></span>');
        proQty.append('<span class="fa fa-angle-down inc qtybtn"></span>');
        proQty.on('click', '.qtybtn', function () {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            var newVal ;
            if ($button.hasClass('inc')) {
                 newVal = parseFloat(oldValue) - 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                     newVal = parseFloat(oldValue) + 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });
    }


    render() { 
            return (
                <Fragment> 
                    
                    {/* <!-- Shop Details Section Begin --> */} 
                        <SDDetailsSection product={this.state.product}/> 
                    {/* <!-- Shop Details Section End --> */}

                    {/* <!-- Related Section Begin --> */}
                        <SDRelatedSection listProduct={this.state.listProduct} history={this.props.history}/>
                    {/* {/* <!-- Related Section End --> */}
                </Fragment>
            );


    }
}

export default ShopDetailsPage;