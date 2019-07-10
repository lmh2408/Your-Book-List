const BookList = require('../../../models').BookList;
const fetch = require('node-fetch');
const validator = require('validator');

var validStatus = ['reading', 'plan-to-read', 'finished']


exports.getBook = (id, type, limit, callback)=>{
  var query = {};
  query.username = id;
  if (type !== 'all') query.status = type;

  BookList.find(query)
    .limit(limit).sort({ date_created: 'desc' })
    .exec((err, books)=>{
      if (err) return callback(err, null);
      if (!books) return callback('No books', null);
      callback(null, books);
    });
}


exports.getOneBook = (userId, bookId, callback)=>{
  if (!validator.isNumeric(bookId, {no_symbols: true})) {
    return callback(400, null)
  }

  var query = {};
  query.username = userId;
  query.bookId = bookId;

  BookList.findOne(query).select('-username')
    .exec((err, book)=>{
      if (err) {
        console.log(err)
        return callback(500, null);
      }

      if (!book) return callback(404, null);
      callback(null, book);
    });
}

// check if book actualyl exists, then add to list
exports.addOneBook = (userId, bookId, status, callback)=>{
  if (!validator.isNumeric(bookId, {no_symbols: true}) || !validator.isIn(status, validStatus)) {
    return callback(400, null)
  }

  var url = `https://gutenberg.justamouse.com/texts/${bookId}`;

  fetch(url)
    .then((res)=>{
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      return res.json();
    })
    .then((data)=>{
      if (!data.metadata.title) {
        return Promise.reject(404);
      }

      var book = new BookList({
        username: userId,
        bookId: data.text_id,
        bookName: data.metadata.title,
        status: status,
      });

      book.save((err, object)=>{
        if (err) {
          console.log(err);
          return callback(500, null);
        }

        callback(null, object);
      });

    });
    .catch((err)=>{
      callback(error, null);
    })
}


exports.changeOneBook = (userId, bookId, status, callback)=>{
  if (!validator.isNumeric(bookId, {no_symbols: true}) || !validator.isIn(status, validStatus)) {
    return callback(400, null)
  }

  var query = {
    username: userId,
    bookId: bookId,
  };

  BookList.findOneAndUpdate(query, {status: status}, (err, book)=>{
    if (err) {
      console.log(err);
      return callback(500, null);
    }
    if (!book)=>{
      return callback(404, null);
    }
    return callback(null, book);
  })
}


exports.deleteOneBook = (userId, bookId, callback)=>{
  if (!validator.isNumeric(bookId, {no_symbols: true}) || !validator.isIn(status, validStatus)) {
    return callback(400, null)
  }
  
  var query = {
    username: userId,
    bookId: bookId,
  };

  BookList.findOneAndDelete(query, ()=>{
    if (err) {
      console.log(err);
      return callback(500, null);
    }
    if (!book)=>{
      return callback(404, null);
    }
    return callback(null, book);
  })
}
