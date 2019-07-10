

function sendForm(component, type, url, input, callback) {
  var form = '';
  form += `username=${input.username}&`
  form += `password=${input.password}&`
  if (type == 'register') {
    form += `confirm=${input.confirm}&`
  }

  var request = new XMLHttpRequest();
  component.setState({ request: request });

  request.onloadend = ()=>{
    console.log(request.response);
    if (request.status != 200) {
      if (request.status == 0) {
        component.setState({alert: 'Error encountered.', disable: false});
        return callback(request.status);
      }

      component.setState({alert: request.response, disable: false});
      return callback(request.status);
    }
    callback();
  };

  request.open('POST', url);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(form);
}

export { sendForm };
