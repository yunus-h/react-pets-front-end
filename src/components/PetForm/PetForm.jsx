import { useState } from "react"

const PetForm = (props) => {

    const initialState = {
        name: '',
        age: '',
        breed: '',
    }

    const [formData, setFormData] = useState (props.selected? props.selected : initialState)

    const handleChange = (event) => {
        setFormData ({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (props.selected) {
            props.handleUpdatePet(formData, props.selected._id)
        } else {
            props.handleAddPet(formData)
        }
       
  
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Pet Form</h1>
                <label htmlFor="name">Name: </label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value= {formData.name}
                    onChange = {handleChange} 
                />
                <br />
                <label htmlFor="age">Age: </label>
                <input 
                    type="number"
                    id="age"
                    name="age"
                    value= {formData.age}
                    onChange = {handleChange} 
                />
                <br />
                <label htmlFor="breed">Breed: </label>
                <input 
                    type="text"
                    id="breed"
                    name="breed"
                    value= {formData.breed}
                    onChange = {handleChange} 
                />
                <br />

                <button type="submit">
                    {props.selected ? 'Update Pet' : 'Add new pet'}
                </button>
            </form>
        </div>
        
        
    )
}

export default PetForm