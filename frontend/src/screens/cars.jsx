import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cars.css';

export function AllCarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://car-manager-backend-3gp0.onrender.com/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="cars-page">
      <h1 className="cars-title">All Cars</h1>
      <div className="cars-list">
        {cars.map((car) => (
          <div key={car._id} className="car-card">
            <img src={car.image.startsWith('http') ? car.image : `https://car-manager-backend-3gp0.onrender.com/${car.image}`} alt="Car" />
            <p>Owner: {car.user_id}</p>
            <p>Contact: {car.contact}</p>
            <p>Description: {car.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
