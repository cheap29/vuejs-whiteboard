
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

  var getjson = localStorage.getItem('scheduleData');
  if(getjson){
    jsondata = JSON.parse(getjson);
  }

  var app = new Vue({
    el: '#app',
    data: jsondata,
    methods: {
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
      },
      edit: function (item) {
        var index = this.items.indexOf(item);
        $("#edit-schedule").attr('tag',index);
        $("#edit-schedule").toggleClass('hidden');
        $('#input-schedule').attr('value',item.schedule);
      },
      mod: function (e) {
        var index = $("#edit-schedule").attr('tag');
        event.preventDefault();
        if (this.update == '') {
          return;
        }
        this.items[index].schedule = this.update;
        this.update = '';
        savelocalStorage();
        $("#edit-schedule").toggleClass('hidden');
      },
      remove: function (item) {
        if(!confirm(item.user+' を本当に削除しますか？')){
            return false;
        }        
        var index = this.items.indexOf(item);
        this.items.splice(index, 1)
        savelocalStorage();
      }
    }
  });
})();

//ローカルストレージに保存
function savelocalStorage(){
  var array = [];
  array.push(jsondata);

  var setjson = JSON.stringify(jsondata);
  localStorage.setItem('scheduleData', setjson);

}