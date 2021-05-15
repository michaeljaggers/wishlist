import React, {Component} from 'react';

class WishListBanner extends Component {
  render = () =>
      <h4 className = "bg-primary text-white text-center p-2" >
      {this.props.name}'s Wish List
      ({this.props.wishes.filter(w => !w.Owned).length} items)
    </h4>
}

export default WishListBanner