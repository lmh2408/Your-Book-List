var express = require('express');
var router = express.Router();


var ctrller = require('../ctrller');

var block = (req, res)=> res.status(405).end();

var user = ctrller.api.user;

router.route('/api/login')
  .post(user.login)
  .all(block);

router.route('/api/register')
  .post(user.register)
  .all(block);

router.route('/api/session')
  .get(user.checkSession)
  .all(block);

router.route('/api/logout')
  .get(user.logout)
  .all(block);

var book = ctrller.api.book;

router.route('/api/booklist/summary')
  .get(book.summary)
  .all(block);

router.route('/api/booklist/:bookId')
  .get(book.readInfo)
  .post(book.addToList)
  .put(book.editBookStatus)
  .delete(book.deleteFromList)
  .all(block);



router.get('*', (req, res, next)=>{
  res.sendFile('index.html', {root: './public'});
});

module.exports = router;
