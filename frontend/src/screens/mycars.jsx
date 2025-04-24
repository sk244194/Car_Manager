import axios from "axios";
import { useState, useEffect } from "react";
import './cars.css'; 

export function MyCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchMyCars = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/mycars', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(response.data); 
    };
    fetchMyCars();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/mycars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(cars.filter(car => car._id !== id));
      alert('Car deleted!');
    } catch (error) {
      alert('Failed to delete car');
    }
  };

  return (
    <div className="cars-page">
      <h1 className="cars-title">My Cars</h1>
      <div className="cars-list">
        {cars.map((car) => (
          <div key={car._id} className="car-card">
            <img src={`http://localhost:5000/${car.image}`} alt="Car" />
            <p>Contact: {car.contact}</p>
            <p>Description: {car.description}</p>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
