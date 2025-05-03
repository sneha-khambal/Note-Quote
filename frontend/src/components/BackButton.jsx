import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';


export const BackButton = ({destination ='/'}) => {
  return (
    <Link  to={destination}  >
  <BsArrowLeft   />
    </Link>

  )
}
