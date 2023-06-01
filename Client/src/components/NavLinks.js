import React from 'react';
import links from "../utils/links";
import {NavLink} from "react-router-dom";


function NavLinks({toggleSidebar}) {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const {id, icon, path, text} = link
                return (
                    <NavLink key={id} to={path} onClick={toggleSidebar}
                             className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><span
                        className="icon">{icon}</span>{text}</NavLink>
                )
            })
            }

        </div>
    );
}

export default NavLinks;