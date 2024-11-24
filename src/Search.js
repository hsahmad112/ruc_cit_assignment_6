import { useEffect, useState } from "react";

function handleSubmit(e, setSearchQuery){
    e.preventDefault(); //is required - otherwise response is sent to URL.
    console.log("setQuery received in handleSubmit:", setSearchQuery);

    const form = e.target; 
    //constructing response data format
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    setSearchQuery(formJson.query)
    return(formJson.query);        
}


export function SearchBar({setSearchQuery}){
    
    return(
    <form onSubmit={(e) => handleSubmit(e, setSearchQuery)}>
        <input name="query"></input>
        <button type="submit"> Search</button>
    </form>
  
    );
}

export function Search(){
const [searchQuery, setSearchQuery] = useState(""); //"" for string
const [searchResult, setSearchResult] = useState([]);
    

    useEffect(() => {
    if(searchQuery){
    fetch("https://api.themoviedb.org/3/search/person?query=" + searchQuery)
    .then((res) => res.json())
    .then((data) => setSearchResult(data.results));
    }
},   [searchQuery]);

    console.log("Search was ran", searchResult);

    return(
        <div>
            <SearchBar setSearchQuery={setSearchQuery}/>
            <div>{searchResult.map((results) => (
                <div> 
                <h2>{results.name}</h2>
                </div>))}
                </div>
        </div> 
    );
}