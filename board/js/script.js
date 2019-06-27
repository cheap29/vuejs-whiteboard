(function () {
  var app = new Vue({
    el: '#app',
    data: {
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
    },
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
      },
      edit: function (item) {
        var index = this.items.indexOf(item);
        $("#edit-schedule").attr('tag',index);
        $("#edit-schedule").toggleClass('hidden');
      },
      mod: function (item) {
        var index = $("#edit-schedule").attr('tag');
        event.preventDefault();
        if (this.update == '') {
          return;
        }
        this.items[index].schedule = this.update;
        this.update = '';
      },
      remove: function (item) {
        if(!confirm(item.user+' を本当に削除しますか？')){
            return false;
        }        
        var index = this.items.indexOf(item);
        this.items.splice(index, 1)
      }
    }
  });
})();