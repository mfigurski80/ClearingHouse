(function(){var e={5161:function(e,t,n){"use strict";n.d(t,{$6:function(){return _},Ap:function(){return h},Mu:function(){return v},QK:function(){return o},gU:function(){return b},i7:function(){return p}});var o,i=n(4870),a=n(3396),r=n(2956),s=n(1386),l=n.n(s),u=n(4531),c=n(2904);(function(e){e[e["NEED_PROVIDER"]=0]="NEED_PROVIDER",e[e["DISCONNECTED"]=1]="DISCONNECTED",e[e["CONNECTING"]=2]="CONNECTING",e[e["CONNECTED"]=3]="CONNECTED"})(o||(o={}));const d=()=>{window.location.reload()},f=(0,i.iH)(o.DISCONNECTED),m=(0,i.iH)(null),p=(0,i.OT)(f),h=(0,i.XI)(null),v=(0,i.XI)(null),b=(0,i.OT)(m),g=async function(e=!0){if(!window.ethereum)return void(e&&(alert("No web3 detected. Please install MetaMask."),f.value=o.NEED_PROVIDER));if(h.value||(h.value=(0,i.Xl)(new r.Q(window.ethereum,"any"))),e&&(f.value=o.CONNECTING,await h.value.send("eth_requestAccounts",[])),v.value=h.value.getSigner(),void 0===v.value)return console.error("ERR CONNECTING: Signer is undefined"),void(f.value=o.DISCONNECTED);const t=await(0,c.JQ)(v.value.getAddress(),1e3).catch((e=>{throw f.value=o.DISCONNECTED,e}));m.value=t,f.value=o.CONNECTED,e&&l().track(u.Z.CONNECT_WALLET,{address:t}),l().identify(t),console.log("CONNECTED AS",t),window.ethereum.removeListener("accountsChanged",d).on("accountsChanged",d)},_=()=>((0,a.bv)((()=>{f.value===o.DISCONNECTED&&g(!1).catch((e=>{console.error("FAILED TO AUTO-CONNECT",e)}))})),(0,a.Ah)((()=>{window.ethereum?.removeListener("accountsChanged",d)})),{status:p,provider:h,signer:v,wallet:b,connect:g})},7544:function(e,t,n){"use strict";var o=n(9242),i=n(3396),a=n(7139);const r=e=>((0,i.dD)("data-v-817f8c8e"),e=e(),(0,i.Cn)(),e),s={class:"layout"},l={key:0,class:"toggle-sidebar-button-spacing"},u={class:"nav"},c=r((()=>(0,i._)("i",{class:"pi pi-home"},null,-1))),d=r((()=>(0,i._)("i",{class:"pi pi-chart-bar"},null,-1))),f=r((()=>(0,i._)("i",{class:"pi pi-plus"},null,-1))),m=r((()=>(0,i._)("i",{class:"pi pi-search"},null,-1))),p=r((()=>(0,i._)("div",{style:{flex:"1"}},null,-1))),h=r((()=>(0,i._)("i",{class:"pi pi-user"},null,-1)));function v(e,t,n,o,r,v){const b=(0,i.up)("router-link"),g=(0,i.up)("Sidebar"),_=(0,i.up)("Button");return(0,i.wg)(),(0,i.iD)("div",s,[(0,i._)("div",{class:(0,a.C_)(["nav-container",{mobile:e.isMobileVersion}])},[(0,i.Wm)(g,{visible:e.visibleLeft||!e.isMobileVersion,onHide:t[0]||(t[0]=t=>e.hideSidebar()),onShow:t[1]||(t[1]=t=>e.showSidebar()),dismissable:!0,modal:!0,showCloseIcon:!1,class:"sidebar-container p-sidebar-sm"},{header:(0,i.w5)((()=>[e.isMobileVersion?((0,i.wg)(),(0,i.iD)("div",l)):(0,i.kq)("",!0),(0,i.WI)(e.$slots,"header",{},void 0,!0)])),default:(0,i.w5)((()=>[(0,i._)("nav",u,[(0,i.Wm)(b,{to:"/"},{default:(0,i.w5)((()=>[c])),_:1}),(0,i.Wm)(b,{to:"/dashboard"},{default:(0,i.w5)((()=>[d])),_:1}),(0,i.Wm)(b,{to:"/mint"},{default:(0,i.w5)((()=>[f])),_:1}),(0,i.Wm)(b,{to:"/not-implemented"},{default:(0,i.w5)((()=>[m])),_:1}),p,(0,i.Wm)(b,{to:"/not-implemented"},{default:(0,i.w5)((()=>[h])),_:1})])])),_:3},8,["visible"]),e.visibleLeft?(0,i.kq)("",!0):((0,i.wg)(),(0,i.j4)(_,{key:0,onClick:e.showSidebar,icon:"pi pi-bars",class:"p-button-rounded p-button-text p-button-icon-only toggle-sidebar-button"},null,8,["onClick"])),e.visibleLeft?((0,i.wg)(),(0,i.j4)(_,{key:1,onClick:e.hideSidebar,icon:"pi pi-times",class:"p-button-rounded p-button-text p-button-icon-only toggle-sidebar-button"},null,8,["onClick"])):(0,i.kq)("",!0)],2),(0,i._)("main",null,[(0,i.WI)(e.$slots,"default",{},void 0,!0)])])}var b=n(4146),g=n(1826);const _=1e3;var w=(0,i.aZ)({name:"NavbarLayout",components:{Sidebar:b.Z,Button:g.Z},data:()=>({visibleLeft:!1,isMobileVersion:window.innerWidth<_}),mounted(){window.addEventListener("resize",this.checkIsMobileVersion)},unmounted(){window.removeEventListener("resize",this.checkIsMobileVersion)},methods:{checkIsMobileVersion(){let e=window.innerWidth<_;!this.isMobileVersion&&e?this.visibleLeft=!1:this.isMobileVersion&&!e&&(this.visibleLeft=!0),this.isMobileVersion=e},hideSidebar(){this.isMobileVersion&&(this.visibleLeft=!1)},showSidebar(){this.visibleLeft=!0}}}),k=n(89);const C=(0,k.Z)(w,[["render",v],["__scopeId","data-v-817f8c8e"]]);var y=C;const N={id:"view"};var E=(0,i.aZ)({__name:"App",setup(e){return(e,t)=>{const n=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(y,null,{default:(0,i.w5)((()=>[(0,i._)("div",N,[(0,i.Wm)(n)])])),_:1})}}});const O=E;var T=O,I=n(2483),S=n(1386),D=n.n(S),L=n(4531),A=n.p+"img/Group_12_2.8b79f969.png";const W=e=>((0,i.dD)("data-v-fced3492"),e=e(),(0,i.Cn)(),e),R={id:"landing"},U={class:"frame main"},V={class:"landing-text"},Z=W((()=>(0,i._)("h1",null,[(0,i._)("a",{class:"alt-color",href:"http://mfigurski80.github.io/karmaToken"},"BOND"),(0,i.Uk)(" Token ClearingHouse ")],-1))),x=W((()=>(0,i._)("p",null," A user-oriented clearing house for virtual debt represented by BOND NFT tokens ",-1))),M={class:"p-buttonset"},j={href:"#features"},B=W((()=>(0,i._)("div",{class:"frame back"},[(0,i._)("img",{alt:"ClearingHouse Logo",src:A,width:"300"})],-1))),P={id:"features"},$=W((()=>(0,i._)("div",{class:"feature"},[(0,i._)("i",{class:"pi pi-briefcase"}),(0,i._)("h3",null,"Access"),(0,i._)("p",null,[(0,i.Uk)(" Gain "),(0,i._)("strong",null,"granular, low-level access"),(0,i.Uk)(" to the same investment vehicles that banks and investment funds use -- exposing both the risk and the gains associated. ")])],-1))),F=W((()=>(0,i._)("div",{class:"feature"},[(0,i._)("i",{class:"pi pi-chart-line"}),(0,i._)("h3",null,"Efficiency"),(0,i._)("p",null,[(0,i.Uk)(" Free the financial landscape from centralized finance with "),(0,i._)("strong",null,"user-controlled interest rates"),(0,i.Uk)(", lowering entry costs for new debt investors and borrowers. ")])],-1))),G=W((()=>(0,i._)("div",{class:"feature"},[(0,i._)("i",{class:"pi pi-book"}),(0,i._)("h3",null,"Security"),(0,i._)("p",null,[(0,i.Uk)(" Easily create, service, and manage various "),(0,i._)("strong",null,"forms of debt derivatives and instruments"),(0,i.Uk)(", including: shorts, options, and more ")])],-1))),H={id:"contracts"},q=W((()=>(0,i._)("p",null,[(0,i.Uk)(" All contracts interactions can be performed, at a low level, from "),(0,i._)("a",{href:"https://mfigurski80.github.io/karmaToken/"},"the web basic interface"),(0,i.Uk)(". ")],-1))),Q={class:"group dominant"},K={class:"group"},z=W((()=>(0,i._)("h5",null,"This contract is currently under development!",-1))),J=W((()=>(0,i._)("p",null," ClearingHouse protocol will allow 3rd party services to trustlessly service non-ether debt on behalf of the debtor. ",-1))),X=W((()=>(0,i._)("small",{class:"annotation"}," *Note that no contracts have been deployed onto the main chain yet -- addresses listed are locations on the Görli test chain ",-1))),Y={id:"signup"},ee=W((()=>(0,i._)("p",{class:"squeeze"}," The product is currently in beta/testing phase, slated to fully release towards the end of 2022. Sign up to receive regular development updates or to directly contribute to the testing effort! ",-1))),te={class:"section"},ne=W((()=>(0,i._)("h5",null,[(0,i.Uk)(" Have questions or comments? Email me at "),(0,i._)("a",{href:"mailto:miko.f80@gmail.com"},"miko.f80@gmail.com"),(0,i.Uk)("! ")],-1))),oe=W((()=>(0,i._)("h5",null,[(0,i.Uk)(" Check out more of my work "),(0,i._)("a",{href:"https://meeksfigs.surge.sh"},"here"),(0,i.Uk)(", or read my "),(0,i._)("a",{href:"https://devlog.surge.sh"},"blog"),(0,i.Uk)(" for updates! ")],-1))),ie=W((()=>(0,i._)("h6",null,"Copywrite Mikolaj Figurski (c) 2022",-1)));function ae(e,t,n,o,a,r){const s=(0,i.up)("connect-wallet-button"),l=(0,i.up)("Button"),u=(0,i.up)("social-icons"),c=(0,i.up)("container-layout"),d=(0,i.up)("columns-layout"),f=(0,i.up)("ContractCard"),m=(0,i.up)("subscribe-form");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("header",R,[(0,i.Wm)(c,{class:"landing-layout"},{default:(0,i.w5)((()=>[(0,i._)("div",U,[(0,i._)("div",V,[Z,x,(0,i._)("span",M,[(0,i.Wm)(s),(0,i._)("a",j,[(0,i.Wm)(l,{label:"Read More",class:"p-button-rounded p-button-outlined",icon:"pi pi-angle-double-down"})])]),(0,i.Wm)(u,{class:"social-icons"})])]),B])),_:1})]),(0,i._)("section",P,[(0,i.Wm)(c,null,{default:(0,i.w5)((()=>[(0,i._)("h2",{class:"section-header-text",onClick:t[0]||(t[0]=t=>e.copySectionLink("features"))}," Features "),(0,i.Wm)(d,null,{default:(0,i.w5)((()=>[$,F,G])),_:1})])),_:1})]),(0,i._)("section",H,[(0,i.Wm)(c,null,{default:(0,i.w5)((()=>[(0,i._)("h2",{class:"section-header-text",onClick:t[1]||(t[1]=t=>e.copySectionLink("contracts"))}," Contracts (v0.7) "),q,(0,i.Wm)(d,{class:"spaced"},{default:(0,i.w5)((()=>[(0,i._)("div",Q,[(0,i.Wm)(f,{name:"LBondManager",address:e.addresses.LBondManager,description:"Provides a series of utilities for reading and writing bonds to the heavily-compressed BOND data structure.",abiLink:"https://mfigurski80.github.io/karmaToken/contracts/LBondManager.json"},null,8,["address"]),(0,i.Wm)(f,{name:"BOND Core",address:e.addresses.Core,description:"BOND ERC721 protocol exposes the creation and management of tokens, management of collateral, access control, currency listings, while using data compression to ensure minimum gas usage.",abiLink:"https://mfigurski80.github.io/karmaToken/contracts/Core.json"},null,8,["address"])]),(0,i._)("div",K,[(0,i.Wm)(f,{name:"ClearingHouse",address:"PENDING!",class:"pending"},{default:(0,i.w5)((()=>[z,J])),_:1})])])),_:1}),X])),_:1})]),(0,i._)("section",Y,[(0,i.Wm)(c,null,{default:(0,i.w5)((()=>[(0,i._)("h2",{class:"section-header-text",onClick:t[2]||(t[2]=t=>e.copySectionLink("signup"))}," Subscribe + Testing "),ee,(0,i.Wm)(m)])),_:1})]),(0,i._)("footer",te,[(0,i.Wm)(u),ne,oe,ie])],64)}var re=n(2402),se=n(220),le=n(6585);const ue=e=>((0,i.dD)("data-v-1b99aa8c"),e=e(),(0,i.Cn)(),e),ce={class:"full-col"},de={class:"input-field"},fe=ue((()=>(0,i._)("h4",null,[(0,i._)("label",{for:"name"},"How should we address you?")],-1))),me={class:"input-field"},pe=ue((()=>(0,i._)("h4",null,[(0,i._)("label",{for:"email"},"What is your email address?")],-1))),he={class:"input-field inline"},ve=ue((()=>(0,i._)("h4",null,[(0,i._)("label",{for:"test-user"},"Request beta access as a test user?")],-1))),be={class:"full-col"},ge={class:"input-field"},_e=ue((()=>(0,i._)("h4",null,[(0,i._)("label",{for:"cat"},"How would you classify yourself?")],-1))),we={class:"input-field"},ke=ue((()=>(0,i._)("h4",null,[(0,i._)("label",{for:"message"},"Send us a message!")],-1))),Ce=ue((()=>(0,i._)("h3",null,"The form has been submitted. Thank you for your interest!",-1)));function ye(e,t,n,a,r,s){const l=(0,i.up)("input-text"),u=(0,i.up)("Checkbox"),c=(0,i.up)("multi-select"),d=(0,i.up)("Textarea"),f=(0,i.up)("columns-layout"),m=(0,i.up)("Button");return(0,i.wg)(),(0,i.iD)("form",{onSubmit:t[5]||(t[5]=(0,o.iM)((t=>e.handleSubmit()),["prevent"])),class:"p-fluid"},[e.state!==e.FormState.DONE?((0,i.wg)(),(0,i.j4)(f,{key:0},{default:(0,i.w5)((()=>[(0,i._)("div",ce,[(0,i._)("div",de,[fe,(0,i.Wm)(l,{type:"text",modelValue:e.name,"onUpdate:modelValue":t[0]||(t[0]=t=>e.name=t),name:"name",id:"email",placeholder:"John Doe"},null,8,["modelValue"])]),(0,i._)("div",me,[pe,(0,i.Wm)(l,{type:"email",modelValue:e.email,"onUpdate:modelValue":t[1]||(t[1]=t=>e.email=t),name:"email",id:"email",placeholder:"john@doe.com"},null,8,["modelValue"])]),(0,i._)("div",he,[(0,i.Wm)(u,{id:"test-user",name:"test-user",binary:!0,modelValue:e.isTestUser,"onUpdate:modelValue":t[2]||(t[2]=t=>e.isTestUser=t),class:"checkbox",tabindex:"0"},null,8,["modelValue"]),ve])]),(0,i._)("div",be,[(0,i._)("div",ge,[_e,(0,i.Wm)(c,{modelValue:e.categoriesChosen,"onUpdate:modelValue":t[3]||(t[3]=t=>e.categoriesChosen=t),options:e.categories,optionLabel:"value",placeholder:"Select Classificiation",display:"chip"},null,8,["modelValue","options"])]),(0,i._)("div",we,[ke,(0,i.Wm)(d,{modelValue:e.message,"onUpdate:modelValue":t[4]||(t[4]=t=>e.message=t),rows:"4",name:"message",id:"message"},null,8,["modelValue"])])])])),_:1})):((0,i.wg)(),(0,i.j4)(f,{key:1,class:"done-message"},{default:(0,i.w5)((()=>[Ce])),_:1})),(0,i.Wm)(m,{type:"submit",class:"p-button-raised p-button-text submit-button",loading:e.state===e.FormState.LOADING,disabled:e.state===e.FormState.DONE,icon:"pi "+(e.state===e.FormState.DONE?"pi-check":"pi-upload"),label:e.buttonText[e.state]||"Submit"},null,8,["loading","disabled","icon","label"])],32)}var Ne,Ee=n(6709),Oe=n(4376),Te=n(3337),Ie=n(3602);(function(e){e[e["INITIAL"]=0]="INITIAL",e[e["INPUT_ERROR"]=1]="INPUT_ERROR",e[e["LOADING"]=2]="LOADING",e[e["SERVER_ERROR"]=3]="SERVER_ERROR",e[e["DONE"]=4]="DONE"})(Ne||(Ne={}));const Se="subscribe_form_submitted";var De=(0,i.aZ)({name:"TestUserForm",beforeMount(){this.state=this.$cookies.isKey(Se)?Ne.DONE:Ne.INITIAL},setup:()=>({FormState:Ne,buttonText:{[Ne.LOADING]:"Sending...",[Ne.DONE]:"Done"}}),data:()=>({name:"",email:"",categoriesChosen:[],isTestUser:!1,message:"",categories:[{value:"Developer"},{value:"Investor"},{value:"Entrepreneur"},{value:"Crypto Enthusiast"},{value:"Other"}],state:Ne.INITIAL}),components:{InputText:Ee.Z,MultiSelect:Oe.Z,Textarea:Te.Z,ColumnsLayout:le.Z,Button:g.Z,Checkbox:Ie.Z},methods:{handleSubmit(){this.state=Ne.LOADING;let e=JSON.stringify({name:this.name,email:this.email,categories:this.categoriesChosen.map((e=>e.value)),isTestUser:this.isTestUser,message:this.message,time:(new Date).toISOString()});fetch("https://getform.io/f/dda2d02f-e219-4356-9b93-04791bb1a963",{method:"POST",headers:{"Content-Type":"application/json"},body:e}).then((e=>{e.ok?(this.state=Ne.DONE,this.$cookies.set(Se,"_")):(alert("An error occurred. Please try again later."),this.state=Ne.SERVER_ERROR)}))}}});const Le=(0,k.Z)(De,[["render",ye],["__scopeId","data-v-1b99aa8c"]]);var Ae=Le;const We={class:"icon-row"},Re=(0,i.uE)('<a href="https://twitter.com/MikolajFigurski" data-v-f8653f86><i class="pi pi-twitter" data-v-f8653f86></i></a><a href="https://discord.com" data-v-f8653f86><i class="pi pi-discord" data-v-f8653f86></i></a><a href="https://github.com/mfigurski80/karmaToken" data-v-f8653f86><i class="pi pi-github" data-v-f8653f86></i></a>',3),Ue=[Re];function Ve(e,t){return(0,i.wg)(),(0,i.iD)("div",We,Ue)}const Ze={},xe=(0,k.Z)(Ze,[["render",Ve],["__scopeId","data-v-f8653f86"]]);var Me=xe;const je={class:"container"},Be={key:0,class:"pi pi-copy"};function Pe(e,t,n,o,r,s){const l=(0,i.up)("Button"),u=(0,i.up)("Card");return(0,i.wg)(),(0,i.iD)("div",je,[(0,i.Wm)(u,{class:"card"},{title:(0,i.w5)((()=>[(0,i._)("h3",null,(0,a.zw)(e.name),1)])),content:(0,i.w5)((()=>[(0,i.WI)(e.$slots,"default",{},(()=>[(0,i._)("p",null,(0,a.zw)(e.description),1)]),!0)])),footer:(0,i.w5)((()=>[(0,i.Wm)(l,{icon:"pi pi-download",class:"p-button-text p-button-rounded p-button-sm",id:"download-abi",label:"Load ABI",disabled:!e.abiLink,onClick:e.downloadABI},null,8,["disabled","onClick"])])),_:3}),(0,i._)("code",{class:"sub-tag",onClick:t[0]||(t[0]=(...t)=>e.copyAddress&&e.copyAddress(...t))},[(0,i.Uk)(" Deployed at: "+(0,a.zw)(e.address.startsWith("0x")?e.address.slice(0,10)+"...."+e.address.slice(-6):e.address)+" ",1),e.address.startsWith("0x")?((0,i.wg)(),(0,i.iD)("i",Be)):(0,i.kq)("",!0)])])}var $e=n(606),Fe=(0,i.aZ)({name:"ContractCard",props:{name:String,description:String,address:String,abiLink:String},components:{Card:$e.Z,Button:g.Z},methods:{copyAddress(){this.address?.startsWith("0x")&&navigator.clipboard.writeText(this.address)},downloadABI(){if(this.abiLink&&this.name){let e=document.createElement("a");e.style.display="none",e.href=this.abiLink,e.download=`${this.name.replace(" ","_")}_ABI.json`,document.body.appendChild(e),e.click(),window.URL.revokeObjectURL(e.href),e.remove()}}}});const Ge=(0,k.Z)(Fe,[["render",Pe],["__scopeId","data-v-b96ce010"]]);var He=Ge,qe=n(2720),Qe=(0,i.aZ)({name:"HomeView",components:{Button:g.Z,ContainerLayout:se.Z,ColumnsLayout:le.Z,SubscribeForm:Ae,SocialIcons:Me,ContractCard:He,ConnectWalletButton:qe.Z},data:()=>({addresses:re.UB.goerli}),methods:{copySectionLink(e){navigator.clipboard.writeText(`${window.location.href}#${e}`)}}});const Ke=(0,k.Z)(Qe,[["render",ae],["__scopeId","data-v-fced3492"]]);var ze=Ke;const Je=[{path:"/",name:"home",component:ze},{path:"/dashboard",name:"dashboard",component:()=>Promise.all([n.e(874),n.e(323)]).then(n.bind(n,6096))},{path:"/mint",name:"mint",component:()=>Promise.all([n.e(874),n.e(421)]).then(n.bind(n,1239))},{path:"/checkout",name:"state-checkout",component:()=>n.e(1).then(n.bind(n,8001))},{path:"/bond",name:"bond-details",component:()=>n.e(665).then(n.bind(n,8665))},{path:"/settings",name:"settings",component:()=>n.e(770).then(n.bind(n,3770))},{path:"/not-implemented",name:"not-implemented",component:()=>n.e(28).then(n.bind(n,6028))}],Xe=(0,I.p7)({history:(0,I.PO)("/ClearingHouse/"),routes:Je});Xe.afterEach(((e,t,n)=>{D().track(L.Z.NAVIGATE,{to:e.name,from:t.name,path:e.fullPath}),n&&(console.error("Router error:",n),D().track(L.Z.NAVIGATION_ERROR,{error:n}))}));var Ye=Xe,et=n(5269),tt=n.n(et),nt=n(5719),ot=n(7729);(0,o.ri)(T).use(Ye).use(nt.Pg).use(tt()).use(ot.Z).mount("#app"),D().init("474d64726279eb58b293df0cd59b67a8",{debug:!1,ignore_dnt:!0})},4531:function(e,t){"use strict";var n;(function(e){e["CONNECT_WALLET"]="Connect Wallet",e["IMPORT_BOND"]="Import Bond",e["MINT_BOND"]="Mint Bond",e["NAVIGATE"]="Navigate",e["NAVIGATION_ERROR"]="Navigation Error"})(n||(n={})),t["Z"]=n},2904:function(e,t,n){"use strict";function o(e,t){return Promise.race([e,new Promise(((e,n)=>window.setTimeout((()=>{n("Timed out")}),t)))])}n.d(t,{JQ:function(){return o},mz:function(){return d},cL:function(){return c},JW:function(){return m},A5:function(){return f},BK:function(){return l},O$:function(){return a},lb:function(){return r}});const i=[{value:31536e3,unit:"year"},{value:2592e3,unit:"month"},{value:604800,unit:"week"},{value:86400,unit:"day"},{value:3600,unit:"hour"},{value:60,unit:"minute"},{value:1,unit:"second"}];function a(e){e=Math.abs(Math.floor(e/1e3));let t=i[6];for(let o=0;o<i.length-1;o++)if(e>2*i[o].value||e>i[o].value-i[o+1].value&&e<i[o].value+i[o+1].value){t=i[o];break}const n=Math.round(e/t.value);return`${n} ${t.unit}${1===n?"":"s"}`}function r(e){const t=(new Date).getTime()-e.getTime(),n=a(t);return t>0?`${n} ago`:`in ${n}`}function s(e){const t=e.toPrecision(3).replace(/\.?0+$/,"").replace(/\.?0+(?=e)/,"");return t}function l(e,t){const n=s(t?e/10**t.decimals:e);return n}window.counter={};const u=window.counter;function c(e,t=1){u[e]||(u[e]=0),u[e]+=t}function d(e){return`CACHED_QUERY_${Array(e).join("_")}`}function f(e){const t=window.localStorage.getItem(e);return t?JSON.parse(t):void 0}function m(e,t){return e.then((e=>(window.localStorage.setItem(t,JSON.stringify({data:e,updated:Date.now()})),e)))}},2720:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var o=n(3396),i=n(4870),a=n(9242),r=n(2483),s=n(1826),l=n(5161),u=(0,o.aZ)({__name:"ConnectWalletButton",setup(e){const t=(0,r.tv)(),{status:n,wallet:u,connect:c}=(0,l.$6)(),d=async()=>{n.value!==l.QK.CONNECTED&&await c(),t.push("/dashboard")},f=(0,o.Fl)((()=>n.value===l.QK.CONNECTED?`${u.value.slice(0,7)}...${u.value.slice(-6)}`:"Connect a Wallet"),[n,u]);return(e,t)=>((0,o.wg)(),(0,o.j4)((0,i.SU)(s.Z),{onClick:(0,a.iM)(d,["prevent"]),class:"p-button-rounded p-button-gradient",icon:(0,i.SU)(n)===(0,i.SU)(l.QK).CONNECTED?"pi pi-check":"pi pi-wallet",loading:(0,i.SU)(n)===(0,i.SU)(l.QK).CONNECTING,disabled:(0,i.SU)(n)===(0,i.SU)(l.QK).NEED_PROVIDER,label:(0,i.SU)(f)},null,8,["onClick","icon","loading","disabled","label"]))}});const c=u;var d=c},6585:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var o=n(3396);const i={class:"layout"};function a(e,t){return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.WI)(e.$slots,"default")])}var r=n(89);const s={},l=(0,r.Z)(s,[["render",a]]);var u=l},220:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var o=n(3396);const i={class:"container"};function a(e,t){return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.WI)(e.$slots,"default",{},void 0,!0)])}var r=n(89);const s={},l=(0,r.Z)(s,[["render",a],["__scopeId","data-v-2315ad04"]]);var u=l},6601:function(){}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,o,i,a){if(!o){var r=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],a=e[c][2];for(var s=!0,l=0;l<o.length;l++)(!1&a||r>=a)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(s=!1,a<r&&(r=a));if(s){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,i,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};n.t=function(o,i){if(1&i&&(o=this(o)),8&i)return o;if("object"===typeof o&&o){if(4&i&&o.__esModule)return o;if(16&i&&"function"===typeof o.then)return o}var a=Object.create(null);n.r(a);var r={};e=e||[null,t({}),t([]),t(t)];for(var s=2&i&&o;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((function(e){r[e]=function(){return o[e]}}));return r["default"]=function(){return o},n.d(a,r),a}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{1:"aae3d59b",28:"1aca32c9",323:"734d9261",421:"de7f84a1",665:"41235253",770:"6206602a",874:"289335e6"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{28:"b9ff0ddc",323:"5be3e395",421:"4d2a7f8c"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="clearing-house:";n.l=function(o,i,a,r){if(e[o])e[o].push(i);else{var s,l;if(void 0!==a)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=o),e[o]=[i];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(m);var i=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/ClearingHouse/"}(),function(){var e=function(e,t,n,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(a){if(i.onerror=i.onload=null,"load"===a.type)n();else{var r=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=r,l.request=s,i.parentNode.removeChild(i),o(l)}};return i.onerror=i.onload=a,i.href=t,document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var i=n[o],a=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(a===e||a===t))return i}var r=document.getElementsByTagName("style");for(o=0;o<r.length;o++){i=r[o],a=i.getAttribute("data-href");if(a===e||a===t)return i}},o=function(o){return new Promise((function(i,a){var r=n.miniCssF(o),s=n.p+r;if(t(r,s))return i();e(o,s,i,a)}))},i={143:0};n.f.miniCss=function(e,t){var n={28:1,323:1,421:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=o(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)o.push(i[2]);else{var a=new Promise((function(n,o){i=e[t]=[n,o]}));o.push(i[2]=a);var r=n.p+n.u(t),s=new Error,l=function(o){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var a=o&&("load"===o.type?"missing":o.type),r=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",s.name="ChunkLoadError",s.type=a,s.request=r,i[1](s)}};n.l(r,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,a,r=o[0],s=o[1],l=o[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(l)var c=l(n)}for(t&&t(o);u<r.length;u++)a=r[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},o=self["webpackChunkclearing_house"]=self["webpackChunkclearing_house"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(7544)}));o=n.O(o)})();
//# sourceMappingURL=app.019ea529.js.map