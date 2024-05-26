import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImageUploadComponent = ({ onUpload, name, desc, age, resetTrigger }) => {
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (resetTrigger) {
            setImage(null);
            setSelectedFile(null);
            setError('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [resetTrigger]);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const onFileUpload = async (event) => {
        event.preventDefault();
        setError('');
        if (!selectedFile || !desc || !name || !age) {
            setError('All fields are required.');
            return;
        }else{setError('');}

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", name);
        formData.append("desc", desc);

        try {
            const response = await axios.post('https://image-gallery-pmeq.onrender.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImage(response.data);
            if (response.status === 201) {
                alert("Image uploaded successfully!");
                setSelectedFile(null);
                onUpload(true);
            }

        } catch (error) {
            console.error("Error uploading file", error);
            onUpload(false);
        }
    };

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <h4>Upload Party Symbol</h4>
                    <input type="file" onChange={onFileChange} ref={fileInputRef} required />
                    <button onClick={onFileUpload}>Upload</button>
                </div>
                <div className='col-md-6'>
                    <h4>Uploaded Party Symbol</h4>
                    {image && (
                        <div style={{ margin: '10px' }}>
                            {image.img && <img height={50} width={50} src={`https://image-gallery-pmeq.onrender.com${image.img.path}`} alt={image.name} style={{ maxWidth: '100%' }} />}
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default ImageUploadComponent;
