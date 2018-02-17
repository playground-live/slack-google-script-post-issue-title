function doPost(e) {
  var SLACK_TOKEN  = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var GITHUB_TOKEN = PropertiesService.getScriptProperties().getProperty('GITHUB_ACCESS_TOKEN');
  var app = SlackApp.create(SLACK_TOKEN);
  var bot_name = "Post Title";
  var headers = {
    'Authorization': 'Bearer '+ GITHUB_TOKEN
  };
  var options = {
    'headers': headers
  };
  var url, content, response, json;

  try {
    // ログをクリア
    // getLogFile().getBody().clear();

    // 送信URLサンプル
    //var input = "<https://github.com/ebkn12/hello_app/pull/1> test"

    var input = e.parameter.text;
    Logger.log('%s : %s', 'Input', input);

    // pullかissuesという値が存在した時のみ以下の処理を実行
    if ( input.match(/pull/) || input.match(/issues/) ){
      matched_url = input.match(/<https:\/\/github.com\/(.+(pull|issues)\/\d+)>/)
      issue_path = matched_url[1]
      url = "https://api.github.com/repos/" + issue_path;
      url = url.replace("pull", "pulls");
      Logger.log('%s : %s', 'URL', url);

      response = UrlFetchApp.fetch(url, options);
      json = JSON.parse(response.getContentText());
      Logger.log('%s : %s', 'response(JSON)', json);

      // レスポンスのtitleのみ取得
      content = json["title"];
      Logger.log('%s : %s', 'title is', content);
    } else {
      // PRかissueのURLではなかったら処理を終了
      Logger.log('%s : %s', 'Input does not contain PR or issue.', '');
      return false;
    }

    return app.postMessage(e.parameter.channel_id, content, {
      username: bot_name
    });
  } catch (e) {
    Logger.log('\n' + JSON.stringify(e, null, ' '));
  } finally {
    // ログを書き込む
    getLogFile().getBody().appendParagraph(Logger.getLog());
  }
}

// ログを吐き出すファイルを取得する関数
function getLogFile() {
  var LOG_FILE_ID  = PropertiesService.getScriptProperties().getProperty('LOG_FILE_ID');
  if (this.logFile === undefined) {
    this.logFile = DocumentApp.openById(LOG_FILE_ID);
  }
  return this.logFile;
}
