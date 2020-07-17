/*! For license information please see b58a489f.3faab0e2.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{163:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var r=n(2),o=n(9),a=(n(181),n(180)),i={id:"advanced-topics-editorstate-race-conditions",title:"EditorState Race Conditions"},c={id:"advanced-topics-editorstate-race-conditions",title:"EditorState Race Conditions",description:"Draft Editor is a controlled input component (you can read about this in detail in the API Basics section), meaning that changes made to the Editor state are propagated upwards through onChange and it's up to the app to feed it back to the Editor component.",source:"@site/../docs/Advanced-Topics-EditorState-Race-Conditions.md",permalink:"/docs/advanced-topics-editorstate-race-conditions",editUrl:"https://github.com/facebook/draft-js/edit/master/docs/../docs/Advanced-Topics-EditorState-Race-Conditions.md",lastUpdatedBy:"Konstantin Tarkus",lastUpdatedAt:1585041753,sidebar:"docs",previous:{title:"Text Direction",permalink:"/docs/advanced-topics-text-direction"},next:{title:"Issues and Pitfalls",permalink:"/docs/advanced-topics-issues-and-pitfalls"}},l=[{value:"Best Practices",id:"best-practices",children:[]}],u={rightToc:l};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Draft ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," is a ",Object(a.b)("em",{parentName:"p"},"controlled input")," component (you can read about this in detail in the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/quickstart-api-basics"}),"API Basics")," section), meaning that changes made to the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," state are propagated upwards through ",Object(a.b)("inlineCode",{parentName:"p"},"onChange")," and it's up to the app to feed it back to the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," component."),Object(a.b)("p",null,"This cycle usually looks like:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'...\nthis.onChange = function(editorState) {\n  this.setState({editorState: editorState});\n}\n...\n<Editor\n  editorState={this.state.editorState}\n  onChange={this.onChange}\n  placeholder="Enter some text..."\n/>\n')),Object(a.b)("p",null,"Different browser events can trigger the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," to create a new state and call ",Object(a.b)("inlineCode",{parentName:"p"},"onChange"),". For instance, when the user pastes text into it, Draft parses the new content and creates the necessary data structure to represent it."),Object(a.b)("p",null,"This cycle works great, however, it is an asynchronous operation because of the ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," call. This introduces a delay between setting the state and rendering the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," with the new state. During this time period other JS code can be executed."),Object(a.b)("p",null,Object(a.b)("img",Object(r.a)({parentName:"p"},{src:"/img/editorstate-race-condition-1-handler.png",alt:"Race condition diagram 1"}))),Object(a.b)("p",null,"Non-atomic operations like this can potentially introduce race conditions.\nHere's an example: Suppose you want to remove all the text styles that come from the paste. This can be implemented by listening to the onPaste event and removing all styles from the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState"),":"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"this.onPaste = function() {\n  this.setState({\n    editorState: removeEditorStyles(this.state.editorState),\n  });\n};\n")),Object(a.b)("p",null,"However, this won't work as expected. You now have two event handlers that set a new ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," in the exact same browser event. Since the event handlers will run one after the other only the last ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," will prevail. Here's how it looks like in the JS timeline:"),Object(a.b)("p",null,Object(a.b)("img",Object(r.a)({parentName:"p"},{src:"/img/editorstate-race-condition-2-handlers.png",alt:"Race condition diagram 2"}))),Object(a.b)("p",null,"As you can see, since ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," is an asynchronous operation, the second ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," will override whatever it was set on the first one making the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," lose all the contents from the pasted text."),Object(a.b)("p",null,"You can observe and explore the race condition in ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://jsfiddle.net/qecccw3r/"}),"this running example"),". The example also has logging to highlight the JS timeline so make sure to open the developer tools."),Object(a.b)("p",null,"As a rule of thumb avoid having different event handlers for the same event that manipulate the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState"),". Using setTimeout to run ",Object(a.b)("inlineCode",{parentName:"p"},"setState")," might also land you in the same situation.\nAnytime you feel you're \u201closing state\u201d make sure you're not overriding it before the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor")," re-rendering."),Object(a.b)("h2",{id:"best-practices"},"Best Practices"),Object(a.b)("p",null,"Now that you understand the problem, what can you do to avoid it? In general be mindful of where you're getting the ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," from. If you're using a local one (stored in ",Object(a.b)("inlineCode",{parentName:"p"},"this.state"),") then there's the potential for it to not be up to date.\nTo minimize this problem Draft offers the latest ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," instance in most of its callback functions. In your code you should use the provided ",Object(a.b)("inlineCode",{parentName:"p"},"EditorState")," instead of your local one to make sure you're basing your changes on the latest one.\nHere's a list of supported callbacks on the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor"),":"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handleReturn(event, editorState)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handleKeyCommand(command, editorState)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handleBeforeInput(chars, editorState)")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"handlePastedText(text, html, editorState)"))),Object(a.b)("p",null,"The paste example can then be re-written in a race condition free way by using these methods:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'this.handlePastedText = (text, styles, editorState) => {\n  this.setState({\n    editorState: removeEditorStyles(text, editorState),\n  });\n};\n//...\n<Editor\n  editorState={this.state.editorState}\n  onChange={this.onChange}\n  handlePastedText={this.handlePastedText}\n  placeholder="Enter some text..."\n/>;\n')),Object(a.b)("p",null,"With ",Object(a.b)("inlineCode",{parentName:"p"},"handlePastedText")," you can implement the paste behavior by yourself."),Object(a.b)("p",null,"NOTE: If you need to have this behavior in your Editor, you can achieve it by setting the ",Object(a.b)("inlineCode",{parentName:"p"},"Editor"),"'s ",Object(a.b)("inlineCode",{parentName:"p"},"stripPastedStyles")," property to ",Object(a.b)("inlineCode",{parentName:"p"},"true"),"."))}s.isMDXComponent=!0},180:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),s=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),f=r,b=p["".concat(i,".").concat(f)]||p[f]||d[f]||a;return n?o.a.createElement(b,c(c({ref:t},u),{},{components:n})):o.a.createElement(b,c({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<a;u++)i[u]=n[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},181:function(e,t,n){"use strict";e.exports=n(182)},182:function(e,t,n){"use strict";var r=n(183),o="function"==typeof Symbol&&Symbol.for,a=o?Symbol.for("react.element"):60103,i=o?Symbol.for("react.portal"):60106,c=o?Symbol.for("react.fragment"):60107,l=o?Symbol.for("react.strict_mode"):60108,u=o?Symbol.for("react.profiler"):60114,s=o?Symbol.for("react.provider"):60109,p=o?Symbol.for("react.context"):60110,d=o?Symbol.for("react.concurrent_mode"):60111,f=o?Symbol.for("react.forward_ref"):60112,b=o?Symbol.for("react.suspense"):60113,h=o?Symbol.for("react.memo"):60115,m=o?Symbol.for("react.lazy"):60116,y="function"==typeof Symbol&&Symbol.iterator;function O(e,t,n,r,o,a,i,c){if(!e){if(e=void 0,void 0===t)e=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,o,a,i,c],u=0;(e=Error(t.replace(/%s/g,(function(){return l[u++]})))).name="Invariant Violation"}throw e.framesToPop=1,e}}function j(e){for(var t=arguments.length-1,n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);O(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",n)}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g={};function S(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||v}function w(){}function C(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||v}S.prototype.isReactComponent={},S.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&j("85"),this.updater.enqueueSetState(this,e,t,"setState")},S.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},w.prototype=S.prototype;var E=C.prototype=new w;E.constructor=C,r(E,S.prototype),E.isPureReactComponent=!0;var N={current:null},x={current:null},k=Object.prototype.hasOwnProperty,P={key:!0,ref:!0,__self:!0,__source:!0};function _(e,t,n){var r=void 0,o={},i=null,c=null;if(null!=t)for(r in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)k.call(t,r)&&!P.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(1===l)o.children=n;else if(1<l){for(var u=Array(l),s=0;s<l;s++)u[s]=arguments[s+2];o.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===o[r]&&(o[r]=l[r]);return{$$typeof:a,type:e,key:i,ref:c,props:o,_owner:x.current}}function T(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var R=/\/+/g,$=[];function D(e,t,n,r){if($.length){var o=$.pop();return o.result=e,o.keyPrefix=t,o.func=n,o.context=r,o.count=0,o}return{result:e,keyPrefix:t,func:n,context:r,count:0}}function A(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>$.length&&$.push(e)}function I(e,t,n){return null==e?0:function e(t,n,r,o){var c=typeof t;"undefined"!==c&&"boolean"!==c||(t=null);var l=!1;if(null===t)l=!0;else switch(c){case"string":case"number":l=!0;break;case"object":switch(t.$$typeof){case a:case i:l=!0}}if(l)return r(o,t,""===n?"."+M(t,0):n),1;if(l=0,n=""===n?".":n+":",Array.isArray(t))for(var u=0;u<t.length;u++){var s=n+M(c=t[u],u);l+=e(c,s,r,o)}else if(null===t||"object"!=typeof t?s=null:s="function"==typeof(s=y&&t[y]||t["@@iterator"])?s:null,"function"==typeof s)for(t=s.call(t),u=0;!(c=t.next()).done;)l+=e(c=c.value,s=n+M(c,u++),r,o);else"object"===c&&j("31","[object Object]"===(r=""+t)?"object with keys {"+Object.keys(t).join(", ")+"}":r,"");return l}(e,"",t,n)}function M(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))}(e.key):t.toString(36)}function U(e,t){e.func.call(e.context,t,e.count++)}function q(e,t,n){var r=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?B(e,r,n,(function(e){return e})):null!=e&&(T(e)&&(e=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(R,"$&/")+"/")+n)),r.push(e))}function B(e,t,n,r,o){var a="";null!=n&&(a=(""+n).replace(R,"$&/")+"/"),I(e,q,t=D(t,a,r,o)),A(t)}function F(){var e=N.current;return null===e&&j("307"),e}var H={Children:{map:function(e,t,n){if(null==e)return e;var r=[];return B(e,r,null,t,n),r},forEach:function(e,t,n){if(null==e)return e;I(e,U,t=D(null,null,t,n)),A(t)},count:function(e){return I(e,(function(){return null}),null)},toArray:function(e){var t=[];return B(e,t,null,(function(e){return e})),t},only:function(e){return T(e)||j("143"),e}},createRef:function(){return{current:null}},Component:S,PureComponent:C,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:p,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:s,_context:e},e.Consumer=e},forwardRef:function(e){return{$$typeof:f,render:e}},lazy:function(e){return{$$typeof:m,_ctor:e,_status:-1,_result:null}},memo:function(e,t){return{$$typeof:h,type:e,compare:void 0===t?null:t}},useCallback:function(e,t){return F().useCallback(e,t)},useContext:function(e,t){return F().useContext(e,t)},useEffect:function(e,t){return F().useEffect(e,t)},useImperativeHandle:function(e,t,n){return F().useImperativeHandle(e,t,n)},useDebugValue:function(){},useLayoutEffect:function(e,t){return F().useLayoutEffect(e,t)},useMemo:function(e,t){return F().useMemo(e,t)},useReducer:function(e,t,n){return F().useReducer(e,t,n)},useRef:function(e){return F().useRef(e)},useState:function(e){return F().useState(e)},Fragment:c,StrictMode:l,Suspense:b,createElement:_,cloneElement:function(e,t,n){null==e&&j("267",e);var o=void 0,i=r({},e.props),c=e.key,l=e.ref,u=e._owner;if(null!=t){void 0!==t.ref&&(l=t.ref,u=x.current),void 0!==t.key&&(c=""+t.key);var s=void 0;for(o in e.type&&e.type.defaultProps&&(s=e.type.defaultProps),t)k.call(t,o)&&!P.hasOwnProperty(o)&&(i[o]=void 0===t[o]&&void 0!==s?s[o]:t[o])}if(1===(o=arguments.length-2))i.children=n;else if(1<o){s=Array(o);for(var p=0;p<o;p++)s[p]=arguments[p+2];i.children=s}return{$$typeof:a,type:e.type,key:c,ref:l,props:i,_owner:u}},createFactory:function(e){var t=_.bind(null,e);return t.type=e,t},isValidElement:T,version:"16.8.4",unstable_ConcurrentMode:d,unstable_Profiler:u,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:N,ReactCurrentOwner:x,assign:r}},L={default:H},J=L&&H||L;e.exports=J.default||J},183:function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var n,c,l=i(e),u=1;u<arguments.length;u++){for(var s in n=Object(arguments[u]))o.call(n,s)&&(l[s]=n[s]);if(r){c=r(n);for(var p=0;p<c.length;p++)a.call(n,c[p])&&(l[c[p]]=n[c[p]])}}return l}}}]);