const db = require("../models");
const axios = require("axios");
// NYT API info
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = process.env.APIKEY;

// Defining methods for the articlesController
module.exports = {
  // Takes the query paramaters and searches the NYT API
  search: function(req, res) {
    const query = req.query;
    axios.get(BASEURL, {
      params: {
        q:          query.q,
        fq:         `document_type: ("article")`,  // We only want articles, not topics, etc.
        begin_date: query.begin_date || undefined,      // The dates are optional
        end_date:   query.end_date || undefined,
        "api-key":  APIKEY
      }
    }).then(resp => {
      res.json(resp.data);
    }).catch(err =>
      res.json(err));
  },
  findAll: function(req, res) {
    console.log("In articlesController.findAll")
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("In articlesController.create")
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
