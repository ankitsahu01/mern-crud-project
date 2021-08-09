import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../images/logo.png';
import { IsLoginContext } from '../App';
import $ from 'jquery';
window.jQuery = $;

const Navbar = () => {
    const islogin = useContext(IsLoginContext);

    const hideMobileMenu=()=>{
        $(".navbar-collapse").collapse('hide'); //To hide the navbar menu in mobile view.
    }

    const RenderMenu = ()=>{
        if(islogin.state){
            return(
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/profile">My Profile</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/about-us">About us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/contact-us">Contact us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        }else{
            return(
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/signup">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/about-us">About us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/contact-us">Contact us</NavLink>
                    </li>
                </>
            )
        }    
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light gr-yellow">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" onClick={hideMobileMenu}>
                    <img src={logo} alt="Logo" width="30" height="30"/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" onClick={hideMobileMenu}>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
                        </li>
                        <RenderMenu/>    
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;



// This is for dropdown
/* <li className="nav-item dropdown">
    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown
    </NavLink>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
    <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
    <li><hr className="dropdown-divider"/></li>
    <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
    </ul>
</li> */