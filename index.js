import { existsSync } from "jsr:@std/fs";
async function executeFile(path, req) {
    const file = await Deno.readTextFile(path)
    const sects = file.split("---")
    let html
    let js
    if (sects.length == 1) {
        html = sects[0]
        js = ""
    } else {
        js = sects[0]
        html = sects[1]
    }
    const fn = new Function("req", `let res = new Response("", {headers: {"Content-Type":"text/html"}});\n${js}\n return new Response(\`${html}\`, res);`)
    return fn(req)
}
Deno.serve(req => {
    const url = new URL(req.url)
    let path = ""
    if (url.pathname == "/") {
        path = "./index.lmn"
    } else path = "./" + url.pathname + ".lmn"
    if (!existsSync(path)) path = "./404.lmn"
    return executeFile(path, req)
},)
