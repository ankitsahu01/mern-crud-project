import React, { useState, useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState({
        _id:"", name:"", email:"", phone:""
    });
    
    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const res = await fetch('/getdata',{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                const userData = await res.json();
                if(userData && res.status===200){
                    setData(userData);
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <main className="d-flex justify-content-center align-items-center">
            <section>
                <h1 className="hv-center">Welcome <span className="fg-yellow text-capitalize">{data.name}</span></h1>
            </section>
        </main>
    )
}

export default Home
