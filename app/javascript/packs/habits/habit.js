$(document).on('turbolinks:load', function () {
  $(function () {

    function appendList(record, result_area) {
      var result = `<tr>
                      <td><a href="/habits/${record.id}">${record.name}</a></td>
                      <td>${record.start_date}</td>
                      <td>${record.note}</td>
                      <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                    </tr>`;
      result_area.append(result);
    }

    // セレクトボックスの値が変更されたら発火
    $('.search_year').change(function () {
      var year = $(this).val(); // セレクトボックスの値を取得
      var result_area = $('.habits_all');

      // ajaxによる非同期通信
      $.ajax({
          type: 'GET',
          url: '/habits/select_year',
          data: {
            keyword: year
          },
          dataType: 'json'
        })

        .done(function (records) {
          result_area.empty(); // 現在表示されているリストを削除
          records.forEach(function (record) { // jbuilderからのデータをforeachで分解
            appendList(record, result_area); // 関数呼び出し
          });
        })
        .fail(function () {
          alert('リストの表示に失敗しました')
        })
    });
  });
});
