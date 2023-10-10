import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Home from './routes/Home';
import UserProfil from './routes/UserProfil'
import Signup from './routes/Signup'
import Login from './routes/Login'
import { UserContext } from './context/UserContext';
import Api from './api/Api';


const App = ()=>{

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchUser(){
            try {
                setLoading(true)
                const response = await  Api.post(`/fetch-user`, null, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                setUser(response.data.user)
            } catch (error) {
                console.log(`No user exists with the current session... ${error}`)
            } finally{
                setLoading(false)
            }
        }
        fetchUser()

    }, [])

    return (
        <>
          <UserContext.Provider value={{
            user: user,
            setUser : setUser,
            loading : loading,
            setLoading : setLoading
          }}>
            <Router>
                <Routes>
                    <Route  path='/' element={<Home/>}/>
                    <Route  path='/:user' element={<UserProfil/>}/>
                    <Route  path='/signup' element={<Signup/>}/>
                    <Route  path='/login' element={<Login/>}/>
                </Routes>    
            </Router>
          </UserContext.Provider>
        </>
)}

export default App;