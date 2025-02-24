// これはモジュールではない
if (!import.meta.main) Deno.exit(1)

import { register_aliases } from "./aliases.ts"
import { register_tags } from "./tags.ts"
import { register_ext_alias } from "./wikis.ts"

await register_tags()
console.info("Successfully registered: Tags");

await register_aliases()
console.info("Successfully registered: Aliases");

await register_ext_alias()
console.info("Successfully registered: Ext Aliases");
