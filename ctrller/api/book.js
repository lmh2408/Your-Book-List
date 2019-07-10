var async = require('async');

var bookQuery = require('./query').bookQuery;


var checkLogin = (req, res, next)=>{
  if (!req.user) {
    return res.status(401).send('No session found.');
  }
  next();
}


// get currently reading and plan to read
exports.summary = [
  checkLogin,
  (req, res, next)=>{
    async.parallel({
      curReading: (callback)=>{
        bookQuery.getBook(req.user._id, 'reading', 4, callback);
      },
      planToRead: (callback)=>{
        bookQuery.getBook(req.user._id, 'plan-to-read', 4, callback);
      },
    },
    (err, results)=>{
      if (err) return res.status(500).send(err);
      var data = {
        reading: results.curReading,
        planToRead: results.planToRead,
      }
      res.status(200).json(data);
    });
  }
];


exports.readInfo = [
  checkLogin,
  (req, res, next)=>{
    bookQuery.getOneBook(req.user._id, req.params.bookId, (err, result)=>{
      if (err) {
        if (err === 404)
          return res.status(404).send('No such book in user list.');
        else if (err === 400)
          return res.status(400).send('Invalid input');
        else
          return res.status(500).send('Database error.');
      }

      return res.status(200).json(result);

    });
  }
];


function handleRequest(err, result, res) {
  if (err === 404) {
    return res.status(404).send('Invalid book Id.');
  }
  else if (err === 400) {
    return res.status(400).send('Invalid input.')
  }
  else if (err === 500) {
    return res.status(500).send('Internal server error.')
  }
  return res.status(200).json(result);
}


exports.addToList = [
  checkLogin,
  (req, res, next)=>{
    bookQuery.addOneBook(req.user._id, req.params.bookId, req.body.status, (err, result)=>{
      handleRequest(err, result, res);
    });
  }
]


exports.editBookStatus = [
  checkLogin,
  bookQuery.changeOneBook(req.user._id, req.params.bookId, req.body.status, (err, result)=>{
    handleRequest(err, result, res);
  });
];


exports.deleteFromList = [
  checkLogin,
  bookQuery.deleteOneBook(req.user._id, req.params.bookId, (err, result)=>{
    handleRequest(err, result, res);
  });
];
