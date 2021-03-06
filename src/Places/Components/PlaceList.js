import React from "react";

import Card from '../../Shared/Components/UIElements/Card';
import PlaceItem from "./PlaceItem"

import "../Styles/PlaceList.css"

const PlaceList = props => {
	if(props.items.length === 0){
		return (
			<div className= "place-list center"> 
				<Card> 
					<h2>No Places Found!</h2> 
					<button> Share Place </button>
				</Card> 
			</div>
		)
	}
	return (
		<ul className = "place-list"> 
			{props.items.map(place=> <PlaceItem 
				key={place._id} 
				id = {place._id} 
				title = {place.title}
				image={place.image} 
				description = {place.description}
				address = {place.address} 
				creatorId = {place.creator} 
				coordinates= {place.location} 
				onDelete={props.onPlaceDelete}
				/>
			)}
		</ul>
	)

}

export default PlaceList