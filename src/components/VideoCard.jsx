import React from 'react';

import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { addToHistory, deleteVideo } from '../services/AllApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VideoCard({dispalyVideo,setDeleteVideoStatus}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () =>{
      const today = new Date;
      const timesStamp =   new Intl.DateTimeFormat('en-US', {
        year:'numeric',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
       
      }).format(today);
      console.log(timesStamp)
      const reqBody ={
        url:dispalyVideo.youtubeLink,
        caption:dispalyVideo.caption,
        timesStamp:timesStamp
      }
      await addToHistory(reqBody)
      
      
      
      setShow(true);
    } 
    const deleteVideoItem = async(id)=>{
      const response = await deleteVideo(id)
      console.log("====response of delte===")
      console.log(response)
      if (response.status === 200){
        setDeleteVideoStatus(true)
        console.log("sucseesfully delted the video");
        
      }
      else{
        console.log("some thing went wrong")
        
      }
      
      
    }
    const dragStarted = (e,id)=>{
      console.log(`video with ID${id} started dragging`)
      e.dataTransfer.setData("videoID",id)
      
      
    }
    return (
        <>
            <Card style={{ width: '18rem', height:"350px" }} draggable onDragStart={(e)=>dragStarted(e,dispalyVideo.id)}>
                <Card.Img variant="top" src={dispalyVideo.imageUrl}
                    height='250px' style={{padding:'5px'}} onClick={handleShow} />
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <Card.Title>{dispalyVideo.caption}</Card.Title>
                        <Button variant="danger"  onClick={()=>deleteVideoItem(dispalyVideo.id)}  ><i class="fa-solid fa-trash" ></i></Button>
                    </div>

                </Card.Body>
            </Card>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="480" src={`${dispalyVideo.youtubeLink}`} title="Dheera Dheera Full Video Song | KGF Tamil Movie | Yash | Prashanth Neel | Hombale Films |Ravi Basrur" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      
        </>
    )
}

export default VideoCard