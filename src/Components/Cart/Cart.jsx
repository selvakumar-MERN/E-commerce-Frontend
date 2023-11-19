import React, { useContext, useState } from 'react';
import axios from 'axios';
import Mycontext from '../../Context';
import { addorders, payment, removecartitem, verifyorder } from '../utlis/Apis';
import {  FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import './Cart.css'



function Cart(props) {

    
    const { item,setitem,userdata } = useContext(Mycontext)
    
    const [user, setusers] = useState({orderid:"",email:''})


    //increase quantity
    const increase = (id) => {
        const find = item.findIndex((value) => value._id === id)
        if (item[find].quantity !== 5) {
            item[find].quantity += 1
        }
        setitem([...item])
    }

    //decrease quantity
    const decrease = (id) => {
        const find = item.findIndex((value) => value._id === id)
        if (item[find].quantity !== 1) {
            item[find].quantity -= 1
        }
        setitem([...item])
    }

    //remove cart item
    const removeitem = (id) => {

        axios.post(`${removecartitem}/${id}`,{email:userdata.email})
            .then(res => {
                const find = item.findIndex((value) => value._id === id)
                item.splice(find, 1)
                setitem([...item])
               
            })
            .catch(error => {
                return (error)
            })
       
    }

    //total amount
   
  const total = item.reduce((a, b) => {
       return (a = a + b.productPrice * b.quantity);

   }, 0);

   const handler=(e)=>{
       const{name,value}=e.target;
       setusers({...user,[name]:value})
       

   }

    //razor pay payment handler
    const handleRazorpay = (order) => {
        const options = {
            key: "rzp_test_gXkfVOK0D8Ct2S",
            amount: order.amount,
            currency: order.currency,
            name: "E-Commerce",
            description: "Buy an item",
            order_id: order.id,
            handler: async (response)=> {
               await axios.post(verifyorder, response)
                    .then(res => {
                        user.orderid=res.data.orderid
                        user.email=userdata.email
                        setusers({...user})
                             //signature verification and creating the customer record            
                         if (res) {
                            axios.post(addorders, user)
                               .then(res => {
                                   if(res){
                                     window.location.href='/myorder'  
                                   }
                                 
                                })
                               .catch(error => {
                                   return( error)
                              })
                       }

                    })
                   .catch(error => {
                        return error
                    })

            },
            prefill: {
                name: userdata.name,
                email: userdata.email,
                
            },
            theme:{
                color:'#3399cc'
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    const handlepayment = () => {
        axios.post(payment, { amount: total })
            .then(res => {
                const{order}=res.data
                handleRazorpay(order)
            })
            .catch(error => {
                return (error)
            })
    }
    return (
            <div className='container'>
                <div className='row mt-2'>
                        <div className='col-md-8'>
                           {item.map(items=> <div className='card p-3'>
                                <div className='cardarea'>
                                    <img src={items.productImage} height={'100px'} width={'100px'} alt='...'></img>
                                    <div className='desarea'>
                                        <span>{items.productName}</span>
                                        <span className='font-weight-bold'>₹{items.productPrice}</span>

                                    </div>
                                    </div>
                                    <div className='bottom-area'>
                                    <div className='crement'>
                                        <FaMinusCircle className='icon' onClick={() => { decrease(items._id) }}  /><span>{items.quantity}</span><FaPlusCircle className='icon' onClick={() => { increase(items._id) }}  />
                                    </div>
                                    <button onClick={() => { removeitem(items._id) }}>REMOVE</button>
                                    </div>

                            </div>)}

                        </div>
                        <div className='col-md-4 p-0' >
                            <div >
                            <div className='card p-4 ' >
                                  <div className='card-title'>
                                       <span>PRICE DETAILS</span>
                                  </div>
                                  <div className='d-flex flex-column'>
                                       <div className='pricearea'>
                                        <label>Price</label>
                                        <span>₹{total}</span>

                                       </div>
                                       <div className='pricearea'>
                                        <label>Delivery Charges</label>
                                        <span style={{color:'green'}}>Free</span>

                                       </div>
                                       <div className='totalarea'>
                                        <label>Total</label>
                                        <span>₹{total}</span>

                                       </div>
                                  </div>
                            </div>
                            <div className='card p-4 mt-2'>
                                <label style={{color:'grey'}}>Delivery Address</label>
                                 <textarea onChange={handler} name='address'></textarea>
                            </div>
                            <button className='btn btn-warning w-100 font-weight-bold' onClick={() => handlepayment()} style={{color:'white',fontSize:'1.2rem'}}>Place order</button>
                             </div>
                        </div>
                </div>
            
            

  </div>      


    );
}

export default Cart;
