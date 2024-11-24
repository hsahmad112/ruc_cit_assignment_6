

export function Person({person}){ //component takes object person as a parameter
    return(<div> 
      <p> Name: {person.name} </p> {/*using the parameter object  to access values*/}
      <p> Job: {person.known_for_department} </p>
      <hr/>

    </div>);
}


