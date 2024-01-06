import Navbar from "../components/Navbar"
import Footer from "../components/footer"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { URL } from "../url"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../components/Loader"

const Profile = () => {
  // const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate();
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false);
  const [loader,setLoader]=useState(false);
  // console.log(param)

//  console.log(user);

const fetchProfile=async ()=>{
  setLoader(true);
  try{
    const res=await axios.get(`${URL}/api/users/${user?._id}`)
    //  console.log(res.data);
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
     setLoader(false);
  }
  catch(err){
     console.log(err)
     setLoader(true);
  }
}



  const handleUserUpdate=async()=>{
    setUpdated(false);
    setLoader(true);
    try{
      const res=await axios.put(`${URL}/api/users/${user?._id}`,{username,email,password},{withCredentials:true})
        toast.success('user updated successfully');
        // console.log(res.data);
        setUpdated(true);
        setLoader(false);
    }catch(err){
      setUpdated(false);
      console.log(err);
    }
  }
    
 const handleUserDelete=async()=>{
  try{
    const res=await axios.delete(`${URL}/api/users/${user._id}`,{withCredentials:true})
    console.log(res);
    console.log(user);
    setUser(null)
    console.log(user);
    navigate("/")
  }catch(err){
    console.log(err);
  }
 }

 const fetchUserPosts=async ()=>{
  setLoader(true);
  try{
    const res=await axios.get(`${URL}/api/posts/user/${user?._id}`)
    // console.log(res.data)
    setPosts(res.data)
    setLoader(false);


  }
  catch(err){
    console.log(err)
  }
}

 useEffect(()=>{
  fetchProfile();
  fetchUserPosts()

},[])




  return (
    <>
      {loader? <div className="h-[40vh] flex justify-center items-center"><Loader/></div>:  <div>
    <Navbar/>
    <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row  flex-col-reverse md:items-start items-start" >
      <div className="flex flex-col md:w-[70%] w-full">
        <h1 className="text-xl font-bold mb-4">your posts</h1>
        {posts?.map((p)=>(
        <ProfilePosts key={p._id} p={p}/>
      ))}
      </div>
      
      <div  className="md:sticky  md:top-12 flex justify-end items-start md:w-[30%] w-full md:items-end">
        <div className="flex flex-col space-y-4 items-start">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <input onChange={(e)=>setUsername(e.target.value)} value={username} className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text"/>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email"/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="text"/>
        <div className="flex items-center space-x-4 mt-8">
          <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">update</button>
          {/* <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">delete</button> */}
        </div>
        {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
        </div>
        {/* haef */}
      </div>
    </div>
    <Footer/>

</div>}
    </>
  
  )
}

export default Profile