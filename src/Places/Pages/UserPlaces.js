import React,{useState, useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"

import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';

import PlaceList from "../Components/PlaceList"


const UserPlaces = props => {
	const [userPlaces, setUserPlaces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const userId = useParams().userId
	
	useEffect(() => {
		const fetchUserPlaces = async () =>{
			setIsLoading(true);
			await axios.get(`http://localhost:5000/api/places/user/${userId}`).then(res=>{
				setUserPlaces(res.data.places);
				setIsLoading(false);
			}).catch(error=>{
			setIsLoading(false);
			setError( error.message);
		  });	
		};
		fetchUserPlaces(); 
	}, [userId]);

	const placeDeleteHandler = (placeId) => {
		setUserPlaces(prevPlaces => prevPlaces.filter(place=>place.id !== placeId));
	};

	const errorHandler = () => {
		setError(null);
	}; 

	return(
		<React.Fragment>
			<ErrorModal error={error} onClear={errorHandler} />
			{isLoading && (
				<div className="center">
				<LoadingSpinner />
				</div>
			)}  
			{!isLoading && userPlaces && <PlaceList items={userPlaces} onPlaceDelete={placeDeleteHandler} />}
		</React.Fragment>
	)

}

export default UserPlaces