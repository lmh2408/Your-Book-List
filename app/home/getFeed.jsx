

function getFeed(signal, callback) {
  var url ='/api/rss/recent';

  fetch(url, {signal: signal})
  .then(res=>{
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  })
  .then(data=>{
    callback(null, data);
  })
  .catch(rej=>{
    if (rej.name == 'AbortError') return;
    callback(rej, null);
  });
}

export { getFeed };
