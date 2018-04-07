import React, {Component} from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';
import { isError } from 'util';

const pushState = (obj, url) => {
  return window.history.pushState(obj, '', url);
};

const onPopState = (handler) => {
  window.onpopstate = handler;
};

class App extends Component {
  static propTypes = {
    initialData: React.PropTypes.object.isRequired
  }

  state = {...this.props.initialData, error: ''}

  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
    });
  }

  clearError = () => {
    this.setState({
      error: ''
    });
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );
    api.fetchContest(contestId)
        .then((contest) => {
          this.setState({
            currentContestId: contest._id,
            contests: {
              ...this.state.contests,
              [contest._id]: contest
            }
          });
        })
        .catch(console.error);
  }

  fetchContestList = () => {
    pushState(
      { currentContestId: null },
      '/'
    );
    api.fetchContestList()
        .then((contests) => {
          this.setState({
            currentContestId: null,
            contests
          });
        })
        .catch(console.error);
  }

  fetchNames = (nameIds) => {
    if (nameIds.length === 0) {
      this.setState({
        names: []
      });
      return;
    }
    api.fetchNames(nameIds).then((names) => {
      this.setState({
        names
      });
    })
    .catch(console.error);
  }

  lookUpNames = () => {
    if (this.state.names) {
      return Object.values(this.state.names);
    }
    return [];
  }

  currentContest = () => {
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader = () => {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    } else {
      return 'Naming Contest';
    }
  }

  addNewName = (newName, contestId) => {
    this.clearError();
    if (!newName) {
      this.setState({
        error: 'Please enter a valid name!'
      });
      return;
    }
    api.addNewName(newName, contestId).then((resp) => {
      if (isError(resp)) {
        this.setState({
          error: resp.toString()
        });
        return;
      }
      this.setState({
        contests: {
          ...this.state.contests,
          [resp.updatedContest._id]: resp.updatedContest
        },
        names: {
          ...this.state.names,
          [resp.newName._id]: resp.newName
        }
      });
    })
    .catch(console.error);
  }

  currentContent = () => {
    if (this.state.currentContestId) {
      return (
        <Contest
          error={this.state.error}
          addNewName={this.addNewName}
          fetchNames={this.fetchNames}
          lookUpNames={this.lookUpNames}
          contestListClick={this.fetchContestList}
          {...this.currentContest()}
        />
      );
    }
    return (
      <ContestList
        onContestClick={this.fetchContest}
        contests={this.state.contests}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <Header message={this.pageHeader()}/>
        {
          this.currentContent()
        }
      </div>
    );
  }
}

export default App;
