import wiki from "../dataset/wiki-1.json" with { type: "json" }
import { transact_aliases } from "./utils.ts"

type Wiki = typeof wiki

const koreanPattern = /^[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]+$/
const kanjiPattern = /^\p{sc=Han}+$/u
const emojiPattern = /^\p{Emoji}+$/v

await Deno.mkdir("./tmp", { recursive: true })

export const register_ext_alias = async () => {
    const data: [string, string][] = []

    const hans = []
    const emojis = []

    let count = 0
    while (true) {
        count++
        const filename = `./dataset/wiki-${count}.json`
        if (!await Deno.stat(filename).then(() => true).catch(() => false)) break
        const json = JSON.parse(await Deno.readTextFile(filename)) as Wiki
        for (const { other_names, title } of json) {
            for (const other_name of other_names) {

                // 韓国語をスキップ
                if (koreanPattern.test(other_name)) {
                    console.log(`Skipped korean word: ${other_name}`)
                    continue
                }

                // 漢字のみの単語をリストアップ
                if (kanjiPattern.test(other_name)) {
                    hans.push(other_name)
                }

                // 
                if (emojiPattern.test(other_name)) {
                    emojis.push([other_name, title])
                }

                data.push([other_name, title])
            }
        }
    }

    await Deno.writeTextFile("./tmp/hans.txt", hans.join("\n"))
    await Deno.writeTextFile("./tmp/emojis.txt", emojis.join("\n"))

    transact_aliases(data)
}
