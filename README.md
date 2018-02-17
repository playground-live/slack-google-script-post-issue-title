slack-google-script-post-issue-title
===

# post_title_to_slack.gs
slackにissueかPRが貼られたらそのタイトルを自動で投稿するbot

# 使用方法
## GAS
### プロジェクト作成
ファイル → 新規作成 → プロジェクトで新規作成 → コードを貼り付ける

### Slackのライブラリを追加
SlackApp関数を使えるように、ライブラリをインポートする必要があります
リソース → ライブラリで
```
M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO
```
を追加

> 参考URL: https://tech.camph.net/slack-bot-with-gas/

### アクセストークン等を追加
ファイル → プロジェクトのプロパティ → スクリプトのプロパティでアクセストークンを追加

```
GITHUB_ACCESS_TOKEN : Githubリポジトリのアクセストークン
SLACK_ACCESS_TOKEN  : botを追加するslackチームのアクセストークン
LOG_FILE_ID         : ログを出力するGoogleドキュメントのファイルID
```
#### 上記の取得方法
#### GITHUB_ACCESS_TOKEN
アカウント →　Settings →　Personal access tokens　→　Generate new token(権限はrepoにだけつける)

#### SLACK_ACCESS_TOKEN
1. https://api.slack.com/apps でCreate New App
2. `Bots` の権限を付与
3. Install App to Your Team で playground チームに　App をインストール
4. `OAuth & Permissions` のページに行き、 `Bot User OAuth Access Token` をコピー

#### LOG_FILE_ID
Googleドキュメントを作成し、表示されるheaderのパスに含まれる文字列

![ドキュメントIDの取り方](https://user-images.githubusercontent.com/10380303/36340869-90dfe45c-1428-11e8-9c34-666b9bf71e0c.png)

## slack
Outgoing Webhooksを用いる
#### Trigger Wordの設定
githubのURLが貼られたら動作するようにするため、以下のように設定する

`<https://github.com/`
#### TokenをGASに追加
GASに追加するためのTokenをメモっておく
#### URL
このURLは、GASを公開した時に出てくるアプリケーションURLを貼り付けてください


## 公開
以下の手順で公開できます
1. ファイル → 版を管理 → 保存
1. 公開 → ウェブアプリケーションとして導入 → 上記で指定したバージョンを指定して更新 → 全員（匿名ユーザを含む）で公開
1. 公開時に出てくるURLを、slackのOutgoing Webhooksの設定にあるURLに貼り付ける

## 修正
上記同様に保存して版を追加し、新しいバージョンを指定して更新します
