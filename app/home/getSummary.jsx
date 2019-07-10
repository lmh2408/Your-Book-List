function getSummary(request, callback) {
  var url = '/api/booklist/summary';

  request.onloadend = ()=>{
    if (request.status === 200) {
      var data = JSON.parse(request.response);
      return callback(null, data);
    }
    return callback(request.status, null)
  }

  request.open('GET', url);
  request.send();
}

export { getSummary };
