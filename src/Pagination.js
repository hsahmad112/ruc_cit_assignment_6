export function Pagination({searchResultLen, currentPage, onpagechange}){

    return(<div>
        <h1>nav</h1>
        <p> len: {searchResultLen}</p>
        <button> previous </button>
        <button disabled> {currentPage}</button>
        {/* <button onClick={onpagechange}> next </button> */ /*this part makes it fail*/}

    </div>);
}