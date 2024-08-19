import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getAllCategory, getAllVideosId, updateCategory } from '../services/AllApi';
import { toast } from 'react-toastify';
import VideoCard from './VideoCard';



function Category() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState();
    const [allCategory,setAllCategory]= useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddCategoryShow = async ()=>{
        if (!categoryName){
            alert("please fill the form complitly")
        }
        else{
          
            let body = {
                categoryName:categoryName,
                allViseos:[]
            }
            const response = await addCategory(body)
            if (response.status === 201){
                toast.success(`${categoryName} successfully inserted`)
                handleClose()
                setCategoryName(' ')
            }
            else{
                toast.error("some thing went wrong")
            }

        }
        
    
    }
    const getCategory = async()=>{
        const response = await getAllCategory();
        const {data} = response;
        console.log("category Details")
        console.log(data)
        setAllCategory(data)
        
        
    }
    useEffect(()=>{
        getCategory();
    },[])
    const handleDelete = async (CategoryId)=>{
        const result = await deleteCategory(CategoryId);
        console.log("delete respones");
        console.log(result)
        if (result.status === 200){
            getCategory()
        }
        else{
            toast.error("some thing wrnong")
        }
        
        
    }

   const videoDrop = async(e,id)=>{
    console.log("===on drop=====")
    
    const videoId=e.dataTransfer.getData("videoID")
    console.log(`video with id ${videoId} need to put inside category with id ${id} `)
    const {data} =await getAllVideosId(videoId);
    console.log("=====video deatils")
    console.log(data)
    const selectedCategory = allCategory?.find(item=>item.id==id);
    selectedCategory.allViseos.push(data)
    console.log("===selected category");
    console.log(selectedCategory)
    const response = await updateCategory(selectedCategory,id)
    getCategory()
    
    

    
    
    
    

    
   }
   const dragOver =(e)=>{
    //onDragOver method will trigger page refresh,so the video id we are passing my loast
    e.preventDefault();
    console.log("============inside");
    
   }

    return (
        <>
            <button className='btn btn-warning' onClick={handleShow}>Add New Category</button>
            {
                allCategory?.length > 0 ?(
                    allCategory.map((item)=>(
                        <div className='m-3 border border-secondary rounded p-3'
                        droppable onDragOver={(e)=> dragOver(e)}
                        onDrop={(e)=>videoDrop(e,item.id)}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 style={{color:'white'}}>{item.categoryName}</h6>
                                <button className='btn btn-danger'onClick={()=>handleDelete(item.id)} ><i class="fa-solid fa-trash" ></i></button>
                            </div>
                            {
                                item?.allViseos?.length>0?
                                item.allViseos?.map(card=>(
                                <VideoCard dispalyVideo={card}/>
                                ))
                                : <p>Nothing to display</p>
                            }

                        </div>
                    )
                )

             ) :
                     <p>No category found</p>
                
            }
            <Modal show={show} onHide={handleClose} data-bs-theme='dark'>
                <Modal.Header closeButton className='bg-dark'>
                    <Modal.Title><i class="fa-solid fa-list text-warning me-3"></i><span className='textStyle'>ADD CATEGORY</span></Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <p className='textStyle' style={{ fontWeight: '700' }}>Please fill the form</p>
                    <Form className='border border-secondary p-3 rounded' data-bs-theme='light'>
                        <Form.Group className="mb-3"  >
                            <Form.Control type="text" placeholder="Enter Category Name"
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='bg-dark'>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="warning" onClick={handleAddCategoryShow}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
            

        </>
    )
}

export default Category