import React, { Component } from 'react';
import Data from './Data';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

library.add(faArrowRight,faArrowLeft);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 3,
      currentPage: 0,
      pageComments: [],
      pageNo:1,
    }
  }

  componentDidMount() {
    this.onPage('load')
  }

  onPage(navState) {
    switch (navState) {
      case 'prev':
      if (this.state.currentPage - 3 >= 0) {
        this.setState({
          currentPage: this.state.currentPage - 3,
          pageNo: this.state.pageNo - 1,
          pageComments: [...Data].splice(this.state.currentPage - 3, this.state.pageSize)
        })
      }
        break;
      case 'next':
        if (this.state.currentPage + 3 <= Data.length) {
          this.setState({
            currentPage: this.state.currentPage + 3,
            pageNo: this.state.pageNo + 1,
            pageComments: [...Data].splice(this.state.currentPage + 3, this.state.pageSize)
          })
        }
        break;
      default:
        this.setState({
          currentPage: 0,
          pageComments: [...Data].splice(this.state.currentPage, this.state.pageSize)
        })
        break;
    }

  }
  render() {
    return (
      <div className="App">
        <h1>Comments</h1>

        {this.state.pageComments.map((comment,index) =>
          <div key={comment.id} className="comment">
            <div className="img-circle">
              <img src={comment.avatarUrl} alt="each-img" width="64" />
            </div>
            <div className="comment-info">
              <h4>{comment.name}</h4>
              <p>{comment.message}</p>
            </div>
          </div>
        )}

        <div className="paginator">
          <div className="page-range">{0}{this.state.pageNo}&nbsp;/&nbsp;{0}{Data.length / this.state.pageSize}</div>
          <div className="page-nav">
            <h4><FaArrowLeft color={this.state.pageNo === 1 ? 'darkkhaki' : 'black'} onClick={() => this.onPage('prev')}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaArrowRight color={this.state.pageNo === 4 ? 'darkkhaki' : 'black'} onClick={this.state.pageNo != 4 ?() => this.onPage('next'):null}/></h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
