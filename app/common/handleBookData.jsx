
function getBookData(signal, id, callback) {
  fetchBookAPI(signal, id, (err, bookData)=>{
    if (err) return callback (err, null);

    fetchUserData(signal, id, (err, userData)=>{
      // if (err) return callback(err, null);

      var data = {bookData: bookData, userData: userData};
      return callback(null, data);
    });
  })
}

function fetchBookAPI(signal, id, callback) {
  var response = fetch(`https://gutenberg.justamouse.com/texts/${id}`, {signal: signal});

  response
    .then(res=>{
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      return res.json();
    })
    .then((data)=>{
      if (!data.metadata.title) {
        return Promise.reject(404);
      } else {
        callback(null, data);
      }
    })
    .catch((reason)=>{
      callback(reason, null);
    });
}

function fetchUserData(signal, id, callback) {
  var response = fetch(`/api/booklist/${id}`, {credentials: 'same-origin', signal: signal});

  response
    .then((res)=>{
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      else {
        return res.json();
      }
    })
    .then((data)=>{
      callback(null, data);
    })
    .catch((reason)=>{
      callback(reason, null);
    });
}

function addChangeDelete(method, bookId, status, callback) {
  var init = {
    method: method,
    credentials: 'same-origin'
  };

  if (method != 'DELETE') {
    init.headers = { 'Content-Type': 'application/json' };
    init.body = JSON.stringify({status: status});
  }

  var url = `/api/booklist/${bookId}`;

  var response = fetch(url, init);

  response.then((res)=>{
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  })
    .then( data=> callback(null, data) )
    .catch( rej=> callback(rej, null) );
}

function addToList(bookId, status, callback) {
  addChangeDelete('POST', bookId, status, callback);
}

function changeInList(bookId, status, callback) {
  addChangeDelete('PUT', bookId, status, callback);
}

function deleteFromList(bookId, callback) {
  addChangeDelete('DELETE', bookId, null, callback);
}

export { getBookData, addToList, changeInList, deleteFromList };
