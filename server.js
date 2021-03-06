require('dotenv/config');
const express = require('express');
const pg = require('pg');
const path = require('path');
const port = process.env.PORT || 3001;

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

//static-middleware
const publicPath = path.join(__dirname, 'public');
const staticMiddleware = express.static(publicPath);

app.use(staticMiddleware);

app.use(express.json());

//client-error
class ClientError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

//error-middleware
function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
}

//API endpoints

//add
app.post('/api/detox', (req, res, next) => {
  const { username, detox, duration, plan, support } = req.body;

  const sql = `
  insert into "detox" ("username", "detox", "duration", "plan", "support")
  values ($1, $2, $3, $4, $5)
  `;
  const params = [username, detox, duration, plan, support]

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0])
    })
    .catch(err => next(err))
})

//home
app.get('/api/detox/', (req, res, next) => {

  const sql = `
  select * from "detox"
  order by "id" desc
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
})

//comment
app.post('/api/comments', (req, res, next) => {
  const { id, comment } = req.body;

  const sql = `
  insert into "comments" ("id", "comment")
  values ($1, $2)
  `;
  const params = [id, comment]

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0])
    })
    .catch(err => next(err))
})

app.get('/api/comments/:id', (req, res, next) => {
  const { id } = req.params

  const sql = `
  select * from "comments"
  where "id" = $1
  order by "id"
  `;
  const params = [id]

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
})

//support
app.patch('/api/detox/:id', (req, res, next) => {
  const { id } = req.params;
  const { support } = req.body;

  const sql = `
  update "detox"
  set "support" = $2
  where "id" = $1
  `;
  const params = [id, support]

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0])
    })
    .catch(err => next(err))
})

//for Heroku deployment
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`express server listening on ${port}`)
})
