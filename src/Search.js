import { useEffect, useState } from "react";

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

    return( <form onSubmit={handleSubmit}>
    <input name="query"></input>
    <button type="submit"> Search</button>
</form>
);
}



export function Search(){
const [searchQuery, setSearchQuery] = useState(""); 
const [searchResult, setSearchResult] = useState([]); 
const [error, setError] = useState(null); // for future implementation
const [loading, setLoading] = useState(false); // for future implementation

    

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
    .then((data) => setSearchResult(data.results))
    .then(() => {
        setLoading(false)
        console.log("loading", loading);
    });

    }
},   [searchQuery]);

    console.log("Search was ran", searchResult);

    return(
        <div>
            <SearchBar setSearchQuery={setSearchQuery}/>
            <div>
            <ul>
                            {searchResult.map((result) => (
                                <p key={result.id}>
                                    <strong>{result.name}</strong>
                                    <strong> {result.known_for_department}</strong> 
                                </p>
                            ))}
            </ul>    
            </div>
        </div> 
    );
}