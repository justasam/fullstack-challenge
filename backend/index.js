const express = require('express');
const cors = require('cors'); // for running on local host
const low = require('lowdb'); // would use mongo in prod, this will do for small project
const FileSync = require('lowdb/adapters/FileAsync');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const path = require('path');

const app = express();
// serve static files from react app
app.use(express.static(path.join(__dirname, 'build')));

// need to wait for db to start up
// so async IIFE
(async () => {
  const adapter = new FileSync('db.json');
  const db = await low(adapter);

  // required if empty
  db.defaults({ cakes: [] }).write();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.options('*', cors());

  app.get('/cakes', (req, res) => {
    res.json({
      cakes: db.get('cakes').value()
    });
  });

  app.get('/cakes/:id', (req, res) => {
    const { id } = req.params;

    res.json({
      ...db.get('cakes').find({ id }).value()
    });
  });

  app.post('/cakes', (req, res) => {
    const cake = req.body;

    db.get('cakes').push({ ...cake, id: shortid.generate() }).write();
    res.sendStatus(200);
  });

  app.put('/cakes/:id', (req, res) => {
    const { id } = req.params;
    const cake = req.body;

    db.get('cakes').find({ id }).assign({ ...cake }).write();
    res.sendStatus(200);
  });

  app.delete('/cakes/:id', (req, res) => {
    const { id } = req.params;

    db.get('cakes').remove({ id }).write();
    res.sendStatus(200);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  })

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Listening on port ${port}`));
})()