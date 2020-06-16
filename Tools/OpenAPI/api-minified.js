// prettier-ignore
/*********************************** API *************************************/
function API(i="untitled",t=!1){return new class{constructor(i,t){this.name=i,this.debug=t,this.isQX="undefined"!=typeof $task,this.isLoon="undefined"!=typeof $loon,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.isNode="function"==typeof require,this.node=(()=>this.isNode?{request:require("request"),fs:require("fs")}:null)(),this.cache=this.initCache(),this.log(`INITIAL CACHE:\n${JSON.stringify(this.cache)}`),Promise.prototype.delay=function(i){return this.then(function(t){return((i,t)=>new Promise(function(e){setTimeout(e.bind(null,t),i)}))(i,t)})}}get(i){return this.isQX?("string"==typeof i&&(i={url:i,method:"GET"}),$task.fetch(i)):this.isLoon||this.isSurge?$httpClient.get(i):this.isNode?new Promise((t,e)=>{this.node.request(i,(i,s)=>{i?e(i):t(s)})}):void 0}post(i){return this.isQX?$task.fetch(i):this.isLoon||this.isSurge?$httpClient.post(i):this.isNode?new Promise((t,e)=>{this.node.request.post(i,(i,s)=>{i?e(i):t(s)})}):void 0}initCache(){if(this.isQX)return $prefs.valueForKey(this.name)||{};if(this.isLoon||this.isSurge)return $persistentStore.read(this.name)||{};if(this.isNode){const i=`${this.name}.json`;return this.node.fs.existsSync(i)?JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(i,JSON.stringify({}),{flag:"wx"},i=>console.log(i)),{})}}persistCache(){const i=this.cache;this.isQX&&$prefs.setValueForKey(i,this.name),this.isSurge&&$persistentStore.write(i,this.name),this.isNode&&this.node.fs.writeFileSync(`${this.name}.json`,JSON.stringify(i),{flag:"w"},i=>console.log(i))}write(i,t){this.log(`SET ${t} = ${i}`),this.cache={...this.cache,[t]:i}}read(i){return this.log(`READ ${i}`),this.cache[i]}delete(i){this.log(`DELETE ${i}`),this.write(void 0,i)}notify(i,t,e,s){const o="string"==typeof s?s:void 0,n=e+(null==o?"":`\n${o}`);this.isQX&&(void 0!==o?$notify(i,t,e,{"open-url":o}):$notify(i,t,e,s)),this.isSurge&&$notification.post(i,t,n),this.isLoon&&$notification.post(i,t,e,o||s["open-url"]),this.isNode&&("undefined"==typeof $jsbox?console.log(`${i}\n${t}\n${n}\n\n`):require("push").schedule({title:i,body:t?t+"\n"+e:e}))}log(i){this.debug&&console.log(i)}info(i){console.log(i)}error(i){this.log("ERROR: "+i)}wait(i){return new Promise(t=>setTimeout(t,i))}done(i={}){this.persistCache(),this.isQX&&$done(i),(this.isLoon||this.isSurge)&&$done(i)}}(i,t)}
/*****************************************************************************/