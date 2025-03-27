const PetList = (props) => {

    console.log(props)

    return (
        <div className="sidebar-container">
            <h1>Pet List</h1>
            <div className="list-container">
                {!props.pets.length ? (
                    <h2>No Pets Yet</h2>
                ) : (
                <ul>
                    {props.pets.map((pet) => <li 
                        key={pet._id}
                        style={{cursor: 'pointer', color: 'blue'}}
                        onClick={() => props.handleSelect(pet)}
                        >{pet.name}
                        </li>)}
                </ul>
                )}

            </div>

            <button onClick = {props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'Add New Pet'}
            </button>

        </div>
    )
}

export default PetList