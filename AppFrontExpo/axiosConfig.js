import axios from 'axios';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'web' 
  ? 'http://localhost:3000/' // URL pour le web
  : 'http://10.117.60.102:3000/'; // URL pour les applications mobiles

// configuration d'instance axios
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    // Authorization: `<Your Auth Token>`, // si besoin d'un token
    'Content-Type': 'application/json',
  },
  timeout: 1000, // Temps d'attente maximal pour les requêtes
});

export default instance;