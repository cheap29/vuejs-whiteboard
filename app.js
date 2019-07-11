
var express = require('express');
var content = []; 

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./whiteboard.sqlite3');
var path = require('path');

db.serialize(function () {
    var result = {}; 
    db.each('SELECT * FROM t_master',  function(err, row) {
        if (err){
            console.log('エラー：'+err);
        }else{
            //rowの値を処理するところや
            result['user']=row.username;
            result['schedule']=row.schedule;
        }
    }, function(err, count){  //←complete処理追加
        //SQL実行直後に上のコールバック処理が走る前にここが処理されるで。
        if (err){
            console.log('エラー：'+err);
        }else{
            if (count == 0){
                //ここでSQLの実行結果が0件の処理や
                console.log('0件');
            }else{
                //処理や
                content.push(result);
                console.log('complete');
            }
        }
    });
    result = {};
})
db.close();


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


