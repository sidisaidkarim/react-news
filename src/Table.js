import React,{Component} from 'react';


const Table =({list,dismiss,children}) =>


     <div className="table">
        {list.map(e=>
          <div key={e.objectID} >
            <h2>{e.title}</h2>
                <span>{e.author}</span><br/>
                <a href={e.url}>{e.url}</a><br/>
                <button
                  onClick={()=>dismiss(e.objectID)}>
                  {children}
                </button>
          </div>)}
      </div>


export default Table;
