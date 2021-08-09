import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IsLoginContext } from '../App';

const Logout = () => {
    const history = useHistory();

    const islogin = useContext(IsLoginContext);
    if(islogin.state===false){
        history.push('/login');
    }

    const logout = async ()=>{
        try{
            const res = await fetch('/logout',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            // const data = await res.json();
            if(res.status !== 200 ){
                throw new Error("Unable To Logout");
            }
            islogin.dispatch({type:'USER', payload:false});
            history.push('/login');
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        logout();
    });
    return (
        <>
        <main className="hv-center">
            <div id="loader" className="spinner-border text-warning mb-2" role="status"></div>
        </main>
        </>
    )
}

export default Logout
