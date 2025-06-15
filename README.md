# Generate tagcomplete data with japanese aliases

`a1111-sd-webui-tagcomplete` 向けのタグデータにDanbooruのWikiに登録されている別名を追加したもの。  
Wikiにはキャラクターやシチュエーションの日本語名が別名として多く含まれていたりするので、日本語のエイリアス代わりに使えるはず。

「デカァァァァァいッ説明不要!!」のような過剰な表現や中国語も混ざってたり色々とカオスなので、  
結果の表示数を引き上げるなどして、いい感じに使えるようにしてください。

データベース化の際に日本語範囲外の文字列をある程度除外するようにしているので、  
中国語や韓国語が必要であれば`create_database/wiki.ts`を調整してください。(`continue`部分がそれぞれに対応)

## ファイルの説明

- [danbooru.csv](./danbooru.csv)
  - 投稿数順に30投稿以上のみを抽出したタグ
  - ちょうど13万件ぐらい
  - `a1111-sd-webui-tagcomplete`のdanbooru.csvを置き換えても良いし、追加にしてもいい。
- [danbooru_full.csv](./danbooru_full.csv)
  - 投稿数順の完全なタグ
  - 全部読み込むと重いので非推奨
- database/data.db
  - 上記を生成する際に使った集計用データベース
  - 単語検索とかを自前で実装するのに使えるかも
- dataset/*.json
  - 取得日: 2025-05-06
  - ファイル名の数字はページ番号
  - API経由で取れた生の情報、同じようなことしたいなら使えるはず。
  - 権利はDanbooruが所有しているはずだが、彼らはAPI経由で取得された情報の扱いについて特に言及していないようだ。

## 圧倒的感謝

日本語と中国語の分類について、[羅生もん](https://x.com/AiRashomon)氏にアドバイスを頂きました。  
仕組み上、完全に日本語のみのデータは作れませんが、カオス度合いは減ったと思います。

## 更新方法

`prepare_dataset`ではDanbooruをクロールすることになるので、サーバー負荷に注意が必要です。  
通常1秒、Wikiは重そうなので10秒スリープを入れてあります。(レート制限の1/10程度)

1. Danbooruからデータセットの生成: `deno -A prepare_dataset/main.ts`
2. 実行: `deno -A create_database/main.ts`
3. 実行: `deno -A create_completion/main.ts`
