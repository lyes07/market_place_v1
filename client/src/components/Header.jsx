import React from "react"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import Api from "../api/Api"
import { UserContext } from '../context/UserContext';


const Header = ()=>{

    const {user,setUser,setLoading} = useContext(UserContext)

    const navigate = useNavigate()

    const toHome = (e)=>{
        e.preventDefault();
        navigate('/')
    }
    
    
    const Logout = async(e)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const res = await Api.post('/logout',null,{withCredentials:true})
        if (res.status === 200) {
            console.log(user.name + " is out")
            setUser({})
            window.location.reload(false);
        } else {
            throw new Error()
        }
    } catch (err) {
      console.error(err.message);
    } finally{
        setLoading(false)
    }
  }



    const controler = user.name ? 
    (<>
        <div className="p-2">
            <a className="btn btn-outline-primary"  href={"/"+user.name}  role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg> {user.name} 
            </a>
        </div>
        <div className="p-2">
            <a className="btn btn-outline-warning"  role="button"  onClick={Logout}>Log out</a> 
        </div>
    </>)
    : (<>
        <div className="p-2"><a className="btn btn-outline-primary"  href="/login"  role="button">Login</a></div>
        <div className="p-2 "><a className="btn btn-outline-primary"  href="/signup"  role="button" >Sign up</a></div>
    </>)
    
    return (
        <div>
            <div className="d-flex shadow-none p-3 mb-5 bg-body-tertiary">
                <div className="p-2 flex-grow-1"><h2 id="logo" onClick={toHome}>Market Place</h2></div>
                {controler}
            </div>
        </div>

    )
}


export default Header;
