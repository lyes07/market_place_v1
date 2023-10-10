import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Api from '../api/Api';
import Logout from '../components/Logout'
import Loading from '../components/Loading'
import { UserContext } from '../context/UserContext';


const Signup = () => {

  const {user,setUser,loading,setLoading} = useContext(UserContext)

  const navigate = useNavigate()

  const toHome = (e)=>{
    e.preventDefault();
    navigate('/')
  }

  const [error, setError] = useState()

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  const onSubmitForm = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await Api.post('/signup',{name : username,email:email,password:password},{withCredentials:true})
      if (res.status === 200) {
        console.log(res.data.user.name)
        setUser(res.data.user)
        navigate(`/${res.data.user.name}`)
      } else {
        throw new Error()
      }
    } catch (err) {
      setError('Registration failed')
      console.error(err.message);
    } finally{
      setLoading(false)
    }
  }

  return (
    loading ? <Loading/> :
    (user.name) ? <Logout user={user}/> :
    <>
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase"  id="logo" onClick={toHome}>Market Place</h2>
                  <div className='error'>{error && error}</div>
                  <div className="mb-3">
                    <Form className='mt-5' onSubmit={onSubmitForm}>
                      <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label className="text-center">
                          User Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="User Name" value={username} onChange={e=>{
          setUsername(e.target.value)}} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={e=>{
          setEmail(e.target.value)}}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e=>{
          setPassword(e.target.value)}}/>
                      </Form.Group>
                      
                      <div className="d-grid mt-5">
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    </Form>
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

export default Signup

