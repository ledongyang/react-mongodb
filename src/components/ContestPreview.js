import React, { Component } from 'react';

class ContestPreview extends Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  }

  render() {
    const {categoryName, contestName} = this.props;
    return (
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">
          {categoryName}
        </div>
        <div className="contest-name">
          {contestName}
        </div>
      </div>
    );
  }
}

ContestPreview.propTypes = {
  categoryName: React.PropTypes.string.isRequired,
  contestName: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default ContestPreview;
