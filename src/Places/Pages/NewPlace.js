import React, {useCallback} from 'react'

import Input from "../../Shared/Components/FormElements/Input"
import {VALIDATOR_REQUIRE , VALIDATOR_MINLENGTH} from "../../Shared/Util/Validators"

import "../Styles/NewPlace.css"

const NewPlace = () =>{

	const titleInputHandler = useCallback((id,value,isValid) => {
		 
	},[]);

	const descriptionInputHandler = useCallback((id,value,isValid) => {
		 
	},[]);

	return (
		<form className="place-form">
			<Input id = "title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} onInput={titleInputHandler} errorText="Please enter valid title!"  />
			<Input id = "description" element="textarea"   label="Description" validators={[VALIDATOR_MINLENGTH(5)]} onInput={descriptionInputHandler}  errorText="Description must be at least 5 characters"  />
		</form>
	)
}

export default NewPlace