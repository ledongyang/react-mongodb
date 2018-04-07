import React, { Component } from 'react';

class Contest extends Component {

  componentDidMount() {
    const {fetchNames, nameIds} = this.props;
    fetchNames(nameIds);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {addNewName, _id} = this.props;
    let newName = this.refs.newNameInput.value;
    addNewName(newName, _id);
    this.refs.newNameInput.value = '';
  }

  render() {
    const {description, contestListClick, lookUpNames, error} = this.props;
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
                  return <li key={name._id} className="list-group-item">{name.name}</li>;
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
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="New Name Here..."
                  className="form-control"
                  ref="newNameInput"/>
                <span className="input-group-btn">
                  <button
                    type="submit"
                    className="btn btn-info"
                  >Sumbit</button>
                </span>
              </div>
              {error && <div style={{color: 'red'}}>{error}</div>}
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
  lookUpNames:  React.PropTypes.func.isRequired,
  addNewName: React.PropTypes.func.isRequired,
  _id: React.PropTypes.string.isRequired,
  error: React.PropTypes.string.isRequired,
};

export default Contest;
