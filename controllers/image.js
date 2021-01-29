import Clarifai from "clarifai";


// CLARIFAI API
const app = new Clarifai.App({
    apiKey: 'f97593e015b54673859b310124db00a4'
  }
);

export const handleApiCall = (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, req.body.input
    )
    .then(data => {
      res.json(data);
  })
  .catch(err => res.status(400).json('error fetching api'))
}

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => { 
      res.json(entries[0]);
  }).catch(err => res.status(400).json('an error occured'))
}