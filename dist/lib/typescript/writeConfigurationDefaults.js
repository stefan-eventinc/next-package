"use strict";exports.__esModule=true;exports.getRequiredConfiguration=getRequiredConfiguration;exports.writeConfigurationDefaults=writeConfigurationDefaults;var _fs=require("fs");var _chalk=_interopRequireDefault(require("chalk"));var CommentJson=_interopRequireWildcard(require("next/dist/compiled/comment-json"));var _os=_interopRequireDefault(require("os"));var _getTypeScriptConfiguration=require("./getTypeScriptConfiguration");function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function getDesiredCompilerOptions(ts){const o={// These are suggested values and will be set when not present in the
// tsconfig.json
target:{suggested:'es5'},lib:{suggested:['dom','dom.iterable','esnext']},allowJs:{suggested:true},skipLibCheck:{suggested:true},strict:{suggested:false},forceConsistentCasingInFileNames:{suggested:true},noEmit:{suggested:true},// These values are required and cannot be changed by the user
// Keep this in sync with the webpack config
// 'parsedValue' matches the output value from ts.parseJsonConfigFileContent()
esModuleInterop:{value:true,reason:'requirement for babel'},module:{parsedValue:ts.ModuleKind.ESNext,// All of these values work:
parsedValues:[ts.ModuleKind.ES2020,ts.ModuleKind.ESNext,ts.ModuleKind.CommonJS,ts.ModuleKind.AMD],value:'esnext',reason:'for dynamic import() support'},moduleResolution:{parsedValue:ts.ModuleResolutionKind.NodeJs,value:'node',reason:'to match webpack resolution'},resolveJsonModule:{value:true,reason:'to match webpack resolution'},isolatedModules:{value:true,reason:'requirement for babel'},jsx:{parsedValue:ts.JsxEmit.Preserve,value:'preserve',reason:'next.js implements its own optimized jsx transform'}};return o;}function getRequiredConfiguration(ts){const res={};const desiredCompilerOptions=getDesiredCompilerOptions(ts);for(const optionKey of Object.keys(desiredCompilerOptions)){var _ev$parsedValue;const ev=desiredCompilerOptions[optionKey];if(!('value'in ev)){continue;}res[optionKey]=(_ev$parsedValue=ev.parsedValue)!=null?_ev$parsedValue:ev.value;}return res;}async function writeConfigurationDefaults(ts,tsConfigPath,isFirstTimeSetup){if(isFirstTimeSetup){await _fs.promises.writeFile(tsConfigPath,'{}'+_os.default.EOL);}const desiredCompilerOptions=getDesiredCompilerOptions(ts);const effectiveConfiguration=await(0,_getTypeScriptConfiguration.getTypeScriptConfiguration)(ts,tsConfigPath);const userTsConfigContent=await _fs.promises.readFile(tsConfigPath,{encoding:'utf8'});const userTsConfig=CommentJson.parse(userTsConfigContent);if(userTsConfig.compilerOptions==null){userTsConfig.compilerOptions={};isFirstTimeSetup=true;}const suggestedActions=[];const requiredActions=[];for(const optionKey of Object.keys(desiredCompilerOptions)){const check=desiredCompilerOptions[optionKey];if('suggested'in check){if(!(optionKey in effectiveConfiguration.options)){userTsConfig.compilerOptions[optionKey]=check.suggested;suggestedActions.push(_chalk.default.cyan(optionKey)+' was set to '+_chalk.default.bold(check.suggested));}}else if('value'in check){var _check$parsedValues;const ev=effectiveConfiguration.options[optionKey];if(!('parsedValues'in check?(_check$parsedValues=check.parsedValues)==null?void 0:_check$parsedValues.includes(ev):'parsedValue'in check?check.parsedValue===ev:check.value===ev)){userTsConfig.compilerOptions[optionKey]=check.value;requiredActions.push(_chalk.default.cyan(optionKey)+' was set to '+_chalk.default.bold(check.value)+` (${check.reason})`);}}else{// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _=check;}}if(userTsConfig.include==null){userTsConfig.include=['next-env.d.ts','**/*.ts','**/*.tsx'];suggestedActions.push(_chalk.default.cyan('include')+' was set to '+_chalk.default.bold(`['next-env.d.ts', '**/*.ts', '**/*.tsx']`));}if(userTsConfig.exclude==null){userTsConfig.exclude=['node_modules'];suggestedActions.push(_chalk.default.cyan('exclude')+' was set to '+_chalk.default.bold(`['node_modules']`));}if(suggestedActions.length<1&&requiredActions.length<1){return;}await _fs.promises.writeFile(tsConfigPath,CommentJson.stringify(userTsConfig,null,2)+_os.default.EOL);if(isFirstTimeSetup){console.log(_chalk.default.green(`We detected TypeScript in your project and created a ${_chalk.default.bold('tsconfig.json')} file for you.`)+'\n');return;}console.log(_chalk.default.green(`We detected TypeScript in your project and reconfigured your ${_chalk.default.bold('tsconfig.json')} file for you.`)+'\n');if(suggestedActions.length){console.log(`The following suggested values were added to your ${_chalk.default.cyan('tsconfig.json')}. These values ${_chalk.default.bold('can be changed')} to fit your project's needs:\n`);suggestedActions.forEach(action=>console.log(`\t- ${action}`));console.log('');}if(requiredActions.length){console.log(`The following ${_chalk.default.bold('mandatory changes')} were made to your ${_chalk.default.cyan('tsconfig.json')}:\n`);requiredActions.forEach(action=>console.log(`\t- ${action}`));console.log('');}}
//# sourceMappingURL=writeConfigurationDefaults.js.map