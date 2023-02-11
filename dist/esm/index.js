import{useRef as r,useMemo as n,useCallback as t}from"react";import{useRouter as e}from"next/router";var o;!function(r){var n;!function(r){r.SIMPLE="simple",r.ARRAY="array"}(n=r.ParamType||(r.ParamType={}));var t=function(){this.is=n.SIMPLE};r.Param=t;var e=function(){this.is=n.ARRAY};r.ArrayParam=e}(o||(o={}));var a=function(a,u){var i=e(),c=i.asPath.split("#"),l=c[0],p=c[1],f=l.split("?")[0]||"",s=l.split("?")[1]||"",d=r();a=n((function(){return a}),[]);var v=n((function(){return new URLSearchParams(s)}),[s]),h=t((function(r,n){var t,e,c,l=null!==(e=null!==(t=null==n?void 0:n.mode)&&void 0!==t?t:null==u?void 0:u.mode)&&void 0!==e?e:"replace",s=null!==(c=null==n?void 0:n.shallow)&&void 0!==c?c:null==u?void 0:u.shallow,h=new URLSearchParams(v);d.current=null==n?void 0:n.trigger,Object.entries(r).forEach((function(r){var n=r[0],t=r[1];if(a[n]){var e,u=a[n];if(u instanceof o.ArrayParam)h.delete(n),(e=u.encode(t)).forEach((function(r){return h.append(n,r)}));else null==(e=u.encode(t))?h.delete(n):h.set(n,e)}}));var m=h.toString();return"replace"===l?i.replace({pathname:f,query:m,hash:p},void 0,{shallow:s}):i.push({pathname:f,query:m,hash:p},void 0,{shallow:s}),m}),[v,p]),m=n((function(){return Object.keys(a).map((function(r){return v.get(r)}))}),[v]),y=n((function(){var r=Object.entries(a).reduce((function(r,n){var t=n[0],e=n[1];if(e instanceof o.ArrayParam)r[t]=e.decode(v.getAll(t));else{var a=v.get(t);null!=a&&(r[t]=e.decode(a))}return r}),{}),n=d.current;return d.current=void 0,[r,n]}),m);return[y[0],h,y[1]]},u=function(r,n){return u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])},u(r,n)};function i(r,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=r}u(r,n),r.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}var c=function(r){function n(){return null!==r&&r.apply(this,arguments)||this}return i(n,r),n.prototype.encode=function(r){return r||void 0},n.prototype.decode=function(r){return r},n}(o.Param),l=function(r){function n(){return null!==r&&r.apply(this,arguments)||this}return i(n,r),n.prototype.encode=function(r){return String(r)},n.prototype.decode=function(r){return Number(r)},n}(o.Param),p=function(r){function n(n){var t=r.call(this)||this;return t.param=n,t}return i(n,r),n.prototype.encode=function(r){var n=this;return r.map((function(r){return n.param.encode(r)})).filter((function(r){return void 0!==r}))},n.prototype.decode=function(r){var n=this;return r.map((function(r){return n.param.decode(r)}))},n}(o.ArrayParam);export{p as ArrayOf,o as NextQueryParams,l as NumberParam,c as StringParam,a as useParams};
