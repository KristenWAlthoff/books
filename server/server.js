const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.cors());
app.use(express.urlencoded({extended: true}))



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