const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = () => {
  mongoose
    .connect('mongodb+srv://crud:crud@cluster0.k8bjxuj.mongodb.net/user', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

module.exports = connect;
