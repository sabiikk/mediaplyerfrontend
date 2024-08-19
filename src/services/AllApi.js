import { serverURL } from "./serverURL";
import { commonApi } from "./commonApi";

// upload video
export const uploadVideo = async (reqBody) => {
    return await commonApi('POST', `${serverURL}/videos`, reqBody)
}

//get all videos
export const getAllVideos = async () => {
    return await commonApi('GET',`${serverURL}/videos`,"")
}

//delete video
export const deleteVideo = async (id)=>{
    return await commonApi('DELETE',`${serverURL}/videos/${id}`,{})
}

//add to watch history
export const addToHistory = async (reqBody)=>{
    return await commonApi('POST',`${serverURL}/histrory`,reqBody)
}

//get all history
export const getHistory=async()=>{
    return await commonApi('GET',`${serverURL}/histrory`,{})
}

// delete history by id
export const deleteHistory = async(id)=>{
    return await commonApi('DELETE',`${serverURL}/histrory/${id}`,{})
}

// add category
export const addCategory = async(reqBody)=>{
    return await commonApi('POST',`${serverURL}/categroy`,reqBody)
}

//get all category
export const getAllCategory = async()=>{
    return await commonApi('GET',`${serverURL}/categroy`,"")
}
//
export const deleteCategory = async(id)=>{
    return await commonApi('DELETE',`${serverURL}/categroy/${id}`,{})
}

//
export const getAllVideosId = async(id)=>{
    return await commonApi('GET',`${serverURL}/videos/${id}`,"")
}

//update category with video details

export const updateCategory = async(data,id)=>{
    return await commonApi('PUT',`${serverURL}/categroy/${id}`,data)
}