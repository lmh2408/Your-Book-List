
function getList(name, filter, position, signal, callback) {
  var init = {
    method: 'GET',
    credentials: 'same-origin',
    signal: signal,
  }
  var query = `?skip=${position.skip}&limit=${position.limit}&status=${filter}&name=${name}`
  var request = fetch('/api/booklistall' + query, init);

  request.then((res)=>{
    if (!res.ok) return Promise.reject(res.status);
    return res.json();
  })
  .then((data)=>{
    callback(null, data);
  })
  .catch((rej)=>{
    if (rej.name === 'AbortError') return;
    callback(rej, null);
  });
}

export { getList };
