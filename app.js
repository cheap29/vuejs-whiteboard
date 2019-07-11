
var express = require('express');
var content = []; 

var sqlite3 = require('sqlite3');
var path = require('path');


var app = express();
// テンプレートエンジンの指定
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'dist'));
app.use(express.static(path.join(__dirname, 'dist')));
app.get("/", function (req, res) {
    console.log('レンダリング =>' + content.length );
    // レンダリングを行う
    res.render('./index.ejs', { title: 'whiteboard', content : content });
});
app.get("/index.html", function (req, res) {
    console.log('レンダリング =>' + content.length );
    // レンダリングを行う
    res.render('./index.ejs', { title: 'whiteboard', content : content });
});
app.listen(3000);


