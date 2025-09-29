const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API running...' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
