import React, { Component } from 'react';

import { withAuthorization } from '../Session';

import WishListCreator from '../WishListCreator';
import WishItemRow from '../WishItemRow';
import VisibilityControl from '../VisibilityControl';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      wishes: [{
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
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);