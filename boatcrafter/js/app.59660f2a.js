(function(e){function r(r){for(var t,i,l=r[0],c=r[1],s=r[2],p=0,d=[];p<l.length;p++)i=l[p],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&d.push(n[i][0]),n[i]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(e[t]=c[t]);u&&u(r);while(d.length)d.shift()();return a.push.apply(a,s||[]),o()}function o(){for(var e,r=0;r<a.length;r++){for(var o=a[r],t=!0,l=1;l<o.length;l++){var c=o[l];0!==n[c]&&(t=!1)}t&&(a.splice(r--,1),e=i(i.s=o[0]))}return e}var t={},n={app:0},a=[];function i(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,r,o){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,r){if(1&r&&(e=i(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)i.d(o,t,function(r){return e[r]}.bind(null,t));return o},i.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=r,l=l.slice();for(var s=0;s<l.length;s++)r(l[s]);var u=c;a.push([0,"chunk-vendors"]),o()})({0:function(e,r,o){e.exports=o("56d7")},"56d7":function(e,r,o){"use strict";o.r(r);o("e260"),o("e6cf"),o("cca6"),o("a79d");var t,n=o("2b0e"),a=function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("div",{attrs:{id:"app"}},[o("ModelViewer",{attrs:{initialFloorType:"keel",initialSideBand:!0,polymerProtection:!1}})],1)},i=[],l=function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("div",{staticClass:"wrapper"},[o("div",{staticClass:"sidebar"},[e._m(0),o("input",{directives:[{name:"model",rawName:"v-model",value:e.floor_type,expression:"floor_type"}],attrs:{name:"floor_type",type:"radio",value:"keel"},domProps:{checked:e._q(e.floor_type,"keel")},on:{change:[function(r){e.floor_type="keel"},e.changeFloor]}}),e._v(" Килевое "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.floor_type,expression:"floor_type"}],attrs:{name:"floor_type",type:"radio",value:"flat"},domProps:{checked:e._q(e.floor_type,"flat")},on:{change:[function(r){e.floor_type="flat"},e.changeFloor]}}),e._v(" Плоское "),e._m(1),o("input",{directives:[{name:"model",rawName:"v-model",value:e.side_band,expression:"side_band"}],attrs:{name:"side_band",type:"checkbox",value:"true"},domProps:{checked:Array.isArray(e.side_band)?e._i(e.side_band,"true")>-1:e.side_band},on:{change:[function(r){var o=e.side_band,t=r.target,n=!!t.checked;if(Array.isArray(o)){var a="true",i=e._i(o,a);t.checked?i<0&&(e.side_band=o.concat([a])):i>-1&&(e.side_band=o.slice(0,i).concat(o.slice(i+1)))}else e.side_band=n},e.setSideBand]}}),e._m(2),o("input",{directives:[{name:"model",rawName:"v-model",value:e.polymer_protect,expression:"polymer_protect"}],attrs:{name:"polymer_protect",type:"checkbox"},domProps:{checked:Array.isArray(e.polymer_protect)?e._i(e.polymer_protect,null)>-1:e.polymer_protect},on:{change:[function(r){var o=e.polymer_protect,t=r.target,n=!!t.checked;if(Array.isArray(o)){var a=null,i=e._i(o,a);t.checked?i<0&&(e.polymer_protect=o.concat([a])):i>-1&&(e.polymer_protect=o.slice(0,i).concat(o.slice(i+1)))}else e.polymer_protect=n},e.setPolymerProtection]}}),e._m(3),o("input",{directives:[{name:"model",rawName:"v-model",value:e.main_color,expression:"main_color"}],attrs:{type:"color"},domProps:{value:e.main_color},on:{input:[function(r){r.target.composing||(e.main_color=r.target.value)},function(r){return e.setMainColor(r)}]}}),e._m(4),o("input",{directives:[{name:"model",rawName:"v-model",value:e.floor_color,expression:"floor_color"}],attrs:{type:"color"},domProps:{value:e.floor_color},on:{input:[function(r){r.target.composing||(e.floor_color=r.target.value)},function(r){return e.setFloorColor(r)}]}}),e._m(5),o("input",{directives:[{name:"model",rawName:"v-model",value:e.nose_color,expression:"nose_color"}],attrs:{type:"color"},domProps:{value:e.nose_color},on:{input:[function(r){r.target.composing||(e.nose_color=r.target.value)},function(r){return e.setNoseColor(r)}]}}),e._m(6),o("input",{directives:[{name:"model",rawName:"v-model",value:e.cone_color,expression:"cone_color"}],attrs:{type:"color"},domProps:{value:e.cone_color},on:{input:[function(r){r.target.composing||(e.cone_color=r.target.value)},function(r){return e.setConeColor(r)}]}})]),o("canvas",{attrs:{id:"renderCanvas"}})])},c=[function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Тип дна")])])},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Боковая полоса")])])},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Полимерная защита дна")])])},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Цвет баллонов")])])},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Цвет дна")])])},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Цвет носовой части")])])},function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("p",[o("b",[e._v("Цвет концевиков баллонов")])])}],s=(o("7db0"),o("d81d"),o("b0c0"),o("ac1f"),o("466d"),o("a942")),u=o("191e"),p=o("b555"),d=o("55f2"),m=o("4aa2"),f=o("9450"),_=o("26b7"),v=(o("752c"),function(e){return t.meshes.find((function(r){return r.name===e}))});function y(e,r){e.isVisible=r;var o=e.getChildMeshes();if(o.length)for(var t=0;t<o.length;t++)o[t].isVisible=r}window.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("renderCanvas"),r=new s["a"](e,!0),o=function(){var o=new p["a"](r);o.clearColor=new u["a"](1,1,1);var t=new d["a"]("Camera",0,.8,6,u["b"].Zero(),o);return t.attachControl(e,!0),t.lowerRadiusLimit=3,t.upperRadiusLimit=6,t.panningSensibility=0,new m["a"]("light1",new u["b"](0,1,0),o),new f["a"]("DirectionalLight",new u["b"](0,1,0),o),_["a"].ImportMesh(["цилиндр","дно_плоское","дно_киль"],"./models/","лодка_сборка1.glb",o,(function(){var e=v("дно_плоское");y(e,!1);var r=v("полимерная_защита");y(r,!1)})),o};t=o(),console.log(t),r.runRenderLoop((function(){t.render()})),window.addEventListener("resize",(function(){r.resize()}))}));var h={name:"ModelViewer",props:{initialFloorType:String,initialSideBand:Boolean,polymerProtection:Boolean},methods:{changeFloor:function(){var e=v("дно_плоское"),r=v("дно_киль");y(e,!1),y(r,!1);var o="flat"==this.floor_type?e:r;y(o,!0)},setSideBand:function(){var e=v("боковая_полоса");y(e,this.side_band)},setMainColor:function(e){var r=e.target,o=v("цилиндр"),t=r.value.match(/[A-Za-z0-9]{2}/g);t=t.map((function(e){return parseInt(e,16)})),o.material.albedoColor=new u["a"](t[0]/255,t[1]/255,t[2]/255),o.material.specularColor=new u["a"](t[0]/255,t[1]/255,t[2]/255)},setNoseColor:function(e){var r=e.target,o=v("нос"),t=r.value.match(/[A-Za-z0-9]{2}/g);t=t.map((function(e){return parseInt(e,16)})),o.material.albedoColor=new u["a"](t[0]/255,t[1]/255,t[2]/255),o.material.specularColor=new u["a"](t[0]/255,t[1]/255,t[2]/255)},setPolymerProtection:function(){var e=v("полимерная_защита");y(e,this.polymer_protect);var r=v("дно_плоское"),o=v("дно_киль"),n=this.polymer_protect?e.material:t.materials.find((function(e){return"ПВХ_Дно"===e.name}));r.material=o.material=n},setConeColor:function(e){var r=e.target,o=v("концевики_баллонов"),t=r.value.match(/[A-Za-z0-9]{2}/g);t=t.map((function(e){return parseInt(e,16)})),o.material.albedoColor=new u["a"](t[0]/255,t[1]/255,t[2]/255),o.material.specularColor=new u["a"](t[0]/255,t[1]/255,t[2]/255)},setFloorColor:function(e){var r=e.target,o=r.value.match(/[A-Za-z0-9]{2}/g);o=o.map((function(e){return parseInt(e,16)}));var n=t.materials.find((function(e){return"ПВХ_Дно"===e.name}));n.albedoColor=new u["a"](o[0]/255,o[1]/255,o[2]/255),n.specularColor=new u["a"](o[0]/255,o[1]/255,o[2]/255)}},data:function(){return{floor_type:this.initialFloorType,side_band:this.initialSideBand,polymer_protect:this.polymerProtection,main_color:"#FFFFFF",nose_color:"#141414",rope_color:"",cone_color:"#141414",floor_color:"#141414"}}},b=h,g=(o("954b"),o("2877")),w=Object(g["a"])(b,l,c,!1,null,"41ff4758",null),C=w.exports,P={name:"App",components:{ModelViewer:C}},x=P,k=Object(g["a"])(x,a,i,!1,null,null,null),F=k.exports;n["a"].config.productionTip=!1;var O=new n["a"];console.log(O),new n["a"]({render:function(e){return e(F)}}).$mount("#app")},"954b":function(e,r,o){"use strict";var t=o("f80b"),n=o.n(t);n.a},f80b:function(e,r,o){}});
//# sourceMappingURL=app.59660f2a.js.map