import React from 'react';
import Wrapper from "../assets/wrappers/ErrorPage";
import img from '../assets/images/not-found.svg'
import {Link} from "react-router-dom";

function Error() {
    return (
        <Wrapper className="full-page">
            <div>
                <img src={img} alt="Error"/>
                <h3>Page Not Found</h3>
                <p>We can not seem find page you are looking for</p>
                <Link to={"/"}>Home</Link>
            </div>
        </Wrapper>
    );
}

export default Error;