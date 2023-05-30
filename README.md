# awilix-treeshaking-example

## Description

This project is an experiment to tree shake a NodeJS app with `@vercel/ncc`.

This application use awilix to manage IoC layer.

## Working case : native TS (without tree-shking)

```
pnpm build
cd dist
node app.js
```

Result :

```
➜  node app.js
{
  postRepository: {
    lifetime: 'SINGLETON',
    injectionMode: 'PROXY',
    ...
  },
  postService: {
    lifetime: 'SINGLETON',
    injectionMode: 'PROXY',
    ...
  },
  userService: {
    lifetime: 'SINGLETON',
    injectionMode: 'PROXY',
    ...
  },
  server: {
    lifetime: 'SINGLETON',
    injectionMode: 'PROXY',
    ...
  }
}
{ id: '1', name: 'foo', description: 'foo', username: 'doe-j' }
🚀 server started and available on http://localhost:8080
```

## Errored case : ncc build (with tree-shking)

```
pnpm minify
cd dist
node index.js
```

Result :

```
➜  node app.js
{}
(node:23129) Warning: Accessing non-existent property 'default' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
/awilix-treeshaking/dist/index.js:1208
                throw new errors_1.AwilixResolutionError(name, resolutionStack);
                      ^

AwilixResolutionError: Could not resolve 'userService'.

Resolution path: userService
    at Object.resolve (/awilix-treeshaking/dist/index.js:1208:23)
    at /awilix-treeshaking/dist/index.js:9438:39
    at Generator.next (<anonymous>)
    at /awilix-treeshaking/dist/index.js:9413:71
    at new Promise (<anonymous>)
    at __webpack_modules__.8917.__awaiter (/awilix-treeshaking/dist/index.js:9409:12)
    at start (/awilix-treeshaking/dist/index.js:9420:12)
    at Object.8917 (/awilix-treeshaking/dist/index.js:9445:1)
    at __nccwpck_require__ (/awilix-treeshaking/dist/index.js:9715:43)
    at /awilix-treeshaking/dist/index.js:9740:37
```
