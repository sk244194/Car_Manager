import axios from 'axios';
import {useState} from 'react';

export function ImageUpload(){
    const [imagepreview, setimagepreview] = useState("");

    const handleimage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const image_url = URL.createObjectURL(file);
            setimagepreview(image_url);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
            'http://localhost:5000/api/auth/imageUpload',
                { image: imagepreview },
                { headers: { authorization: `Bearer ${token}` } }
            );
        }
        catch (error) {
            alert(error.response?.data?.error || 'Failed');
          }

    }

    return (
        <div>
            <input type = 'file' placeholder='Upload Image' onChange={handleimage}/>
            <button type = 'submit' onClick={handleSubmit}>Submit</button>
        </div>
    )
}