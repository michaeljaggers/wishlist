import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import WishListBanner from '../WishListBanner';
import WishListCreator from '../WishListCreator';
import WishItemRow from '../WishItemRow';
import VisibilityControl from '../VisibilityControl';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      wishes: [
        {
          WishID: 0,
          Wish: "iPhone 12 Pro",
          Owned: false
        },
        {
          WishID: 1,
          Wish: "Audi R5",
          Owned: false
        },
        {
          WishID: 2,
          Wish: "MacBook Pro",
          Owned: false
        },
        {
          WishID: 3,
          Wish: "Apple Watch",
          Owned: true
        }
      ],
      showOwned: true,
      key: 3
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
    },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  createNewWish = (wish) => {
    let currentKey = this.state.key;
    currentKey++;
    this.setState({ key: currentKey })
    
    if(!this.state.wishes.find(w => w.Wish === wish)) {
      let newItem = {
        WishID: currentKey,
        Wish: wish,
        Owned: false
      };

      // Axios.post() & setState()
      let updatedItems = this.state.wishes;
      updatedItems.push(newItem);
      this.setState({ wishes: updatedItems })
    }
  }

  toggleOwned = (wish) => {
    wish.Owned = !wish.Owned;
    // Axios.put() & setState()
    let updatedItems = this.state.wishes;
    let index = updatedItems.findIndex(w => w.WishID === wish.WishID);
    updatedItems[index] = wish;
    this.setState({ wishes: updatedItems });
  }

  deleteWish = (wish) => {
    // Axios.delete() & setState()
    let updatedItems = this.state.wishes;
    let index = updatedItems.findIndex(w => w.WishID === wish.WishID);
    updatedItems.splice(index, 1);
    this.setState({ wishes: updatedItems });
  }

  wishTableRows = (ownedValue) => {
    return this.state.wishes
      .filter(item => item.Owned === ownedValue)
      .map(item =>
          <WishItemRow
            item={item}
            callback={this.toggleOwned}
            key={item.WishID}
            deleteCallback={this.deleteWish}
          />
        )
  }

  render = () =>
    <Router>
      <WishListBanner name={this.state.userName} wishes={this.state.wishes} />
      <div>
        <Navigation authUser={this.state.authUser} />
        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
      <div className="container-fluid">
        <WishListCreator callback={this.createNewWish} />
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th>Item</th>
            <th>Owned</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.wishTableRows(false)}
        </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Owned Items"
            isChecked={this.state.showOwned}
            callback={(checked) => this.setState({showOwned: checked})}
          />
        </div>
        {this.state.showOwned &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Owned</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.wishTableRows(true)}
            </tbody>
          </table>
        }
      </div>
    </Router>
}

export default withFirebase(App);