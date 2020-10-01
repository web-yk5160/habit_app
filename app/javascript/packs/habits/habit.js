$(document).on("turbolinks:load", function () {
  $(function () {
    function appendList(record, result_area, area) {
      var result = `<tr>
                      <td><button name="${record.done}" type="button" class="btn btn-success" id="check" value="${record.id}">完了</button></td>
                      <td><a href="/habits/${record.id}">${record.name}</a></td>
                      <td><span id="habit-done">${record.done}</span> / <span id="habit-goal">${record.goal}</span></td>
                      <td>${record.start_date}</td>
                      <td>${record.note}</td>
                      <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                    </tr>`;
      result_area.append(result);
    }

    function appendDoneList(record, result_area, area) {
      var result = `<tr>
                      <td><button name="${record.done}" type="button" class="btn btn-success" id="checked" value="${record.id}">完了</button></td>
                      <td><a href="/habits/${record.id}">${record.name}</a></td>
                      <td><span id="habit-done">${record.done}</span> / <span id="habit-goal">${record.goal}</span></td>
                      <td>${record.start_date}</td>
                      <td>${record.note}</td>
                      <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                    </tr>`;
      area.append(result);
    }

    // セレクトボックスの値が変更されたら発火
    $(".search_year").change(function () {
      var year = $(this).val(); // セレクトボックスの値を取得
      var result_area = $(".habits_all");
      var area = $("#habits_done");

      // ajaxによる非同期通信
      $.ajax({
          type: "GET",
          url: "/habits/select_year",
          data: {
            keyword: year,
          },
          dataType: "json",
        })

        .done(function (records) {
          result_area.empty(); // 現在表示されているリストを削除
          area.empty();
          records.forEach(function (record) {
            // jbuilderからのデータをforeachで分解
            if (record.status == false) {
              appendList(record, result_area, area); // 関数呼び出し
            } else {
              appendDoneList(record, result_area, area);
            }
          });
        })
        .fail(function () {
          alert("リストの表示に失敗しました");
        });
    });
  });
});
