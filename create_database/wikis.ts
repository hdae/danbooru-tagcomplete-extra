import wiki from "../dataset/wiki-1.json" with { type: "json" }
import { jis_char_search } from "../misc/filter.ts"
import { transact_aliases } from "./utils.ts"

type Wiki = typeof wiki

const koreanPattern = /^[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]+$/

const kanjiRegexp = /\p{sc=Han}/u
const kanaRegexp = /[\p{sc=Hiragana}\p{sc=Katakana}]/u

await Deno.mkdir("./tmp", { recursive: true })

export const register_ext_alias = async () => {
    const data: [string, string][] = []
    const ignored = []

    let count = 0
    while (true) {
        count++
        const filename = `./dataset/wiki-${count}.json`
        if (!await Deno.stat(filename).then(() => true).catch(() => false)) break
        const json = JSON.parse(await Deno.readTextFile(filename)) as Wiki
        for (const { other_names, title } of json) {
            for (const other_name of other_names) {

                // 仮名が含まれているものは例外
                const kanas = [...other_name].filter(v => kanaRegexp.test(v)).join("")
                if (kanas.length === 0) {

                    // 日本語範囲外(主に中国語)をスキップ
                    const kanjis = [...other_name].filter(v => kanjiRegexp.test(v)).join("")
                    if (kanjis.length !== jis_char_search.search(kanjis).length) {
                        console.log(`Skipped not japanese range: ${other_name}`)
                        ignored.push(other_name)
                        continue
                    }
                }

                // 韓国語をスキップ
                if (koreanPattern.test(other_name)) {
                    console.log(`Skipped korean word: ${other_name}`)
                    ignored.push(other_name)
                    continue
                }

                data.push([other_name, title])
            }
        }
    }

    await Deno.writeTextFile("./tmp/ignored.txt", ignored.join("\n"))
    transact_aliases(data)
}
