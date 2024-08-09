const express = require('express'); 
const jwt = require('jsonwebtoken'); // JSON Web Token (JWT) modülünü import eder.
const User = require('../models/user'); // Kullanıcı modelini import eder.

const router = express.Router(); // Yeni bir Express router oluşturur.

const jwtSecret = process.env.JWT_SECRET || 'your_default_secret_key'; // Ortam değişkeninden JWT anahtarını al

// Register
router.post('/register', async (req, res) => { // '/register' yoluna gelen POST isteklerini işler.
  const { name, email, password } = req.body; // İstek gövdesinden name, email ve password değerlerini alır.

  try {
    const userExists = await User.findOne({ email }); // E-posta ile kullanıcıyı kontrol eder
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' }); // Kullanıcı varsa hata mesajı döner
    }

    const user = new User({ name, email, password }); // Yeni bir User örneği oluşturur.
    await user.save(); // Kullanıcıyı veritabanına kaydeder.

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' }); // Kullanıcı kimliği ile bir JWT oluşturur, 1 saatlik geçerlilik süresi belirler.

    res.status(201).json({ token }); // Başarılı yanıt döner ve oluşturulan token'ı yanıt olarak gönderir.
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error }); // Hata oluşursa hata mesajı ve hata bilgisi ile yanıt döner.
  }
});

// Login
router.post('/login', async (req, res) => { // '/login' yoluna gelen POST isteklerini işler.
  const { email, password } = req.body; // İstek gövdesinden email ve password değerlerini alır.

  try {
    const user = await User.findOne({ email }); // Veritabanında verilen email ile eşleşen kullanıcıyı arar.

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Kullanıcı bulunamazsa hata yanıtı döner.
    }

    const isMatch = await user.matchPassword(password); // Verilen şifrenin kullanıcı şifresi ile eşleşip eşleşmediğini kontrol eder.

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Şifre eşleşmezse hata yanıtı döner.
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' }); // Kullanıcı kimliği ile bir JWT oluşturur, 1 saatlik geçerlilik süresi belirler.

    res.status(200).json({ token }); // Başarılı yanıt döner ve oluşturulan token'ı yanıt olarak gönderir.
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error }); // Hata oluşursa hata mesajı ve hata bilgisi ile yanıt döner.
  }
});

// Data  
router.post('/api/data', async (req, res) => {  
  try {  
    // Burada veri kaydetme işlemlerini gerçekleştirebilirsiniz  
    res.status(200).json({ message: 'Data saved successfully' });  
  } catch (error) {  
    res.status(500).json({ message: 'Error saving data', error });  
  }  
});  

module.exports = router; // Router'ı dışa aktarır, böylece diğer dosyalarda kullanılabilir.
