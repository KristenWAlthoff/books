const express = require('express');
const path = require('path');
const cors = require('cors');
const readerController = require('./controllers/readerController');
const bookController = require('./controllers/bookController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());


app.post('/login', readerController.login, (req, res) => {
  res.status(200).json(res.locals.readerID)
});

app.post('/signUp', readerController.signUp, (req, res) => {
  res.status(200).json(res.locals.readerID)
});

app.put('/changeBookStatus', bookController.changeBookStatus, (req, res) => {
  res.status(200).json(res.locals.bookStatus)
});

app.get('/findBooks/:reader_id', bookController.findBooks, (req, res) => {
  res.status(200).json(res.locals.userBooks)
});


//--------------------------ERROR HANDLING---------------------------------------
//ROLE: catch-all route handler for requests made to unknown route

app.use('/*', (req, res) =>
  res.status(404).send('Request sent to unknown page')
);


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.stats).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}`);
});

module.exports = app;