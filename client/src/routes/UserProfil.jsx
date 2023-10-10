import React from 'react'
import Forbidden from '../components/Forbidden'
import ProfilHeader from '../components/ProfilHeader'
import ProfilMain from '../components/ProfilMain'
import Loading from '../components/Loading'
import { UserContext } from '../context/UserContext'
import {useContext} from 'react'




const UserProfil = () => {

  const {user,loading} = useContext(UserContext)

  const controler = user.name ? `/${user.name}` == window.location.pathname ? 
  (<>
      <ProfilHeader/>
      <ProfilMain/>
      </>)
      : 
      (<>
          <Forbidden/>
          </>)
  : 
  (<>
      <Forbidden/>
      </>)

   
  return (
    loading ? <Loading/> :
    <div className='container'>
        {controler}
    </div>
  )
}

export default UserProfil
