import React,{ useState, useEffect } from 'react';

const Contact = () => {
    const [data, setData] = useState({
        _id:"", name:"", email:"", phone:"", message:""
    });

    // Get user data to auto fill the contact form
    useEffect(()=>{
        const getData = async ()=>{
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
                    setData({...userData, message:""});
                }
            }catch(err){
                console.log(err);
            }
        }
        getData();
    }, []);

    let tagName, tagValue;
    const handleInputs=(e)=>{
        tagName = e.target.name;
        tagValue = e.target.value;
        setData({...data, [tagName]:tagValue});
    }

    // Send Form Data to the Backend
    const submitForm= async (e)=>{
        e.preventDefault();
        const postData = await fetch('/contact-us',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            // variable data is a hook state
            body:JSON.stringify(data)
        });
        const response = await postData.json();
        if(postData.status===200){
            // reset hook data
            setData({...data,"message":""});
            window.alert(response['success']);
        }else{
            window.alert(response['error']);
        }
    }

    return (
        <>
        <div className="container-fluid my-4">
            <div className="row justify-content-between align-items-center">
                <div className="col-sm-4 mb-3">
                    <div className="shadow-container d-flex justify-content-round align-items-center">
                        <i className="bi bi-phone fg-yellow"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <h5 className="mb-1">Mobile</h5>
                            <a className="link" href="tel:+911234567899">+91 741 5773 301</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="shadow-container d-flex justify-content-round align-items-center">
                        <i className="bi bi-envelope fg-yellow"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <h5 className="mb-1">Email</h5>
                            <a className="link" href="mailto:sahu6856@gmail.com">sahu6856@gmail.com</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="shadow-container d-flex justify-content-round align-items-center">
                        <i className="bi bi-geo-alt fg-yellow"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <h5 className="mb-1">Address</h5>
                            <small className="fg-yellow">27-B Subhash Nagar, Hazira, Gwalior</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Contact Form */}
        <div className="container my-5">
            <div className="row justify-content-around">
                <div className="col-sm-6 mb-3">
                    <div className="shadow-container">
                        <form method="POST" onSubmit={submitForm}>
                            <h2 className="fg-yellow">Get In Touch</h2>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control text-capitalize" name="name" id="name" placeholder="Your Name"
                                    value={data.name} onChange={handleInputs} required={true}
                                />
                                <small className="form-text text-light">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group mt-3">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email"
                                    value={data.email} onChange={handleInputs} required={true}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input type="number" className="form-control" name="phone" id="phone" placeholder="Your Mobile"
                                    value={data.phone} onChange={handleInputs} required={true}
                                />
                            </div>
                            <div className="form-group my-4">
                                <textarea className="form-control" name="message" id="message" rows="5" placeholder="Enter Message"
                                value={data.message} onChange={handleInputs} required={true}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-yellow mb-3">Send Message</button>                            
                        </form>
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                        <iframe className="shadow-container p-0 w-100 h-100" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1265.31860549765!2d78.1800119009004!3d26.23369052981642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6bfb831204b%3A0x216c0bb189b055ac!2sHazira%20Chowk%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1626181258254!5m2!1sen!2sin" allowFullScreen={true} loading="lazy"></iframe>
                </div>
            </div>
        </div>

        </>
    )
}

export default Contact;
