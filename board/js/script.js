
//初期データ
var jsondata= {
      user: '',
      insert: '',
      update: '',
      items: [{
          user: '山田',
          schedule: 'テスト'
        },
        {
          user: '山田２',
          schedule: 'テスト'
        }
      ]
    };

(function () {
  var $jQuery = jQuery.noConflict(true);

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


  $jQuery('#configuration-area-close').click(function(){
    $jQuery('#configuration-area').toggleClass('transparent');
    $jQuery('.btn-schedule-edit').removeAttr('disabled');
    $jQuery('#add-schedule').toggleClass('hidden');
    $jQuery('#edit-schedule').toggleClass('hidden');
  });

})();

//ローカルストレージに保存
function savelocalStorage(){
  var array = [];
  array.push(jsondata);

  var setjson = JSON.stringify(jsondata);
  localStorage.setItem('scheduleData', setjson);

}