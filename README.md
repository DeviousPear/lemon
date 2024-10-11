# Lemon Framework

## Idea
I wanted to embed javascript in HTML, and I wanted to run javascript. But I didn't want all that client-side stuff.
Introducing Lemon.

Lemon is basically the idea of PHP, but instead of the language being PHP, it's javascript.
I know this kind of thing already exists, but this is my implementation.

## Usage
A Lemon project is structured similar to a plain HTML project. You might have an assets folder with some CSS, images, etc.
Instead of using `.html` as the extention, use `.lmn`. I hope to add VScode support soon. Any HTML file is also lemon-compatible. Add a Javascript template literal in the HTML to insert a javascript expression. Like this:
```
<h1>Your UA string is: ${req.headers.get("User-Agent")}</h1>
```
There are 2 global objects exposed in the scope: `req` and `res`. `req` is a Javascript standard `Request` and `res` is a standard `Response` (for setting headers, etc).

You can also execute a block of javascript at the top of the file, separated by `---`, for example:
```
let name = new URL(req.url).searchParams.get("name")
---
<h1>Hi, ${name}!</h1>
<h1>Your UA string is: ${req.headers.get("User-Agent")}
<a href="/back" >Go back</a>
```
To use purely Javascript, just add the `---` to the end of the file.

If you `return` a value from the top block, the rest of the document will be ignored and the return value will be the response sent to the client.

If the file doesn't exist, Lemon will look for a `404.lmn` file in the root. If there is none, it will just return 
```
Not Found
```

## Installation
To install lemon, run
```bash
deno install --global --allow-net --allow-read --name lemon https://raw.githubusercontent.com/DeviousPear/lemon/refs/heads/main/index.js
```

## Running lemon
Once you've installed lemon, just type `lemon` in your terminal at the project root.

To run on a specific port, add the port to the command like so:
```bash
lemon 1234
```