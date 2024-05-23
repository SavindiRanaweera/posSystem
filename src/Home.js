import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./utils/Authcontext";

function Home(){

    const { isAuthenticated, logout } = useAuth();

    return(
        <div class="container">
            <div class="homepage">
                    <h1 className="home ">Home</h1>
                    
                    <div class="container mb-5 mt-3">
                        <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
                            <div class="container-fluid">
                                
                                <   div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                        <div className="navbar-nav">
                                            <li className="nav-item ">
                                                <Link to="/users">Users</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/items">Items</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/categories">Categories</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/stocks">Stocks</Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link to="/Orders">Orders</Link>
                                            </li>                                                                                                                                                                               
                                        </div>
                                    </div>
                            </div>
                        </nav>
                    </div>
                

                    <p className="welcome text-center" >
                        <h2>Welcome to Home page..!</h2>
                    </p>
                
                    <div className="text-end">
                        {isAuthenticated &&
                        
                        <button className="btn btn-primary btn-lg" onClick={logout}>Logout</button>

                        }
                    </div>
            </div>
            
            
            
        </div>
    )
}

export default Home;