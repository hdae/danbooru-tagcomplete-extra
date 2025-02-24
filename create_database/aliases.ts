import alias from "../dataset/alias-1.json" with { type: "json" }
import { transact_aliases } from "./utils.ts"

type Alias = typeof alias

export const register_aliases = async () => {
    const data: [string, string][] = []

    let count = 0
    while (true) {
        count++
        const filename = `./dataset/alias-${count}.json`
        if (!await Deno.stat(filename).then(() => true).catch(() => false)) break
        const json = JSON.parse(await Deno.readTextFile(filename)) as Alias
        for (const { antecedent_name, consequent_name } of json) {
            data.push([antecedent_name, consequent_name])
        }
    }

    transact_aliases(data)
}
