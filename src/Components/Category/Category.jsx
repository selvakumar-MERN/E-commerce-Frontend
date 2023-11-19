import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Searcharea from '../Searcharea/Searcharea';
import axios from 'axios';
import { getcategory } from '../utlis/Apis';
import Mycontext from '../../Context';
import './Category.css'
import Filter from '../Filter/Filter';
import { FaStar } from 'react-icons/fa';

function Category(props) {
    const { category } = useParams();
    const [data,setdata]=useState([]);
    const {setrecords,records} = useContext(Mycontext);
    const [loading,setloading]=useState(false)

    useEffect(()=>{
          axios.get(`${getcategory}/${category}`)
          .then((res)=>{
             setloading(true)
              setdata(res.data)
              setrecords(res.data)
          })
          .catch((error)=>{
            return error
          })
    },[category,setrecords])

   
    return (
        <div className='container'>
            <Searcharea categoryitem={category} product={data} />
            <div className='row mt-4'>
                <div className='col-md-3' >
                    <Filter data={data}/>
                </div>
                <div className='col-md-9'>
                    <h5>{category}</h5>
                    <h6>{`Showing ${records.length} items`} </h6>
                    { loading ? <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 mt-2 ">
                      { records.map(items=> <div className="col-12 col-md-3 my-2">
                           <Link className='text-decoration-none' to={`/category/${items.category}/${items._id}`}> <div className="card h-100 p-2">
                                {/*Product image*/}
                                <div className='d-flex justify-content-center imgarea'>
                                <img  src={items.productImage} alt="..." height={"150px"} width={"150px"}></img>
                                </div>
                                { /*Product details*/}
                                <div className="card-body p-2">
                                    <div className="text-left">
                                        {/*Product name*/}
                                        <span className='title'>{items.productName}</span>
                                        {/*Product price*/}
                                        <div className='title-review'>
                                        <span className='title-rating'>{items.rating}<FaStar/></span>
                                        <span>({items.review.length})</span>
                                        </div>
                                        <div className="title-price">₹{items.productPrice}</div>

                                    </div>
                                </div>
                                {/*Product actions*/}
                                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent " >
                                </div>


                            </div></Link>
                        </div>)}
                    </div>:<section >
                    <div className='container mt-3 text-center'> 
                 <div className='spinner-border text-primary ' role='status'>
                <span className='sr-only'>Loading...</span>
                </div>
                </div>
                </section>}

                </div>

            </div>


        </div>

    );
}

export default Category;