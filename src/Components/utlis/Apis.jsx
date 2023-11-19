//back-end-host
const host= 'https://e-commerce-backend-7fxf.onrender.com'

//user API-ENDPOINTS
export const login = `${host}/user/login`
export const verifylogin =`${host}/user/verifylogin`
export const register= `${host}/user/register`
export const showproduct=`${host}/product/products`
export const getoneproduct=`${host}/product`
export const getcart=`${host}/user/cart`
export const getorder=`${host}/user/getorder`
export const removecartitem=`${host}/user/cart`
export const getcategory=`${host}/product/category`
export const postreview=`${host}/user/postreview`
export const getreview=`${host}/user/getreview`

//admin API-ENDPOINTS
export const addproduct=`${host}/admin/createProduct`
export const deleteproduct =`${host}/admin/deleteProduct`
export const updateproduct= `${host}/admin/updateProduct`
export const getusers= `${host}/admin/users`
export const deleteuser= `${host}/user/deleteUser`
export const updatestatus=`${host}/admin/updatestatus`

//payment
export const payment=`${host}/product/payment`
export const verifyorder=`${host}/product/verify`
export const addorders= `${host}/user/orders`
