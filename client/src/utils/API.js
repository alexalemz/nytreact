import axios from "axios";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = "Cs1u1UjGZAZ60LT67Suqqserfmob6CuM";

export default {
  // Search the NYT website.
  search: function(query) {
    return axios.get(BASEURL, {
      params: {
        q:          query.q,
        fq:         `document_type: ("article")`,  // We only want articles, not topics, etc.
        begin_date: query.begin_date || undefined,      // The dates are optional
        end_date:   query.end_date || undefined,
        "api-key":  APIKEY
      }
    });
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    console.log("In API.saveArticle");
    return axios.post("/api/articles", articleData);
  }
};
