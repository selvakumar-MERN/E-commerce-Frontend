import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getoneproduct, showproduct } from '../utlis/Apis';
import axios from 'axios';
import './Productdetails.css'
import Mycontext from '../../Context';
import Rating from '../Rating/Rating';
import { FaStar } from 'react-icons/fa';
import Ratingmodal from '../Rating/Ratingmodal';

function Productdetails(props) {
    const { id } = useParams();
    const [data, setdata] = useState({});
    const { item, userdata } = useContext(Mycontext);
    const [loading, setloading] = useState(false)

    useEffect(() => {
        axios.get(`${getoneproduct}/${id}`)
            .then(res => {
                setdata(res.data)

            })
            .catch(error => {
                return (error)
            })
    }, [id])

    const submit = (id) => {
        setloading(true)
        const email = { email: userdata.email }
        const token = window.localStorage.getItem("usertoken")
        if (!token) {
            return alert("please login as a user to add items to cart")
        }
        axios.post(`${showproduct}/${id}`, email)
            .then(res => {
                if (res) {
                    setloading(false)
                    window.location.href = '/cart'
                }


            })
            .catch(error => {
                setloading(false)
                return (error)
            })


    }


    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-md-4'>
                    <div className='card p-3 cardtop'>
                        <img src={data.productImage} height={'400px'} width={'300px'} alt='...'></img>

                    </div>
                    <div className='cartbutton'>
                        {item.some((ob) => ob.productId === data.productId) ? <Link to='/cart' style={{ backgroundColor: 'orange' }}
                            className='btn font-weight-bold'>Go to cart</Link> : loading ? <button style={{ backgroundColor: 'orange' }} className='btn font-weight-bold' >
                                <div className='spinner-border text-primary ' role='status'>
                                    <span className='sr-only'>Adding to card</span>
                                </div>
                            </button> : <button to='/cart' style={{ backgroundColor: 'orange' }} onClick={() => { submit(data._id) }} className='btn font-weight-bold'>Add to cart</button>}
                    </div>
                </div>
                <div className='col-md-8'>
                    <h6>{data.productName}</h6>
                    <span className='ratingnumber'>{data.rating}<FaStar/></span>
                    <h3>₹{data.productPrice}</h3>
                    <div>
                        <div className='labelarea' >
                            <label>Description</label>
                            <span>{data.description}</span>
                        </div>

                    </div>
                    <div className='card card-rating overflow-auto mt-3 pt-4 px-4'>
                        <div className='d-flex justify-content-between'>
                        <h4>Ratings and Reviews</h4>
                        <Ratingmodal data={data} userName={userdata.name}/>
                        </div>
                              <Rating id={id}/>
                        

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Productdetails;