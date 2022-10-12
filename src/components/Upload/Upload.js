import { Button, Paper } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { SUpload } from './styles';
import { GoCloudUpload } from 'react-icons/go';
import { db, storage } from '../../firebase/config';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import Loader from '../Loader/Loader';

const Upload = (props) => {
    const [fileUpload, setFileUpload] = useState(false); //Variable para ocultar el drag
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageResult, setImageResult] = useState(false);  //Variable para mostrar el resultado de la segmentación
    const [imageUrl, setImageUrl] = useState("test");
    const segmentationPages = ['disco_optico', 'drusas', '', ''];
    const endpoints = ["http://127.0.0.1:8000/disco_optico/", "http://127.0.0.1:8000/drusas/", "", ""];
    const pos = props.userEmail.search("@");
    const user = props.userEmail.slice(0, pos);
    const date = new Date();
    let month = 0;
    let day = 0;
    let hour = 0;
    let minutes = 0;
    let seconds = 0;

    if (date.getMonth() < 9){
        const cero = 0
        month = cero.toString() + (date.getMonth() + 1)
    } else {
        month = date.getMonth() + 1
    }
    if (date.getDate() < 10){
        const cero = 0
        day = cero.toString() + date.getDate()
    } else {
        day = date.getDate()
    }
    if (date.getHours() < 10){
        const cero = 0
        hour = cero.toString() + date.getHours()
    } else {
        hour = date.getHours()
    }
    if (date.getMinutes() < 10){
        const cero = 0
        minutes = cero.toString() + date.getMinutes()
    } else {
        minutes = date.getMinutes()
    }
    if (date.getSeconds() < 10){
        const cero = 0
        seconds = cero.toString() + date.getSeconds()
    } else {
        seconds = date.getSeconds()
    }
    //Parse data to yyyymmddhhmmss
    const time = date.getFullYear().toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString()
    console.log("time is", time)

    const uploadPost = async() => {
        const docRef = doc(db, user, time);
        const data = {
            timestamp: serverTimestamp(),
        };
        setDoc(docRef, data)
        .then(() => {
            console.log("Document has been added successfully");
        })
        .catch(error => {
            console.log(error);
        })
        // const docRef = await addDoc(collection(db,user),{
        //     timestamp: serverTimestamp(),
        // })

        const finalTime = time

        await Promise.all(
            files?.map(image => {
                const imageRef = ref(storage, `${user}/${time}/original`);
                uploadBytes(imageRef, image, "data_url").then(async() => {
                    const downloadURL = await getDownloadURL(imageRef)
                    console.log('downloadURL', downloadURL)
                    await updateDoc(doc(db,user,finalTime),{
                        images: arrayUnion(downloadURL)
                    })
                })
                console.log('docRef.id', docRef.id)
            })
        )

        setLoading(true);
        console.log("name is: ", finalTime)
        console.log("user is: ", user)

        try {
            const response = await fetch(endpoints[props.page_id], {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ "name": finalTime, "user": user })
            });
            if (!response.ok) {
              throw new Error(`Error! status: ${response.statusText}`);
            }
            const result = await response.json();
            console.log('result is: ', JSON.stringify(result));
        } catch (err) {
            console.log("error en el consumo del api es: ", err.message);
        } finally {
            // setLoading(false);
            setImageResult(true);
            imageSegmentation(finalTime);
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
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

    const imageSegmentation = async(finalTime) => {
        console.log("finalTime: ", finalTime);
        const imageRef = ref(storage, `${user}/${finalTime}/${segmentationPages[props.page_id]}`);
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db,user,finalTime),{
            images: arrayUnion(downloadURL)
        })
        setImageUrl(downloadURL);
        setLoading(false);
    }

    useEffect(() => {
        console.log("Hubo un cambio ", imageUrl)
    }, [imageUrl]);

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
                    <em>(Solo se aceptan archivos con extensiones *.jpeg, *.png, *.jpg)</em>
                    </div>
                </Paper>
            }
            {!imageResult && !loading && selectedImages}
            {loading && <Loader></Loader>}
            {!loading && imageResult &&
                <div style = {{margin: "auto"}}>
                    <img src={imageUrl} width={500} alt=""/>
                </div>
            }
        </SUpload>
    );
};

export default Upload;