import React, {Component} from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

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

  state = this.props.initialData

  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
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
            currentContestId: contest.id,
            contests: {
              ...this.state.contests,
              [contest.id]: contest
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

  currentContent = () => {
    if (this.state.currentContestId) {
      return (
        <Contest
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
