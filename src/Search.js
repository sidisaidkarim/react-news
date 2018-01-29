import React,{Component} from 'react';

const Search = ({value,onchange,onsubmit,children})=>


      <form onSubmit={onsubmit} >
        <input type="text"
          value={ value} onChange={onchange}/>

          <button type="submit">{children}</button>
      </form>




export default Search;
