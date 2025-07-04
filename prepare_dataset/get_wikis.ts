import { delay } from "jsr:@std/async"

export const get_wikis = async (baseurl = "https://danbooru.donmai.us") => {

    // ページ切り替えながら取得
    let page = 1
    while (true) {

        const filename = `./dataset/wiki-${page}.json`

        // ファイルが存在するならスキップ
        if (await Deno.stat(filename).then(() => true).catch(() => false)) continue

        // 空や非推奨を除いたタグを1000件ずつ件数順に取得
        const response = await fetch(`${baseurl}/wiki_pages.json?limit=1000&page=${page}&search[is_deleted]=false`)

        // JSONとして読み込み
        const data = await response.json() as unknown[]

        // 件数が0なら終了
        if (data.length === 0) break

        console.log(`Wiki: page ${page} has ${data.length} contents.`)

        // 一旦保存
        await Deno.writeTextFile(filename, JSON.stringify(data))

        // 10秒待つ
        await delay(10000)

        // 次のページにして続行
        page++
    }
}
