import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Api from '../api/Api';

const EditProduct = ({product}) => {
  const [show, setShow] = useState(false);

  const [editName, setEditName] = useState(product.name);
  const [editPrice, setEditPrice] = useState(product.price);
  const [editImage, setEditImage] = useState(product.image);


  const handleClose = () =>{ 
    setEditName(product.name)
    setEditPrice(product.price)
    setEditImage(product.image)
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const updateProduct = async (e) =>{
    e.preventDefault()
    try {
      const res = await Api.put(`/${product.id}`,{name:editName,price:editPrice,image:editImage},{withCredentials:true})
      if (res.status === 204) {
        window.location.reload(false);
      }else{
        throw new Error()
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <Button variant="btn btn-sm btn-outline-warning" data-bs-target={`#id${product.id}`} onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id={`id${product.id}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input  type="text" placeholder='Name' className='form-control mt-2' defaultValue={editName} onChange={e =>setEditName(e.target.value)} />
            <input  type="text" placeholder='Price' className='form-control mt-2' defaultValue={editPrice} onChange={e =>setEditPrice(e.target.value)} />
            <input  type="text" placeholder='Image Link' className='form-control mt-2' defaultValue={editImage} onChange={e =>setEditImage(e.target.value)} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={e => updateProduct(e)}>Save</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default EditProduct