import React from 'react'

import Input from "../../Shared/Components/FormElements/Input"

import "../Styles/NewPlace.css"

const NewPlace = () =>{
	return (
		<form className="place-form">
			<Input element="input" type="text" label="Title" />
		</form>
	)
}

export default NewPlace