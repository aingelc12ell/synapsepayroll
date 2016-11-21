window.dhtmlHistory={isIE:false,isOpera:false,isSafari:false,isKonquerer:false,isGecko:false,isSupported:false,create:function(_1){var _2=this;var UA=navigator.userAgent.toLowerCase();var _4=navigator.platform.toLowerCase();var _5=navigator.vendor||"";if(_5==="KDE"){this.isKonqueror=true;this.isSupported=false;}else{if(typeof window.opera!=="undefined"){this.isOpera=true;this.isSupported=true;}else{if(typeof document.all!=="undefined"){this.isIE=true;this.isSupported=true;}else{if(_5.indexOf("Apple Computer, Inc.")>-1){this.isSafari=true;this.isSupported=(_4.indexOf("mac")>-1);}else{if(UA.indexOf("gecko")!=-1){this.isGecko=true;this.isSupported=true;}}}}}window.historyStorage.setup(_1);if(this.isSafari){this.createSafari();}else{if(this.isOpera){this.createOpera();}}var _6=this.getCurrentLocation();this.currentLocation=_6;if(this.isIE){this.createIE(_6);}var _7=function(){_2.firstLoad=null;};this.addEventListener(window,"unload",_7);if(this.isIE){this.ignoreLocationChange=true;}else{if(!historyStorage.hasKey(this.PAGELOADEDSTRING)){this.ignoreLocationChange=true;this.firstLoad=true;historyStorage.put(this.PAGELOADEDSTRING,true);}else{this.ignoreLocationChange=false;this.fireOnNewListener=true;}}var _8=function(){_2.checkLocation();};setInterval(_8,100);},initialize:function(){if(this.isIE){if(!historyStorage.hasKey(this.PAGELOADEDSTRING)){this.fireOnNewListener=false;this.firstLoad=true;historyStorage.put(this.PAGELOADEDSTRING,true);}else{this.fireOnNewListener=true;this.firstLoad=false;}}},addListener:function(_9){this.listener=_9;if(this.fireOnNewListener){this.fireHistoryEvent(this.currentLocation);this.fireOnNewListener=false;}},addEventListener:function(o,e,l){if(o.addEventListener){o.addEventListener(e,l,false);}else{if(o.attachEvent){o.attachEvent("on"+e,function(){l(window.event);});}}},add:function(_d,_e){if(this.isSafari){_d=this.removeHash(_d);historyStorage.put(_d,_e);this.currentLocation=_d;window.location.hash=_d;this.putSafariState(_d);}else{var _f=this;var _10=function(){if(_f.currentWaitTime>0){_f.currentWaitTime=_f.currentWaitTime-_f.waitTime;}_d=_f.removeHash(_d);if(document.getElementById(_d)&&_f.debugMode){var e="Exception: History locations can not have the same value as _any_ IDs that might be in the document,"+" due to a bug in IE; please ask the developer to choose a history location that does not match any HTML"+" IDs in this document. The following ID is already taken and cannot be a location: "+_d;throw new Error(e);}historyStorage.put(_d,_e);_f.ignoreLocationChange=true;_f.ieAtomicLocationChange=true;_f.currentLocation=_d;window.location.hash=_d;if(_f.isIE){_f.iframe.src="blank.htm?"+_d;}_f.ieAtomicLocationChange=false;};window.setTimeout(_10,this.currentWaitTime);this.currentWaitTime=this.currentWaitTime+this.waitTime;}},isFirstLoad:function(){return this.firstLoad;},getVersion:function(){return "0.6";},getCurrentLocation:function(){var r=(this.isSafari?this.getSafariState():this.getCurrentHash());return r;},getCurrentHash:function(){var r=window.location.href;var i=r.indexOf("#");return (i>=0?r.substr(i+1):"");},PAGELOADEDSTRING:"DhtmlHistory_pageLoaded",listener:null,waitTime:200,currentWaitTime:0,currentLocation:null,iframe:null,safariHistoryStartPoint:null,safariStack:null,safariLength:null,ignoreLocationChange:null,fireOnNewListener:null,firstLoad:null,ieAtomicLocationChange:null,createIE:function(_15){this.waitTime=400;var _16=(historyStorage.debugMode?"width: 800px;height:80px;border:1px solid black;":historyStorage.hideStyles);var _17="rshHistoryFrame";var _18="<iframe frameborder=\"0\" id=\""+_17+"\" style=\""+_16+"\" src=\"blank.htm?"+_15+"\"></iframe>";document.write(_18);this.iframe=document.getElementById(_17);},createOpera:function(){this.waitTime=400;var _19="<img src=\"javascript:location.href='javascript:dhtmlHistory.checkLocation();';\" style=\""+historyStorage.hideStyles+"\" />";document.write(_19);},createSafari:function(){var _1a="rshSafariForm";var _1b="rshSafariStack";var _1c="rshSafariLength";var _1d=historyStorage.debugMode?historyStorage.showStyles:historyStorage.hideStyles;var _1e=(historyStorage.debugMode?"width:800px;height:20px;border:1px solid black;margin:0;padding:0;":historyStorage.hideStyles);var _1f="<form id=\""+_1a+"\" style=\""+_1d+"\">"+"<input type=\"text\" style=\""+_1e+"\" id=\""+_1b+"\" value=\"[]\"/>"+"<input type=\"text\" style=\""+_1e+"\" id=\""+_1c+"\" value=\"\"/>"+"</form>";document.write(_1f);this.safariStack=document.getElementById(_1b);this.safariLength=document.getElementById(_1c);if(!historyStorage.hasKey(this.PAGELOADEDSTRING)){this.safariHistoryStartPoint=history.length;this.safariLength.value=this.safariHistoryStartPoint;}else{this.safariHistoryStartPoint=this.safariLength.value;}},getSafariStack:function(){var r=this.safariStack.value;return historyStorage.fromJSON(r);},getSafariState:function(){var _21=this.getSafariStack();var _22=_21[history.length-this.safariHistoryStartPoint-1];return _22;},putSafariState:function(_23){var _24=this.getSafariStack();_24[history.length-this.safariHistoryStartPoint]=_23;this.safariStack.value=historyStorage.toJSON(_24);},fireHistoryEvent:function(_25){var _26=historyStorage.get(_25);this.listener.call(null,_25,_26);},checkLocation:function(){if(!this.isIE&&this.ignoreLocationChange){this.ignoreLocationChange=false;return;}if(!this.isIE&&this.ieAtomicLocationChange){return;}var _27=this.getCurrentLocation();if(_27==this.currentLocation){return;}this.ieAtomicLocationChange=true;if(this.isIE&&this.getIframeHash()!=_27){this.iframe.src="blank.htm?"+_27;}else{if(this.isIE){return;}}this.currentLocation=_27;this.ieAtomicLocationChange=false;this.fireHistoryEvent(_27);},getIframeHash:function(){var doc=this.iframe.contentWindow.document;var _29=String(doc.location.search);if(_29.length==1&&_29.charAt(0)=="?"){_29="";}else{if(_29.length>=2&&_29.charAt(0)=="?"){_29=_29.substring(1);}}return _29;},removeHash:function(_2a){var r;if(_2a===null||_2a===undefined){r=null;}else{if(_2a===""){r="";}else{if(_2a.length==1&&_2a.charAt(0)=="#"){r="";}else{if(_2a.length>1&&_2a.charAt(0)=="#"){r=_2a.substring(1);}else{r=_2a;}}}}return r;},iframeLoaded:function(_2c){if(this.ignoreLocationChange){this.ignoreLocationChange=false;return;}var _2d=String(_2c.search);if(_2d.length==1&&_2d.charAt(0)=="?"){_2d="";}else{if(_2d.length>=2&&_2d.charAt(0)=="?"){_2d=_2d.substring(1);}}window.location.hash=_2d;this.fireHistoryEvent(_2d);}};window.historyStorage={setup:function(_2e){if(typeof _2e!=="undefined"){if(_2e.debugMode){this.debugMode=_2e.debugMode;}if(_2e.toJSON){this.toJSON=_2e.toJSON;}if(_2e.fromJSON){this.fromJSON=_2e.fromJSON;}}var _2f="rshStorageForm";var _30="rshStorageField";var _31=this.debugMode?historyStorage.showStyles:historyStorage.hideStyles;var _32=(historyStorage.debugMode?"width: 800px;height:80px;border:1px solid black;":historyStorage.hideStyles);var _33="<form id=\""+_2f+"\" style=\""+_31+"\">"+"<textarea id=\""+_30+"\" style=\""+_32+"\"></textarea>"+"</form>";document.write(_33);this.storageField=document.getElementById(_30);if(typeof window.opera!=="undefined"){this.storageField.focus();}},put:function(key,_35){this.assertValidKey(key);if(this.hasKey(key)){this.remove(key);}this.storageHash[key]=_35;this.saveHashTable();},get:function(key){this.assertValidKey(key);this.loadHashTable();var _37=this.storageHash[key];if(_37===undefined){_37=null;}return _37;},remove:function(key){this.assertValidKey(key);this.loadHashTable();delete this.storageHash[key];this.saveHashTable();},reset:function(){this.storageField.value="";this.storageHash={};},hasKey:function(key){this.assertValidKey(key);this.loadHashTable();return (typeof this.storageHash[key]!=="undefined");},isValidKey:function(key){return (typeof key==="string");},showStyles:"border:0;margin:0;padding:0;",hideStyles:"left:-1000px;top:-1000px;width:1px;height:1px;border:0;position:absolute;",debugMode:false,storageHash:{},hashLoaded:false,storageField:null,assertValidKey:function(key){var _3c=this.isValidKey(key);if(!_3c&&this.debugMode){throw new Error("Please provide a valid key for window.historyStorage. Invalid key = "+key+".");}},loadHashTable:function(){if(!this.hashLoaded){var _3d=this.storageField.value;if(_3d!==""&&_3d!==null){this.storageHash=this.fromJSON(_3d);this.hashLoaded=true;}}},saveHashTable:function(){this.loadHashTable();var _3e=this.toJSON(this.storageHash);this.storageField.value=_3e;},toJSON:function(o){return o.toJSONString();},fromJSON:function(s){return s.parseJSON();}};