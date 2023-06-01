import React from 'react';
import Wrapper from "../../assets/wrappers/SharedLayout";
import {Link, Outlet} from "react-router-dom";
import {NavBar, SmallSideBar, BigSideBar} from '../../components'

function SharedLayout() {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSideBar/>
                <BigSideBar/>
                <div>
                    <NavBar/>
                    <div className="dashboard-page">
                        <Outlet/>
                    </div>
                </div>
            </main>
        </Wrapper>
    );
}

export default SharedLayout;