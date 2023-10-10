import React from 'react'
import { useState, useEffect } from 'react'
import Card from './Card'
import Api from '../api/Api'

const Main = () => {

  const [products, setProducts] = useState([])
  const [query, setQuery] = useState("")

  const getProducts = async()=>{
    try {
      const res = await Api.get('/');
      setProducts(await res.data.data.products)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getProducts()
},[])


  return (
    <>
       <div className="search">
            <input className="search-bar" type="text" name="search_box" placeholder="Search..." value={query} onChange={e =>{ setQuery(e.target.value)}}  />
        </div>
        <div className='container mt-5 row row-cols-4 g-4'>
            {products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())).map(product =>{
              return <Card image={product.image} name={product.name} key={product.id} price={product.price} saller ={product.saller}/>
            })}


        </div>
        <div className="footerPX"></div>
    </>
  )
}

export default Main
