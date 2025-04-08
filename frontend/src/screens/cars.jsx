import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AllCarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars'); // Fetch car data from backend
        setCars(response.data); // Set car data in state
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>All Cars</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cars.map((car) => (
          <div key={car._id} style={{ margin: '10px' }}>
            <img src={`http://localhost:5000/${car.image}`} alt="Car" style={{ width: '200px', height: 'auto' }} />
            <p>{car.user_id}</p> {/* Display user ID or other details */}
          </div>
        ))}
      </div>
    </div>
  );
}
