import { Paper } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SUpload } from './styles';
import { GoCloudUpload } from 'react-icons/go';

const Upload = () => {
    const [files, setFiles] = useState([])
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles)
        console.log(acceptedFiles)
    },[])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*':[]}
    })

    return (
        <SUpload>
            <Paper
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
        </SUpload>
    );
};

export default Upload;