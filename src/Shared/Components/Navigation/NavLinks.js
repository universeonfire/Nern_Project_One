import React,{useContext} from "react"
import {NavLink} from "react-router-dom"

import { AuthContext } from '../../Context/Auth-Context';

import "./NavLinks.css"

const NavLinks = props => {
	const authContext = useContext(AuthContext);

	return(
		<ul className="nav-links">
			<li>
				<NavLink to = "/" exact> All Users </NavLink>
			</li>
			{authContext.isLoggedIn &&
			<li>
				<NavLink to = {`/${authContext.userId}/places`} exact> My Places </NavLink>
			</li>
			}
			{authContext.isLoggedIn &&
			<li>
				<NavLink to = "/places/new" exact> Add Place </NavLink>
			</li>
			}
			{!authContext.isLoggedIn &&
			<li>
				<NavLink to = "/auth" exact> Authentication </NavLink>
			</li>
			}

		</ul>
	)

}

export default NavLinks