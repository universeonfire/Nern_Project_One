import React,{useEffect,useState} from 'react';
import axios from "axios";

import UsersList from '../Components/UsersList'
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner';

const Users = () =>{
	const [users, setUsers] = useState();
	const [isLoading, setIsLoading] = useState(false);
  	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
			setIsLoading(true)
			await axios.get("http://localhost:5000/api/users/").then(res=>{
				const resData = res.data.users;
				 
				setUsers(resData); 
				setIsLoading(false)
			}).catch(error=>{
				setIsLoading(false)
				setError( error.message);
			})
		};
		fetchUserData();
	}, [])
	const errorHandler = () => {
		setError(null);
	}; 
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={errorHandler} />
			{isLoading && (
				<div className="center">
				<LoadingSpinner />
				</div>
			)}
			{!isLoading && users && <UsersList items={users} />}
		</React.Fragment>
	)

}

export default Users



