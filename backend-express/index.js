const express = require('express');
const router = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});