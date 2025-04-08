import axios from 'axios';
import {useState} from 'react';
import { Link } from 'react-router-dom';

export function ImageUpload(){
    const [imagepreview, setimagepreview] = useState("");
    
    // For Storing
    const [selectedFile, setSelectedFile] = useState(null);

    const handleimage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const image_url = URL.createObjectURL(file);
            // This creates a blob url
            // Just for Preview
            setimagepreview(image_url);

            setSelectedFile(file);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append('image',selectedFile);

            const token = localStorage.getItem('token');
            const response = await axios.post(
            'http://localhost:5000/api/auth/imageUpload',
                formdata,
                { headers: { authorization: `Bearer ${token}` } }
            );

            alert('Image Uploaded');
        }
        catch (error) {
            alert(error.response?.data?.error || 'Failed');
          }

    }

    return (
        <div>
            <input type = 'file' placeholder='Upload Image' onChange={handleimage}/>
            <button type = 'submit' onClick={handleSubmit}>Submit</button>
            <p>See all Cars<Link to = '/cars'>Click Here</Link></p>
        </div>
    )
}