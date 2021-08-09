import React,{ useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import signUpImg from '../images/signup-1.gif';
import { IsLoginContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [user,setUser] = useState({
        name : "",
        email : "",
        phone : "",
        password : "",
        cpassword : ""
    });
    const history = useHistory();

    const islogin = useContext(IsLoginContext);
    // console.log(islogin);
    if(islogin.state===true){
        history.push('/');
    }
    
    let tagName,tagValue;
    const handleInputs = (e)=>{
        tagName= e.target.name;
        tagValue= e.target.value;
        setUser( {...user, [tagName]:tagValue} );
        // console.log(user);
    }

    // Show Hide Password Checkbox
    const showHidePwd=()=>{
        const pwd= document.getElementById('password');
        const cpwd= document.getElementById('cpassword');
        if(pwd.type==="password"){
            pwd.type="text";
            cpwd.type="text";
        }else{
            pwd.type="password";
            cpwd.type="password";
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

    // Send Data to the backend using JS Fetch api
    const sendData= async (e)=>{
        e.preventDefault();
        show('loader');

        // Current Port of backend is 4000 which is defined in package.json inside our client folder
        const res= await fetch("/register", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(user),
        });
        const data = await res.json();
        hide('loader');
        if(!data || res.status===500){
            toast.error("Server Down, Try Later.");
        }
        else if(res.status===201){
            setUser({
                name : "",
                email : "",
                phone : "",
                password : "",
                cpassword : ""
            });
            toast.success("Account Created Successful.");
        }
        else{
            toast.error(data["error"]);
            
        }
    }
    
    return (
        <>
        <main className="hv-center pt-5">
            <section className="shadow-container">
                <div className="float-left">
                    <img className="page-img" src={signUpImg} alt="Sign-in Img"/>
                </div>
                <form className="float-right" method="POST" onSubmit={sendData}>
                    <h2 className="fg-yellow">Signup</h2>
                    <div className="input-group mt-3 mb-3">
                        <span className="input-group-prepend input-group-text">
                            <label htmlFor="name">
                                <i className="bi bi-person"></i>
                            </label>
                        </span>
                        <input required={true} type="text" id="name" name="name" className="form-control text-capitalize" 
                                autoComplete="off" placeholder="John Cena"
                                value={user.name} onChange={handleInputs} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-prepend input-group-text">
                            <label htmlFor="email">
                                <i className="bi bi-envelope"></i>
                            </label>
                        </span>
                        <input required={true} type="email" id="email" name="email" className="form-control" 
                            autoComplete="off" placeholder="example@gmail.com"
                            value={user.email} onChange={handleInputs} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-prepend input-group-text">
                            <label htmlFor="phone">
                                <i className="bi bi-telephone"></i>
                            </label>
                        </span>
                        <input required={true} type="number" id="phone" name="phone" className="form-control" 
                            autoComplete="off" placeholder="e.g. 1234567899"
                            value={user.phone} onChange={handleInputs} />
                    </div>

                    <div className="row mb-3">
                        <div className="col input-group">
                            <span className="input-group-prepend input-group-text">
                                <label htmlFor="password">
                                    <i className="bi bi-key"></i>
                                </label>
                            </span>
                            <input required={true} type="password" id="password" name="password" className="form-control" 
                                autoComplete="off" placeholder="Password"
                                value={user.password} onChange={handleInputs} />
                        </div>
                        <div className="col input-group">
                            <span className="input-group-prepend input-group-text">
                                <label htmlFor="cpassword">
                                    <i className="bi bi-key"></i>
                                </label>
                            </span>
                            <input required={true} type="password" id="cpassword" name="cpassword" className="form-control" 
                                autoComplete="off" placeholder="Confirm Password"
                                value={user.cpassword} onChange={handleInputs} />
                        </div>
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="pwd_checkbox" onClick={showHidePwd} />
                        <label className="form-check-label" htmlFor="pwd_checkbox"> Show Password</label>
                    </div>

                    <center>
                        <div id="loader" className="spinner-border text-warning mt-2" style={{"display":"none"}} role="status"></div>
                    </center>

                    <button type="submit" className="btn btn-yellow my-3">Sign Up</button>

                    <div className="text-center my-2">
                        Already Have Account?
                        <NavLink to="/login" className="link"> Login Here</NavLink>
                    </div>
                </form>
            </section>
        </main>
        <ToastContainer position="top-center" />
        </>
    )
}

export default Signup
