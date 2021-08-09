import React,{ useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileImg from '../images/profile.png';
import { IsLoginContext } from '../App';

const Profile = () => {
    const [data,setData] = useState({
        _id:"Loading...", name:"Loading...", email:"Loading...", phone:"Loading..."
    });
    const islogin = useContext(IsLoginContext);
    const history = useHistory();
    if(islogin.state===false){
        history.push('/login');
    }
    
    // Get User's Profile Data from backend
    useEffect( ()=>{
        const fetchProfile= async()=>{
            try{
                const res = await fetch('/getdata',{
                    method:"GET",
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json"
                    },
                    credentials:"include"
                });
                const userData= await res.json();
                // console.log(userData);
                if(res.status===200){
                    setData(userData);
                }else{
                    throw new Error("Unauthorized");
                }
            }catch(err){
                console.log(err);
                history.push('/login');
            }
        }
        fetchProfile();
    }, [history]);

    return(
        <>
            <div className="container my-5">
                <form method="GET">
                    <div className="profile-container shadow-container">
                        <div className="row mb-3">
                            <div className="col-6">
                                <h4 className="mb-0">Profile</h4>
                                <div className="divider"></div>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <input className="btn edit-btn" name="btn_edit" type="submit" value="Edit Profile" />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-4 mb-3 profile-img-container">
                                <img className="profile-img" src={profileImg} alt="Profile" />
                            </div>
                            <div className="col-md-8">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="about-tab" data-bs-toggle="tab" href="#about"  role="tab" aria-controls="about" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="timeline-tab" data-bs-toggle="tab" href="#timeline"  role="tab" aria-controls="timeline" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                                <div className="tab-content mt-3" id="myTabContent">
                                    <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>User ID</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{data._id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{data.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Mobile</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{data.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p>{data.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde dolorum rerum, cumque aperiam quod commodi voluptas at aliquam ullam nihil magnam quidem neque sed sequi in impedit laborum veniam.
                                            sint accusantium deleniti, totam modi error? Placeat dignissimos voluptas iusto! Accusantium natus quaerat dolorum cumque porro nisi?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}

export default Profile;