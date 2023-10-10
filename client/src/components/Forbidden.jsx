import React from 'react'
import { useNavigate } from 'react-router-dom'


const Forbidden = () => {

  const navigate = useNavigate()

    const toHome = (e)=>{
        e.preventDefault();
        navigate('/')
    }

  return (
    <>
    <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column space'>
    <main className="px-3 mt-5S">
    <h1 className='error'>Access Forbidden : 403 Error</h1>
    <p className="lead">This error happen when you try to access restricted, privete or non existing routes in the site, if you think there is a problem you can go back to the home page and try again.</p>
    <p className="lead">
      <a onClick={toHome} className="btn btn-lg btn-dark fw-bold border-dark bg-dark">Go Back</a>
    </p>
  </main>
  </div>
    </>
  )
}

export default Forbidden
