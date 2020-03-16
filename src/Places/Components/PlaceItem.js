import React, {useState, useContext} from "react"

import Card from '../../Shared/Components/UIElements/Card';
import Modal from '../../Shared/Components/UIElements/Modal';
import Map from '../../Shared/Components/UIElements/Map';
import Button from '../../Shared/Components/FormElements/Button';
import { AuthContext } from '../../Shared/Context/Auth-Context';

import "../Styles/PlaceItem.css"

const PlaceItem = props => {
	const authContext = useContext(AuthContext);
	
	const [showMap, setShowMap] = useState(false)

	const [showConfirmModal ,setShowConfirmModal] =   useState(false)

	const openMap = () => setShowMap(true)
	 
	const closeMap = () => setShowMap(false)

	const showDeleteWarningHandler = () => setShowConfirmModal(true)

	const closeDeleteWarningHandler = () => setShowConfirmModal(false)

	return(
		<React.Fragment>
		<Modal 
			show={showMap} 
			onCancel={closeMap} 
			header = {props.address} 
			contentClass = "place-item__modal-content" 
			footerClass= "place-item__modal-actions" 
			footer={<Button onClick={closeMap}>Close</Button>}
		>
			<div className="map-container">
				<Map/>
			</div>
		</Modal>
		<Modal 
			show={showConfirmModal} 
			onCancel={closeDeleteWarningHandler} 
			header= "Are you sure?" 
			footerClass="place-item__modal-actions"
		>
			<React.Fragment>
				<p>Deleted datas can not be reversed!!</p>
				<Button inverse onClick={closeDeleteWarningHandler}> Cancel </Button>
				<Button danger> Delete </Button>
			</React.Fragment>
		</Modal>
		<li className="place-item">
			<Card className="place-item__content">
				<div className = "place-item__image">
					<img src={props.image} alt = {props.title} />
				</div>
				<div className="place-item__info">
					<h2>{props.title}</h2>
					<h3>{props.address}</h3>
					<p>{props.description}</p>
				</div>
				<div className="place-item__actions">
					<Button inverse onClick={openMap}> View on map</Button>
					{authContext.isLoggedIn &&
					<Button to={`/places/${props.id}`}> Edit </Button>
					}
					{authContext.isLoggedIn &&
					<Button danger onClick={showDeleteWarningHandler}> Delete </Button>
					}					
				</div>
			</Card>
		</li>	
		</React.Fragment>
	)

}

export default PlaceItem