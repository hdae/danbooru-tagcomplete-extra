// これはモジュールではない
if (!import.meta.main) Deno.exit(1)

import { stringify } from "jsr:@std/csv"
import { db } from "../database/mod.ts"

type Tag = {
    name: string
    category: number
    count: number
}

// クエリ
const aliases_query = db.prepare("SELECT * FROM aliases WHERE alias = :name")
const tags = db.prepare("SELECT * FROM tags").all() as Tag[]

// データベースから取得
const result = tags.map(({ name, category, count }) => [
    name,
    category,
    count,
    aliases_query.all(name).map(({ name }) => name).join(",")
] as const)

// 完全版を作成
await Deno.writeTextFile("./danbooru_full.csv", stringify(result))

// 30件未満を弾いた縮小版を作成
const minified = result.filter(([, , count]) => count >= 30)
await Deno.writeTextFile("./danbooru.csv", stringify(minified))
