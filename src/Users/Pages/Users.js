import React from 'react'

import UsersList from '../Components/UsersList'

const Users = () =>{
	const USERS = [{id: "u1", name: "asd", image: "https://via.placeholder.com/150", places: "5"}]
	return <UsersList items={USERS}/>

}

export default Users



