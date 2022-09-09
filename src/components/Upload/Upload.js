import { Button, Paper } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SUpload } from './styles';
import { GoCloudUpload } from 'react-icons/go';
import { db, storage } from '../../firebase/config';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

const Upload = () => {
    const [fileUpload, setFileUpload] = useState(false); //Variable para ocultar el drag
    const [files, setFiles] = useState([])
    const uploadPost = async() => {
        const docRef = await addDoc(collection(db,"posts"),{
            timestamp: serverTimestamp(),
            mensaje: "Juanse"
        })
        await Promise.all(
            files?.map(image => {
                const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`);
                console.log("imageRef",imageRef)
                uploadBytes(imageRef, image, "data_url").then(async() => {
                    console.log("entro")
                    const downloadURL = await getDownloadURL(imageRef)
                    console.log('downloadURL', downloadURL)
                    await updateDoc(doc(db,"posts",docRef.id),{
                        images: arrayUnion(downloadURL)
                    })
                })
            })
        )
        
    }
    const onDrop = useCallback((acceptedFiles) => {
        console.log("acceptedFiles", acceptedFiles)
        setFileUpload(true);
        setFiles(acceptedFiles.map(file=>
            Object.assign(file,{
                preview:URL.createObjectURL(file)
            })
        ))
    },[])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*':[]}
    })
    const selectedImages = files?.map(file=>(
        <div style = {{margin: "auto"}}>
            <img src={file.preview} style={{width:"300px"}} alt="" />
            <div>
                <Button style={{
                    margin: "30px 0",
                    borderRadius: 35,
                    backgroundColor: "#fbb800",
                    padding: "18px 36px",
                    fontSize: "18px",
                    width: "300px"
                }} variant="contained" onClick={uploadPost}>SEGMENTAR IMAGEN</Button>
            </div>
        </div>
    ))

    return (
        <SUpload>
            {
                !fileUpload && <Paper
                    sx={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: '360px',
                    padding: '80px 80px',
                    cursor: 'pointer',
                    background: '#FBB800',
                    borderRadius: "35px",
                    border: '4px dashed #fff',
                    '&:hover':{border: '4px solid #000'}
                }}>
                    <div {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <GoCloudUpload size={'100'} color={'white'}></GoCloudUpload>
                    {isDragActive?(
                        <p style={{color:'blue'}}>Puedes arrastrar imágenes aquí...</p>
                    ) : (
                        <p>Puedes arrastrar ó dar click para seleccionar las imágenes</p>
                    )}
                    <em>(Solo se aceptan archivos con extensiones *.jpeg, *.png, *.jpg *.tiff)</em>
                    </div>
                </Paper>
            }
            {selectedImages}
        </SUpload>
    );
};

export default Upload;