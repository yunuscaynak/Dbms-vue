const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); // Şifreleri hashlemek ve karşılaştırmak için bcryptjs modülünü import eder.

const UserSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
  },
  password: { 
    type: String, 
    required: true, 
    
  },
});

UserSchema.pre('save', async function (next) { // 'save' olayından önce çalışacak bir middleware fonksiyonu tanımlar.
  if (!this.isModified('password')) return next(); // Şifre değişmemişse devam eder.
  const salt = await bcrypt.genSalt(10); // Şifre için bir salt oluşturur.
  this.password = await bcrypt.hash(this.password, salt); // Şifreyi hashler.
  next(); // Middleware işlemi tamamlandığında sonraki işlemlere geçer.
});

UserSchema.methods.matchPassword = async function (password) { // Şifreyi doğrulamak için bir yöntem tanımlar.
  return await bcrypt.compare(password, this.password); // Verilen şifre ile saklanan şifreyi karşılaştırır.
};

const User = mongoose.model('User', UserSchema); // User adında bir model oluşturur ve UserSchema'yı kullanır.
module.exports = User; // User modelini diğer dosyalar için export eder.
