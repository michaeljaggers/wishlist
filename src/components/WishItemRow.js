import React, {Component} from 'react';

export default class WishItemRow extends Component {
  render = () =>
  <tr>
    <td>{this.props.item.Item}</td>
    <td>
      <input
        type="checkbox"
        checked={this.props.item.Owned}
        onChange={() => this.props.callback(this.props.item)}
      />
    </td>
    <td>
      <input
        type="button"
        className="btn btn-danger"
        onClick={() => this.props.deleteCallback(this.props.item)}
        value="Delete"
      />
    </td>
  </tr>
}