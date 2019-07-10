var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var BookList = require('./models').BookList;

var userId = '5d20099f2740ef252c9102d6';

var list = [
  { username: userId , bookId: '59855', bookName: `Harper's Round Table, November 10, 1896` },
  { username: userId , bookId: '58944', bookName: `The Living Mummy` },
  { username: userId , bookId: '59857', bookName: `The Evening Post A Century of Journalism` },
  { username: userId , bookId: '59856', bookName: `London and its Environs Described, vol. 2 (of 6)
Containing an Account of whatever is most remarkable for
Grandeur, Elegance, Curiosity or Use` },
  { username: userId , bookId: '59854', bookName: `The Cask` }
];

var queryArray = []

for (let i = 0, l = list.length; i < l; i ++) {
  let query = {
    insertOne: {
      document: {
        username: list[i].username,
        bookId: list[i].bookId,
        bookName: list[i].bookName,
      }
    }
  }
  queryArray.push(query);
}

BookList.bulkWrite(queryArray, (err, writeResult)=>{
  if (err) {
    console.log(err);
    db.close();
    process.exit(1);
    return;
  }

  console.log(`Inserted ${writeResult.insertedCount}`);
  db.close();
  process.exit();
});
