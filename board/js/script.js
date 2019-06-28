
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
      newuser: function (e) {
        $('#edit-schedule').addClass('hidden');
        $('#add-schedule').removeClass('hidden');
        $('#configuration-area').toggleClass('transparent');
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
        $("#edit-schedule").attr('tag',index);
        $('#input-schedule').attr('value',this.items[index].schedule);
        $('.btn-schedule-edit').attr('disabled','disabled');
        $('#add-schedule').addClass('hidden');
        $('#edit-schedule').removeClass('hidden');
        $('#configuration-area').toggleClass('transparent');
      },
      mod: function (e) {
        var index = $("#edit-schedule").attr('tag');
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


  $('#configuration-area-close').click(function(){
    $('#configuration-area').toggleClass('transparent');
    $('.btn-schedule-edit').removeAttr('disabled');
    $('#add-schedule').toggleClass('hidden');
    $('#edit-schedule').toggleClass('hidden');
  });

})();

//ローカルストレージに保存
function savelocalStorage(){
  var array = [];
  array.push(jsondata);

  var setjson = JSON.stringify(jsondata);
  localStorage.setItem('scheduleData', setjson);

}