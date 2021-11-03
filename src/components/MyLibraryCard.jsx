import React from 'react'
import { Card,Badge } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';

function MyLibraryCard({ data,deleteHandler,ismy}) {
    const { currentUser } = useAuth();
    const  books  = data.data();
    return (
        <div>
            <Card  style={{ width: '20rem' ,margin:10}}>
  <Card.Img variant="top" src={books?.cover} style={{ width: '20rem' ,height:200}} />
  <Card.Body >
         <Card.Title style={{textTransform:'uppercase'}}>{books.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By { books?.autour}</Card.Subtitle>
                  
    <Card.Text>
     {books?.description}
     </Card.Text>
                    
  </Card.Body>
  <Card>
     <Card.Text className="mr-l">
     Published Date: {books?.publishedDate}
    
    </Card.Text>
    <Card.Text className="mr-l" >
   publisher: {books?.publisher}
    </Card.Text>              
<Badge bg="success"> File Size: {books?.fileSize}</Badge>
                
                </Card>
         
  <Card.Body>
<div className="sub-post">
    <Card.Img variant="top"  src={books.ownerImg ? books.ownerImg : "https://i.pravatar.cc/300"} style={{ width: '30px' ,height:30,borderRadius:"50%"}} className="mr-l mr-r " />
                        {currentUser.uid=== books.UID?
                            <div className=""> <Badge bg="secondary">Your share this Book</Badge></div> :
                           <div><Badge bg="secondary">{books.ownerName} share this book</Badge></div>
                           }
                    </div>
     
                </Card.Body>
                <Card.Link href={books.pdfFile} target="_blank"  download className="btn-custom btn-prim link">Read</Card.Link>
{ismy && currentUser.uid=== books.UID?<button className="btn btn-danger" onClick ={(e)=>deleteHandler(data?.id)}>delete</button>:""}
</Card>
        </div>
    )
}

export default MyLibraryCard
