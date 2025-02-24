import tag from "../dataset/tag-1.json" with { type: "json" }
import { transact_tags } from "./utils.ts"

type Tag = typeof tag

export const register_tags = async () => {
    const data: [string, number, number][] = []

    let count = 0
    while (true) {
        count++
        const filename = `./dataset/tag-${count}.json`
        if (!await Deno.stat(filename).then(() => true).catch(() => false)) break
        const json = JSON.parse(await Deno.readTextFile(filename)) as Tag
        for (const { name, category, post_count } of json) {
            data.push([name, category, post_count])
        }
    }

    transact_tags(data)
}
