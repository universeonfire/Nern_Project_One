import React from "react"
import {NavLink} from "react-router-dom"

import "./NavLinks.css"

const NavLinks = props => {

	return(
		<ul className="nav-links">
			<li>
				<NavLink to = "/" exact> All Users </NavLink>
			</li>
			<li>
				<NavLink to = "/u1/places" exact> My Places </NavLink>
			</li>
			<li>
				<NavLink to = "/places/new" exact> Add Place </NavLink>
			</li>
			<li>
				<NavLink to = "/auth" exact> Authentication </NavLink>
			</li>


		</ul>
	)

}

export default NavLinks