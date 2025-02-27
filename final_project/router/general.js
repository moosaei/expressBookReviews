const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function getIdByAuthorName(authorName) {
    for (let id in books) {
      if (books[id].author === authorName) {
        return id;
      }
    }
    return null; // Author name not found in books
  }

  function getIdBytitle(title) {
    for (let id in books) {
      if (books[id].title === title) {
        return id;
      }
    }
    return null; 
  }


  public_users.post("/register", (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
      
        if (username && password) {
          if (!isValid(username)) {
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
          } else {
            return res.status(404).json({message: "User already exists!"});
          }
        }
        return res.status(404).json({message: "Unable to register user."});
      });
    


  

// Get the book list available in the shop
public_users.get('/',function (req, res) {


    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            res.send(JSON.stringify(books,null,4));
        },3000)})

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
   


    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            res.send(books[isbn])
        },3000)})

  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const author = req.params.author;
    

    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            res.send(books[getIdByAuthorName(author)])
        },3000)})

  
  
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  


  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        res.send(books[getIdBytitle(title)])
    },3000)})


 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]['reviews'])

  
});

module.exports.general = public_users;
