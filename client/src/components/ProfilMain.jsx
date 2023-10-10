import React from 'react'
import { useState, useEffect , useContext} from 'react'
import Api from '../api/Api'
import { UserContext } from '../context/UserContext';
import EditProduct from './EditProduct';


const ProfilMain = () => {

  const {user} = useContext(UserContext)

  const [userProducts, setUserProducts] = useState([])

  const [addName,setAddName] = useState('')
  const [addPrice,setAddPrice] = useState('')
  const [addImage,setAddImage] = useState('')

  const getUserProducts = async()=>{
    try {
      const res = await Api.get(`/${user.id}`);
      setUserProducts(await res.data.data.products)
    } catch (err) {
      console.error(err.message);
    }
  }

  const addProduct = async()=>{
    try {
      const res = await Api.post('/addProduct',{name : addName, price:addPrice, image:addImage, saller:user.id},{withCredentials:true})
      if (res.status === 200) {
        window.location.reload(false);
      } else {
        throw new Error()
      }
    } catch (err) {
      console.error(err.message);
    }finally{
      setAddImage('')
      setAddName('')
      setAddPrice('')
    }
  }

  const deleteProduct = async(id)=>{
    try {
        const res = await Api.delete(`/${id}`,{withCredentials:true});
        if (res.status === 204) {
          setUserProducts(userProducts.filter(product => product.id !== id))
           
        }
    } catch (err) {
        console.error(err.message);
    }
  
  }

  useEffect(()=>{
    getUserProducts()
},[])

  return (
    <>
    <div>
        <div className="row">
            <div className="col">
                <input type="text" placeholder='Name' className="form-control" aria-label='Name' value={addName} onChange={e=>{
          setAddName(e.target.value)}}/>
            </div>
            <div className="col">
                <input type="text" placeholder='Price' className="form-control" aria-label='Price' value={addPrice} onChange={e=>{
          setAddPrice(e.target.value)}}/>
            </div>
            <div className="col">
                <input type="url" placeholder='Image URL' className="form-control" aria-label='Image' value={addImage} onChange={e=>{
          setAddImage(e.target.value)}}/>
            </div>
            <div className="col col-md-auto" >
            <button type="submit" className="btn btn-primary" onClick={addProduct}>Add</button>
            </div>
        </div>
    </div> 

    <div className='container mt-5 row row-cols-4 g-4'>
            {userProducts.map(product =>{
              return <div key={product.id}>
              <div className="card">
                  <img src={product.image ? product.image : './image/no-photos.png'} className="card-img-top img" alt="..."/>
                  <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                  </div>
                <div className="d-flex justify-content-between align-items-center container">
                <div className="btn-group">
                  <EditProduct product={product}/>
                  <button type="button" className="btn btn-sm btn-outline-danger"  onClick={()=>deleteProduct(product.id)} >Delete</button>
                </div>
              </div>
              </div>
              <div className="footer"></div>
              </div>
            })}


        </div>
    </>
  )
}

export default ProfilMain
