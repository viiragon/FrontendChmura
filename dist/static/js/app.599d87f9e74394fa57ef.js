webpackJsonp([1],{0:function(t,e){},FndA:function(t,e){},ICAE:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),i=a("8+8L"),s=a("MMSg"),o=a.n(s),r=(a("doPI"),a("e0XP"),a("kwpM")),l=a.n(r),c=a("Dd8w"),d=a.n(c),u=a("NYxO"),p=a("bOdI"),v=a.n(p),h=a("//Fk"),f=a.n(h),m=a("mtWM"),g=a.n(m),_="http://104.41.220.226:8080/api/";function w(){return{headers:{"Access-Control-Allow-Origin":"*",Accept:"application/json"},auth:{username:localStorage.getItem("user")||"",password:localStorage.getItem("password")||""}}}var b,y,k=function(t){return g.a.get(_+t,w()).then(function(t){return t.data})},C=function(t){return g.a.delete(_+t,w()).then(function(t){return t.data})},D=function(t,e){return g.a.post(_+t,e,w()).then(function(t){return t.data})},T=function(t,e){return g.a.put(_+t,e,w()).then(function(t){return t.data})},M={logged:localStorage.getItem("logged")||!1,status:"",hasLoadedOnce:!1};var S=(b={},v()(b,"AUTH_REQUEST",function(t,e){var a=t.commit;t.dispatch;return new f.a(function(t,n){a("AUTH_REQUEST"),localStorage.setItem("user",e.username),localStorage.setItem("password",e.password),k("trips").then(function(e){console.log(e),localStorage.setItem("logged",!0),a("AUTH_SUCCESS"),t()}).catch(function(t){localStorage.removeItem("user"),localStorage.removeItem("password"),localStorage.removeItem("logged"),n(t.response.status)})})}),v()(b,"AUTH_LOGOUT",function(t){var e=t.commit;t.dispatch;return new f.a(function(t,a){e("AUTH_LOGOUT"),localStorage.removeItem("user"),localStorage.removeItem("password"),localStorage.removeItem("logged"),t()})}),b),P=(y={},v()(y,"AUTH_REQUEST",function(t){t.status="loading"}),v()(y,"AUTH_SUCCESS",function(t){t.status="success",t.logged=!0,t.hasLoadedOnce=!0}),v()(y,"AUTH_ERROR",function(t){t.status="error",t.logged=!1,t.hasLoadedOnce=!0}),v()(y,"AUTH_LOGOUT",function(t){t.logged=!1}),y),E={state:M,getters:{isAuthenticated:function(t){return t.logged},authStatus:function(t){return t.status}},actions:S,mutations:P},A={name:"Navbar",methods:{logout:function(){var t=this;this.$store.dispatch("AUTH_LOGOUT").then(function(){return t.$router.push("/login")})}},computed:d()({},Object(u.b)(["getProfile","isAuthenticated","isProfileLoaded"]),Object(u.c)({authLoading:function(t){return"loading"===t.auth.status},name:function(t){return""+t.user.profile.name}}))},x={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar is-info"},[a("div",{staticClass:"navbar-menu container",attrs:{id:"navbarExampleTransparentExample"}},[t.isAuthenticated?a("div",{staticClass:"navbar-start"},[a("a",{staticClass:"navbar-item",attrs:{href:"/#/"}},[t._v("\n        Start\n      ")]),t._v(" "),a("a",{staticClass:"navbar-item",attrs:{href:"/#/trips"}},[t._v("\n        Trips\n      ")]),t._v(" "),a("a",{staticClass:"navbar-item",on:{click:t.logout}},[t._v("\n        Logout\n      ")])]):t._e(),t._v(" "),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navbar-end"},[e("a",{staticClass:"navbar-item",attrs:{href:"http://tripfrontend.azurewebsites.net/"}},[this._v("\n        Nasza produkcja\n      ")]),this._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"https://buefy.github.io/#/"}},[this._v("\n        Buefy\n      ")]),this._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"https://bulma.io/"}},[this._v("\n        Bulma\n      ")]),this._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"https://vuejs.org/v2/api/"}},[this._v("\n        Vue\n      ")])])}]};var L={name:"App",components:{"app-navbar":a("VU/8")(A,x,!1,function(t){a("jDdk")},null,null).exports}},I={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("app-navbar"),this._v(" "),e("router-view",{staticClass:"container"})],1)},staticRenderFns:[]};var U=a("VU/8")(L,I,!1,function(t){a("pM4C")},null,null).exports,W=a("/ocq");n.a.use(u.a);var F=new u.a.Store({modules:{auth:E}}),$={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var O=a("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},$,!1,function(t){a("Ugm9")},"data-v-694cd902",null).exports,j={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section hello"},[e("h1",{staticClass:"title is-1 has-text-info"},[this._v("Hello!")]),this._v(" "),e("h2",{staticClass:"subtitle is-3 has-text-info"},[this._v("\n\t\tWelcome in your Trip App!\n\t\t"),e("br"),this._v("\n\t\tSee your trips clicking the button below.\n\t")]),this._v(" "),e("a",{staticClass:"button is-medium is-inverted is-focused is-info",attrs:{href:"/#/trips"}},[this._v("\n\t\tTrips list\n\t")])])}]};var R=a("VU/8")({name:"StartView"},j,!1,function(t){a("FndA")},null,null).exports,V=[],z={name:"TripListView",data:function(){return{trips:V}},methods:{rowClickedHandler:function(t){window.location="/#/trip/"+t.tripId},addTrip:function(){D("trips",{name:""}).then(function(t){window.location="/#/trip/"+t.tripId})}},mounted:function(){var t=this;k("trips").then(function(e){t.trips=e.content}).catch(function(t){console.log("error: "+t)})}},H={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section trips"},[a("h1",{staticClass:"title"},[t._v("Trips")]),t._v(" "),a("b-table",{attrs:{data:t.trips,focusable:""},on:{dblclick:t.rowClickedHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-table-column",{attrs:{field:"tripId",visible:!1}},[t._v("\n\t\t\t\t"+t._s(e.row.tripId)+"\n\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"name",label:"Name",width:"200",centered:""}},[t._v("\n\t\t\t\t"+t._s(e.row.name)+"\n\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"start",label:"Start",width:"250",centered:""}},[t._v("\n\t\t\t\t"+t._s(new Date(e.row.start).toLocaleString())+"\n\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"end",label:"End",width:"250",centered:""}},[t._v("\n\t\t\t\t"+t._s(new Date(e.row.end).toLocaleString())+"\n\t\t\t")])]}}])}),t._v(" "),a("br"),t._v(" "),a("div",{attrs:{id:"new-trip-div"}},[a("a",{staticClass:"button is-inverted is-focused",on:{click:t.addTrip}},[t._v("\n\t\tCreate new trip\n\t\t")])])],1)},staticRenderFns:[]};var G,N=a("VU/8")(z,H,!1,function(t){a("imFV")},"data-v-9a1ef7e4",null).exports,B=(G={name:"MapModal",props:["isCardModalActive",""],methods:{open:function(){this.isCardModalActive=!0},close:function(){this.isCardModalActive=!1},deleteDropFile:function(t){this.dropFiles.splice(t,1)},deleteWaypoint:function(){this.isEdit=!1,this.$emit("remove-waypoint",this.waypoint.get("id")),this.$parent.close()}}},v()(G,"props",["waypoint"]),v()(G,"data",function(){return{dropFiles:[],otherPoints:[{name:"Punkt Początkowy",id:44}],isEdit:!1,isImageModalActive:!1,imageUrls:["https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-12/Jacarandas%20in%20Spring%20bloom%2C%20Royal%20Botanic%20Garden%2C%20Sydney.jpg?itok=zpohBz_j","https://www.adventure24.pl/upload/products/australia-objazd--gora-kosciuszki-1354716105.jpg"],title:"Punkt w Australii",description:"Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl."}}),G),X={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("\r\n"+t._s(t.isCardModalActive)+"\r\n\t"),a("form",{attrs:{action:""}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[0==t.isEdit?a("p",{staticClass:"modal-card-title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),1==t.isEdit?a("b-input",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}):t._e()],1),t._v(" "),a("section",{staticClass:"modal-card-body"},[1==t.isEdit?a("div",{staticClass:"content"},[a("h3",[t._v("Wstaw ten punkt przed\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t")]),t._v(" "),a("b-field",[a("b-select",{attrs:{placeholder:"Nazwa punktu"}},t._l(t.otherPoints,function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v("\r\n\t\t\t\t\t\t\t\t\t"+t._s(e.name)+"\r\n\t\t\t\t\t\t\t\t")])}))],1)],1):t._e(),t._v(" "),1==t.isEdit?a("div",{staticClass:"content"},[a("h3",[t._v("Edytuj zdjęcia")])]):t._e(),t._v(" "),a("div",{staticClass:"columns",staticStyle:{}},[t._l(t.imageUrls,function(e){return a("div",{key:e,staticClass:"column",on:{click:function(e){t.isImageModalActive=!0}}},[a("div",{style:{"background-image":"url("+e+")",height:"150px","background-position":"center","background-size":"cover"}}),t._v(" "),a("b-modal",{attrs:{active:t.isImageModalActive},on:{"update:active":function(e){t.isImageModalActive=e}}},[a("p",{staticClass:"image is-4by3"},[a("img",{attrs:{src:e}})])])],1)}),t._v(" "),1==t.isEdit?a("div",{staticClass:"column"},[a("b-upload",{attrs:{multiple:"","drag-drop":""},model:{value:t.dropFiles,callback:function(e){t.dropFiles=e},expression:"dropFiles"}},[a("section",{staticClass:"section"},[a("div",{staticClass:"content has-text-centered"},[a("p",[t._v("Drop your files here or click to upload")])])])])],1):t._e()],2),t._v(" "),1==t.isEdit?a("div",{staticClass:"content"},[a("div",{staticClass:"tags"},t._l(t.dropFiles,function(e,n){return a("span",{key:n,staticClass:"tag is-info"},[t._v("\r\n\t\t\t\t\t\t\t"+t._s(e.name)+"\r\n\t\t\t\t\t\t\t"),a("button",{staticClass:"delete is-small",attrs:{type:"button"},on:{click:function(e){t.deleteDropFile(n)}}})])}))]):t._e(),t._v(" "),a("div",{staticClass:"content"},[a("h2",[t._v("Opis")]),t._v(" "),0==t.isEdit?a("p",[t._v(t._s(t.description))]):t._e(),t._v(" "),1==t.isEdit?a("b-field",[a("b-input",{staticClass:"is-info",attrs:{type:"textarea",maxlength:"5000",placeholder:"Maxlength automatically counts characters"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1):t._e()],1)]),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.$parent.close()}}},[t._v("Zamknij")]),t._v(" "),1==t.isEdit?a("button",{staticClass:"button is-danger",on:{click:function(e){t.deleteWaypoint()}}},[t._v("Usuń")]):t._e(),t._v(" "),0==t.isEdit?a("button",{staticClass:"button is-info",on:{click:function(e){t.isEdit=!0}}},[t._v("Edytuj")]):t._e(),t._v(" "),1==t.isEdit?a("button",{staticClass:"button is-info",on:{click:function(e){t.isEdit=!1}}},[t._v("Zapisz")]):t._e()])])])])},staticRenderFns:[]},q={name:"MapView",components:{"map-modal":a("VU/8")(B,X,!1,null,null,null).exports},props:["tripId","waypoints"],data:function(){return{isCardModalActive:!1,flightPlanCoordinates:[],map:null,clickedWaypoint:null}},created:function(){this.createGoogleMap()},beforeMount:function(){},watch:{map:function(t){t.addListener("click",this.onMapClickEvent),this.waypoints&&this.addWaypointsToMap(this.waypoints,t)},waypoints:function(t){this.map&&this.addWaypointsToMap(t,this.map)},tripId:function(t){console.log("tripId",t)}},methods:{onMapClickEvent:function(t){this.addWaypoint(t)},addWaypointsToMap:function(t,e){var a=this;t.forEach(function(t){a.placeMarkerOnMap(new google.maps.LatLng({lat:t.latitude,lng:t.longitude}),t.id,e)})},addWaypoint:function(t){this.$emit("point-added",{id:1e5*Math.random(),lng:t.latLng.lng(),lat:t.latLng.lat(),date:new Date}),this.placeMarkerOnMap(t.latLng,this.map)},removeWaypoint:function(t){console.log(t),this.$emit("remove-waypoint",t)},activateModal:function(t){console.log(this.isCardModalActive),console.log(t.get("id")),this.clickedWaypoint=t,this.isCardModalActive=!0},placeMarkerOnMap:function(t,e,a){var n=this,i=new google.maps.Marker({position:t,map:a});return this.flightPlanCoordinates.push(t),new google.maps.Polyline({path:this.flightPlanCoordinates,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2}).setMap(a),google.maps.event.addListener(i,"click",function(){n.activateModal(i)}),i.set("id",e),i},createGoogleMap:function(){var t=this;window.initMap=function(){t.map=new google.maps.Map(document.getElementById("map"),{zoom:4,center:{lat:-25.363,lng:131.044}})};var e=document.createElement("script");e.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyDCVCc8UDPw3icWW8kDc89JPqmwsS9FqWQ&callback=initMap"),e.setAttribute("type","text/javascript"),document.body.appendChild(e)}}},Q={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("h1",{staticClass:"title"},[t._v("Map")]),t._v(" "),a("div",{attrs:{id:"map"}}),t._v(" "),a("b-modal",{attrs:{active:t.isCardModalActive,width:640,scroll:"keep"},on:{"update:active":function(e){t.isCardModalActive=e}}},[a("map-modal",{attrs:{isCardModalActive:t.isCardModalActive,waypoint:t.clickedWaypoint,"has-modal-card":""},on:{"update:isCardModalActive":function(e){t.isCardModalActive=e},"remove-waypoint":t.removeWaypoint}})],1)],1)},staticRenderFns:[]};var J=a("VU/8")(q,Q,!1,function(t){a("ICAE")},null,null).exports,Z=a("hiCB"),Y=a.n(Z),K=0;function tt(t){return t.replace(/[Ą]/g,"A").replace(/[ą]/g,"a").replace(/[Ł]/g,"L").replace(/[ł]/g,"l").replace(/[Ó]/g,"O").replace(/[ó]/g,"o").replace(/[Ś]/g,"S").replace(/[ś]/g,"s").replace(/[Ć]/g,"C").replace(/[ć]/g,"c").replace(/[ŻŹ]/g,"Z").replace(/[żź]/g,"z").replace(/[^\x00-\x7F]/g,"")}var et={getNextId:function(){return K++},createWaypoint:function(t,e,a,n){return{id:t,latitude:e,longitude:a,date:n,photo:null,video:null}},createWaypointFromMap:function(t){return{id:K++,latitude:t.lat,longitude:t.lng,date:t.date,photo:null,video:null}},createTrip:function(t,e,a,n,i,s){return{tripId:t,name:e,description:a,start:n,end:i,waypoints:s}},getTrip:function(t){var e=this;return k("trips/"+t).then(function(t){for(var a=[],n=0;n<t.waypoints.length;n++){var i=e.createWaypoint(t.waypoints[n].waypointId,t.waypoints[n].latitude,t.waypoints[n].longitude,new Date(t.waypoints[n].date));a.push(i)}return e.createTrip(t.tripId,t.name,t.description,new Date(t.start),new Date(t.end),a)}).catch(function(t){console.log(t),nt.getMock().then(function(t){return t})})},postWaypoint:function(t,e){return D("trips/"+t+"/waypoints",{latitude:e.latitude,longitude:e.longitude,date:e.date,photo:e.photo,video:e.video})},deleteWaypoint:function(t,e){return C("trips/"+t+"/waypoints/"+e)},deleteAllWaypoints:function(t,e){var a=this;return new f.a(function(t,n){setTimeout(n,8e3,{response:{status:404}});var i=[],s=e.waypoints.length,o=function(e){if(i.push(e),i.length==s&&e){for(var a=!0,o=0;o<i.length;o++)i[o]||(a=!1);a?t():n({response:{status:400}})}};if(s>0)for(var r=0;r<s;r++)a.deleteWaypoint(e.tripId,e.waypoints[r].id).then(function(t){o(!0)}).catch(function(t){console.log(t),o(404==t.response.status)});else t()})},updatePoint:function(t,e,a){return T("trips/"+t+"/waypoints/"+e,{latitude:a.latitude,longitude:a.longitude,date:a.date,photo:a.photo,video:a.video})},updatePartialTrip:function(t,e){return T("trips/"+t,{name:tt(e.name),description:tt(e.description),start:e.start,end:e.end,waypoints:[]})},updateWholeTrip:function(t,e){var a=this;return new f.a(function(n,i){setTimeout(i,8e3,{response:{status:404}}),a.deleteAllWaypoints(t.tripId,t).then(function(){var s=[],o=e.waypoints.length,r=function(e){if(s.push(e),s.length==o&&e){for(var r=!0,l=0;l<s.length;l++)s[l]||(r=!1);r?n(a.getTrip(t.tripId)):i({response:{status:400}})}};a.updatePartialTrip(t.tripId,e).then(function(n){for(var s=0;s<e.waypoints.length;s++)a.postWaypoint(t.tripId,e.waypoints[s]).then(function(t){r(!0)}).catch(function(t){r(!1),i(t)})}).catch(function(t){i(t)})}).catch(function(t){i(t)})})},deleteTrip:function(t){return C("trips/"+t)}};function at(t,e){for(var a=0;a<t.length;a++)if(t[a].nodeName==e)return t[a];return null}var nt={readGPSFile:function(t){var e=this;return new f.a(function(a,n){try{var i=new FileReader;i.onload=function(t){e.readGPSText(t.target.result).then(function(t){return a(t)}).catch(function(t){return n(t)})},i.readAsText(t),console.log("Loading file: "+t.name)}catch(t){var s="ERROR! The file cannot be read!";console.error(s),n(s)}})},readGPSText:function(t){return new f.a(function(e,a){try{var n;if(window.DOMParser)n=(new DOMParser).parseFromString(t,"text/xml");else(n=new ActiveXObject("Microsoft.XMLDOM")).async=!1,n.loadXML(t);var i,s=n.getElementsByTagName("gpx")[0],o=at(s.children,"metadata"),r="",l="",c=[],d=new Date,u=new Date;null!=o&&(null!=(i=at(o.children,"name"))&&(r=i.innerHTML),null!=(i=at(o.children,"desc"))&&(l=i.innerHTML));var p=at(s.children,"trk");i=at(p.children,"name"),""==r&&null!=i&&(r=i.innerHTML),i=at(p.children,"desc"),""==l&&null!=i&&(l=i.innerHTML);var v=at(p.children,"trkseg");i=at(v.children,"name"),""==r&&null!=i&&(r=i.innerHTML),i=at(v.children,"desc"),""==l&&null!=i&&(l=i.innerHTML);var h=function(t,e){for(var a=[],n=0;n<t.length;n++)t[n].nodeName==e&&a.push(t[n]);return a}(v.children,"trkpt");if(h.length>0){for(var f,m=Y.a,g=0,_=0;_<h.length;_++){if(null!=(i=at((f=h[_]).children,"time")))var w=new Date(at(f.children,"time").innerHTML);else w=new Date;c.push(et.createWaypoint(et.getNextId(),parseFloat(f.attributes.lat.nodeValue),parseFloat(f.attributes.lon.nodeValue),w)),w.getTime()<m&&(m=w.getTime()),w.getTime()>g&&(g=w.getTime())}d=new Date(m),u=new Date(g)}var b=et.createTrip("",r,l,d,u,c);console.log('Trip "'+r+'" loaded!'),e(b)}catch(t){console.error(t),a(t)}})},saveGPSFile:function(t){return new f.a(function(e,a){try{var n,i="<gpx>\n";i+="\t<metadata>\n",i+="\t\t<name>"+t.trip.name+"</name>\n",i+="\t\t<desc>"+t.trip.description+"</desc>\n",i+="\t</metadata>\n",i+="\t<trk>\n",i+="\t\t<trkseg>\n";for(var s=0;s<t.trip.waypoints.length;s++)i+='\t\t\t<trkpt lat="'+(n=t.trip.waypoints[s]).latitude+'" lon="'+n.longitude+'">\n',i+="\t\t\t\t<ele>0.0</ele>\n",i+="\t\t\t\t<time>"+n.date+"</time>\n",i+="\t\t\t</trkpt>\n";i+="\t\t</trkseg>\n",i+="\t</trk>\n",i+="</gpx>\n",console.log(i);var o=document.getElementById("download");console.log(o);var r=new Blob([i],{type:"text/plain"});o.href=window.URL.createObjectURL(r);var l=t.trip.name.replace(/ /g,"_").replace(/[^\w\s]/gi,"");o.download=l+".gpx",o.click(),o.href="",console.log("Saved file: "+l+".gps"),e("Saved "+l)}catch(t){console.error("ERROR! Cannot save file!"),console.error(t),a(t)}})},getMock:function(){return this.readGPSText('<gpx>\n                <metadata>\n                    <name>Wycieczka w Warszawie</name>\n                    <desc>Widzieliśmy nawet pałac kultury</desc>\n                </metadata>\n                <trk>\n                    <trkseg>\n                        <trkpt lat="-25.363" lon="131.044">\n                            <ele>0.0</ele>\n                            <time>Tue Jun 05 2018 18:04:57 GMT+0200</time>\n                        </trkpt>\n                    </trkseg>\n                </trk>\n            </gpx>')}},it={name:"TripList",components:{"map-component":J},data:function(){return{siteData:{trip:{},load:{loaded:!1,loadingMessage:""},timeout:{data:null,points:[]},tmpPointId:null},files:[],photos:[],defaultOpenedDetails:[]}},beforeMount:function(){var t=this,e=this.$route.params.id;console.log(e,"route id"),this.siteData.load.loadingMessage="Loading...",this.siteData.load.loaded=!1,et.getTrip(e).then(function(e){console.log(e),t.siteData.trip=e,t.siteData.load.loaded=!0}).catch(function(e){if(e.response){var a=e.response.status;t.siteData.load.loadingMessage=a>=400&&a<500?"Site cannot load your trip. Please try again":"Unknown error occured. Please try again"}else t.siteData.load.loadingMessage="Unknown error occured. Please try again";console.log(e)})},watch:{files:function(t,e){this.readGPSFile(this.files[0])},photos:function(t,e){console.log(t),this.addPhoto(this.siteData.tmpPointId,this.photos[0])}},methods:{updateAll:function(){var t=this;et.updateWholeTrip(this.siteData.trip,this.siteData.trip).then(function(e){t.$dialog.alert("Trip was saved"),t.siteData.trip=e}).catch(function(t){console.log(t)})},updateData:function(){},updatePointData:function(t){},setTmpPoint:function(t){this.siteData.tmpPointId=t},readGPSFile:function(t){var e=this;this.siteData.load.loadingMessage="Loading...",this.siteData.load.loaded=!1,nt.readGPSFile(t).then(function(t){et.updateWholeTrip(e.siteData.trip,t).then(function(t){e.$toast.open({duration:5e3,message:"Trip was loaded",type:"is-success"}),e.siteData.trip=t,e.siteData.load.loaded=!0}).catch(function(t){console.log(t),e.siteData.load.loaded=!0})}).catch(function(t){e.$toast.open({duration:5e3,message:"Not a proper GPX file",type:"is-danger"}),e.siteData.load.loaded=!0})},saveGPSFile:function(){nt.saveGPSFile(this.siteData)},addWaypoint:function(t){console.log(t),this.siteData.trip.waypoints.push(et.createWaypointFromMap(t))},deleteWaypoint:function(t){console.log(this.siteData.trip.waypoints);for(var e=0;e<this.siteData.trip.waypoints.length;e++)t==this.siteData.trip.waypoints[e].id&&(this.siteData.trip.waypoints.splice(e,1),console.log("Waypoint id."+t+" removed"))},deleteTrip:function(){var t=this;this.$dialog.confirm({message:"Are you sure you want to delete this trip?",onConfirm:function(){et.deleteTrip(t.siteData.trip.tripId).then(function(){t.$router.push("/trips")}).catch(function(e){var a="";if(e.response){var n=e.response.status;a=n>=400&&n<500?"Site has encountered an error. Please try again":"Unknown error occured. Please try again"}else a="Unknown error occured. Please try again";t.$toast.open({duration:5e3,message:a,type:"is-danger"}),console.log(e)})}})},addPhoto:function(t,e){console.log("test");for(var a=0;a<this.siteData.trip.waypoints.length;a++)if(t==this.siteData.trip.waypoints[a].id){this.siteData.trip.waypoints[a].photo=e,console.log("Photo added");break}},removePhoto:function(t){for(var e=0;e<this.siteData.trip.waypoints.length;e++)if(t==this.siteData.trip.waypoints[e].id){this.siteData.trip.waypoints[e].photo=null,console.log("Photo removed");break}},addVideo:function(t,e){for(var a=0;a<this.siteData.trip.waypoints.length;a++)if(t==t==this.siteData.trip.waypoints[a].id){this.siteData.trip.waypoints[a].video=e,console.log("Video added");break}},removeVideo:function(t){for(var e=0;e<this.siteData.trip.waypoints.length;e++)if(t==this.siteData.trip.waypoints[e].id){this.siteData.trip.waypoints[e].video=null,console.log("Video removed");break}}}},st={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("a",{attrs:{id:"download",href:"data",download:"null.txt"}}),t._v(" "),t.siteData.load.loaded?a("div",[a("h1",{staticClass:"title"},[t._v("\n\t\t\t\tTitle\n\t\t\t")]),t._v(" "),a("b-field",[a("b-input",{attrs:{required:"",placeholder:"Name"},on:{input:t.updateData},model:{value:t.siteData.trip.name,callback:function(e){t.$set(t.siteData.trip,"name",e)},expression:"siteData.trip.name"}})],1),t._v(" "),a("h1",{staticClass:"title"},[t._v("\n\t\t\t\tDescription\n\t\t\t")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.siteData.trip.description,expression:"siteData.trip.description"}],staticClass:"textarea",attrs:{input:""},domProps:{value:t.siteData.trip.description},on:{input:[function(e){e.target.composing||t.$set(t.siteData.trip,"description",e.target.value)},t.updateData]}}),t._v(" "),a("b-field"),t._v(" "),a("h1",{staticClass:"title"},[t._v("\n\t\t\t\tStart of trip\n\t\t\t")]),t._v(" "),a("b-collapse",{attrs:{open:!1}},[a("button",{staticClass:"button is-white",attrs:{slot:"trigger",size:"is-small"},slot:"trigger"},[t._v(t._s(new Date(t.siteData.trip.start).toLocaleString())),a("p"),a("b-icon",{attrs:{icon:"pencil",size:"is-small"}})],1),t._v(" "),a("nav",{staticClass:"level"},[a("div",{staticClass:"level-left"},[a("b-datepicker",{attrs:{placeholder:"Select start date","first-day-of-week":1},on:{input:t.updateData},model:{value:t.siteData.trip.start,callback:function(e){t.$set(t.siteData.trip,"start",e)},expression:"siteData.trip.start"}}),t._v(" "),a("b-timepicker",{attrs:{placeholder:"Select start time"},on:{input:t.updateData},model:{value:t.siteData.trip.start,callback:function(e){t.$set(t.siteData.trip,"start",e)},expression:"siteData.trip.start"}})],1)])]),t._v(" "),a("b-field"),t._v(" "),a("h1",{staticClass:"title"},[t._v("\n\t\t\t\tEnd of trip\n\t\t\t")]),t._v(" "),a("b-collapse",{attrs:{open:!1}},[a("button",{staticClass:"button is-white",attrs:{slot:"trigger",size:"is-small"},slot:"trigger"},[t._v(t._s(new Date(t.siteData.trip.end).toLocaleString())),a("p"),a("b-icon",{attrs:{icon:"pencil",size:"is-small"}})],1),t._v(" "),a("nav",{staticClass:"level"},[a("div",{staticClass:"level-left"},[a("b-datepicker",{attrs:{placeholder:"Select end date","min-date":t.siteData.trip.startDate,"first-day-of-week":1},on:{input:t.updateData},model:{value:t.siteData.trip.end,callback:function(e){t.$set(t.siteData.trip,"end",e)},expression:"siteData.trip.end"}}),t._v(" "),a("b-timepicker",{attrs:{placeholder:"Select end time"},on:{input:t.updateData},model:{value:t.siteData.trip.end,callback:function(e){t.$set(t.siteData.trip,"end",e)},expression:"siteData.trip.end"}})],1)])]),t._v(" "),a("map-component",{attrs:{"trip-id":t.siteData.trip.tripId,waypoints:t.siteData.trip.waypoints},on:{"point-added":t.addWaypoint,"add-photo":function(e){t.add,t.photo},"remove-photo":t.removePhoto,"remove-waypoint":t.deleteWaypoint}}),t._v(" "),a("b-table",{attrs:{data:t.siteData.trip.waypoints,paginated:"","per-page":"5","opened-detailed":t.defaultOpenedDetails,detailed:"","detail-key":"id",focusable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-table-column",{attrs:{field:"latitude",label:"Latitude",centered:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.latitude)+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"longitude",label:"Longitude",centered:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.longitude)+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"date",label:"Date",sortable:"",centered:""}},[a("b-collapse",{attrs:{open:!1}},[a("button",{staticClass:"button is-white",attrs:{slot:"trigger",size:"is-small"},slot:"trigger"},[t._v(t._s(new Date(e.row.date).toLocaleString())),a("p"),a("b-icon",{attrs:{icon:"pencil",size:"is-small"}})],1),t._v(" "),a("nav",{staticClass:"level"},[a("div",{staticClass:"level-item"},[a("b-datepicker",{attrs:{placeholder:"Select Date","first-day-of-week":1},on:{input:function(a){t.updatePointData(e.row)}},model:{value:e.row.date,callback:function(a){t.$set(e.row,"date",a)},expression:"props.row.date"}}),t._v(" "),a("b-timepicker",{attrs:{placeholder:"Select Time"},on:{input:function(a){t.updatePointData(e.row)}},model:{value:e.row.date,callback:function(a){t.$set(e.row,"date",a)},expression:"props.row.date"}}),a("p")],1)])])],1)]}},{key:"detail",fn:function(e){return[a("article",{staticClass:"media"},[a("figure",{staticClass:"media-left"},[a("p",{staticClass:"image is-128x128"},[a("img",{attrs:{src:"https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-12/Jacarandas%20in%20Spring%20bloom%2C%20Royal%20Botanic%20Garden%2C%20Sydney.jpg?itok=zpohBz_j"}})])]),t._v(" "),a("div",{staticClass:"buttons"},[a("b-upload",{model:{value:t.photos,callback:function(e){t.photos=e},expression:"photos"}},[a("a",{staticClass:"button is-success",attrs:{id:"photos"},on:{click:function(a){t.setTmpPoint(e.row.id)}}},[a("b-icon",{attrs:{icon:"upload"}}),t._v(" "),a("span",[t._v("Add Photo")])],1)]),t._v(" "),a("button",{staticClass:"button is-danger",on:{click:t.removePhoto}},[t._v("Remove Photo")]),t._v(" "),a("a",{staticClass:"button is-danger is-outlined",on:{click:function(a){t.deleteWaypoint(e.row.id)}}},[a("span",[t._v("Delete point")]),t._v(" "),a("span",{staticClass:"icon is-small"},[a("b-icon",{attrs:{icon:"close"}})],1)])],1)])]}}])}),t._v(" "),a("div",[a("input",{staticClass:"button is-link",attrs:{type:"button",value:"Save GPX file"},on:{click:t.saveGPSFile}}),t._v(" "),a("b-upload",{model:{value:t.files,callback:function(e){t.files=e},expression:"files"}},[a("a",{staticClass:"button is-link",attrs:{id:"files"}},[a("b-icon",{attrs:{icon:"upload"}}),t._v(" "),a("span",[t._v("Read GPX file")])],1)]),t._v(" "),a("input",{staticClass:"button is-link",attrs:{type:"button",value:"Show Poster"},on:{click:function(t){}}}),t._v(" "),a("input",{staticClass:"button is-danger is-pulled-right",attrs:{type:"button",value:"DeleteTrip"},on:{click:t.deleteTrip}}),t._v(" "),a("input",{staticClass:"button is-link is-pulled-right",attrs:{type:"button",value:"Save Trip"},on:{click:t.updateAll}})],1)],1):a("div",[a("h1",{staticClass:"title"},[t._v("\n\t\t\t"+t._s(t.siteData.load.loadingMessage)+"\n\t\t")])])])},staticRenderFns:[]};var ot=a("VU/8")(it,st,!1,function(t){a("NXAV")},"data-v-caa724b8",null).exports,rt={name:"LoginView",data:function(){return{username:"",password:""}},methods:{login:function(){var t=this,e=this.username,a=this.password;F.dispatch("AUTH_REQUEST",{username:e,password:a}).then(function(){t.$router.push("/")}).catch(function(e){var a;a=401==e?"Username or password is incorrect":404==e?"Site cannot connect with the authorisation server. Please try again":"Unknown error occured. Please try again",t.$toast.open({duration:5e3,message:a,type:"is-danger"}),console.log(e)})}}};console.log(this);var lt={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("form",{staticClass:"login",on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[a("h1",{staticClass:"title"},[t._v("Trip App")]),t._v(" "),a("h2",{staticClass:"title"},[t._v("Sign in")]),t._v(" "),a("b-field",[a("b-input",{attrs:{required:"",placeholder:"User name"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),t._v(" "),a("b-field",[a("b-input",{attrs:{required:"",placeholder:"Password",type:"password","password-reveal":""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),a("hr"),t._v(" "),a("input",{staticClass:"button is-link",attrs:{type:"submit",value:"Login"}})],1)])},staticRenderFns:[]};var ct=a("VU/8")(rt,lt,!1,function(t){a("edRL")},"data-v-8e4f7678",null).exports;n.a.use(W.a);var dt=function(t,e,a){F.getters.isAuthenticated?a():a("/login")},ut=new W.a({routes:[{path:"/",name:"StartView",component:R,beforeEnter:dt},{path:"/login",name:"LoginView",component:ct,beforeEnter:function(t,e,a){F.getters.isAuthenticated?a("/"):a()}},{path:"/info",name:"HelloWorld",component:O,beforeEnter:dt},{path:"/trips",name:"TripListView",component:N,beforeEnter:dt},{path:"/map",name:"MapView",component:J,beforeEnter:dt},{path:"/trip/:id",name:"EditTrip",component:ot,beforeEnter:dt}]});n.a.use(i.a),n.a.use(o.a,{defaultIconPack:"fa",defaultContainerElement:"app"}),n.a.use(l.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:ut,store:F,components:{App:U},template:"<App/>"})},NXAV:function(t,e){},Ugm9:function(t,e){},doPI:function(t,e){},e0XP:function(t,e){},edRL:function(t,e){},imFV:function(t,e){},jDdk:function(t,e){},pM4C:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.599d87f9e74394fa57ef.js.map