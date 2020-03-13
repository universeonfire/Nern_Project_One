import React from 'react'
import {Link} from 'react-router-dom';

import Avatar from '../../Shared/Components/UIElements/Avatar';
import Card from '../../Shared/Components/UIElements/Card';

import '../Styles/UserItem.css'

const UserItem = props => {
	return(
		<li className = "user-item">
			<Card className = "user-item__content">
				<Link to={`/${props.id}/places`}>
					<div className= "user-item_image">
						<Avatar image= {props.image} alt = {props.name}/>
					</div>
					<div className = "user-item__info">
						<h2>{props.name}</h2>
						<h3>{props.placeCount} {props.placeCount > 1 ? "Places": "Place" } </h3>
					</div>
				</Link>
			</Card>
		</li>
	)
	
}

export default UserItem