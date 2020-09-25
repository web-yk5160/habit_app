$(document).on('turbolinks:load', function () {
  $(function () {
    function appendList(record, result_area) {
      var result = `<tr>
                        <td><input type="checkbox" name="check" value="${record.id}" id="checked"></td>
                        <td><a href="/habits/${record.id}">${record.name}</a></td>
                        <td>${record.start_date}</td>
                        <td>${record.note}</td>
                        <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                      </tr>`;
      result_area.append(result);
    }

    function appendDoneList(record, result_area) {
      var result = `<tr>
                        <td><input type="checkbox" name="check" value="${record.id}" id="check"></td>
                        <td><a href="/habits/${record.id}">${record.name}</a></td>
                        <td>${record.start_date}</td>
                        <td>${record.note}</td>
                        <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                      </tr>`;
      result_area.append(result);
    }

    var count_up_btn = document.getElementById("btn_count_up");
    var count_value = 0;

    // カウントアップボタンクリック処理
    $('.submit-on-change').onclick = function () {
      count_value += 1;
      // count_disp.innerHTML = count_value;
      count_up_btn.name = count_value;
    };

    // // チェックボックスの値が変更されたら発火
    $(document).on('change', '#check', function () {
      let row = $(this).closest("tr").remove();
      var done = $(this).val(); // チェックボックスの値を取得
      var done_count = $(this).attr('name');
      var result_area = $('#habits_done');

      // ajaxによる非同期通信
      $.ajax({
          type: 'GET',
          url: '/habits/done',
          data: {
            keyword: done,
            name: done_count
          },
          dataType: 'json'
        })

        .done(function (records) {
          $(row).remove();
          // 現在表示されているリストを削除
          records.forEach(function (record) { // jbuilderからのデータをforeachで分解
            appendList(record, result_area); // 関数呼び出し
          });
        })
        .fail(function () {
          alert('リストの表示に失敗しました')
        })
    });

    $(document).on('change', '#checked', function () {
      let row = $(this).closest("tr").remove();
      var redo = $(this).val(); // チェックボックスの値を取得
      var redo_area = $('.habits_all');

      // ajaxによる非同期通信
      $.ajax({
          type: 'GET',
          url: '/habits/redo',
          data: {
            keyword: redo
          },
          dataType: 'json'
        })

        .done(function (records) {
          $(row).remove();
          // 現在表示されているリストを削除
          records.forEach(function (record) { // jbuilderからのデータをforeachで分解
            appendDoneList(record, redo_area); // 関数呼び出し
          });
        })
        .fail(function () {
          alert('リストの表示に失敗しました')
        })
    });
  });
});
