import React, {Component} from 'react';
import Axios from 'axios';
import './App.css';
import WishListBanner from './components/WishListBanner';
import WishListCreator from './components/WishListCreator';
import WishItemRow from './components/WishItemRow';
import VisibilityControl from './components/VisibilityControl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Michael',
      wishes: [],
      showOwned: true
    }
  }

  componentDidMount = () => {
    // Get
  }

  createNewWish = (wish) => {
    if(!this.state.wishes.find(w => w.Item === wish)) {
      let newItem = {
        Item: wish,
        Owned: false
      };

      // Post
    }
  }

  toggleOwned = (wish) => {

    // Put
  }

  deleteWish = () => {
    // Delete
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
    <div>
      <WishListBanner name={this.state.userName} wishes={this.state.wishes} />
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
    </div>
}