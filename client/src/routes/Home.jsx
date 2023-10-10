import React,{useContext} from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading';
import Main from '../components/Main'
import { UserContext } from '../context/UserContext';

const Home = () => {
    const {loading} = useContext(UserContext)

  return (
    loading ? <Loading/> :
    <div className='container'>
      <Header/>
      <Main/>
    </div>
  )
}

export default Home
