import { useEffect, useState } from "react";
import { Person } from "./Person";
import { Pagination } from "./Pagination";

export function Search(){

const [searchQuery, setSearchQuery] = useState(""); 
const [searchResult, setSearchResult] = useState([]); 
const [error, setError] = useState(null); // for future implementation
const [loading, setLoading] = useState(false); // for future implementation

const [currentPage, setCurrentPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);
    
const onPageChange = (newPage) => {
    setCurrentPage(newPage); // Update the page number
  };
    

    useEffect(() => {
    if(searchQuery){ //ensuring a search query is inserted before running
    setLoading(true); //inital value
    setError(null); //inital value
    fetch('https://api.themoviedb.org/3/search/person?query=' + searchQuery + '&api_key=8911b69eaf88ea62279989b1376e0fc2')
        .then((res) =>{ if(!res.ok) { //Response .ok is boolean to check what the status code of response is  
            //https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
        throw new Error ("Fetching results failed");
    }

    return res.json();
    })
    .then((data) => {setSearchResult(data.results);
        setTotalResults(data.results.length); 
    })
    .then(() => {
        setLoading(false);
        console.log("loading", loading);
    });
    }
},   [searchQuery, currentPage]);

    
    console.log("Search was ran", searchResult);
    console.log("search result count", totalResults);
   
    return(
        <div>
            <SearchBar setSearchQuery={setSearchQuery}/>
            <div>
            <ul>
                            {searchResult.map((result) => (
                                <div key={result.id}>
                                    <Person person={result}/>
                              
                                </div>
                                
                            ))}
            </ul>    
            <Pagination searchResultLen = {totalResults} currentPage={ currentPage} onpagechange={onPageChange}/>
            </div>
        </div> 
    );
}


function SearchBar({setSearchQuery}){
    
    const handleSubmit = (e) => {
        e.preventDefault(); //is required - otherwise response is sent to URL.
       
    
        const form = e.target; 
    
        //constructing response data format
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        console.log("The query submitted is:", formJson.query);
        setSearchQuery(formJson.query);
        }
    
        return( 
    
    <div>
    <h3>Person Search</h3>
    
    <form onSubmit={handleSubmit}>
        <input name="query"></input>
        <button type="submit"> Search</button>
    </form>
    </div>
    
    );
    }
    

    