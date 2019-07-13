(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{222:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(9),i=n(146),s=n.n(i);function u(t){for(var e=0,n=t.length;e<n;e++)if(s.a.matches(t[e]," "))return!0;return!1}function c(t,e){return s.a.isLength(t,{min:5,max:50})?s.a.isLength(e,{min:6,max:50})?void 0:"Password must be within 6-50 characters.":"Username must be within 5-50 characters."}var l=n(6);function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function d(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"default",function(){return h});var h=function(t){function e(t){var n,r,a;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,a=m(e).call(this,t),n=!a||"object"!==f(a)&&"function"!=typeof a?d(r):a,y(d(n),"clearRequest",function(){n.state.request&&(n.state.request.abort(),n.setState({request:null,alert:""}))}),y(d(n),"handleSubmit",function(t){if(t.preventDefault(),1!=n.state.disable){n.state.request&&n.clearRequest(),n.setState({disable:!0,alert:"Sending form..."});var e=n.state.input,r=t.target.dataset.type;if("login"===r)var a="/api/login",o=function(t,e){if(u([t,e]))return"Input does not accept spaces";var n=c(t,e);return n||void 0}(e.username,e.password);else{if("register"!==r)return;a="/api/register",o=function(t,e,n){if(u([t,e,n]))return"Input does not accept spaces.";if(e!==n)return"Password confirmation does not match.";var r=c(t,e);return r||void 0}(e.username,e.password,e.confirm)}if(o)return n.setState({alert:o,disable:!1});!function(t,e,n,r,a){var o="";o+="username=".concat(r.username,"&"),o+="password=".concat(r.password,"&"),"register"==e&&(o+="confirm=".concat(r.confirm,"&"));var i=new XMLHttpRequest;t.setState({request:i}),i.onloadend=function(){if(console.log(i.response),200!=i.status)return 0==i.status?(t.setState({alert:"Error encountered.",disable:!1}),a(i.status)):(t.setState({alert:i.response,disable:!1}),a(i.status));a()},i.open("POST",n),i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.send(o)}(d(n),r,a,e,function(t){if(t)return console.log("Error ".concat(t));n.context.setAppContext("authenticated",!0)})}}),y(d(n),"handleInput",function(t){var e=t.target.name,r=t.target.value;n.setState(function(t){var n=t.input;return n[e]=r,{input:n}})}),y(d(n),"handleDisplay",function(t){var e=t.target.dataset.button;n.clearRequest(),n.setState({input:{username:"",password:"",confirm:""}}),"fromLogin"===e?n.setState({display:"register"}):n.setState({display:"login"})}),n.state={display:"login",input:{username:"",password:"",confirm:""},alert:"",disable:!1,request:null},n}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,a.a.Component),n=e,(r=[{key:"componentDidMount",value:function(){document.title="Your-Book-List/Log In"}},{key:"componentWillUnmount",value:function(){this.clearRequest()}},{key:"render",value:function(){if(!0===this.state.redirect)return a.a.createElement(l.a,{to:"/"});if("login"===this.state.display)var t=["username","password"];else t=["username","password","confirm"];for(var e=[],n=0,r=t.length;n<r;n++){if("password"===t[n]||"confirm"===t[n])var o="password";else o="text";if("confirm"===t[n])var i="Confirm password...";else i="Enter ".concat(t[n],"...");var s=a.a.createElement("input",{key:n,type:o,name:t[n],value:this.state.input[t[n]],onChange:this.handleInput,placeholder:i,autoComplete:"off"});e.push(s)}if("login"===this.state.display)var u=a.a.createElement("form",{action:"",onSubmit:this.handleSubmit,className:"loginLoginForm","data-type":"login"},e,a.a.createElement("button",{type:"submit"},"Login"),a.a.createElement("button",{type:"button","data-button":"fromLogin",onClick:this.handleDisplay},"Register"));else u=a.a.createElement("form",{action:"",onSubmit:this.handleSubmit,className:"loginRegisterForm","data-type":"register"},e,a.a.createElement("button",{type:"submit"},"Register"),a.a.createElement("button",{type:"button","data-button":"fromRegister",onClick:this.handleDisplay},"Back"));var c=a.a.createElement("div",{className:"loginAlert"},this.state.alert);return a.a.createElement("div",{className:"loginDisplay"},u,c)}}])&&p(n.prototype,r),o&&p(n,o),e}();y(h,"contextType",o.a)}}]);