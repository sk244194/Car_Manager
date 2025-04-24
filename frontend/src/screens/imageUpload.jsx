import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './imageupload.css'; 

export function ImageUpload() {
  const [imagepreview, setimagepreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState(""); 
  const [contact, setContact] = useState("");         

  const handleimage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const image_url = URL.createObjectURL(file);
      setimagepreview(image_url);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('image', selectedFile);
      formdata.append('description', description); 
      formdata.append('contact', contact);         

      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/auth/imageUpload',
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Image Uploaded');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed');
    }
  };

  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type='file' onChange={handleimage} required />
        <input
          type='text'
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type='number'
          placeholder='Contact Number'
          value={contact}
          onChange={e => setContact(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>
      {imagepreview && (
        <div className="upload-preview">
          <img src={imagepreview} alt="Preview" />
        </div>
      )}
      <div className="upload-links">
        <p>
          See all Cars <Link to='/cars'>Click Here</Link>
        </p>
        <p>
          See and edit my Cars <Link to='/mycars'>Mycars</Link>
        </p>
      </div>
    </div>
  );
}
