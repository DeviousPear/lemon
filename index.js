import { existsSync } from "jsr:@std/fs";
import { contentType } from "jsr:@std/media-types";
async function executeFile(path, req) {
    if (existsSync(path)) {
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
    } else {
        return new Response("Not Found", { status: 404 })
    }

}
Deno.serve({ port: Deno.args[0] }, req => {
    const url = new URL(req.url)
    let path = ""
    if (url.pathname == "/") {
        path = "./index.lmn"
    } else if (existsSync("./" + url.pathname + ".lmn")) {
        path = "./" + url.pathname + ".lmn"
    } else if (url.pathname.endsWith(".lmn") && existsSync("./" + url.pathname)) {
        path = "./" + url.pathname
    } else if (existsSync("./" + url.pathname)) {
        return new Response(Deno.readTextFileSync(url.pathname), { headers: { "Content-Type": contentType(url.pathname.split(".").pop()) } })
    } else path = "./404.lmn"
    return executeFile(path, req)
},)
