const BookList = require('../../../models').BookList;
const fetch = require('node-fetch');
const validator = require('validator');
const isNumeric = validator.isNumeric;
const isIn = validator.isIn;
const async = require('async');

var validStatus = ['reading', 'plan-to-read', 'finished'];


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
exports.addOneBook = (userId, bookId, status='plan-to-read', callback)=>{
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
        bookName: data.metadata.title[0],
        status: status,
      });

      book.save((err, object)=>{
        if (err) {
          console.log(err);
          return callback(500, null);
        }

        callback(null, object);
      });

    })
    .catch((err)=>{
      callback(error, null);
    });
}


exports.changeOneBook = (userId, bookId, status, callback)=>{
  if (!validator.isNumeric(bookId, {no_symbols: true}) || !validator.isIn(status, validStatus)) {
    return callback(400, null)
  }

  var query = {
    username: userId,
    bookId: bookId,
  };

  BookList.findOneAndUpdate(query, {status: status}, {new: true}, (err, book)=>{
    if (err) {
      console.log(err);
      return callback(500, null);
    }
    if (!book) {
      return callback(404, null);
    }
    return callback(null, book);
  })
}


exports.deleteOneBook = (userId, bookId, callback)=>{
  if (!validator.isNumeric(bookId, {no_symbols: true})) {
    return callback(400, null)
  }

  var query = {
    username: userId,
    bookId: bookId,
  };

  BookList.findOneAndDelete(query, (err, book)=>{
    if (err) {
      console.log(err);
      return callback(500, null);
    }
    if (!book) {
      return callback(404, null);
    }
    return callback(null, null);
  })
}


exports.listBooks = (userId, options, callback)=>{
  if (options.limit === undefined) options.limit = 10;
  if (options.skip === undefined) options.skip = 0;
  if (options.status === undefined) options.status = 'all';
  if (
    userId === undefined ||
    !isNumeric(options.skip, {no_symbols: true}) ||
    !isNumeric(options.limit, {no_symbols: true}) ||
    !isIn(options.status, validStatus.concat('all'))
  ) {
    return callback(400, null);
  }

  options.limit = Number(options.limit);
  options.skip = Number(options.skip);

  var query = {};
  query.username = userId;
  if (options.name)
    query.bookName = new RegExp(`${options.name}`, 'i');
  if (options.status !== 'all')
    query.status = options.status;


  function getListCount(query, cb) {
    BookList.countDocuments(query, (err, count)=>{
      if (err) return cb(err, null);
      cb(null, count);
    })
  }

  function getListItems(query, skip, limit, cb) {
    BookList.find(query)
      .skip(skip)
      .limit(limit)
      .exec((err, items)=>{
        if (err) return cb(err, null);
        cb(null, items);
      });
  }


  async.parallel(
    {
      count: (cb)=>{
        getListCount(query, cb);
      },
      list: (cb)=>{
        getListItems(query, options.skip, options.limit, cb);
      }
    },
    (err, results)=>{
      if (err) {
        console.log(err);
        return callback(500, null);
      }
      callback(null, results);
    }
  );
}
