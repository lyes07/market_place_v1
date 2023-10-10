import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Api from '../api/Api';
import Logout from '../components/Logout'
import Loading from '../components/Loading'
import { UserContext } from '../context/UserContext';


const Login = () => {

  const {user,setUser,loading,setLoading} = useContext(UserContext)

  const navigate = useNavigate()

  const [error, setError] = useState()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const toHome = (e)=>{
    e.preventDefault();
    navigate('/')
  }


  const onSubmitForm = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await Api.post('/login',{email:email,password:password},{withCredentials:true})
      if (res.status === 200) {
        console.log(res.data.user.name)
        await setUser(res.data.user)
        navigate(`/${res.data.user.name}`) 
      } else {
        throw new Error()
      }
    } catch (err) {
      setError('Login failed')
      console.error(err.message);
    }finally{
      setLoading(false)
    }
  }

 

  return (
    loading ? <Loading/> :
    (user.name) ? <Logout user={user}/> :<>
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase"  id="logo" onClick={toHome}>Market Place</h2>
                  <p className=" mb-5">Please enter your email and password!</p>
                  <div className='error'>{error && error}</div>
                  <div className="mb-3">
                    <Form onSubmit={onSubmitForm}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=>{
          setEmail(e.target.value)}} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e=>{
          setPassword(e.target.value)}}/>
                      </Form.Group>
                      <div className="d-grid mt-5">
                        <Button variant="primary" type="submit" >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Login
