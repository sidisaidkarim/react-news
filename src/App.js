import React, { Component } from 'react';

import './App.css';
import Search from './Search';
import Table from './Table';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH ='query=';
const PARAM_PAGE ='page='




class App extends Component {

  constructor(props){
    super(props);
    this.state={searchTerm:DEFAULT_QUERY,result:null,};

    this.setSearchTopStoris = this.setSearchTopStoris.bind(this);
    this.fetchSearchStories = this.fetchSearchStories.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.dismiss= this.dismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(event){
    const {searchTerm}= this.state;
    this.fetchSearchStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStoris(result){
    const {hits, page}= result;
    const oldHits = page !== 0
    ? this.state.result.hits
    : [];
    const updatedHits=[
      ...oldHits,
      ...hits
    ];
    this.setState({
      result:{hits:updatedHits,page}
    });
  }

  fetchSearchStories(searchTerm,page=0){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStoris(result))
    .catch(e=>e)
  }
  componentDidMount(){
    const {searchTerm}= this.state;
    this.fetchSearchStories(searchTerm);

  }

   dismiss(key){
    const isNotId = e=>e.objectID !== key
     const updatedHits = this.state.result.hits.filter(isNotId);
     this.setState({
     result:{...this.state.result,hits:updatedHits}
     })
   }

   handleChange(event){
   this.setState({searchTerm:event.target.value})
   }
    render() {

      const {searchTerm,result}= this.state;
      const page = (result && result.page) || 0 ;

      return (
        <div className="page">
        <div className="intercation">
          <Search  value={searchTerm} onchange={this.handleChange}
            onsubmit={this.onSearchSubmit} >search </Search>
         </div>
        { result
          ?<Table  list={result.hits}
           dismiss={this.dismiss}  >dismiss
          </Table>
           : null
        }
        <button onClick={()=>this.fetchSearchStories(searchTerm,page+1)
        }>More</button>
        </div>
      );
    }
}

export default App;
