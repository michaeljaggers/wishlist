import React, { Component } from 'react'

export default class WishListCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { newWishText: '' };
  }

  updateNewValue = (e) => {
    this.setState({ newWishText: e.target.value });
  }

  createNewWish = () => {
    this.props.callback(this.state.newWishText);
    this.setState({ newWishText: '' });
  }

  render = () =>
  <div className="my-1">
    <input className="form-control" value={this.state.newWishText} onChange={this.updateNewValue} placeholder="Enter item" />
    <button className="btn btn-block btn-primary mt-1" onClick={this.createNewWish}>Add Item</button>
  </div>
}