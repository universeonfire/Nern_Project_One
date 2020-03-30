import React, {useState, useContext} from "react"
import {useHistory} from "react-router-dom";
import axios from "axios";

import Card from '../../Shared/Components/UIElements/Card';
import Modal from '../../Shared/Components/UIElements/Modal';
import Map from '../../Shared/Components/UIElements/Map';
import Button from '../../Shared/Components/FormElements/Button';
import { AuthContext } from '../../Shared/Context/Auth-Context';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';

import "../Styles/PlaceItem.css"

const PlaceItem = props => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const authContext = useContext(AuthContext);
	
	const [showMap, setShowMap] = useState(false)

	const [showConfirmModal ,setShowConfirmModal] =   useState(false)

	const openMap = () => setShowMap(true)
	 
	const closeMap = () => setShowMap(false)

	const showDeleteWarningHandler = () => setShowConfirmModal(true)

	const closeDeleteWarningHandler = () => setShowConfirmModal(false)

	const deletePlaceHandler = async event =>{
		setShowConfirmModal(false)
		setIsLoading(true);
		await axios.delete(`http://localhost:5000/api/places/${props.id}`).then(res=>{
			setIsLoading(false);
			props.onDelete(props.id);
		}).catch(error=>{
			setIsLoading(false);
			setError(error.message);
		})
	}

	const errorHandler = () => {
		setError(null);
	}; 

	return(
		<React.Fragment>
		<ErrorModal error={error} onClear={errorHandler} />	
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
				<Button danger onClick={deletePlaceHandler}> Delete </Button>
			</React.Fragment>
		</Modal>
		<li className="place-item">
			<Card className="place-item__content">
				{isLoading && <LoadingSpinner asOverlay />} 
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
					{authContext.isLoggedIn && authContext.userId === props.creatorId &&
					<Button to={`/places/${props.id}`}> Edit </Button>
					}
					{authContext.isLoggedIn && authContext.userId === props.creatorId &&
					<Button danger onClick={showDeleteWarningHandler}> Delete </Button>
					}					
				</div>
			</Card>
		</li>	
		</React.Fragment>
	)

}

export default PlaceItem