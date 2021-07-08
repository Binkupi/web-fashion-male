import React, { Component } from 'react';
import IndexPage from './pages/HomePage/IndexPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ShopPage from './pages/ShopPage/ShopPage';
import CartPage from './pages/PaymentPage/CartPage';
import AdminPage from './pages/AdminPage/MainPage';
import Test from './pages/AdminPage/test';
import CheckoutPage from './pages/PaymentPage/CheckoutPage';
import UserPage from './pages/UserPage/UserPage';
import LoginPage from './pages/LoginRegisterPage/LoginPage'
import RegisterPage from './pages/LoginRegisterPage/RegisterPage'
import ShopDetailsPage from './pages/ShopDetailsPage/ShopDetailsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import $ from 'jquery';
// import routes from './routes'

class App extends Component {
  componentDidMount() {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  }

  render() {
    
    return (
      <Router>
          <div className="App">
            <ScrollToTop /> 
            { ((this.props.location.pathname.indexOf('/admin') === -1) ? <Header /> : '') }
            <Switch>
              <Route exact path="/" component={({ match, history }) => <IndexPage match={match} history={history} />} />
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route exact path="/shop/cart">
                <CartPage />
              </Route>
              <Route path="/shop" exact component={({ match, history }) => <ShopPage match={match} history={history} />} />
              <Route path="/shop/:filter" component={({ match, history }) => <ShopPage match={match} history={history} />} />
              <Route path="/payment" component={({ match, history }) => <CheckoutPage match={match} history={history} />} />
              <Route path='/contact'>
                <ContactPage />
              </Route>
              <Route path='/user' component={({ match, history }) => <UserPage match={match} history={history} />}>
              </Route>
              <Route path='/admin'>
                <AdminPage />
              </Route>
              <Route path='/login'>
                <LoginPage />
              </Route>
              <Route path='/register'>
                <RegisterPage />
              </Route>
              <Route path='/admin'>
                <AdminPage />
              </Route>
              {/* <Route path='/info'>
                <ShopDetailsPage />
              </Route> */}
              <Route path='/test'>
                <Test />
              </Route>
              <Route path="/:sku" strict render={({ match, history }) => <ShopDetailsPage match={match} history={history}/>} />
            </Switch>
            { ((this.props.location.pathname.indexOf('/admin') === -1) ? <Footer /> : '') }
          </div>
      </Router>
    )
   
  }

}

export default withRouter(App);
