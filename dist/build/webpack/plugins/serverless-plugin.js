"use strict";exports.__esModule=true;exports.ServerlessPlugin=void 0;var _webpack=require("next/dist/compiled/webpack/webpack");/**
 * Makes sure there are no dynamic chunks when the target is serverless
 * The dynamic chunks are integrated back into their parent chunk
 * This is to make sure there is a single render bundle instead of that bundle importing dynamic chunks
 */class ServerlessPlugin{apply(compiler){compiler.hooks.compilation.tap('ServerlessPlugin',compilation=>{const hook=_webpack.isWebpack5?compilation.hooks.optimizeChunks:compilation.hooks.optimizeChunksBasic;hook.tap('ServerlessPlugin',chunks=>{for(const chunk of chunks){// If chunk is not an entry point skip them
if(!chunk.hasEntryModule()){continue;}// Async chunks are usages of import() for example
const dynamicChunks=chunk.getAllAsyncChunks();for(const dynamicChunk of dynamicChunks){if(_webpack.isWebpack5){// @ts-ignore TODO: Remove ignore when webpack 5 is stable
for(const module of compilation.chunkGraph.getChunkModulesIterable(chunk)){// Add module back into the entry chunk
chunk.addModule(module);}continue;}for(const module of dynamicChunk.modulesIterable){// Webpack 4 has separate GraphHelpers
_webpack.GraphHelpers.connectChunkAndModule(chunk,module);}}}});});}}exports.ServerlessPlugin=ServerlessPlugin;
//# sourceMappingURL=serverless-plugin.js.map