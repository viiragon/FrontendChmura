webpackJsonp([1],{0:function(t,e){},FndA:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),i=a("8+8L"),s=a("MMSg"),o=a.n(s),r=(a("doPI"),a("e0XP"),a("kwpM")),l=a.n(r),c=a("Dd8w"),d=a.n(c),u=a("NYxO"),p=a("bOdI"),v=a.n(p),h=a("//Fk"),m=a.n(h),f=(a("+6Bu"),a("mtWM")),_=a.n(f),g={headers:{"Access-Control-Allow-Origin":"*",Accept:"application/json","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE"},auth:{username:"user",password:"1234"}};var b,w,y=function(t){return _.a.get("http://104.41.220.226:8080/api/"+t,g).then(function(t){return t.data})},C=function(t,e,a){return _.a.delete("http://104.41.220.226:8080/api/"+t,g).then(function(t){return t.data})},k={token:localStorage.getItem("user-token")||"",status:"",hasLoadedOnce:!1};var M=(b={},v()(b,"AUTH_REQUEST",function(t,e){var a=t.commit;t.dispatch;return new m.a(function(t,n){a("AUTH_REQUEST");var i,s=(i=e.username+":"+e.password,btoa(encodeURIComponent(i).replace(/%([0-9A-F]{2})/g,function(t,e){return String.fromCharCode("0x"+e)})));console.log(s),_.a.defaults.headers.common.Authorization="Basic YWRtaW46MTIzNA==",localStorage.setItem("user-token","YWRtaW46MTIzNA=="),a("AUTH_SUCCESS","YWRtaW46MTIzNA=="),t("YWRtaW46MTIzNA==")})}),v()(b,"AUTH_LOGOUT",function(t){var e=t.commit;t.dispatch;return new m.a(function(t,a){e("AUTH_LOGOUT"),localStorage.removeItem("user-token"),t()})}),b),D=(w={},v()(w,"AUTH_REQUEST",function(t){t.status="loading"}),v()(w,"AUTH_SUCCESS",function(t,e){t.status="success",t.token=e,t.hasLoadedOnce=!0}),v()(w,"AUTH_ERROR",function(t){t.status="error",t.hasLoadedOnce=!0}),v()(w,"AUTH_LOGOUT",function(t){t.token=""}),w),E={state:k,getters:{isAuthenticated:function(t){return!!t.token},authStatus:function(t){return t.status}},actions:M,mutations:D},T={name:"Navbar",methods:{logout:function(){var t=this;this.$store.dispatch("AUTH_LOGOUT").then(function(){return t.$router.push("/login")})}},computed:d()({},Object(u.b)(["getProfile","isAuthenticated","isProfileLoaded"]),Object(u.c)({authLoading:function(t){return"loading"===t.auth.status},name:function(t){return""+t.user.profile.name}}))},A={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar is-info"},[a("div",{staticClass:"navbar-menu container",attrs:{id:"navbarExampleTransparentExample"}},[t.isAuthenticated?a("div",{staticClass:"navbar-start"},[a("a",{staticClass:"navbar-item",attrs:{href:"/#/"}},[t._v("\n        Start\n      ")]),t._v(" "),a("a",{staticClass:"navbar-item",attrs:{href:"/#/trips"}},[t._v("\n        Trips\n      ")]),t._v(" "),a("a",{staticClass:"navbar-item",attrs:{href:"/#/map"}},[t._v("\n        Map\n      ")]),t._v(" "),a("a",{staticClass:"navbar-item",on:{click:t.logout}},[t._v("\n        Logout\n      ")])]):t._e(),t._v(" "),t._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"navbar-end"},[e("a",{staticClass:"navbar-item",attrs:{href:"https://chmuryweb2018.azurewebsites.net/#/map"}},[this._v("\n        Nasza produkcja\n      ")]),this._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"https://buefy.github.io/#/"}},[this._v("\n        Buefy\n      ")]),this._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"https://bulma.io/"}},[this._v("\n        Bulma\n      ")]),this._v(" "),e("a",{staticClass:"navbar-item",attrs:{href:"https://vuejs.org/v2/api/"}},[this._v("\n        Vue\n      ")])])}]};var x={name:"App",components:{"app-navbar":a("VU/8")(T,A,!1,function(t){a("kP9Y")},null,null).exports}},S={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("app-navbar"),this._v(" "),e("router-view",{staticClass:"container"})],1)},staticRenderFns:[]};var P=a("VU/8")(x,S,!1,function(t){a("pM4C")},null,null).exports,W=a("/ocq");n.a.use(u.a);var U=new u.a.Store({modules:{auth:E}}),F={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var L=a("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},F,!1,function(t){a("Ugm9")},"data-v-694cd902",null).exports,O={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section hello"},[e("h1",{staticClass:"title is-1 has-text-info"},[this._v("Hello!")]),this._v(" "),e("h2",{staticClass:"subtitle is-3 has-text-info"},[this._v("\n\t\tWelcome in your Trip App!\n\t\t"),e("br"),this._v("\n\t\tSee your trips clicking the button below.\n\t")]),this._v(" "),e("a",{staticClass:"button is-medium is-inverted is-focused is-info",attrs:{href:"/#/trips"}},[this._v("\n\t\tTrips list\n\t")])])}]};var R=a("VU/8")({name:"StartView"},O,!1,function(t){a("FndA")},null,null).exports,I=[],j={name:"TripListView",data:function(){return{trips:I}},methods:{rowClickedHandler:function(t){window.location="/#/trip/"+t.tripId}},mounted:function(){var t=this;y("trips").then(function(e){t.trips=e.content}).catch(function(t){console.log("error: "+t)})}},V={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section trips"},[a("h1",{staticClass:"title"},[t._v("Trips")]),t._v(" "),a("b-table",{attrs:{data:t.trips,focusable:""},on:{dblclick:t.rowClickedHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-table-column",{attrs:{field:"tripId",visible:!1}},[t._v("\n\t\t\t\t"+t._s(e.row.tripId)+"\n\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"name",label:"Name",width:"200",centered:""}},[t._v("\n\t\t\t\t"+t._s(e.row.name)+"\n\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"start",label:"Start",width:"250",centered:""}},[t._v("\n\t\t\t\t"+t._s(new Date(e.row.start).toLocaleDateString())+"\n\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"end",label:"End",width:"250",centered:""}},[t._v("\n\t\t\t\t"+t._s(new Date(e.row.end).toLocaleDateString())+"\n\t\t\t")])]}}])}),t._v(" "),a("br"),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"new-trip-div"}},[e("a",{staticClass:"button is-inverted is-focused",attrs:{href:"/#/trip/0"}},[this._v("\n\t\tCreate new trip\n\t\t")])])}]};var G,z=a("VU/8")(j,V,!1,function(t){a("gh7u")},"data-v-7bb12cee",null).exports,$=(G={name:"MapModal",props:["isCardModalActive",""],methods:{open:function(){this.isCardModalActive=!0},close:function(){this.isCardModalActive=!1},deleteDropFile:function(t){this.dropFiles.splice(t,1)},deleteWaypoint:function(){this.isEdit=!1,console.log("ddd"),console.log(this.waypoint.get("id")),C()}}},v()(G,"props",["waypoint"]),v()(G,"data",function(){return{dropFiles:[],otherPoints:[{name:"Punkt Początkowy",id:44}],isEdit:!1,isImageModalActive:!1,imageUrls:["https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-12/Jacarandas%20in%20Spring%20bloom%2C%20Royal%20Botanic%20Garden%2C%20Sydney.jpg?itok=zpohBz_j","https://www.adventure24.pl/upload/products/australia-objazd--gora-kosciuszki-1354716105.jpg"],title:"Punkt w Australii",description:"Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl."}}),G),H={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("\r\n"+t._s(t.isCardModalActive)+"\r\n\t"),a("form",{attrs:{action:""}},[a("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[a("header",{staticClass:"modal-card-head"},[0==t.isEdit?a("p",{staticClass:"modal-card-title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),1==t.isEdit?a("b-input",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}):t._e()],1),t._v(" "),a("section",{staticClass:"modal-card-body"},[1==t.isEdit?a("div",{staticClass:"content"},[a("h3",[t._v("Wstaw ten punkt przed\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t")]),t._v(" "),a("b-field",[a("b-select",{attrs:{placeholder:"Nazwa punktu"}},t._l(t.otherPoints,function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v("\r\n\t\t\t\t\t\t\t\t\t"+t._s(e.name)+"\r\n\t\t\t\t\t\t\t\t")])}))],1)],1):t._e(),t._v(" "),1==t.isEdit?a("div",{staticClass:"content"},[a("h3",[t._v("Edytuj zdjęcia")])]):t._e(),t._v(" "),a("div",{staticClass:"columns",staticStyle:{}},[t._l(t.imageUrls,function(e){return a("div",{key:e,staticClass:"column",on:{click:function(e){t.isImageModalActive=!0}}},[a("div",{style:{"background-image":"url("+e+")",height:"150px","background-position":"center","background-size":"cover"}}),t._v(" "),a("b-modal",{attrs:{active:t.isImageModalActive},on:{"update:active":function(e){t.isImageModalActive=e}}},[a("p",{staticClass:"image is-4by3"},[a("img",{attrs:{src:e}})])])],1)}),t._v(" "),1==t.isEdit?a("div",{staticClass:"column"},[a("b-upload",{attrs:{multiple:"","drag-drop":""},model:{value:t.dropFiles,callback:function(e){t.dropFiles=e},expression:"dropFiles"}},[a("section",{staticClass:"section"},[a("div",{staticClass:"content has-text-centered"},[a("p",[t._v("Drop your files here or click to upload")])])])])],1):t._e()],2),t._v(" "),1==t.isEdit?a("div",{staticClass:"content"},[a("div",{staticClass:"tags"},t._l(t.dropFiles,function(e,n){return a("span",{key:n,staticClass:"tag is-info"},[t._v("\r\n\t\t\t\t\t\t\t"+t._s(e.name)+"\r\n\t\t\t\t\t\t\t"),a("button",{staticClass:"delete is-small",attrs:{type:"button"},on:{click:function(e){t.deleteDropFile(n)}}})])}))]):t._e(),t._v(" "),a("div",{staticClass:"content"},[a("h2",[t._v("Opis")]),t._v(" "),0==t.isEdit?a("p",[t._v(t._s(t.description))]):t._e(),t._v(" "),1==t.isEdit?a("b-field",[a("b-input",{staticClass:"is-info",attrs:{type:"textarea",maxlength:"5000",placeholder:"Maxlength automatically counts characters"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1):t._e()],1)]),t._v(" "),a("footer",{staticClass:"modal-card-foot"},[a("button",{staticClass:"button",attrs:{type:"button"},on:{click:function(e){t.$parent.close()}}},[t._v("Zamknij")]),t._v(" "),1==t.isEdit?a("button",{staticClass:"button is-danger",on:{click:function(e){t.deleteWaypoint()}}},[t._v("Usuń")]):t._e(),t._v(" "),0==t.isEdit?a("button",{staticClass:"button is-info",on:{click:function(e){t.isEdit=!0}}},[t._v("Edytuj")]):t._e(),t._v(" "),1==t.isEdit?a("button",{staticClass:"button is-info",on:{click:function(e){t.isEdit=!1}}},[t._v("Zapisz")]):t._e()])])])])},staticRenderFns:[]},N={name:"MapView",components:{"map-modal":a("VU/8")($,H,!1,null,null,null).exports},props:["tripId","waypoints"],data:function(){return{isCardModalActive:!1,flightPlanCoordinates:[],map:null,clickedWaypoint:null}},created:function(){this.createGoogleMap()},beforeMount:function(){},watch:{map:function(t){t.addListener("click",this.onMapClickEvent),this.waypoints&&this.addWaypointsToMap(this.waypoints,t)},waypoints:function(t){this.map&&this.addWaypointsToMap(t,this.map)},tripId:function(t){console.log("ripId",t)}},methods:{onMapClickEvent:function(t){this.addWaypoint(t)},addWaypointsToMap:function(t,e){var a=this;t.forEach(function(t){a.placeMarkerOnMap(new google.maps.LatLng({lat:t.latitude,lng:t.longitude}),t.id,e)})},addWaypoint:function(t){this.$emit("point-added",{id:1e5*Math.random(),lng:location.lng(),lat:location.lat(),date:new Date}),this.placeMarkerOnMap(t.latLng,this.map)},removeWaypoint:function(t){console.log(t),C("trips/"+this.tripId+"/waypoints/"+t)},activateModal:function(t){console.log(this.isCardModalActive),console.log(t.get("id")),this.clickedWaypoint=t,this.isCardModalActive=!0},placeMarkerOnMap:function(t,e,a){var n=this,i=new google.maps.Marker({position:t,map:a});return this.flightPlanCoordinates.push(t),new google.maps.Polyline({path:this.flightPlanCoordinates,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2}).setMap(a),google.maps.event.addListener(i,"click",function(){n.removeWaypoint(e)}),i.set("id",e),console.log("click",t,e),i},createGoogleMap:function(){var t=this;window.initMap=function(){t.map=new google.maps.Map(document.getElementById("map"),{zoom:4,center:{lat:-25.363,lng:131.044}})};var e=document.createElement("script");e.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyDCVCc8UDPw3icWW8kDc89JPqmwsS9FqWQ&callback=initMap"),e.setAttribute("type","text/javascript"),document.body.appendChild(e)}}},Y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("h1",{staticClass:"title"},[t._v("Mapa")]),t._v(" "),a("div",{attrs:{id:"map"}}),t._v(" "),a("b-modal",{attrs:{active:t.isCardModalActive,width:640,scroll:"keep"},on:{"update:active":function(e){t.isCardModalActive=e}}},[a("map-modal",{attrs:{isCardModalActive:t.isCardModalActive,waypoint:t.clickedWaypoint,"has-modal-card":""},on:{"update:isCardModalActive":function(e){t.isCardModalActive=e}}})],1)],1)},staticRenderFns:[]};var B=a("VU/8")(N,Y,!1,function(t){a("yuue")},null,null).exports,X=a("hiCB"),Q=a.n(X),q=0,J={createWaypoint:function(t,e,a){return{id:q++,latitude:t,longitude:e,date:a,photo:null,video:null}},createTrip:function(t,e,a,n,i,s){return{name:t,description:e,start:a,end:n,waypoints:i,tripId:s}},getTrip:function(t){var e=this;return y("trips/"+t).then(function(t){for(var a=[],n=0;n<t.waypoints.length;n++){var i=e.createWaypoint(t.waypoints[n].latitude,t.waypoints[n].longitude,new Date(t.waypoints[n].date));i.id=t.waypoints[n].waypointId,a.push(i)}return e.createTrip(t.name,t.description,new Date(t.start),new Date(t.end),a,t.tripId)}).catch(function(t){console.log(t),K.getMock().then(function(t){return t})})}};function Z(t,e){for(var a=0;a<t.length;a++)if(t[a].nodeName==e)return t[a];return null}var K={readGPSFile:function(t){var e=this;return new m.a(function(a,n){try{var i=new FileReader;i.onload=function(t){e.readGPSText(t.target.result).then(function(t){return a(t)})},i.readAsText(t),console.log("Loading file: "+t.name)}catch(t){var s="ERROR! The file cannot be read!";console.error(s),n(s)}})},readGPSText:function(t){return new m.a(function(e,a){try{var n;if(window.DOMParser)n=(new DOMParser).parseFromString(t,"text/xml");else(n=new ActiveXObject("Microsoft.XMLDOM")).async=!1,n.loadXML(t);for(var i,s=n.getElementsByTagName("gpx")[0],o=Z(s.children,"metadata"),r=Z(o.children,"name").innerHTML,l=Z(o.children,"desc").innerHTML,c=[],d=function(t,e){for(var a=[],n=0;n<t.length;n++)t[n].nodeName==e&&a.push(t[n]);return a}(Z(Z(s.children,"trk").children,"trkseg").children,"trkpt"),u=Q.a,p=0,v=0;v<d.length;v++){i=d[v];var h=new Date(Z(i.children,"time").innerHTML);c.push(J.createWaypoint(parseFloat(i.attributes.lat.nodeValue),parseFloat(i.attributes.lon.nodeValue),h)),h.getTime()<u&&(u=h.getTime()),h.getTime()>p&&(p=h.getTime())}var m=J.createTrip(r,l,new Date(u),new Date(p),c);console.log('Trip "'+r+'" loaded!'),e(m)}catch(t){console.error(t),a(t)}})},saveGPSFile:function(t){return new m.a(function(e,a){try{var n,i="<gpx>\n";i+="\t<metadata>\n",i+="\t\t<name>"+t.trip.name+"</name>\n",i+="\t\t<desc>"+t.trip.description+"</desc>\n",i+="\t</metadata>\n",i+="\t<trk>\n",i+="\t\t<trkseg>\n";for(var s=0;s<t.trip.waypoints.length;s++)i+='\t\t\t<trkpt lat="'+(n=t.trip.waypoints[s]).latitude+'" lon="'+n.longitude+'">\n',i+="\t\t\t\t<ele>0.0</ele>\n",i+="\t\t\t\t<time>"+n.date+"</time>\n",i+="\t\t\t</trkpt>\n";i+="\t\t</trkseg>\n",i+="\t</trk>\n",i+="</gpx>\n",console.log(i);var o=document.getElementById("download");console.log(o);var r=new Blob([i],{type:"text/plain"});o.href=window.URL.createObjectURL(r);var l=t.trip.name.replace(/ /g,"_").replace(/[^\w\s]/gi,"");o.download=l+".gpx",o.click(),o.href="",console.log("Saved file: "+l+".gps"),e("Saved "+l)}catch(t){console.error("ERROR! Cannot save file!"),console.error(t),a(t)}})},getMock:function(){return this.readGPSText('<gpx>\n                <metadata>\n                    <name>Wycieczka w Warszawie</name>\n                    <desc>Widzieliśmy nawet pałac kultury</desc>\n                </metadata>\n                <trk>\n                    <trkseg>\n                        <trkpt lat="-25.363" lon="131.044">\n                            <ele>0.0</ele>\n                            <time>Tue Jun 05 2018 18:04:57 GMT+0200</time>\n                        </trkpt>\n                    </trkseg>\n                </trk>\n            </gpx>')}},tt=function(t){return t.getDate()+"."+(t.getMonth()+1)+"."+(t.getYear()+1900)},et={name:"TripList",components:{"map-component":B},data:function(){return{siteData:{trip:{},loaded:!0,tmp:{}},selected:1,files:[],photos:[],defaultOpenedDetails:[],columns:[{field:"latitude",label:"Latitude",width:"40",numeric:!0},{field:"longitude",label:"Longitude",width:"40",numeric:!0},{field:"date",label:"Date",centered:!0,dateInputFormat:'"YYYY-MM-DDThh:mm:ss"',dateOutputFormat:"MMM Do YY "},{field:"",label:"Option",centered:!0,formatter:tt}]}},beforeMount:function(){var t=this;this.siteData.trip=J.createTrip("","",null,null,[],null),J.getTrip(this.$route.params.id).then(function(e){return t.siteData.trip=e})},watch:{files:function(t,e){this.readGPSFile(this.files[0])}},methods:{readGPSFile:function(t){var e=this;K.readGPSFile(t).then(function(t){return e.siteData.trip=t})},saveGPSFile:function(){K.saveGPSFile(this.siteData)},addWaypoint:function(t){console.log(t),this.siteData.trip.waypoints.push(J.createWaypoint(t.lat,t.lng,t.date))},deleteWaypoint:function(t){console.log(this.siteData.trip.waypoints);for(var e=0;e<this.siteData.trip.waypoints.length;e++)t==this.siteData.trip.waypoints[e].id&&(this.siteData.trip.waypoints.splice(e,1),console.log("Waypoint id."+t+" removed"))},save:function(){console.log("Let's pretend it works OwO")},addPhoto:function(t,e){console.log("test");for(var a=0;a<this.siteData.trip.waypoints.length;a++)t==this.siteData.trip.waypoints[a].id&&(this.siteData.trip.waypoints[a].photo=e,console.log("Photo added"))},removePhoto:function(t){for(var e=0;e<this.siteData.trip.waypoints.length;e++)t==this.siteData.trip.waypoints[e].id&&(this.siteData.trip.waypoints[e].photo=null,console.log("Photo removed"))},addVideo:function(t,e){for(var a=0;a<this.siteData.trip.waypoints.length;a++)t==t==this.siteData.trip.waypoints[a].id&&(this.siteData.trip.waypoints[a].video=e,console.log("Video added"))},removeVideo:function(t){for(var e=0;e<this.siteData.trip.waypoints.length;e++)t==this.siteData.trip.waypoints[e].id&&(this.siteData.trip.waypoints[e].video=null,console.log("Video removed"))}}},at={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("a",{attrs:{id:"download",href:"data",download:"null.txt"}}),t._v(" "),t.siteData.loaded?a("div",[a("section",{staticClass:"hero is-info"},[a("div",{staticClass:"hero-body"},[a("h1",{staticClass:"title"},[t._v("\n\t\t\t\t\tTitle\n\t\t\t\t")]),t._v(" "),a("input",{directives:[{name:"autowidth",rawName:"v-autowidth",value:{maxWidth:"960px",minWidth:"20px",comfortZone:5},expression:"{maxWidth: '960px', minWidth: '20px', comfortZone: 5}"},{name:"model",rawName:"v-model",value:t.siteData.trip.name,expression:"siteData.trip.name"}],domProps:{value:t.siteData.trip.name},on:{input:function(e){e.target.composing||t.$set(t.siteData.trip,"name",e.target.value)}}}),t._v(" "),a("b-field"),t._v(" "),a("h1",{staticClass:"title"},[t._v("\n\t\t\t\t\tDescription\n\t\t\t\t")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.siteData.trip.description,expression:"siteData.trip.description"}],staticClass:"textarea",attrs:{input:""},domProps:{value:t.siteData.trip.description},on:{input:function(e){e.target.composing||t.$set(t.siteData.trip,"description",e.target.value)}}})],1)]),t._v(" "),a("map-component",{attrs:{"trip-id":t.siteData.trip.tripId,waypoints:t.siteData.trip.waypoints},on:{"point-added":t.addWaypoint,"add-photo":function(e){t.add,t.photo},"remove-photo":t.removePhoto,"remove-point":t.deleteWaypoint}}),t._v(" "),a("b-table",{attrs:{data:t.siteData.trip.waypoints,paginated:"","per-page":"5","opened-detailed":t.defaultOpenedDetails,detailed:"","detail-key":"id",focusable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-table-column",{attrs:{field:"latitude",label:"Latitude",sortable:"",centered:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.latitude)+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"longitude",label:"Longitude",sortable:"",centered:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.longitude)+"\n\t\t\t\t")]),t._v(" "),a("b-table-column",{attrs:{field:"date",label:"Date",sortable:"",centered:""}},[t._v("\n\t\t\t\t\t"+t._s(e.row.date)+"\n\t\t\t\t")])]}},{key:"detail",fn:function(e){return[a("article",{staticClass:"media"},[a("figure",{staticClass:"media-left"},[a("p",{staticClass:"image is-128x128"},[a("img",{attrs:{src:"https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-12/Jacarandas%20in%20Spring%20bloom%2C%20Royal%20Botanic%20Garden%2C%20Sydney.jpg?itok=zpohBz_j"}})])]),t._v(" "),a("div",{staticClass:"buttons"},[a("b-upload",{on:{change:function(e){t.addPhoto(t.photos[0])}},model:{value:t.photos,callback:function(e){t.photos=e},expression:"photos"}},[a("a",{staticClass:"button is-success",attrs:{id:"photos"}},[a("b-icon",{attrs:{icon:"upload"}}),t._v(" "),a("span",[t._v("Add Photo")])],1)]),t._v(" "),a("button",{staticClass:"button is-danger",on:{click:t.removePhoto}},[t._v("Remove Photo")]),t._v(" "),a("a",{staticClass:"button is-danger is-outlined",on:{click:function(a){t.deleteWaypoint(e.row.id)}}},[a("span",[t._v("Delete point")]),t._v(" "),a("span",{staticClass:"icon is-small"},[a("b-icon",{attrs:{icon:"close"}})],1)])],1)])]}}])}),t._v(" "),a("input",{staticClass:"button is-link",attrs:{type:"button",value:"Save GPX file"},on:{click:t.saveGPSFile}}),t._v(" "),a("b-upload",{on:{change:function(e){t.readGPSFile(t.files[0])}},model:{value:t.files,callback:function(e){t.files=e},expression:"files"}},[a("a",{staticClass:"button is-link",attrs:{id:"files"}},[a("b-icon",{attrs:{icon:"upload"}}),t._v(" "),a("span",[t._v("Read GPX file")])],1)]),t._v(" "),a("input",{staticClass:"button is-link",attrs:{type:"button",value:"Save data"},on:{click:t.save}})],1):a("div",[t._v("\n\t\tLOADING...\n\t")])])},staticRenderFns:[]};var nt=a("VU/8")(et,at,!1,function(t){a("lQ/h")},"data-v-e2defab8",null).exports,it={name:"LoginView",data:function(){return{username:"",password:""}},methods:{login:function(){var t=this,e=this.username,a=this.password;U.dispatch("AUTH_REQUEST",{username:e,password:a}).then(function(){t.$router.push("/")})}}};console.log(this);var st={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section"},[a("form",{staticClass:"login",on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[a("h1",{staticClass:"title"},[t._v("Trip App")]),t._v(" "),a("h2",{staticClass:"title"},[t._v("Sign in")]),t._v(" "),a("b-field",[a("b-input",{attrs:{required:"",placeholder:"User name"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),t._v(" "),a("b-field",[a("b-input",{attrs:{required:"",placeholder:"Password",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),a("hr"),t._v(" "),a("input",{staticClass:"button is-link",attrs:{type:"submit",value:"Login"}})],1)])},staticRenderFns:[]};var ot=a("VU/8")(it,st,!1,function(t){a("bXe4")},"data-v-e8afd118",null).exports;n.a.use(W.a);var rt=function(t,e,a){U.getters.isAuthenticated?a():a("/login")},lt=new W.a({routes:[{path:"/",name:"StartView",component:R,beforeEnter:rt},{path:"/login",name:"LoginView",component:ot,beforeEnter:function(t,e,a){U.getters.isAuthenticated?a("/"):a()}},{path:"/info",name:"HelloWorld",component:L,beforeEnter:rt},{path:"/trips",name:"TripListView",component:z,beforeEnter:rt},{path:"/map",name:"MapView",component:B,beforeEnter:rt},{path:"/trip/:id",name:"EditTrip",component:nt,beforeEnter:rt}]});n.a.use(i.a),n.a.use(o.a,{defaultIconPack:"fa",defaultContainerElement:"app"}),n.a.use(l.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:lt,store:U,components:{App:P},template:"<App/>"})},Ugm9:function(t,e){},bXe4:function(t,e){},doPI:function(t,e){},e0XP:function(t,e){},gh7u:function(t,e){},kP9Y:function(t,e){},"lQ/h":function(t,e){},pM4C:function(t,e){},yuue:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.0b6f2281b87a2032b49a.js.map