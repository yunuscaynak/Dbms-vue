import axios from 'axios'; // Axios kütüphanesini import eder. Axios, HTTP istekleri yapmak için kullanılan popüler bir kütüphanedir.

const API_URL = 'http://localhost:5000/api/auth'; // API'nin temel URL'sini tanımlar. Bu, isteklerin yapılacağı sunucunun adresini belirtir.

export const register = async (userData) => { // register adında bir asenkron fonksiyon tanımlar. Bu fonksiyon, kullanıcı kayıt işlemini gerçekleştirir.
  const response = await axios.post(`${API_URL}/register`, userData); // API'ye POST isteği gönderir. URL, API_URL'ye '/register' eklenerek oluşturulur. Gönderilen veri userData'dır.
  return response.data; // API'den gelen yanıtın verisini döndürür.
};

export const login = async (userData) => { // login adında bir asenkron fonksiyon tanımlar. Bu fonksiyon, kullanıcı giriş işlemini gerçekleştirir.
  const response = await axios.post(`${API_URL}/login`, userData); // API'ye POST isteği gönderir. URL, API_URL'ye '/login' eklenerek oluşturulur. Gönderilen veri userData'dır.
  return response.data; // API'den gelen yanıtın verisini döndürür.
};

