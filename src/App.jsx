import { useState, useEffect } from "react";

import './App.css'

import * as petService from './services/petService'
import PetList from "./components/PetList/PetList";
import PetDetail from "./components/PetDetail/PetDetail";
import PetForm from "./components/PetForm/PetForm";

const App = () => {
  const [pets, setPets] = useState ([])
  const [selected, setSelected] = useState (null)
  const [isFormOpen, setIsFormOpen] = useState (false)

  const handleSelect = (pet) => {
    setSelected(pet)
  }

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddPet = async (FormData) => {
    try {
      const newPet = await petService.create(FormData)

      if (newPet.Err) {
        throw new Error(newPet.Err)
      }

      setPets([...pets, newPet])
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId)

      if (updatedPet.err) {
        throw new Error(updatedPet.err)
      }

      const updatedPetList = pets.map((pet) => (
        pet._id !== updatedPet._id ? pet : updatedPet
      ))

      setPets(updatedPetList)
      setSelected(updatedPet)
      setIsFormOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeletePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }

      setPets(pets.filter((pet) => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index()

        if (fetchedPets.err) {
          throw new Error (fetchedPets.err)
        }

        setPets(fetchedPets)
      } catch (err) {
        console.log(err)
      }

    }
    fetchPets();

  }, [])

  return (
    <>
      <PetList 
        pets={pets} 
        handleSelect = {handleSelect} 
        handleFormView = {handleFormView}
        isFormOpen={isFormOpen}
        />
        
        {isFormOpen ? (
          <PetForm 
            selected = {selected} 
            handleAddPet = {handleAddPet} 
            handleUpdatePet = {handleUpdatePet}
          />
        ) : (
          <PetDetail 
            selected = {selected} 
            handleFormView = {handleFormView}
            handleDeletePet = {handleDeletePet}
          />
        )}
      
      
    </>
  )
};

export default App;
