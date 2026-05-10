import axios from 'axios';
import productsMock from '../mocks/products.json';

// Simulamos una latencia de red para la petición
const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  await mockDelay(800); // Simulando red
  
  // En un entorno real esto sería:
  // const response = await axios.get('/api/products');
  // return response.data;
  
  // Retornamos el JSON directamente para el mock
  return productsMock;
};
