# [prosemirror-node-view-gutters](https://teemukoivisto.github.io/prosemirror-node-view-gutters/)

Having a NodeView with gutters and a block node as child causes selection to unexpectedly when moving up with arrow key.

https://github.com/TeemuKoivisto/prosemirror-node-view-gutters/assets/10279942/9a14a214-9ef9-468f-90dd-44582ce38b3f

## How to reproduce locally

Requires Node >=16 and pnpm

1. `pnpm i`
2. `pnpm bug`
3. Insert couple paragraphs and use left/right cursors to try to move them
