import React from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = ({user}) => {

  const navigate = useNavigate()

    const toHome = (e)=>{
        e.preventDefault();
        navigate('/')
    }

  return (
    <div className='container'>
    <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column space'>
    <main className="px-3 mt-5S">
    <h1>Already logged in as ~ <span className='user'>{user.name}</span> </h1>
    <p className="lead">If you want to change the user please go back to the <b>Home</b> page and <b>Logout</b> first.</p>
    <p className="lead">
      <a onClick={toHome} className="btn btn-lg btn-dark fw-bold border-dark bg-dark">Go Back</a>
    </p>
  </main>
  </div>
    </div>
  )
}

export default Logout
