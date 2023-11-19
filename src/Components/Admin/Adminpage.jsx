import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { deleteproduct, getcategory, verifylogin } from '../utlis/Apis';
import Searcharea from '../Searcharea/Searcharea';
import Mycontext from '../../Context';
import Filter from '../Filter/Filter';
import { FaStar } from 'react-icons/fa';


function Adminpage(props) {
    const { category } = useParams()
    const notify = () => toast("Product Deleted");
    const [product, setproduct] = useState([])
    const { records, setrecords } = useContext(Mycontext);


    useEffect(() => {
        const usertoken = {
            token: ""
        }
        const tokenvalue = window.localStorage.getItem("admintoken")
        usertoken.token = tokenvalue
        const postdata = async () => {
            const res = await axios.post(verifylogin, usertoken)
            try {

                if (res) {
                    const productdata = async () => {
                        const res = await axios.get(`${getcategory}/${category}`)
                        try {
                            const { data } = res
                            setproduct(data)
                            setrecords(data)
                        }
                        catch (error) {
                            return (error)
                        }
                    }
                    productdata()
                }
            }
            catch (error) {
                return error
            }

        }
        postdata()
    }, [category,setrecords])


    const deleteProduct = (id) => {
        axios.delete(`${deleteproduct}/${id}`)
            .then((res) => {
                if (res.data.deletedCount === 1) {
                    setproduct(product.filter((product) => product._id !== id))
                    notify()
                }
            })
            .catch((error) => {
                return (error)
            })

    }


    return (
        <section>
            <div className="container px-4 px-lg-5">
                <Searcharea product={product} categoryitem={category} />
                <div className='row mt-4'>
                    <div className='col-md-3' >
                        <Filter data={product} />
                    </div>
                    <div className='col-md-9'>
                        <h5>{category}</h5>
                        <h6>{`Showing ${records.length} items`} </h6>
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 mt-2 ">


                            {records.map((items) =>
                                <div className="col-6 col-md-2 my-2">
                                    <div key={items._id} className="card h-100 p-2">
                                        {/*Product image*/}
                                        <img src={items.productImage} alt="..." height={"150px"} width={"150px"}></img>
                                        { /*Product details*/}
                                        <div className="card-body p-2" style={{ fontSize: '12px' }}>
                                            <div className="text-left">
                                                {/*Product name*/}
                                                <span className="title">{items.productName}</span>
                                                {/*Product price*/}
                                                <div className='title-review'>
                                                   <span className='title-rating'>{items.rating}<FaStar/></span>
                                                    <span>({items.review.length})</span>
                                                    </div>
                                                <div className="title-price">Rs.{items.productPrice}</div>

                                            </div>
                                        </div>
                                        {/*Product actions*/}
                                        <div className="card-footer p-1 pt-0 border-top-0 bg-transparent " >
                                            <Link to='/admin/editproduct'>
                                                <button className="btn btn-warning mt-auto m-1" onClick={() => { props.userdata(items) }}
                                                ><i className="fa fa-pencil-square-o m-1" ></i></button>
                                            </Link>
                                            <button
                                                className="btn btn-danger mt-auto m-1" onClick={() => { deleteProduct(items._id) }}>
                                                <i className="fa fa-trash m-1" ></i></button>  <ToastContainer />

                                        </div>


                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Adminpage;