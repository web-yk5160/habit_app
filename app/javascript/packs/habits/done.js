$(document).on("turbolinks:load", function () {
  $(function () {
    function appendList(record, result_area) {
      var result = `<tr>
                        <td><button name="${record.done}" type="button" class="btn btn-success" id="checked" value="${record.id}">完了</button></td>
                        <td><a href="/habits/${record.id}">${record.name}</a></td>
                        <td id="done"><span id="habit-done">${record.done}</span> / ${record.goal}</td>
                        <td>${record.start_date}</td>
                        <td>${record.note}</td>
                        <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                      </tr>`;
      result_area.append(result);
    }

    function appendDoneList(record, redo_area) {
      var result = `<tr>
                        <td><button name="${record.done}" type="button" class="btn btn-success" id="check" value="${record.id}">完了</button></td>
                        <td><a href="/habits/${record.id}">${record.name}</a></td>
                        <td><span id="habit-done">${record.done}</span> / ${record.goal}</td>
                        <td>${record.start_date}</td>
                        <td>${record.note}</td>
                        <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                      </tr>`;
      redo_area.append(result);
    }

    function appendStayList(record, stay_area) {
      var result = `<tr>
                        <td><button name="${record.done}" type="button" class="btn btn-success" id="check" value="${record.id}">完了</button></td>
                        <td><a href="/habits/${record.id}">${record.name}</a></td>
                        <td>${record.done} / ${record.goal}</td>
                        <td>${record.start_date}</td>
                        <td>${record.note}</td>
                        <td><a data-confirm="削除してもよろしいですか?" rel="nofollow" data-method="delete" href="/habits/${record.id}"><button type="button" class="btn btn-danger">削除</button></a></td>
                      </tr>`;
      stay_area.append(result);
    }

    // チェックボックスの値が変更されたら発火
    $(document).on("click", "#check", function (records) {
      let row = $(this).closest("tr").remove();
      var done = $(this).val(); // チェックボックスの値を取得
      var result_area = $("#habits_done");
      var stay_area = $(".habits_all");
      var done_num = $(this).closest("td").siblings().eq(1).text();
      var result_done = done_num.substr(0, 1);
      parseInt(result_done, 10);

      var habits = gon.habits;
      habits.forEach(function (value) {
        if (value.id == done) {
          habit_goal = value.goal;
        }
      });

      // ajaxによる非同期通信
      $.ajax({
          type: "GET",
          url: "/habits/done",
          data: {
            id: done,
            keyword: done,
            name: result_done,
          },
          dataType: "json",
        })

        .done(function (records) {
          // jbuilderからのデータをforeachで分解
          if (result_done == habit_goal - 1) {
            records.forEach(function (record) {
              $(row).remove(); // 現在表示されているリストを削除
              appendList(record, result_area); // 関数呼び出し
            });
          } else {
            records.forEach(function (record) {
              appendStayList(record, stay_area); // 関数呼び出し
            });
          }
        })
        .fail(function () {
          alert("リストの表示に失敗しました");
        });
    });


    $(document).on("click", "#checked", function () {
      let row = $(this).closest("tr").remove();
      var redo = $(this).val(); // チェックボックスの値を取得
      var redo_area = $(".habits_all");
      var done_num = $(this).closest("td").siblings().eq(1).text();
      var redo_result_done = done_num.substr(0, 1);
      parseInt(redo_result_done, 10);

      // ajaxによる非同期通信
      $.ajax({
          type: "GET",
          url: "/habits/redo",
          data: {
            id: redo,
            keyword: redo,
            habit_redo: redo_result_done,
          },
          dataType: "json",
        })

        .done(function (records) {
          $(row).remove();
          // 現在表示されているリストを削除
          records.forEach(function (record) {
            // jbuilderからのデータをforeachで分解
            appendDoneList(record, redo_area); // 関数呼び出し
          });
        })
        .fail(function () {
          alert("リストの表示に失敗しました");
        });
    });
  });
});
