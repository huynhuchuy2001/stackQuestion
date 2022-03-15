module.exports = {
  port: process.env.PORT || 8080,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb+srv://saiki:abc@123@cluster0.0nkrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    test: 'mongodb+srv://saiki:abc@123@cluster0.0nkrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};
