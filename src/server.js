import cowsay from 'cowsay';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(cowsay.say({
    text : `Server is running on port ${PORT}`,
    e : "^^",
    T : "U "
  }));
});


