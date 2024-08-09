// routes data.js
const express = require('express');
const { protect } = require('../middleware/auth'); // Kimlik doğrulama middleware'i
const Data = require('../models/data');

const router = express.Router();

// Veri ekleme işlemi 
// POST isteği için bir route tanımlar. Bu route '/' endpoint'ine yapılan POST isteğini işler.
router.post('/', async (req, res) => {
  // İstek gövdesinden (request body) gerekli verileri alır
  const { name, age, jobs, phone, email } = req.body;

  try {
    // Yeni bir Data nesnesi oluşturur ve alınan verileri bu nesneye atar
    const data = new Data({ name, age, jobs, phone, email });

    // Veriyi veritabanına kaydeder
    await data.save();
    
    // Başarılı bir şekilde veri kaydedildikten sonra 201 HTTP statü kodu ile yanıt gönderir
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating data', error });
  }
});


// Kullanıcıya ait tüm verileri getirme işlemi 
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Veri güncelleme işlemi 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, jobs, phone, email } = req.body;

  try {
    const data = await Data.findByIdAndUpdate(id, { name, age, jobs, phone, email }, { new: true });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Veri silme işlemi 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Data.findByIdAndDelete(id); 
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error });
  }
});

module.exports = router;
