# Generate tagcomplete data with japanese aliases.

`a1111-sd-webui-tagcomplete` 向けのタグデータにDanbooruのWikiに登録されている別名を追加したもの。  
Wikiにはキャラクターやシチュエーションの日本語名が別名として多く含まれていたりするので、日本語のエイリアス代わりに使えるはず。

「デカァァァァァいッ説明不要!!」のような過剰な表現や中国語も混ざってたり色々とカオスなので、  
結果の表示数を引き上げるなどして、いい感じに使えるようにしてください。

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
  - 2025-02-23
  - API経由で取れた生の情報
  - ファイル名の数字はページ数
  - 同じようなことしたいなら使える

## 圧倒的感謝

日本語と中国語の分類について、[羅生もん](https://x.com/AiRashomon)氏にアドバイスを頂きました。  
仕組み上、完全に日本語のみのデータは作れませんが、カオス度合いは減ったと思います。

## 更新方法

1. 実行: `deno -A prepare_dataset/main.ts`
