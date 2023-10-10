import React,{useContext} from 'react'
import Api from "../api/Api"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';


const ProfilHeader = () => {

    const {user,setUser,setLoading} = useContext(UserContext)

    const navigate = useNavigate()

    const toHome = (e)=>{
        e.preventDefault();
        navigate('/')
    }

    const logout = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const res = await Api.post('/logout',null,{withCredentials:true})
            if (res.status === 200) {
                console.log(user.name + " is out")
                setUser({})
                navigate(`/`)
            } else {
                throw new Error()
            }
        } catch (err) {
          console.error(err.message);
        } finally{
            setLoading(false)
        }
      }

      const deleteAccount = async(e)=>{
        e.preventDefault()
        try {
          const res = await Api.post(`/account/${user.id}`,null,{withCredentials:true})
          if (res.status === 200) {
            console.log(user.name + " has deleted his account")
            setUser({})
            navigate(`/`)
          } else {
            throw new Error()
          }
        } catch (err) {
          console.error(err.message);
        }  
      }

  return (
    <>
        <div className="d-flex shadow-none p-3 mb-5 bg-body-tertiary">
            <div className="p-2 flex-grow-1">
                <h2 id="logo" onClick={toHome}>Market Place  ~:~ Dashboard</h2>
            </div>
            <div className="p-2"><a className="btn btn-outline-warning"  role="button"  onClick={logout}>Log out</a> </div>
            <div className="p-2"><a className="btn btn-outline-danger"  role="button"   onClick={deleteAccount} >Delete Account</a> </div>
        </div>
        
    </>
  )
}

export default ProfilHeader
