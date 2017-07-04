(function($){function Countdown(){this.regional=[];this.regional['']={labels:['Years','Months','Weeks','Days','Hours','Minutes','Seconds'],labels1:['Year','Month','Week','Day','Hour','Minute','Second'],compactLabels:['y','m','w','d'],whichLabels:null,digits:['0','1','2','3','4','5','6','7','8','9'],timeSeparator:':',isRTL:false};this._defaults={until:null,since:null,timezone:null,serverSync:null,format:'dHMS',layout:'',compact:false,significant:0,description:'',expiryUrl:'',expiryText:'',alwaysExpire:false,onExpiry:null,onTick:null,tickInterval:1};$.extend(this._defaults,this.regional['']);this._serverSyncs=[];var now=(typeof Date.now=='function'?Date.now:function(){return new Date().getTime();});var perfAvail=(window.performance&&typeof window.performance.now=='function');function timerCallBack(timestamp){var drawStart=(timestamp<1e12?(perfAvail?(performance.now()+performance.timing.navigationStart):now()):timestamp||now());if(drawStart-animationStartTime>=1000){plugin._updateTargets();animationStartTime=drawStart;}requestAnimationFrame(timerCallBack);}var requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null;var animationStartTime=0;if(!requestAnimationFrame||$.noRequestAnimationFrame){$.noRequestAnimationFrame=null;setInterval(function(){plugin._updateTargets();},980);}else{animationStartTime=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||now();requestAnimationFrame(timerCallBack);}}var Y=0;var O=1;var W=2;var D=3;var H=4;var M=5;var S=6;$.extend(Countdown.prototype,{markerClassName:'hasCountdown',propertyName:'countdown',_rtlClass:'countdown_rtl',_sectionClass:'countdown_section',_amountClass:'countdown_amount',_rowClass:'countdown_row',_holdingClass:'countdown_holding',_showClass:'countdown_show',_descrClass:'countdown_descr',_timerTargets:[],setDefaults:function(options){this._resetExtraLabels(this._defaults,options);$.extend(this._defaults,options||{});},UTCDate:function(tz,year,month,day,hours,mins,secs,ms){if(typeof year=='object'&&year.constructor==Date){ms=year.getMilliseconds();secs=year.getSeconds();mins=year.getMinutes();hours=year.getHours();day=year.getDate();month=year.getMonth();year=year.getFullYear();}var d=new Date();d.setUTCFullYear(year);d.setUTCDate(1);d.setUTCMonth(month||0);d.setUTCDate(day||1);d.setUTCHours(hours||0);d.setUTCMinutes((mins||0)-(Math.abs(tz)<30?tz*60:tz));d.setUTCSeconds(secs||0);d.setUTCMilliseconds(ms||0);return d;},periodsToSeconds:function(periods){return periods[0]*31557600+periods[1]*2629800+periods[2]*604800+periods[3]*86400+periods[4]*3600+periods[5]*60+periods[6];},_attachPlugin:function(target,options){target=$(target);if(target.hasClass(this.markerClassName)){return;}var inst={options:$.extend({},this._defaults),_periods:[0,0,0,0,0,0,0]};target.addClass(this.markerClassName).data(this.propertyName,inst);this._optionPlugin(target,options);},_addTarget:function(target){if(!this._hasTarget(target)){this._timerTargets.push(target);}},_hasTarget:function(target){return($.inArray(target,this._timerTargets)>-1);},_removeTarget:function(target){this._timerTargets=$.map(this._timerTargets,function(value){return(value==target?null:value);});},_updateTargets:function(){for(var i=this._timerTargets.length-1;i>=0;i--){this._updateCountdown(this._timerTargets[i]);}},_optionPlugin:function(target,options,value){target=$(target);var inst=target.data(this.propertyName);if(!options||(typeof options=='string'&&value==null)){var name=options;options=(inst||{}).options;return(options&&name?options[name]:options);}if(!target.hasClass(this.markerClassName)){return;}options=options||{};if(typeof options=='string'){var name=options;options={};options[name]=value;}if(options.layout){options.layout=options.layout.replace(/&lt;/g,'<').replace(/&gt;/g,'>');}this._resetExtraLabels(inst.options,options);var timezoneChanged=(inst.options.timezone!=options.timezone);$.extend(inst.options,options);this._adjustSettings(target,inst,options.until!=null||options.since!=null||timezoneChanged);var now=new Date();if((inst._since&&inst._since<now)||(inst._until&&inst._until>now)){this._addTarget(target[0]);}this._updateCountdown(target,inst);},_updateCountdown:function(target,inst){var $target=$(target);inst=inst||$target.data(this.propertyName);if(!inst){return;}$target.html(this._generateHTML(inst)).toggleClass(this._rtlClass,inst.options.isRTL);if($.isFunction(inst.options.onTick)){var periods=inst._hold!='lap'?inst._periods:this._calculatePeriods(inst,inst._show,inst.options.significant,new Date());if(inst.options.tickInterval==1||this.periodsToSeconds(periods)%inst.options.tickInterval==0){inst.options.onTick.apply(target,[periods]);}}var expired=inst._hold!='pause'&&(inst._since?inst._now.getTime()<inst._since.getTime():inst._now.getTime()>=inst._until.getTime());if(expired&&!inst._expiring){inst._expiring=true;if(this._hasTarget(target)||inst.options.alwaysExpire){this._removeTarget(target);if($.isFunction(inst.options.onExpiry)){inst.options.onExpiry.apply(target,[]);}if(inst.options.expiryText){var layout=inst.options.layout;inst.options.layout=inst.options.expiryText;this._updateCountdown(target,inst);inst.options.layout=layout;}if(inst.options.expiryUrl){window.location=inst.options.expiryUrl;}}inst._expiring=false;}else if(inst._hold=='pause'){this._removeTarget(target);}$target.data(this.propertyName,inst);},_resetExtraLabels:function(base,options){var changingLabels=false;for(var n in options){if(n!='whichLabels'&&n.match(/[Ll]abels/)){changingLabels=true;break;}}if(changingLabels){for(var n in base){if(n.match(/[Ll]abels[02-9]|compactLabels1/)){base[n]=null;}}}},_adjustSettings:function(target,inst,recalc){var now;var serverOffset=0;var serverEntry=null;for(var i=0;i<this._serverSyncs.length;i++){if(this._serverSyncs[i][0]==inst.options.serverSync){serverEntry=this._serverSyncs[i][1];break;}}if(serverEntry!=null){serverOffset=(inst.options.serverSync?serverEntry:0);now=new Date();}else{var serverResult=($.isFunction(inst.options.serverSync)?inst.options.serverSync.apply(target,[]):null);now=new Date();serverOffset=(serverResult?now.getTime()-serverResult.getTime():0);this._serverSyncs.push([inst.options.serverSync,serverOffset]);}var timezone=inst.options.timezone;timezone=(timezone==null?-now.getTimezoneOffset():timezone);if(recalc||(!recalc&&inst._until==null&&inst._since==null)){inst._since=inst.options.since;if(inst._since!=null){inst._since=this.UTCDate(timezone,this._determineTime(inst._since,null));if(inst._since&&serverOffset){inst._since.setMilliseconds(inst._since.getMilliseconds()+serverOffset);}}inst._until=this.UTCDate(timezone,this._determineTime(inst.options.until,now));if(serverOffset){inst._until.setMilliseconds(inst._until.getMilliseconds()+serverOffset);}}inst._show=this._determineShow(inst);},_destroyPlugin:function(target){target=$(target);if(!target.hasClass(this.markerClassName)){return;}this._removeTarget(target[0]);target.removeClass(this.markerClassName).empty().removeData(this.propertyName);},_pausePlugin:function(target){this._hold(target,'pause');},_lapPlugin:function(target){this._hold(target,'lap');},_resumePlugin:function(target){this._hold(target,null);},_hold:function(target,hold){var inst=$.data(target,this.propertyName);if(inst){if(inst._hold=='pause'&&!hold){inst._periods=inst._savePeriods;var sign=(inst._since?'-':'+');inst[inst._since?'_since':'_until']=this._determineTime(sign+inst._periods[0]+'y'+sign+inst._periods[1]+'o'+sign+inst._periods[2]+'w'+sign+inst._periods[3]+'d'+sign+inst._periods[4]+'h'+sign+inst._periods[5]+'m'+sign+inst._periods[6]+'s');this._addTarget(target);}inst._hold=hold;inst._savePeriods=(hold=='pause'?inst._periods:null);$.data(target,this.propertyName,inst);this._updateCountdown(target,inst);}},_getTimesPlugin:function(target){var inst=$.data(target,this.propertyName);return(!inst?null:(inst._hold=='pause'?inst._savePeriods:(!inst._hold?inst._periods:this._calculatePeriods(inst,inst._show,inst.options.significant,new Date()))));},_determineTime:function(setting,defaultTime){var offsetNumeric=function(offset){var time=new Date();time.setTime(time.getTime()+offset*1000);return time;};var offsetString=function(offset){offset=offset.toLowerCase();var time=new Date();var year=time.getFullYear();var month=time.getMonth();var day=time.getDate();var hour=time.getHours();var minute=time.getMinutes();var second=time.getSeconds();var pattern=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;var matches=pattern.exec(offset);while(matches){switch(matches[2]||'s'){case's':second+=parseInt(matches[1],10);break;case'm':minute+=parseInt(matches[1],10);break;case'h':hour+=parseInt(matches[1],10);break;case'd':day+=parseInt(matches[1],10);break;case'w':day+=parseInt(matches[1],10)*7;break;case'o':month+=parseInt(matches[1],10);day=Math.min(day,plugin._getDaysInMonth(year,month));break;case'y':year+=parseInt(matches[1],10);day=Math.min(day,plugin._getDaysInMonth(year,month));break;}matches=pattern.exec(offset);}return new Date(year,month,day,hour,minute,second,0);};var time=(setting==null?defaultTime:(typeof setting=='string'?offsetString(setting):(typeof setting=='number'?offsetNumeric(setting):setting)));if(time)time.setMilliseconds(0);return time;},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate();},_normalLabels:function(num){return num;},_generateHTML:function(inst){var self=this;inst._periods=(inst._hold?inst._periods:this._calculatePeriods(inst,inst._show,inst.options.significant,new Date()));var shownNonZero=false;var showCount=0;var sigCount=inst.options.significant;var show=$.extend({},inst._show);for(var period=Y;period<=S;period++){shownNonZero|=(inst._show[period]=='?'&&inst._periods[period]>0);show[period]=(inst._show[period]=='?'&&!shownNonZero?null:inst._show[period]);showCount+=(show[period]?1:0);sigCount-=(inst._periods[period]>0?1:0);}var showSignificant=[false,false,false,false,false,false,false];for(var period=S;period>=Y;period--){if(inst._show[period]){if(inst._periods[period]){showSignificant[period]=true;}else{showSignificant[period]=sigCount>0;sigCount--;}}}var labels=(inst.options.compact?inst.options.compactLabels:inst.options.labels);var whichLabels=inst.options.whichLabels||this._normalLabels;var showCompact=function(period){var labelsNum=inst.options['compactLabels'+whichLabels(inst._periods[period])];return(show[period]?self._translateDigits(inst,inst._periods[period])+(labelsNum?labelsNum[period]:labels[period])+' ':'');};var showFull=function(period){var labelsNum=inst.options['labels'+whichLabels(inst._periods[period])];return((!inst.options.significant&&show[period])||(inst.options.significant&&showSignificant[period])?'<span class="'+plugin._sectionClass+'">'+'<span class="'+plugin._amountClass+'">'+self._translateDigits(inst,inst._periods[period])+'</span><br/>'+(labelsNum?labelsNum[period]:labels[period])+'</span>':'');};return(inst.options.layout?this._buildLayout(inst,show,inst.options.layout,inst.options.compact,inst.options.significant,showSignificant):((inst.options.compact?'<span class="'+this._rowClass+' '+this._amountClass+(inst._hold?' '+this._holdingClass:'')+'">'+showCompact(Y)+showCompact(O)+showCompact(W)+showCompact(D)+(show[H]?this._minDigits(inst,inst._periods[H],2):'')+(show[M]?(show[H]?inst.options.timeSeparator:'')+this._minDigits(inst,inst._periods[M],2):'')+(show[S]?(show[H]||show[M]?inst.options.timeSeparator:'')+this._minDigits(inst,inst._periods[S],2):''):'<span class="'+this._rowClass+' '+this._showClass+(inst.options.significant||showCount)+(inst._hold?' '+this._holdingClass:'')+'">'+showFull(Y)+showFull(O)+showFull(W)+showFull(D)+showFull(H)+showFull(M)+showFull(S))+'</span>'+(inst.options.description?'<span class="'+this._rowClass+' '+this._descrClass+'">'+inst.options.description+'</span>':'')));},_buildLayout:function(inst,show,layout,compact,significant,showSignificant){var labels=inst.options[compact?'compactLabels':'labels'];var whichLabels=inst.options.whichLabels||this._normalLabels;var labelFor=function(index){return(inst.options[(compact?'compactLabels':'labels')+whichLabels(inst._periods[index])]||labels)[index];};var digit=function(value,position){return inst.options.digits[Math.floor(value/position)%10];};var subs={desc:inst.options.description,sep:inst.options.timeSeparator,yl:labelFor(Y),yn:this._minDigits(inst,inst._periods[Y],1),ynn:this._minDigits(inst,inst._periods[Y],2),ynnn:this._minDigits(inst,inst._periods[Y],3),y1:digit(inst._periods[Y],1),y10:digit(inst._periods[Y],10),y100:digit(inst._periods[Y],100),y1000:digit(inst._periods[Y],1000),ol:labelFor(O),on:this._minDigits(inst,inst._periods[O],1),onn:this._minDigits(inst,inst._periods[O],2),onnn:this._minDigits(inst,inst._periods[O],3),o1:digit(inst._periods[O],1),o10:digit(inst._periods[O],10),o100:digit(inst._periods[O],100),o1000:digit(inst._periods[O],1000),wl:labelFor(W),wn:this._minDigits(inst,inst._periods[W],1),wnn:this._minDigits(inst,inst._periods[W],2),wnnn:this._minDigits(inst,inst._periods[W],3),w1:digit(inst._periods[W],1),w10:digit(inst._periods[W],10),w100:digit(inst._periods[W],100),w1000:digit(inst._periods[W],1000),dl:labelFor(D),dn:this._minDigits(inst,inst._periods[D],1),dnn:this._minDigits(inst,inst._periods[D],2),dnnn:this._minDigits(inst,inst._periods[D],3),d1:digit(inst._periods[D],1),d10:digit(inst._periods[D],10),d100:digit(inst._periods[D],100),d1000:digit(inst._periods[D],1000),hl:labelFor(H),hn:this._minDigits(inst,inst._periods[H],1),hnn:this._minDigits(inst,inst._periods[H],2),hnnn:this._minDigits(inst,inst._periods[H],3),h1:digit(inst._periods[H],1),h10:digit(inst._periods[H],10),h100:digit(inst._periods[H],100),h1000:digit(inst._periods[H],1000),ml:labelFor(M),mn:this._minDigits(inst,inst._periods[M],1),mnn:this._minDigits(inst,inst._periods[M],2),mnnn:this._minDigits(inst,inst._periods[M],3),m1:digit(inst._periods[M],1),m10:digit(inst._periods[M],10),m100:digit(inst._periods[M],100),m1000:digit(inst._periods[M],1000),sl:labelFor(S),sn:this._minDigits(inst,inst._periods[S],1),snn:this._minDigits(inst,inst._periods[S],2),snnn:this._minDigits(inst,inst._periods[S],3),s1:digit(inst._periods[S],1),s10:digit(inst._periods[S],10),s100:digit(inst._periods[S],100),s1000:digit(inst._periods[S],1000)};var html=layout;for(var i=Y;i<=S;i++){var period='yowdhms'.charAt(i);var re=new RegExp('\\{'+period+'<\\}([\\s\\S]*)\\{'+period+'>\\}','g');html=html.replace(re,((!significant&&show[i])||(significant&&showSignificant[i])?'$1':''));}$.each(subs,function(n,v){var re=new RegExp('\\{'+n+'\\}','g');html=html.replace(re,v);});return html;},_minDigits:function(inst,value,len){value=''+value;if(value.length>=len){return this._translateDigits(inst,value);}value='0000000000'+value;return this._translateDigits(inst,value.substr(value.length-len));},_translateDigits:function(inst,value){return(''+value).replace(/[0-9]/g,function(digit){return inst.options.digits[digit];});},_determineShow:function(inst){var format=inst.options.format;var show=[];show[Y]=(format.match('y')?'?':(format.match('Y')?'!':null));show[O]=(format.match('o')?'?':(format.match('O')?'!':null));show[W]=(format.match('w')?'?':(format.match('W')?'!':null));show[D]=(format.match('d')?'?':(format.match('D')?'!':null));show[H]=(format.match('h')?'?':(format.match('H')?'!':null));show[M]=(format.match('m')?'?':(format.match('M')?'!':null));show[S]=(format.match('s')?'?':(format.match('S')?'!':null));return show;},_calculatePeriods:function(inst,show,significant,now){inst._now=now;inst._now.setMilliseconds(0);var until=new Date(inst._now.getTime());if(inst._since){if(now.getTime()<inst._since.getTime()){inst._now=now=until;}else{now=inst._since;}}else{until.setTime(inst._until.getTime());if(now.getTime()>inst._until.getTime()){inst._now=now=until;}}var periods=[0,0,0,0,0,0,0];if(show[Y]||show[O]){var lastNow=plugin._getDaysInMonth(now.getFullYear(),now.getMonth());var lastUntil=plugin._getDaysInMonth(until.getFullYear(),until.getMonth());var sameDay=(until.getDate()==now.getDate()||(until.getDate()>=Math.min(lastNow,lastUntil)&&now.getDate()>=Math.min(lastNow,lastUntil)));var getSecs=function(date){return(date.getHours()*60+date.getMinutes())*60+date.getSeconds();};var months=Math.max(0,(until.getFullYear()-now.getFullYear())*12+until.getMonth()-now.getMonth()+((until.getDate()<now.getDate()&&!sameDay)||(sameDay&&getSecs(until)<getSecs(now))?-1:0));periods[Y]=(show[Y]?Math.floor(months/12):0);periods[O]=(show[O]?months-periods[Y]*12:0);now=new Date(now.getTime());var wasLastDay=(now.getDate()==lastNow);var lastDay=plugin._getDaysInMonth(now.getFullYear()+periods[Y],now.getMonth()+periods[O]);if(now.getDate()>lastDay){now.setDate(lastDay);}now.setFullYear(now.getFullYear()+periods[Y]);now.setMonth(now.getMonth()+periods[O]);if(wasLastDay){now.setDate(lastDay);}}var diff=Math.floor((until.getTime()-now.getTime())/1000);var extractPeriod=function(period,numSecs){periods[period]=(show[period]?Math.floor(diff/numSecs):0);diff-=periods[period]*numSecs;};extractPeriod(W,604800);extractPeriod(D,86400);extractPeriod(H,3600);extractPeriod(M,60);extractPeriod(S,1);if(diff>0&&!inst._since){var multiplier=[1,12,4.3482,7,24,60,60];var lastShown=S;var max=1;for(var period=S;period>=Y;period--){if(show[period]){if(periods[lastShown]>=max){periods[lastShown]=0;diff=1;}if(diff>0){periods[period]++;diff=0;lastShown=period;max=1;}}max*=multiplier[period];}}if(significant){for(var period=Y;period<=S;period++){if(significant&&periods[period]){significant--;}else if(!significant){periods[period]=0;}}}return periods;}});var getters=['getTimes'];function isNotChained(command,otherArgs){if(command=='option'&&(otherArgs.length==0||(otherArgs.length==1&&typeof otherArgs[0]=='string'))){return true;}return $.inArray(command,getters)>-1;}$.fn.countdown=function(options){var otherArgs=Array.prototype.slice.call(arguments,1);if(isNotChained(options,otherArgs)){return plugin['_'+options+'Plugin'].apply(plugin,[this[0]].concat(otherArgs));}return this.each(function(){if(typeof options=='string'){if(!plugin['_'+options+'Plugin']){throw'Unknown command: '+options;}plugin['_'+options+'Plugin'].apply(plugin,[this].concat(otherArgs));}else{plugin._attachPlugin(this,options||{});}});};var plugin=$.countdown=new Countdown();})(jQuery);