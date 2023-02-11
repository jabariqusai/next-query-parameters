"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=require("react"),e=require("next/router");exports.NextQueryParams=void 0,function(r){var e;!function(r){r.SIMPLE="simple",r.ARRAY="array"}(e=r.ParamType||(r.ParamType={}));var t=function(){this.is=e.SIMPLE};r.Param=t;var n=function(){this.is=e.ARRAY};r.ArrayParam=n}(exports.NextQueryParams||(exports.NextQueryParams={}));var t=function(r,e){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])},t(r,e)};function n(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var o=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return n(e,r),e.prototype.encode=function(r){return r||void 0},e.prototype.decode=function(r){return r},e}(exports.NextQueryParams.Param),a=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return n(e,r),e.prototype.encode=function(r){return String(r)},e.prototype.decode=function(r){return Number(r)},e}(exports.NextQueryParams.Param),u=function(r){function e(e){var t=r.call(this)||this;return t.param=e,t}return n(e,r),e.prototype.encode=function(r){var e=this;return r.map((function(r){return e.param.encode(r)})).filter((function(r){return void 0!==r}))},e.prototype.decode=function(r){var e=this;return r.map((function(r){return e.param.decode(r)}))},e}(exports.NextQueryParams.ArrayParam);exports.ArrayOf=u,exports.NumberParam=a,exports.StringParam=o,exports.useParams=function(t,n){var o=e.useRouter(),a=o.asPath.split("#"),u=a[0],i=a[1],c=u.split("?")[0]||"",s=u.split("?")[1]||"",l=r.useRef();t=r.useMemo((function(){return t}),[]);var p=r.useMemo((function(){return new URLSearchParams(s)}),[s]),f=r.useCallback((function(r,e){var a,u,s,f=null!==(u=null!==(a=null==e?void 0:e.mode)&&void 0!==a?a:null==n?void 0:n.mode)&&void 0!==u?u:"replace",d=null!==(s=null==e?void 0:e.shallow)&&void 0!==s?s:null==n?void 0:n.shallow,m=new URLSearchParams(p);l.current=null==e?void 0:e.trigger,Object.entries(r).forEach((function(r){var e=r[0],n=r[1];if(t[e]){var o,a=t[e];if(a instanceof exports.NextQueryParams.ArrayParam){if(m.delete(e),null!=n)(o=a.encode(n)).forEach((function(r){return m.append(e,r)}))}else null==(o=a.encode(n))?m.delete(e):m.set(e,o)}}));var y=m.toString();return"replace"===f?o.replace({pathname:c,query:y,hash:i},void 0,{shallow:d}):o.push({pathname:c,query:y,hash:i},void 0,{shallow:d}),y}),[p,i]),d=r.useMemo((function(){return Object.keys(t).map((function(r){return p.get(r)}))}),[p]),m=r.useMemo((function(){var r=Object.entries(t).reduce((function(r,e){var t=e[0],n=e[1];if(n instanceof exports.NextQueryParams.ArrayParam)r[t]=n.decode(p.getAll(t));else{var o=p.get(t);null!=o&&(r[t]=n.decode(o))}return r}),{}),e=l.current;return l.current=void 0,[r,e]}),d);return[m[0],f,m[1]]};
