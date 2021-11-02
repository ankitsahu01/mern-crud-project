import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signInImg from '../images/login.png';
import { IsLoginContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();

    const islogin = useContext(IsLoginContext);
    // console.log(islogin);
    if(islogin.state===true){
        history.push('/');
    }
    
    // Show Hide Password Checkbox
    const showHidePwd=()=>{
        const pwd= document.getElementById('password');
        if(pwd.type==="password"){
            pwd.type="text";
        }else{
            pwd.type="password";
        }
    }

    // Display:none / Hide element
    const hide=(id)=>{
        document.getElementById(id).style.display="none";
    }
    // Display:block / Show element
    const show=(id)=>{
        document.getElementById(id).style.display="block";
    }

    // Login Authentication
    const authLogin = async (e) => {
        e.preventDefault();
        
        show('loader');
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password}),
        });
        const data = await res.json();
        hide('loader');
        if(!data){
            toast.error("Server Down, Try Later.");
        }else if(res.status===200){
            islogin.dispatch({type:'USER', payload:true});
            alert("Login Successfull.");
            history.push('/');
        }else{
            toast.error(data["error"]);
        }
    }

    return (
        <>
        <main className="hv-center">
            <section className="shadow-container">
                <div className="float-left">
                    <img className="page-img" src={signInImg} alt="Sign-in Img"/>
                </div>
                <form className="float-right" method="POST" onSubmit={authLogin}>
                    <h2 className="fg-yellow">Login</h2>
                    <div className="input-group mt-3 mb-3">                
                        <span className="input-group-prepend input-group-text">
                            <label htmlFor="email">
                                <i className="bi bi-envelope"></i>
                            </label>
                        </span>
                        <input type="email" className="form-control" id="email" placeholder="Type Email Here..." 
                            value={email} onChange={(e)=>setEmail(e.target.value)} required={true} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-prepend input-group-text">
                            <label htmlFor="password">
                                <i className="bi bi-key"></i>
                            </label>
                        </span>
                        <input type="password" className="form-control" id="password" placeholder="Type Password Here..." 
                            value={password} onChange={(e)=>setPassword(e.target.value)} required={true} />
                    </div>
                    <div className="form-group form-check mb-3">
                        <input type="checkbox" className="form-check-input" id="pwd_checkbox" onClick={showHidePwd} />
                        <label className="form-check-label" htmlFor="pwd_checkbox"> Show Password</label>
                    </div>
                    
                    <center>
                        <div id="loader" className="spinner-border text-warning mb-2" style={{"display":"none"}} role="status"></div>
                    </center>

                    <button type="submit" className="btn btn-yellow mb-3">Login</button>

                    <div className="text-center my-2">
                        <NavLink to="/forgot-password" className="link"> Forgot Password?</NavLink>
                    </div>
                    <div className="text-center mt-3">
                        Don't Have Account?
                        <NavLink to="/signup" className="link"> Create an Account</NavLink>
                    </div>
                </form>
            </section>
        </main>
        <ToastContainer position="top-center" />
        </>
    );
}

export default Login;
