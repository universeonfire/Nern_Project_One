import React from "react"
import {useParams} from "react-router-dom"

import PlaceList from "../Components/PlaceList"

const PLACES = [
			{
				id:"p1",
				imageUrl:"https://thenypost.files.wordpress.com/2019/05/cre-times-square-1.jpg?quality=90&strip=all&w=978&h=652&crop=1",
				description:"crowded place heart of NY",
				address:"Manhattan, NY 10036, USA",
				creator:"u1",
				location:{
					lat: 40.7579747,
					lng: -73.9877313
				}
			},
			{
				id:"p2",
				imageUrl:"https://thenypost.files.wordpress.com/2019/05/cre-times-square-1.jpg?quality=90&strip=all&w=978&h=652&crop=1",
				description:"crowded place heart of NY",
				address:"Manhattan, NY 10036, USA",
				creator:"u2",
				location:{
					lat: 40.7579747,
					lng: -73.9877313
				}
			}

		]
const UserPlaces = props => {
	const userId = useParams().userId
	const loadedPlaces = PLACES.filter(place=>place.creator === userId)
	return(
		<PlaceList items={loadedPlaces} />
	)

}

export default UserPlaces