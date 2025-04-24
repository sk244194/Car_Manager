import axios from "axios";
import { useState,useEffect } from "react";
export function MyCars() {
  const [cars, setCars] = useState([]);
  console.log(cars);

  useEffect(() => {
    const fetchMyCars = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/mycars', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(response.data); 
      console.log(response.data)
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
    <div>
      <h1>My Cars</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cars.map((car) => (
          <div key={car._id} style={{ margin: '10px' }}>
            <img src={`http://localhost:5000/${car.image}`} alt="Car" style={{ width: '200px', height: 'auto' }} />
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
