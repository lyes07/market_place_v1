import React from 'react'

const Card = (props) => {
  let image = props.image
  if(image == null) image = './image/no-photos.png'
  return (
    <div>
            <div className="card">
                <img src={image} className="card-img-top img" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title ">{props.name}</h5>
                    <p className="card-text">${props.price}</p>
                </div>
                <div>
                <h5 className="saller">{props.saller}</h5>
                </div>
            </div>
    </div>
  )
}

export default Card
