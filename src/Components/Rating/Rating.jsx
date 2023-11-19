import React, { useEffect, useState } from 'react';
import './Rating.css'
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { getreview } from '../utlis/Apis';

function Rating({id}) {
      const [review,setreview]=useState([])

    useEffect(()=>{
        
        axios.get(`${getreview}/${id}`)
        .then((res)=>{
            setreview(res.data)
        })
        .catch((error)=>{
            return(error)
        })
    },[id])

    return (
       <>
      { review.map(item =><div key={item._id} className='ratingarea'>
            <div className='rating-section'>
                <div className='rating-no'>
                <span >{item.rating}</span>
                <FaStar/>
                </div>
                
                <span >{item.reviewTitle}</span>

            </div>
            <div className='review-title'>
                 {item.review}
            </div>
        </div>)}
       
       
        
        </>
    );
}

export default Rating;