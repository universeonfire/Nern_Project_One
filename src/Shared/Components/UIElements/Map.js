import React from "react"


import "./Map.css"

const Map = props => {

	return(
		<div className = { `map ${props.className}`} style={props.style}>
			<h2>Dummy Google Map</h2>
			<p>I dont want to meddle with google api shenanigans</p>
		</div>
	)

}


export default Map