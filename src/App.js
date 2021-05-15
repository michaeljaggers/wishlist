import React, {Component} from 'react';
import WishListBanner from './components/WishListBanner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Michael',
      wishes: [
        {
          WishListID: 1,
          ItemName: 'Lawn Mower',
          Owned: false
        },
        {
          WishListID: 2,
          ItemName: 'VR Headset',
          Owned: false
        }
      ],
      showOwned: true
    }
  }

  render = () =>
    <div>
      <WishListBanner name={this.state.userName} wishes={this.state.wishes} />
    </div>
}

export default App;