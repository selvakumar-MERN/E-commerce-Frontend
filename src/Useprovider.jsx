import React ,{useEffect, useState} from "react";
import Mycontext from "./Context";
import axios from "axios";
import { verifylogin } from "./Components/utlis/Apis";

const UserProvider = ({children})=>{
    const[item,setitem]=useState([]);
    const[userdata,setuser]=useState({});
    const [records, setrecords] = useState([])
    
    useEffect( () => {
        
        const usertoken = {
            token: window.localStorage.getItem("admintoken")
       
        }
        if(!usertoken.token){
             usertoken.token=window.localStorage.getItem("usertoken")
        }
          
           axios.post(verifylogin, usertoken)
            .then((res) => {
                const { data } = res
                setuser(data)
                
        })

            .catch((error) => {

                return(error)
            })
            
    }

, [])


    return(
    <Mycontext.Provider value={{item,setitem,userdata,records,setrecords}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;