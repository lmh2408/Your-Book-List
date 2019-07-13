(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{216:function(t,n,e){"use strict";e.r(n),e.d(n,"default",function(){return b});var o=e(0),r=e.n(o),i=e(59),u=e.n(i);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t,n){return(p=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var d=r.a.lazy(function(){return e.e(8).then(e.bind(null,78))}),b=function(t){function n(t){var e;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),e=function(t,n){return!n||"object"!==a(n)&&"function"!=typeof n?l(t):n}(this,f(n).call(this,t)),s(l(e),"handleInput",function(t){e.setState({input:t.target.value})}),s(l(e),"findBook",function(){var t=e.state.input;t&&e.setState({bookId:t,hint:!1})}),e.state={input:"",bookId:"",hint:!0},e.findBookThrottled=u()(e.findBook,500),e}var e,o,i;return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&p(t,n)}(n,r.a.Component),e=n,(o=[{key:"componentDidMount",value:function(){document.title="Your-Book-List/Add Book"}},{key:"componentWillUnmount",value:function(){this.findBookThrottled.cancel()}},{key:"render",value:function(){var t=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"addBookInputContainer"},r.a.createElement("input",{type:"text",onChange:this.handleInput,value:this.state.input,placeholder:"Enter id..."}),r.a.createElement("button",{onClick:this.findBookThrottled},"Find")),t.state.hint?r.a.createElement("div",{className:"addBookHint"},r.a.createElement("p",null,"A book's ID can be found in its url:"),r.a.createElement("div",null,"http://www.gutenberg.org/ebooks/",r.a.createElement("u",null,r.a.createElement("b",null,"1184")))):r.a.createElement(d,{bookId:t.state.bookId}))}}])&&c(e.prototype,o),i&&c(e,i),n}()},35:function(t,n){t.exports=function(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}},39:function(t,n,e){var o=e(71),r="object"==typeof self&&self&&self.Object===Object&&self,i=o||r||Function("return this")();t.exports=i},40:function(t,n,e){var o=e(39).Symbol;t.exports=o},59:function(t,n,e){var o=e(69),r=e(35),i="Expected a function";t.exports=function(t,n,e){var u=!0,a=!0;if("function"!=typeof t)throw new TypeError(i);return r(e)&&(u="leading"in e?!!e.leading:u,a="trailing"in e?!!e.trailing:a),o(t,n,{leading:u,maxWait:n,trailing:a})}},69:function(t,n,e){var o=e(35),r=e(70),i=e(72),u="Expected a function",a=Math.max,c=Math.min;t.exports=function(t,n,e){var f,l,p,s,d,b,v=0,y=!1,m=!1,h=!0;if("function"!=typeof t)throw new TypeError(u);function g(n){var e=f,o=l;return f=l=void 0,v=n,s=t.apply(o,e)}function w(t){var e=t-b;return void 0===b||e>=n||e<0||m&&t-v>=p}function j(){var t=r();if(w(t))return k(t);d=setTimeout(j,function(t){var e=n-(t-b);return m?c(e,p-(t-v)):e}(t))}function k(t){return d=void 0,h&&f?g(t):(f=l=void 0,s)}function x(){var t=r(),e=w(t);if(f=arguments,l=this,b=t,e){if(void 0===d)return function(t){return v=t,d=setTimeout(j,n),y?g(t):s}(b);if(m)return d=setTimeout(j,n),g(b)}return void 0===d&&(d=setTimeout(j,n)),s}return n=i(n)||0,o(e)&&(y=!!e.leading,p=(m="maxWait"in e)?a(i(e.maxWait)||0,n):p,h="trailing"in e?!!e.trailing:h),x.cancel=function(){void 0!==d&&clearTimeout(d),v=0,f=b=l=d=void 0},x.flush=function(){return void 0===d?s:k(r())},x}},70:function(t,n,e){var o=e(39);t.exports=function(){return o.Date.now()}},71:function(t,n,e){(function(n){var e="object"==typeof n&&n&&n.Object===Object&&n;t.exports=e}).call(this,e(13))},72:function(t,n,e){var o=e(35),r=e(73),i=NaN,u=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,f=/^0o[0-7]+$/i,l=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(r(t))return i;if(o(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=o(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(u,"");var e=c.test(t);return e||f.test(t)?l(t.slice(2),e?2:8):a.test(t)?i:+t}},73:function(t,n,e){var o=e(74),r=e(77),i="[object Symbol]";t.exports=function(t){return"symbol"==typeof t||r(t)&&o(t)==i}},74:function(t,n,e){var o=e(40),r=e(75),i=e(76),u="[object Null]",a="[object Undefined]",c=o?o.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?a:u:c&&c in Object(t)?r(t):i(t)}},75:function(t,n,e){var o=e(40),r=Object.prototype,i=r.hasOwnProperty,u=r.toString,a=o?o.toStringTag:void 0;t.exports=function(t){var n=i.call(t,a),e=t[a];try{t[a]=void 0;var o=!0}catch(t){}var r=u.call(t);return o&&(n?t[a]=e:delete t[a]),r}},76:function(t,n){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},77:function(t,n){t.exports=function(t){return null!=t&&"object"==typeof t}}}]);