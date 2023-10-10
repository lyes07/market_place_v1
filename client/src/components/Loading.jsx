import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center mt-4'>
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </div>
  )
}

export default Loading
