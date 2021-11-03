import React,{ useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { ref,uploadBytesResumable,getDownloadURL  } from 'firebase/storage';
import { db,storage} from '../config/firebase';
import { Form,ProgressBar,Badge} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { bytesToSize,dataURItoBlob} from '../utility/utility';
import {toast } from 'react-toastify';

function BookAdd() {


    const [title, setTitle] = useState('');
    const [autour, setAutour] = useState('');
    const [description, setDescription] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [pdfFileError, setPdfFileError] = useState('');
    const [coverError,setCoverError] = useState('');
    const [size,setsize]=useState(null);
    const [progress,setProgress] = useState(null);
    const [pdfDownload,setPdfDownload] = useState('');
    const [coverDownload,setCoverDownload] = useState('');
    const { currentUser } = useAuth();
    const handlePdfFileChange = (e) => {
        const fileType=['application/pdf'];

        let selectedFile = e.target.files[0];
    if(selectedFile){
        if (selectedFile && fileType.includes(selectedFile.type)) {
        
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
              setsize(bytesToSize(selectedFile.size));
              savePDF(selectedFile.name,e.target.result);
              setPdfFileError('');
            }
           
      }
      else{
        setPdfFileError('Please select valid pdf file');
        }
    }

    }
    
    const handleBOOkCoverImage = (e) => {
        const fileType = ['image/png', 'image/jpg','image/TIFF','image/jpeg'];
  
        let selectedFile = e.target.files[0];
        if (selectedFile) {
          if (selectedFile && fileType.includes(selectedFile.type)) {
        
          let reader = new FileReader();
              reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) => {
                saveCover(selectedFile.name,e.target.result);
                setCoverError('');
              }

        }
        else{
          setCoverError('Please select valid image format png,jpg,TIFF,jpeg');
        }
      }
  
    }

    const saveCover = (coverName,cover) => {
        const storageRef = ref(storage, `cover/${coverName}`);
        
        const uploadTask = uploadBytesResumable(storageRef,dataURItoBlob(cover));        
   
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
               
                switch (error.code) {
                    case 'storage/unauthorized':
                        toast.warn("User doesn't have permission to access the object", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;
                    case 'storage/canceled': 
                        toast.warn("User canceled the upload", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;

                    case 'storage/unknown':
                        toast.warn("Unknown error occurred, inspect error.serverResponse", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;
                        default:
                            break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                   
                    console.log("Cover",downloadURL);
                    setCoverDownload(downloadURL);
                });
            });
    }

    const savePDF =(fileName,pdfFile) =>{
        const metadata = {
                contentType: 'application/pdf',
              };
        const storageRef = ref(storage, `books/${fileName}`);
        
     const uploadTask = uploadBytesResumable(storageRef,dataURItoBlob(pdfFile),metadata);        
     
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        toast.warn("Upload is paused", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                        default:
                            break;
                }
            },
            (error) => {
             
                switch (error.code) {
                    case 'storage/unauthorized':
                        toast.warn("User doesn't have permission to access the object", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;
                    case 'storage/canceled': 
                        toast.warn("User canceled the upload", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;

                    case 'storage/unknown':
                        toast.warn("Unknown error occurred, inspect error.serverResponse", { hideProgressBar: true, autoClose: 1000, theme: 'dark' });
                        break;
                        default:
                            break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                   
                    console.log("PDF",downloadURL);
                    setPdfDownload(downloadURL);
                });
            });
    }

  // form submit
  const handlePdfFileSubmit=(e)=>{
      e.preventDefault(); 
          if (title || description || autour || publisher || publishedDate || pdfDownload || coverDownload || size !== null || size !== '') {
              UploadData(title, autour,description, publisher, publishedDate, pdfDownload, coverDownload, size)
          
              setTitle('');
              setDescription('');
              setPublisher('');
              setPublishedDate('');
              setAutour('');
              
          }
    }
    
    const UploadData = async (title,autour, description, publisher, publishedDate, pdfDownload, cover,size) => {
      
      
        if (currentUser) {
           
            
            try {
             await addDoc(collection(db, `Library`), {
                UID: currentUser.uid,
                title: title,
                autour:autour,
                description: description,
                publisher: publisher,
                publishedDate: publishedDate,
                pdfFile: pdfDownload,
                cover: cover,
                fileSize:size,
                ownerName: currentUser.displayName,
                ownerEmail: currentUser.email,
                ownerImg: currentUser.photoURL
             }).then(() => progress === 100.0 && toast.success("Book is Added to library!", { hideProgressBar: true, autoClose: 1500, theme: 'dark' }));
        }catch (e) {
            toast.warn("please try again later", { hideProgressBar: true, autoClose:1000,theme:'dark'})
          }
    } else {
        toast.warn("please register or login first!", { hideProgressBar: true, autoClose: 1500,theme:'dark'}) 
    }
    }


    return (
        <div>
                    <Form className='form-group library-container' onSubmit={handlePdfFileSubmit}>
               
               <div className="info">
               <Form.Group className="mb-3" controlId="">
                   <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Book Title" required/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="">
                   <Form.Control type="text" value={autour} onChange={(e)=>setAutour(e.target.value)}placeholder="Book Author" required/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="">
                   <Form.Control type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Book Description" required/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="">
                   <Form.Control type="text"value={publisher} onChange={(e)=>setPublisher(e.target.value)} placeholder="Book Publisher" required/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="">
                  <Form.Label>Book published Date</Form.Label>
                       <Form.Control type="date"autoFocus value={publishedDate} onChange={(e)=>setPublishedDate(e.target.value)} required />
               </Form.Group>
                   <div className='add'>
                   <Form.Label>Book Cover Image</Form.Label>

                       <input type="file" className='form-control'
                           required onChange={handleBOOkCoverImage}
                           
                   />
                   {coverError&&<div className='error-msg'>{coverError}</div>}
                       <br></br>
                   </div>
                   <div className='add mr-b'>
                   <Form.Label>Book in PDF format</Form.Label>

                       <input type="file" className='form-control'
                   required onChange={handlePdfFileChange}
                   />
                   {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
                    
                       {size &&<div> <Badge bg="secondary">{size}</Badge></div>}
              
                   </div>
              
               </div>
               {progress &&<div className="progress-bar"> <ProgressBar  striped   variant="success" now={progress.toFixed(1)} label={`${progress.toFixed(1)}%`} /></div>}

               <button type="submit" className='btn btn-success btn-lg mr-t'>
                   UPLOAD
               </button>

           </Form>
        </div>
    )
}

export default BookAdd;
