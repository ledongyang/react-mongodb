import React, { Component } from 'react';

class Contest extends Component {

  componentDidMount() {
    const {fetchNames, nameIds} = this.props;
    fetchNames(nameIds);
  }

  render() {
    const {description, contestListClick, lookUpNames} = this.props;
    const names = lookUpNames();
    return (
      <div className="Contest">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Contest Description</h3>
          </div>
          <div className="panel-body">
            <div className="contest-description">
              {description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {
                names.map((name) => {
                  return <li key={name.id} className="list-group-item">{name.name}</li>;
                })
              }
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="input-group">
                <input type="text" placeholder="New Name Here..." className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="home-link link"
             onClick={contestListClick}>
          Contest List
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  description: React.PropTypes.string.isRequired,
  contestListClick: React.PropTypes.func.isRequired,
  fetchNames: React.PropTypes.func.isRequired,
  nameIds: React.PropTypes.array.isRequired,
  lookUpNames:  React.PropTypes.func.isRequired
};

export default Contest;
