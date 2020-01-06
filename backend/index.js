const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

app.get('/cakes', (req, res) => {
  console.log('got req');
  res.json({
    cakes: [
      {
        id: 0,
        name: 'First Cake',
        comment: 'meh',
        imageUrl: 'https://picsum.photos/300',
        yumFactor: 2
      },
      {
        id: 1,
        name: 'Second Cake',
        comment: 'Well, it\'s better than the first one',
        imageUrl: 'https://picsum.photos/300',
        yumFactor: 3
      }
    ]
  });
});

app.listen(3000, () => console.log('Listening on port 3000'));