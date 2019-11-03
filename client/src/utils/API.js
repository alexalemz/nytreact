import axios from "axios";

export default {
  // Search for NYT articles
  search: function(query) {
    console.log( "Doing a search from API.js");
    return axios.get("/api/articles/search", {params: query});
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
