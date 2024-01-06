import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import axios from "axios"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import toast from "react-hot-toast"

const Comment = ({c,post}) => {

 const {user}=useContext(UserContext)

 const deleteComment=async(id)=>{
  try{
    await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
    toast.success('Comment deleted successfully');
    window.location.reload(true)
  }catch(err){
   console.log(err);
  }
 }


  return (
    <div>
        <div className='px-2 px-2 bg-gray-200 rounded-lg my-2'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-bold text-gray-600'>{c.author}</h3>
                    <div className='flex justify-center item-center space-x-4'>
                    <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
                    <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
                    {user?._id===c?.userId?
                        <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                       </div>:""
                    }
                     
                    </div>
                   </div>
                  <p className='px-4 mt-2'>{c.comment}</p>
                </div>
    </div>
  )
}

export default Comment