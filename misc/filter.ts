import { parse } from "jsr:@std/csv"
import AhoCorasick from "npm:modern-ahocorasick"

const jis_level_1 = parse(await Deno.readTextFile("./misc/jis/jis_level_1.csv")).map(([, t]) => t)
const jis_level_2 = parse(await Deno.readTextFile("./misc/jis/jis_level_2.csv")).map(([, t]) => t)
const jis_level_3 = parse(await Deno.readTextFile("./misc/jis/jis_level_3.csv")).map(([, t]) => t)
const jis_level_4 = parse(await Deno.readTextFile("./misc/jis/jis_level_4.csv")).map(([, t]) => t)

export const jis_char_search = new AhoCorasick([
    ...jis_level_1,
    ...jis_level_2,
    ...jis_level_3,
    // ...jis_level_4,
    "々"
])
