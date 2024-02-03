import React from 'react';
import '../style/no_data_found.css';

export default function No_data_found(props) {
  return (
    <>
    <h2 className='noData'>No {props.type} Found</h2>
    </>
  )
}
