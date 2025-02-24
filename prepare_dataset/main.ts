// これはモジュールではない
if (!import.meta.main) Deno.exit(1)

import { get_aliases } from "./get_aliases.ts"
import { get_tags } from "./get_tags.ts"
import { get_wikis } from "./get_wikis.ts"

await get_aliases()
await get_tags()
await get_wikis()
