const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) middleware'ini import eder.

const app = express(); 
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); // CORS ayarlarını uygulayarak farklı kökenlerden gelen istekleri kabul eder.
app.use(express.json()); // JSON formatındaki istek gövdesini otomatik olarak ayrıştırır.

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/auth', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
});

const db = mongoose.connection; // Mongoose bağlantı nesnesini alır.
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Bağlantı hatalarını yakalar ve konsola yazdırır.
db.once('open', () => { // Bağlantı başarıyla açıldığında çalışacak kod.
  console.log('MongoDB connected'); // Başarılı bağlantı mesajını konsola yazdırır.
});

// Routes
app.use('/api/auth', require('./routes/auth')); // '/api/auth' yoluna gelen istekleri './routes/auth' modülüne yönlendirir.
app.use('/api/data', require('./routes/data'));

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});
