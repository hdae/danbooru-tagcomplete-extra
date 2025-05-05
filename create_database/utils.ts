import { db } from "../database/mod.ts"

// Create tables
db.exec("CREATE TABLE IF NOT EXISTS tags (name TEXT, category INTEGER, count INTEGER);")
db.exec("CREATE TABLE IF NOT EXISTS aliases (name TEXT, alias TEXT);")
db.exec("CREATE INDEX IF NOT EXISTS idx_aliases_alias ON aliases(alias);")

// Insert helpers
export const insert_tag = (name: string, category: number, count: number) => db.exec("INSERT INTO tags(name, category, count) VALUES (:name, :category, :count);", { name, category, count })
export const insert_alias = (name: string, alias: string) => db.exec("INSERT INTO aliases(name, alias) VALUES (:name, :alias);", { name, alias })

export const transact_tags = db.transaction((data: [string, number, number][]) => {
    for (const [name, category, count] of data) {
        insert_tag(name, category, count)
    }
})

export const transact_aliases = db.transaction((data: [string, string][]) => {
    for (const [name, alias] of data) {
        insert_alias(name, alias)
    }
})
