
function getBookData(id, callback) {
  fetchBookAPI(id, (err, bookData)=>{
    if (err) return callback (err, null);

    fetchUserData(id, (err, userData)=>{
      if (err) return callback(err, null);

      var data = {bookData: bookData, userData: userData}
      return callback(null, data);
    });
  })
}

function fetchBookAPI(id, callback) {
  var response = fetch(`https://gutenberg.justamouse.com/texts/${id}`, {credentials: 'same-origin'});

  response
    .then(res=>{
      if (!res.ok) {
        return Promise.reject('Not found');
      }
      return res.json();
    })
    .then((data)=>{
      if (!data.metadata.title) {
        return Promise.reject('Not found')
      } else {
        callback(null, data);
      }
    })
    .catch((reason)=>{
      callback(reason, null);
    });
}

function fetchUserData(id, callback) {
  var response = fetch(`/api/booklist/${id}`, {credentials: 'same-origin'});

  response
    .then((res)=>{
      if (res.status == 401) {
        return Promise.reject('Not authenticated');
      }
      else if (res.status == 404) {
        return Promise.reject('Not on list');
      }
      else if (res.ok) {
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

function addChangDelete(method, bookId, status, callback) {
  var init = {
    method: method,
    credentials: 'same-origin'
  };

  if (method != 'DELETE') {
    var formdata = new FormData();
    formData.append('status', status);
    init.body = formdata;
  }

  var url = `/api/booklist/${bookId}`;

  var response = fetch(url, init);

  response.then((res)=>{
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  })
    .then( data=> callback(null, data); )
    .catch( rej=> callback(rej, null); );
}

function addToList(bookId, status, callback) {
  addChangDelete('POST', bookId, status, callback);
}

function changeInList(bookId, status, callback) {
  addChangDelete('PUT', bookId, status, callback);
}

function deleteFromList(bookId, callback) {
addChangDelete('DELETE', bookId, null, callback);
}

export { getBookData, addToList, changeInList, deleteFromList };
