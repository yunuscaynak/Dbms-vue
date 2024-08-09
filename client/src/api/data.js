//api/data.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data';

// Axios instance'ı oluştur
const apiClient = axios.create({
  baseURL: API_URL,
});

// Veriyi ekle
// createData fonksiyonunu dışa aktarır
export const createData = async (data) => {
  try {
    // Asenkron olarak API istemcisi kullanarak POST isteği gönderir
    // '/' endpoint'ine 'data' ile POST isteği yapar
    const response = await apiClient.post('/', data);

    // İsteğin başarılı olması durumunda sunucudan dönen veriyi döndürür
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error.response ? error.response.data : error.message);

    // Hata meydana geldiğinde hatayı tekrar fırlatır
    throw error;
  }
};


// Veriyi getir
export const getData = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Veriyi güncelle
export const updateData = async (id, data) => {
  try {
    const response = await apiClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Veriyi sil
export const deleteData = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error.response ? error.response.data : error.message);
    throw error;
  }
};
