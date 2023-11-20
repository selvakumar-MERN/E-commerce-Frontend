import React, { useContext, useState } from 'react';
import Mycontext from '../../Context';
import { Link } from 'react-router-dom';

function Searcharea({product,categoryitem}) {
    const {setrecords,userdata} = useContext(Mycontext);
    const[category,setcategory]=useState("")

    const handlerChange = (e) => {
        const searchcon= (e.target.value).toLowerCase()
        setrecords(product.filter(item => item.productName.toLowerCase().includes(searchcon)))
    }
     
    const categorylist=(e)=>{
         setcategory(e.target.value)
        
    }
    return (
        <div className='row'>
            <div className='col-12 col-md-8'>
                <form className="d-flex ml-auto"> <input className="form-control mr-2" type="search" placeholder={`Search in ${categoryitem}`} onChange={handlerChange}></input>
                    <select className="form-control" id='category' onChange={categorylist} >
                        <option selected>Choose...</option>
                        <option>Mobiles</option>
                        <option>Furniture</option>
                        <option>Electronics</option>
                        <option>Appliances</option>
                        

                    </select>
                   {userdata.role !=='admin' ? <Link  to={`/category/${category}`} className="btn btn-outline-success mx-2" type="submit"  >Search</Link>:
                   <Link  to={`/admin/category/${category}`} className="btn btn-outline-success mx-2" type="submit"  >Search</Link>} </form>
            </div>

        </div>
        
    );
}

export default Searcharea;
