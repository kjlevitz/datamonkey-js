window.jQuery = window.$ = $; 

var io = require('socket.io-client');
window.io = io;
window._ = _;

require("font-awesome/css/font-awesome.css");
require('./less/bootstrap.less');

require('bootstrap');

var gard_form = require('jsx/gard_form.jsx');
window.gard_form = gard_form;
