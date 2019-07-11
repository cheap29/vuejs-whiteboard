
//var sqlite3 = require('sqlite3');

//管理者モード
window.changeAdmin = function(){
  var admin = getParam('admin');
  if(admin!=1){
    document.location.href="./index.html?admin=1";
  }else{
    document.location.href="./";
  }
}

//ローカルストレージに保存
window.savelocalStorage = function(){
  var array = [];
  array.push(jsondata);

  var setjson = JSON.stringify(jsondata);
  localStorage.setItem('scheduleData', setjson);

}

//ローカルストレージ 全クリア
window.clearlocalStorage = function(){
  if(!confirm('すべてのデータを削除しますか？')){
      return false;
  } 
  localStorage.removeItem('scheduleData');
  location.reload();
}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
window.getParam = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.insert_db = function(name, schedule){
  var db = new sqlite3.Database('./whiteboard.sqlite3');
  db.serialize(function () {
      var stmt = db.prepare('INSERT INTO t_master values("username","schedule") VALUES ("'+name+'","'+schedule+'");');
      stmt.finalize();
  })
  db.close();

  //select(undefined);
};


(function () {
  var $jQuery = jQuery.noConflict(true);
  var admin = getParam('admin');

  var getjson = localStorage.getItem('scheduleData');
  if(getjson){
    jsondata = JSON.parse(getjson);
  }

  var app = new Vue({
    el: '#app',
    data: jsondata,
    methods: {
      newuser: function (e) {
        $jQuery('#edit-schedule').addClass('hidden');
        $jQuery('#add-schedule').removeClass('hidden');
        $jQuery('#configuration-area').toggleClass('transparent');
      },
      add: function (e) {
        var form = document.getElementById('form');
        if (!form.checkValidity()) return;
        e.preventDefault();
        //insert_db(this.user,this.schedule);
        this.items.push({
          user: this.user, 
          schedule: this.insert
        });
        this.user = '';
        this.insert = '';
        savelocalStorage();
        location.reload();
      },
      edit: function (item) {
        var index = this.items.indexOf(item);
        $jQuery("#edit-schedule").attr('tag',index);
        $jQuery('#input-schedule').attr('value',this.items[index].schedule);
        $jQuery('.btn-schedule-edit').attr('disabled','disabled');
        $jQuery('#add-schedule').addClass('hidden');
        $jQuery('#edit-schedule').removeClass('hidden');
        $jQuery('#configuration-area').toggleClass('transparent');
      },
      mod: function (e) {
        var index = $jQuery("#edit-schedule").attr('tag');
        e.preventDefault();
        this.items[index].schedule = this.update;
        this.update = '';
        savelocalStorage();
        location.reload();
      },
      remove: function (item) {
        if(!confirm(item.user+' を本当に削除しますか？')){
            return false;
        }        
        var index = this.items.indexOf(item);
        this.items.splice(index, 1)
        savelocalStorage();
        location.reload();
      }
    }
  });
  Vue.nextTick(function () {
    var now = new Date();
    var doday = now.getFullYear()+'/'+
                  ( "0"+( now.getMonth()+1 ) ).slice(-2)+'/'+
                  ( "0"+now.getDate() ).slice(-2);
    $jQuery('#today-date').html('今日：' + doday);
    $jQuery('.roll-admin').html('ユーザー');  
    if(admin!=1){
      $jQuery('.btn-schedule-remove').addClass('hidden');
      $jQuery('.btn-user-add').addClass('hidden');
      $jQuery('.all-reset').addClass('hidden');      
      $jQuery('.roll-admin').html('管理者');  
    }
  })

  $jQuery('#configuration-area-close').click(function(){
    $jQuery('#configuration-area').toggleClass('transparent');
    $jQuery('.btn-schedule-edit').removeAttr('disabled');
    $jQuery('#add-schedule').toggleClass('hidden');
    $jQuery('#edit-schedule').toggleClass('hidden');
  });


})();
