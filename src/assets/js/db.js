function select_db(name){
  var result ;    
  var sqlite3 = require('sqlite3');
  var db = new sqlite3.Database(__dirname+'../whiteboard.sqlite3');
  db.serialize(function () {
    var where = "";
    if(name){
      where = ' where username = "' + name +'"';
    }
    var result = {}; 
    db.each('SELECT * FROM t_master' + where,  function(err, row) {
        if (err){
            console.log('エラー：'+err);
        }else{
            result['user']=row.username;
            result['schedule']=row.schedule;
        }
    }, function(err, count){  
        if (err){
            console.log('エラー：'+err);
        }else{
            if (count == 0){
                console.log('0件');
            }else{
                //complete
            }
        }
    });
  });
  db.close();
  return result;
};


function insert_db(name, schedule){
  var sqlite3 = require('sqlite3');
  var db = new sqlite3.Database('./whiteboard.sqlite3');
  db.serialize(function () {
      var stmt = db.prepare('INSERT INTO t_master values("username","schedule") VALUES ("'+name+'","'+schedule+'");');
      stmt.finalize();
  })
  db.close();

  //select(undefined);
};


function update_db(name, schedule){
  console.log(name + schedule);
  if(!name){return;}
  var sqlite3 = require('sqlite3');
  var db = new sqlite3.Database('./whiteboard.sqlite3');
  db.serialize(function () {
      var stmt = db.prepare('UPDATE t_master SET schedule = "'+schedule+'" WHERE username = "'+name+'";');
      stmt.finalize();
  })
  db.close();

  //select(undefined);
};


function delete_db(name){
  if(!name){return;}
  var sqlite3 = require('sqlite3');
  var db = new sqlite3.Database('./whiteboard.sqlite3');
  db.serialize(function () {
      var stmt = db.prepare('DELETE FROM t_master WHERE username = "'+name+'";');
      stmt.finalize();
  })
  db.close();

  //select(undefined);
};


