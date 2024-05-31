import React, { useState } from 'react';
import axios from 'axios';
import ImageUploadComponent from './ImageUploadComponent';

const CandidateForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        party: '',
        age: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('')
    };

    const handleImageUpload = (status) => {
        setIsImageUploaded(status);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.party || !formData.age) {
            setError('All fields are required.');
            return;
        }

        if (!isImageUploaded) {
            setError('Image upload is required.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const adminToken = sessionStorage.getItem('token'); // Get token from sessionStorage

            // Send POST request to the server with candidate data and admin token
            const response = await axios.post('http://localhost:8080/candidate', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}` // Include admin token in Authorization header
                }
            });
            if(response.status===200){
                alert('Candidate created:', response.data.name);
            }

            // Reset form fields
            setFormData({
                name: '',
                party: '',
                age: ''
            });
            setIsImageUploaded(false);

            // Clear the ImageUploadComponent
            setResetTrigger(true);

        } catch (error) {
            console.error('Error creating candidate:', error);
            setError('Failed to create candidate. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='container card border-dark'>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                    <label for="candidateName" class="form-label">Candidate Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Candidate Name"
                            id='candidateName'
                            required
                        />
                    </div>
                    <div className="mb-3">
                    <label for="candidateParty" class="form-label">Party Name:</label>
                        <input
                            type="text"
                            name="party"
                            value={formData.party}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Party Name"
                            id='candidateParty'
                            required
                        />
                    </div>
                    <div className="mb-3">
                    <label for="candidateAge" class="form-label">Candidate Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter Candidate Age"
                            id='candidateAge'
                            required
                        />
                    </div>
                    <div className='border border-dark p-1 rounded'>
                        <ImageUploadComponent
                            name={formData.name}
                            desc={formData.party}
                            age={formData.age}
                            onUpload={handleImageUpload}
                            resetTrigger={resetTrigger}
                        />
                    </div>
                    <div className='text-center mt-3 mb-3'>
                        {error && <p className="text-danger mt-2">{error}</p>}

                        {loading ? (
                            <button type="button" disabled className="btn btn-primary mt-2">Loading...</button>
                        ) : (
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default CandidateForm;
