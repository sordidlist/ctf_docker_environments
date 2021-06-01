function toggle_minimap(){r2ui._dis.minimap?(r2ui._dis.minimap=!1,r2ui.seek(r2ui._dis.selected_offset,!1),$("#minimap").hide()):(r2ui._dis.minimap=!0,r2ui.seek(r2ui._dis.selected_offset,!1),$("#minimap").show())}function update_minimap(){if(r2ui._dis.minimap&&$("#canvas svg").length){var e=200,t=200,n=$("#canvas svg")[0].getBBox().width,i=$("#canvas svg")[0].getBBox().height,r=Math.ceil(n/e),a=Math.ceil(i/t),s=1/Math.max(r,a),o=0;a>r&&(o=e/2-n*s/2);var c=null;$("#radareApp_mp").length?c=$("#main_panel"):$("#main_panel").length&&(c=$("#center_panel")),c.scrollTop()<i&&($("#minimap_area").width(c.width()*s),$("#minimap_area").height(c.height()*s),c.scrollTop()*s<=t-c.height()*s&&$("#minimap_area").css("top",c.scrollTop()*s),$("#minimap_area").css("left",o+c.scrollLeft()*s)),c=$("#center_panel"),$("#radareApp_mp").length?($("#minimap").css("display","none"),$("#minimap").css("left",c.scrollLeft()+c.width()-e-$("#radareApp_mp").position().left+2*c.css("padding").replace("px","")),$("#minimap").css("top",c.scrollTop()),$("#minimap").css("display","block")):$("#main_panel").length&&($("#minimap").css("left",c.scrollLeft()+$("#main_panel").width()-e),$("#minimap").css("top",c.scrollTop())),$("#minimap").css("border","1px solid "+r2ui.colors[".ec_gui_background"]),$("#minimap_area").css("background",r2ui.colors[".ec_gui_background"])}}function reposition_graph(){var e=r2ui.graph.getElements(),t=r2ui.get_fcn_BBs(r2ui.current_fcn_offset),n=Object.keys(t);for(var i in e){found=!1;for(var r in n){var a=String(n[r]),s=t[a];if(e[i].prop("id")===a){found=!0,"null"!==s.x&&"null"!==s.y&&e[i].translate(s.x-e[i].prop("position").x,s.y-e[i].prop("position").y);var o=s.color;null!==o&&void 0!==o&&e[i].attr("rect/fill",o)}}}}function render_graph(e){var t;try{t=JSON.parse(e.replace(/\\l/g,"\\n"))}catch(n){console.log("Cannot parse JSON data")}if(void 0===t[0])return!1;if(void 0===t[0].blocks)return!1;var i=new BBGraph;r2ui.current_fcn_offset=t[0].blocks[0].ops[0].offset;for(var r=0;r<t[0].blocks.length;r++){var a=t[0].blocks[r],s=a.offset;if(void 0!==a.trace){var o=r2ui.get_fcn_BB(r2ui.current_fcn_offset,s);void 0!==o?"red"!==o.color&&(o.color="#7592DF"):o={x:null,y:null,color:"#7592DF"},r2ui.update_fcn_BB(r2ui.current_fcn_offset,s,o)}if(0!==a.length){var c=a.ops.length,d="";for(var l in a.ops){var p=a.ops[l];void 0===p.comment||null===p.comment?p.comment="":p.comment=atob(p.comment),d+=html_for_instruction(p)}var f=document.createElement("div");f.id="bb_"+s,f.className="basicblock enyo-selectable ec_gui_background ec_gui_border",f.innerHTML=d,i.addVertex(s,c,f),a.fail>0?(i.addEdge(s,a.fail,"red"),a.jump>0&&i.addEdge(s,a.jump,"green")):a.jump>0&&i.addEdge(s,a.jump,"blue")}}i.render();var u=$("#canvas svg g .element");return u.on("mousedown",function(){flag=0}),u.on("mousemove",function(){flag=1}),u.on("mouseup",function(e){if(0===flag){var t=e.target.parentNode.parentNode.parentNode.getAttribute("model-id");if("minimap_area"!==t){var n=r2ui.get_fcn_BB(r2ui.current_fcn_offset,t);void 0!==n&&null!==n?"red"===n.color?n.color=r2ui.colors[".ec_gui_alt_background"]:n.color="red":n={x:"null",y:"null",color:"red"},r2ui.update_fcn_BB(r2ui.current_fcn_offset,t,n),reposition_graph()}}}),$(".addr").css("-webkit-user-select","text"),!0}function render_instructions(e){var t=document.createElement("div");t.id="outergbox";var n=document.getElementById("canvas");n.innerHTML="";var i=document.createElement("div");i.id="gbox",i.className="ec_gui_background",t.appendChild(i),n.appendChild(t);var r=getOffsetRect(n),a=r2.settings["asm.lines"],s=r2.settings["asm.offset"],o=r.top,c=[],d={},l=e[0].offset,p=e[e.length-1].offset;for(var f in e){var u=e[f];if(("jmp"==u.type||"cjmp"==u.type)&&void 0!==u.jump&&null!==u.jump){var m={};m.from=u.offset,p<u.jump?(m.to_end=!1,m.to=p):l>u.jump?(m.to_end=!1,m.to=l):(m.to_end=!0,m.to=u.jump),"jmp"==u.type?(m.color=r2ui.colors[".ec_flow"],m.dashed=!1):"cjmp"==u.type&&(m.color=r2ui.colors[".ec_gui_cflow"],m.dashed=!0),m.to_start=!0,c[c.length]=m,void 0===d[m.to]&&(d[m.to]=0)}if(void 0===u.comment||null===u.comment)u.comment="";else try{u.comment=atob(u.comment)}catch(_){console.log(u.comment)}var g=document.createElement("div");a?g.className="instructionbox enyo-selectable lines":g.className="instructionbox",g.style.top=o+"px",g.innerHTML=html_for_instruction(u),i.appendChild(g);var h=getOffsetRect(g),v=h.bottom-h.top;o+=v}if(a){var b=document.createElement("canvas");b.width=500,b.height=o,b.id="linecanvas",b.setAttribute("tabindex","1"),b.setAttribute("style","outline: none;"),i.appendChild(b);var y=b.getContext("2d");y.setLineDash||(y.setLineDash=function(){});var x=countProperties(d),k=0,B=100;for(var j in c){var m=c[j],w="0x"+m.from.toString(16),T="0x"+m.to.toString(16);0===d[m.to]&&(d[m.to]=(x-k-1)*(90/(x+1)),k+=1);var M=get_element_by_address(w),E=get_element_by_address(T);if(null!==M&&void 0!==M&&void 0!==E&&null!==E){var S=d[m.to],R=getOffsetRect(M),C=(R.top+R.bottom)/2,L=getOffsetRect(E),z=(L.top+L.bottom)/2;m.to==e[0].offset&&(z=0),y.beginPath(),y.moveTo(S,C),y.lineTo(S,z),y.strokeStyle=m.color,m.dashed&&y.setLineDash([2,3]),y.stroke(),m.to_start&&(y.beginPath(),y.moveTo(S,C),y.lineTo(B-5,C),y.strokeStyle=m.color,m.dashed&&y.setLineDash([2,3]),y.stroke(),y.beginPath(),y.arc(B-5-2,C,2,0,2*Math.PI,!1),y.fillStyle=m.color,y.fill()),m.to_end&&(y.beginPath(),y.moveTo(S,z),y.lineTo(B-5,z),y.strokeStyle=m.color,m.dashed&&y.setLineDash([2,3]),y.stroke(),y.beginPath(),y.moveTo(B-5,z),y.lineTo(B-10,z-5),y.lineTo(B-10,z+5),y.lineWidth=1,y.fillStyle=m.color,y.fill())}}}if(!s){var P=document.getElementsByClassName("insaddr");for(var O in P)P[O].style&&(P[O].style.display="none")}$(".addr").css("-moz-user-select","text"),$(".addr").css("-webkit-user-select","text")}function getOffsetRect(e){var t=e.getBoundingClientRect(),n=$("#gbox").offset().top,i=t.top-n,r=t.bottom-n;return{top:Math.round(i),bottom:Math.round(r)}}function countProperties(e){var t=0;for(var n in e)e.hasOwnProperty(n)&&++t;return t}function toBoolean(e){return"true"===e?!0:"false"===e?!1:void 0}function html_for_instruction(e){var t='<div class="instruction enyo-selectable">',n="0x"+e.offset.toString(16),i=n,r=r2.settings["asm.flags"],a=r2.settings["asm.bytes"],s=r2.settings["asm.xrefs"],o=r2.settings["asm.cmt.right"];if(e.fcn_addr>0&&n==="0x"+e.fcn_addr.toString(16)){"flat"==r2ui._dis.display&&(t+='<div class="ec_flow">; -----------------------------------------------------------</div>');var c,d="afij "+n+";afvj "+n+";afaj "+n;r2.cmd(d,function(e){c=e.split("\n")});var l=JSON.parse(c[0]);null!==l&&void 0!==l&&l.length>0&&(t+='<div class="ec_fname">(fcn) '+l[0].name+"</div>");var p=JSON.parse(c[1]),f=[];for(var u in p)t+='<div class="ec_flag">; '+p[u].kind+" "+p[u].type+" <span class='fvar id_"+address_canonicalize(n)+"_"+p[u].ref+" ec_prompt faddr faddr_"+address_canonicalize(n)+"'>"+escapeHTML(p[u].name)+"</span> @ "+p[u].ref+"</div>",f[f.length]={name:p[u].name,id:address_canonicalize(n)+"_"+p[u].ref};r2.varMap[e.fcn_addr]=f;var m=JSON.parse(c[2]),_=[];for(var u in m)t+='<div class="ec_flag">; '+m[u].kind+" "+m[u].type+" <span class='farg id_"+address_canonicalize(n)+"_"+m[u].ref+" ec_prompt faddr faddr_"+address_canonicalize(n)+"'>"+escapeHTML(m[u].name)+"</span> @ "+m[u].ref+"</div>",_[_.length]={name:m[u].name,id:address_canonicalize(n)+"_"+m[u].ref};r2.argMap[e.fcn_addr]=_}if(r){var g;g=void 0!==e.flags&&null!==e.flags?e.flags.join(";"):r2.get_flag_names(address_canonicalize(n)).join(";"),""!==g&&void 0!==g&&null!==g&&(t+='<div class="ec_flag flags_'+address_canonicalize(n)+'">;-- '+escapeHTML(g)+":</div> ")}if(e.comment&&!o&&(t+='<div class="comment ec_comment comment_'+address_canonicalize(n)+'">; '+escapeHTML(e.comment)+"</div>"),s&&void 0!==e.xrefs&&null!==e.xrefs&&e.xrefs.length>0){for(var u in e.xrefs){var h=e.xrefs[u],v="",b="0x"+h.addr.toString(16);r2.get_flag_names(address_canonicalize(b)).length>0&&(v=" ("+r2.get_flag_names(address_canonicalize(b)).join(";")+")"),t+='<div class="ec_flag xrefs">; '+h.type.toUpperCase()+' XREF from <span class="offset addr addr_'+address_canonicalize(b)+'">'+b+"</span> "+v+"</div> "}}if(t+='<span class="insaddr datainstruction ec_offset addr addr_'+address_canonicalize(n)+'">'+i+"</span> ",a&&void 0!==e.bytes&&null!==e.bytes&&""!==e.bytes){var y=function(e){return"00"==e?'<span class="ec_b0x00">00</span>':"ff"==e?'<span class="ec_b0x00">ff</span>':"7f"==e?'<span class="ec_b0x00">7f</span>':void 0},x=e.bytes.replace(new RegExp("(00)|(ff)|(7f)","g"),y);t+='<span class="bytes ec_other">'+x+"</span> "}var $=highlight_instruction(e.opcode,!0);if(null!==r2.varMap[e.fcn_addr]&&void 0!==r2.varMap[e.fcn_addr]&&r2.varMap[e.fcn_addr].length>0||null!==r2.argMap[e.fcn_addr]&&void 0!==r2.argMap[e.fcn_addr]&&r2.argMap[e.fcn_addr].length>0){for(var u in r2.varMap[e.fcn_addr]){var k=r2.varMap[e.fcn_addr][u].name,B=r2.varMap[e.fcn_addr][u].id;$=$.replace(" "+k+" "," <span class='fvar id_"+B+" ec_prompt faddr faddr_"+address_canonicalize(n)+"'>"+escapeHTML(k)+"</span> ")}for(var u in r2.argMap[e.fcn_addr]){var j=r2.argMap[e.fcn_addr][u];r2.argMap[e.fcn_addr][u].id;$=$.replace(" "+j+" "," <span id='fvar id_"+B+" ec_prompt faddr faddr_"+address_canonicalize(n)+"'>"+escapeHTML(k)+"</span> ")}}return void 0!==e.type&&null!==e.type?(contains(math,e.type)&&(e.type="math"),contains(bin,e.type)&&(e.type="bin"),"ill"==e.type&&(e.type="invalid"),"null"==e.type&&(e.type="invalid"),"undefined"==e.type&&(e.type="invalid"),"ujmp"==e.type&&(e.type="jmp"),"upush"==e.type&&(e.type="push"),"upop"==e.type&&(e.type="pop"),"ucall"==e.type&&(e.type="call"),"lea"==e.type&&(e.type="mov"),contains(known_types,e.type)||(e.type="other"),t+='<div class="instructiondesc ec_'+e.type+'">'+$+"</div> "):t+='<div class="instructiondesc">'+$+"</div> ",e.ptr_info&&(t+='<span class="comment ec_comment comment_'+address_canonicalize(n)+'">'+escapeHTML(e.ptr_info)+"</span>"),e.comment&&o&&(t+='<span class="comment ec_comment comment_'+address_canonicalize(n)+'"> ; '+escapeHTML(e.comment)+"</span>"),"ret"==e.type&&(t+="<div>&nbsp</div>"),t+="</div>"}function highlight_instruction(e,t){function n(e){if("0x"!=e.substr(0,2))return a[e];var t=r2.get_flag_names(address_canonicalize(e));for(var n in t){if(t[n].indexOf("sym.imp."))return"<span class='ec_offset addr addr_"+address_canonicalize(e)+"'>"+t[n]+"</span>";if(t[n].indexOf("fcn."))return"<span class='ec_offset addr addr_"+address_canonicalize(e)+"'>"+t[n]+"</span>"}var i=get_data_type(e);return""===i?"<span class='ec_num'>"+e+"</span>":"datainstruction"===i?"<span class='ec_offset addr addr_"+address_canonicalize(e)+"'>"+e+"</span>":"datamemory"===i?"<span class='ec_dataoffset'>"+e+"</span>":void 0}if(void 0===e)return"undefined";void 0===t&&(t=!0);var i=escapeHTML(e),r="(0x[0123456789abcdef]+)",a={};if(t){for(var s in regs){var o='<span class="ec_reg">'+regs[s]+"</span>";a[regs[s]]=o,o='<span class="ec_reg">'+regs[s].toLowerCase()+"</span>",a[regs[s].toLowerCase()]=o}for(s in a)r+="|("+s+")"}return i.replace(new RegExp(r,"g"),n)}function hex2(e){if(void 0===e)return"__";var t=e.toString(16);return 1==t.length?"0"+t:t}function hex(e){return void 0===e?"":(0>e&&(e+=4294967296),"0x"+e.toString(16))}function get_data_type(e,t){var n=r2.get_address_type(e);return""===n?"":void 0!==t?"data"+n+" addr addr_"+e:"data"+n}function fnum(e){return parseInt(e,10)}function get_address_from_class(e,t){void 0===t&&(t="addr");var n=t+"_";if(e){var i=e.className.split(" ").filter(function(e){return e.substr(0,n.length)==t+"_"});if(1==i.length)return i[0].split("_")[1].split(" ")[0]}}function rehighlight_iaddress(e,t){void 0===t&&(t="addr"),$(".autohighlighti").removeClass("autohighlighti"),$("."+t+"_"+e).addClass("autohighlighti"),"addr"===t&&r2.cmd("s "+e,function(){})}function rehighlight_id(e){$(".autohighlighti").removeClass("autohighlighti"),$("#"+e).addClass("autohighlighti")}function get_element_by_address(e){var t=$(".insaddr.addr_"+e);return 1===t.length?t[0]:null}function scroll_to_address(e){var t=$(".insaddr.addr_"+e),n=t[0].documentOffsetTop()-window.innerHeight/2;n=Math.max(0,n),$("#main_panel").scrollTo({top:n,left:0})}function has_scrollbar(e){return e.scrollHeight>e.clientHeight}function on_scroll(e){if(!r2ui._dis.scrolling){var t=!!$("#radareApp").length,n=!1;if(t||(n=0===$("#main_panel").tabs("option","active")),r2ui._dis.scrolling=!0,"flat"==r2ui._dis.display&&(t||n)){var i=null,r=null,a=null;t?(i=$("#main_panel").scrollTop(),r=$("#gbox").height()-$("#main_panel").height()-10,container_element=$("#center_panel")):(i=$("#center_panel").scrollTop(),r=$("#gbox").height()-$("#center_panel").height()-10,container_element=$("#disasm_tab")),has_scrollbar($("#center_panel")[0])&&(0===i?(a="0x"+r2ui._dis.instructions[0].offset.toString(16),r2.get_disasm_before(a,50,function(e){r2ui._dis.instructions=e.concat(r2ui._dis.instructions)}),container_element.html("<div id='canvas' class='canvas enyo-selectable ec_gui_background'></div>"),render_instructions(r2ui._dis.instructions),scroll_to_address(a),rehighlight_iaddress(r2ui._dis.selected_offset)):i>r&&(a="0x"+r2ui._dis.instructions[r2ui._dis.instructions.length-1].offset.toString(16),r2.get_disasm_after(a,100,function(e){r2ui._dis.instructions=r2ui._dis.instructions.slice(0,-1).concat(e)}),container_element.html("<div id='canvas' class='canvas enyo-selectable ec_gui_background'></div>"),render_instructions(r2ui._dis.instructions),scroll_to_address(a),rehighlight_iaddress(r2ui._dis.selected_offset)))}r2ui._dis.scrolling=!1,e.preventDefault()}}function scroll_to_element(e){var t=e.documentOffsetTop()-window.innerHeight/2;t=Math.max(0,t),$("#main_panel").scrollTo({top:t,left:0})}function rename(e,t,n,i){if(void 0===i&&(i="functions"),"functions"==i&&r2.cmdj("pdfj @ "+e,function(t){null!==t&&void 0!==t&&"0x"+t.addr.toString(16)===e&&r2.cmd("afn "+n+" "+e,function(){r2.update_flags()})}),""!==n&&""!==t){var r="fs "+i+";fr "+t+" "+n;r2.cmd(r,function(){})}else if(""===n&&""!==t){var r="fs "+i+";f-@"+e;r2.cmd(r,function(){})}else if(""!==n&&""===t){var r="fs "+i+";f "+n+" @ "+e;r2.cmd(r,function(){})}r2.update_flags()}function address_canonicalize(e){for(e=e.substr(2);"0"==e.substr(0,1);)e=e.substr(1);return e="0x"+e,e=e.toLowerCase()}function contains(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return!0;return!1}function handleInputTextChange(){r2ui._dis.handleInputTextChange()}function show_contextMenu(e,t){r2ui._dis.showContextMenu(e,t)}function get_offset_flag(e){var t="";return r2.cmdj("fs offsets;fj",function(n){for(var i in n)if("0x"+n[i].offset.toString(16)==e){t=n[i].name;break}}),t}function get_symbol_flag(e){var t=e,n=!1;return r2.cmdj("fs symbols;fj",function(i){for(var r in i)if(i[r].name==e){n=!0;break}if(!n)for(var r in i)if(i[r].name=="sym."+e){t="sym."+e;break}}),t}function get_reloc_flag(e){var t=e,n=!1;return r2.cmdj("fs relocs;fj",function(i){for(var r in i)if(i[r].name==e){n=!0;break}if(!n)for(var r in i)if(i[r].name=="reloc."+e){t="reloc."+e;break}}),t}function createCookie(e,t,n){if(n){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3);var r="; expires="+i.toGMTString()}else var r="";document.cookie=e+"="+t+r+"; path=/"}function readCookie(e){for(var t=e+"=",n=document.cookie.split(";"),i=0;i<n.length;i++){for(var r=n[i];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null}function eraseCookie(e){createCookie(e,"",-1)}function do_randomcolors(){r2.cmd("ecr;ec gui.background rgb:000",function(){r2ui.load_colors()})}function inColor(e){return"e scr.color=1;"+e+";e scr.color=0"}var BBGraph=function(){this.vertices={},this.edges=[],this.elements=[],this.links=[],this.fcn_offset=0,joint.shapes.html={},joint.shapes.html.Element=joint.shapes.basic.Rect.extend({defaults:joint.util.deepSupplement({type:"html.Element",attrs:{rect:{stroke:r2ui.colors[".ec_gui_border"],fill:r2ui.colors[".ec_gui_alt_background"]}}},joint.shapes.basic.Rect.prototype.defaults)}),joint.shapes.html.ElementView=joint.dia.ElementView.extend({initialize:function(){_.bindAll(this,"updateBox"),joint.dia.ElementView.prototype.initialize.apply(this,arguments),this.$box=$(_.template(this.model.get("html"))()),this.$box.find("input").on("mousedown click",function(e){e.stopPropagation()}),this.model.on("change",this.updateBox,this),this.updateBox()},render:function(){return joint.dia.ElementView.prototype.render.apply(this,arguments),this.paper.$el.prepend(this.$box),this.updateBox(),this},updateBox:function(){var e=this.model.getBBox();this.$box.css({width:e.width+2,height:e.height-6,left:e.x-1,top:e.y+7})}})};BBGraph.prototype.addVertex=function(e,t){if(void 0===this.vertices[e]&&(this.vertices[e]={},this.vertices[e].parents=[],this.vertices[e].children=[],void 0===t)){this.vertices[e].len=1;var n=document.createElement("div");n.id="bb_"+e,n.className="basicblock enyo-selectable ec_gui_background ec_gui_border",n.innerHTML="<div class='instruction enyo-selectable'><span class='insaddr datainstruction ec_offset addr addr_0x"+e.toString(16)+"' >0x"+e.toString(16)+"</span></div>",this.vertices[e].rendered=n}void 0!==t&&(this.vertices[e].len=t,this.vertices[e].rendered=n)},BBGraph.prototype.addEdge=function(e,t,n){this.addVertex(e),this.addVertex(t),this.edges.push({from:e,to:t,color:n}),this.vertices[e].children.push(t),this.vertices[t].parents.push(e)},BBGraph.prototype.makeElement=function(e,t,n,i){this.elements.push(new joint.shapes.html.Element({id:String(e),size:{width:t,height:n},html:i}))},BBGraph.prototype.makeLink=function(e,t,n){this.links.push(new joint.dia.Link({source:{id:String(e)},target:{id:String(t)},attrs:{".marker-target":{d:"M 6 0 L 0 3 L 6 6 z",fill:n,stroke:n},".connection":{"stroke-width":1,stroke:n}},smooth:!0}))},adjustVertices=function(e,t){if(t=t.model||t,t instanceof joint.dia.Element)return void _.chain(e.getConnectedLinks(t)).groupBy(function(e){return _.omit([e.get("source").id,e.get("target").id],t.id)[0]}).each(function(t,n){"undefined"!==n&&adjustVertices(e,_.first(t))});var n=t.get("source").id||t.previous("source").id,i=t.get("target").id||t.previous("target").id,r=_.filter(e.getLinks(),function(e){var t=e.get("source").id,r=e.get("target").id;return t===n&&r===i||t===i&&r===n});if(r.length>1){var a=r2ui.graph.getCell(n).getBBox(),s=r2ui.graph.getCell(i).getBBox();src=a.intersectionWithLineFromCenterToPoint(s.center()),dst=s.intersectionWithLineFromCenterToPoint(a.center());var o=g.line(src,dst).midpoint(),c=src.theta(dst),d=10;_.each(r,function(e,t){var n=d,i=t%2?1:-1,r=g.toRad(c+90*i),l=g.point.fromPolar(n,r,o);a.containsPoint(l)||s.containsPoint(l)?e.unset("vertices"):e.set("vertices",[{x:l.x,y:l.y}])})}},BBGraph.prototype.render=function(){var e=Object.keys(this.vertices).toString(),t=document.createElement("div");t.id="outergbox";var n=document.getElementById("canvas"),i=document.createElement("div");i.id="gbox",i.className=e,t.appendChild(i),n.appendChild(t);for(var r in this.vertices){var a=this.vertices[r].rendered;void 0!==a&&(i.appendChild(a),this.makeElement(r,a.offsetWidth,a.offsetHeight,a.outerHTML))}for(var s=0;s<this.edges.length;s++)this.makeLink(this.edges[s].from,this.edges[s].to,this.edges[s].color);$("#outergbox").remove(),this.makeElement("minimap_area",1,1,"<div id='minimap_area'>");var o=this.elements.concat(this.links),c=($("#center_panel").width(),new joint.dia.Graph),d=new joint.dia.Paper({el:$("#canvas"),gridSize:1,width:2e3,height:6e3,model:c}),l=200,p=200;$("#minimap").html(""),$("#minimap").html("");var f=new joint.dia.Paper({el:$("#minimap"),gridSize:1,width:l,height:p,model:c});c.resetCells(o),joint.layout.DirectedGraph.layout(c),r2ui.graph=c,reposition_graph(),$("#minimap .basicblock").remove(),c.getCell("minimap_area").attr({rect:{stroke:"transparent"}});var u=$("#canvas svg")[0].getBBox().width,m=$("#canvas svg")[0].getBBox().height;d.setDimensions(u+500,m+500);var g=Math.ceil(u/l),h=Math.ceil(m/p),v=1/Math.max(g,h),b=0;h>g&&(b=l/2-u*v/2),f.scale(v),f.setOrigin(b,0),$("#radareApp_mp").length?($("#minimap").css("left",$("#main_panel").width()-l-$("#main_panel").position().left),$("#minimap").css("top",$("#center_panel").position().top),$("#main_panel").bind("scroll",update_minimap)):$("#main_panel").length&&($("#minimap").css("left",$("#main_panel").width()-l),$("#minimap").css("top",$("#center_panel").position().top-40),$("#center_panel").bind("scroll",update_minimap)),d.on("cell:pointerup",function(e){var t=e.model,n=t.attributes.position,i=String(t.prop("id"));if(void 0!==t&&"minimap_area"!==i){var r=r2ui.get_fcn_BB(r2ui.current_fcn_offset,i);void 0!==r&&null!==r?r.x==String(n.x)&&r.y==String(n.y)||(r.x=n.x,r.y=n.y,r2ui.update_fcn_BB(r2ui.current_fcn_offset,i,r)):void 0!==r&&null!==r&&r2ui.update_fcn_BB(r2ui.current_fcn_offset,i,{x:n.x,y:n.y})}});var y=_.partial(adjustVertices,c);_.each(c.getLinks(),y),d.on("cell:pointerup",y),r2ui._dis.minimap?(update_minimap(),$("#minimap_area").draggable({containment:"parent",stop:function(e,t){var n=t.position.left/v,i=t.position.top/v;0>n&&(n=0),0>i&&(i=0),$("#radareApp_mp").length?$("#main_panel").scrollTo({top:i,left:n-b/v}):$("#center_panel").scrollTo({top:i,left:n-b/v})}})):$("#minimap").hide()};var flag=0,math=["add","sub","mul","imul","div","idiv","neg","adc","sbb","inc","dec",".byte"],bin=["xor","and","or","not"],regs=["EAX","ECX","EDX","EBX","ESP","EBP","ESI","EDI","EIP","RAX","RCX","RDX","RBX","RSP","RBP","RSI","RDI","R0","R1","R2","R3","R4","R5","R6","R7","R8","R9","R10","R11","R12","R13","R14","R15","RIP"],known_types=["fline","help","args","label","flow","prompt","input","btext","swi","comment","fname","flag","offset","other","b0x00","b0x7f","b0xff","math","bin","push","pop","jmp","cjmp","call","nop","ret","trap","invalid","cmp","reg","creg","mov","num"],escapeHTML=function(){"use strict";var e={'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;"};return function(t){return t?t.replace(/[\"&<>]/g,function(t){return e[t]}):""}}();Element.prototype.documentOffsetTop=function(){return this.offsetTop+(this.offsetParent?this.offsetParent.documentOffsetTop():0)};
function asyncLoop(n,r,e){var t=0,o=!1,a={next:function(){o||(n>t?(t++,r(a)):(o=!0,e()))},iteration:function(){return t-1},"break":function(){o=!0,e()}};return a.next(),a}function dump(n){var r="";for(var e in n)r+=e+"\n";alert(r)}function objtostr(n){var r="";for(var e in n)r+=e+": "+n[e]+",\n";return r}function Ajax(n,r,e,t){if("undefined"==typeof XMLHttpRequest)return!1;var o=new XMLHttpRequest;return o?(o.open(n,r,!1),o.setRequestHeader("Accept","text/plain"),o.setRequestHeader("Accept","text/html"),o.setRequestHeader("Content-Type","application/x-ww-form-urlencoded; charset=UTF-8"),o.onreadystatechange=function(){200==o.status?t&&t(o.responseText):console.error("ajax "+o.status)},o.send(e),!0):!1}function _internal_cmd(n,r){if("undefined"!=typeof r2cmd&&(hascmd=r2cmd),hascmd){if("undefined"==typeof r2plugin)return hascmd(n,r);r(r2cmd(n))}else Ajax("GET",r2.root+"/cmd/"+encodeURI(n),"",function(n){r&&r(n)})}var r2={},backward=!1,next_curoff=0,next_lastoff=0,prev_curoff=0,prev_lastoff=0,hascmd=!1;"undefined"!=typeof module&&(module.exports=function(n){return hascmd="function"==typeof n?n:n.cmd,r2}),r2.project_name="",r2.plugin=function(){console.error("r2.plugin is not available in this environment")};try{r2plugin&&(r2.plugin=r2plugin)}catch(e){}r2.root="",r2.analAll=function(){r2.cmd("aa",function(){})},r2.analOp=function(n,r){r2.cmd("aoj 1 @ "+n,function(n){try{r(JSON.parse(n)[0])}catch(e){console.error(e),r(n)}})},r2.varMap=[],r2.argMap=[],r2.assemble=function(n,r,e){var t=n?"@"+n:"";r2.cmd('"pa '+r+'"'+t,e)},r2.disassemble=function(n,r,e){var t=n?"@"+n:"",o="pi @b:"+r+t;r2.cmd(o,e)},r2.get_hexdump=function(n,r,e){r2.cmd("px "+r+"@"+n,e)},r2.get_disasm=function(n,r,e){r2.cmd("pD "+r+"@"+n,e)},r2.get_disasm_before=function(n,r,e){var t=[];r2.cmd("pdj -"+r+"@"+n,function(n){t=JSON.parse(n)}),e(t)},r2.get_disasm_after=function(n,r,e){var t=[];r2.cmd("pdj "+r+"@"+n,function(n){t=JSON.parse(n)}),e(t)},r2.get_disasm_before_after=function(n,r,e,t){var o=[],a=[];r2.cmd("pdj "+r+" @"+n,function(n){o=JSON.parse(n)}),r2.cmd("pdj "+e+"@"+n,function(n){a=JSON.parse(n)});var c=o.concat(a);t(c)},r2.Config=function(n,r,e){return"function"!=typeof r&&r?r2.cmd("e "+n+"="+r,e):r2.cmd("e "+n,e||r),r2},r2.sections={},r2.load_mmap=function(){r2.cmdj("iSj",function(n){void 0!==n&&null!==n&&(r2.sections=n)})},r2.get_address_type=function(n){var r=parseInt(n,16);for(var e in r2.sections)if(r>=r2.sections[e].addr&&r<r2.sections[e].addr+r2.sections[e].size)return r2.sections[e].flags.indexOf("x")>-1?"instruction":"memory";return""},r2.settings={},r2.load_settings=function(){r2.cmd("e asm.arch",function(n){r2.settings["asm.arch"]=n.trim()}),r2.cmd("e asm.bits",function(n){r2.settings["asm.bits"]=n.trim()}),r2.cmd("e asm.bytes",function(n){r2.settings["asm.bytes"]=toBoolean(n.trim())}),r2.cmd("e asm.flags",function(n){r2.settings["asm.flags"]=toBoolean(n.trim())}),r2.cmd("e asm.offset",function(n){r2.settings["asm.offset"]=toBoolean(n.trim())}),r2.cmd("e asm.lines",function(n){r2.settings["asm.lines"]=toBoolean(n.trim())}),r2.cmd("e asm.xrefs",function(n){r2.settings["asm.xrefs"]=toBoolean(n.trim())}),r2.cmd("e asm.cmt.right",function(n){r2.settings["asm.cmt.right"]=toBoolean(n.trim())}),r2.cmd("e asm.pseudo",function(n){r2.settings["asm.pseudo"]=toBoolean(n.trim())})},r2.flags={},r2.update_flags=function(){r2.cmd("fs *;fj",function(n){var r=JSON.parse(n);if(void 0!==r&&null!==r){r2.flags={};for(var e in r){var t="0x"+r[e].offset.toString(16);if(t=address_canonicalize(t),t in r2.flags){var o=r2.flags[t];o[o.length]={name:r[e].name,size:r[e].size},r2.flags[t]=o}else r2.flags[t]=[{name:r[e].name,size:r[e].size}]}}})},r2.get_flag_address=function(n){for(var r in r2.flags)for(var e in r2.flags[r])if(n==r2.flags[r][e].name)return r;return null},r2.get_flag_names=function(n){var r=[];for(var e in r2.flags[n])r[r.length]=r2.flags[n][e].name;return r},r2.set_flag_space=function(n,r){r2.cmd("fs "+n,r)},r2.get_flags=function(n){r2.cmd("fj",function(r){n(r?JSON.parse(r):[])})},r2.get_opcodes=function(n,r,e){r2.cmd("pdj @"+n+"!"+r,function(n){e(JSON.parse(n))})},r2.get_bytes=function(n,r,e){r2.cmd("pcj @"+n+"!"+r,function(n){e(JSON.parse(n))})},r2.asm_config={},r2.store_asm_config=function(){config={},r2.cmd("e",function(n){conf=n.split("\n");for(var r in conf){var e=conf[r].split(" ");3==e.length&&0==e[0].trim().indexOf("asm.")&&(config[e[0].trim()]=e[2].trim())}r2.asm_config=config})},r2.restore_asm_config=function(){cmd="";for(var n in r2.asm_config)cmd+="e "+n+"="+r2.asm_config[n]+";";r2.cmd(cmd,function(){})},r2.get_info=function(n){r2.cmd("ij",function(r){n(JSON.parse(r))})},r2.bin_relocs=function(n){r2.cmd("irj",function(r){n(JSON.parse(r))})},r2.bin_imports=function(n){r2.cmd("iij",function(r){n(JSON.parse(r))})},r2.bin_symbols=function(n){r2.cmd("isj",function(r){n(JSON.parse(r))})},r2.bin_sections=function(n){r2.cmd("iSj",function(r){n(JSON.parse(r))})},r2.cmds=function(n,r){function e(){void 0!=t&&0!=n.length&&(t=n[0],n=n.splice(1),r2.cmd(t,e),r&&r())}if(0!=n.length){var t=n[0];n=n.splice(1),r2.cmd(t,e)}},r2.cmd=function(n,r){if(Array.isArray(n)){var e=[],t=0;asyncLoop(n.length,function(r){_internal_cmd(n[t],function(n){t=r.iteration(),e[t]=n.replace(/\n$/,""),t++,r.next()})},function(){r(e)})}else _internal_cmd(n,r)},r2.cmdj=function(n,r){r2.cmd(n,function(n){try{r(JSON.parse(n))}catch(e){r(null)}})},r2.alive=function(n){r2.cmd("b",function(r){var e=!1;r&&r.length()>0&&(e=!0),n&&n(r)})},r2.getTextLogger=function(n){return"object"!=typeof n&&(n={}),n.last=0,n.events={},n.interval=null,r2.cmd("Tl",function(r){n.last=+r}),n.load=function(r){r2.cmd('"Tj '+(n.last+1)+'"',function(n){r&&r(JSON.parse(n))})},n.clear=function(n){r2.cmd("T-",n)},n.send=function(n,r){r2.cmd('"T '+n+'"',r)},n.refresh=function(r){n.load(function(e){for(var t=0;t<e.length;t++){var o=e[t];n.events.message({id:o[0],text:o[1]}),o[0]>n.last&&(n.last=o[0])}r&&r()})},n.autorefresh=function(r){function e(){return n.refresh(function(){}),"Logs"===r2ui.selected_panel?setTimeout(e,1e3*r):console.log("Not in logs :("),!0}return r?void(n.interval=setTimeout(e,1e3*r)):void(n.interval&&n.interval.stop())},n.on=function(r,e){return n.events[r]=e,n},n},r2.filter_asm=function(n,r){function e(n){return"p"==n[0]&&"d"==n[1]?!0:-1!=n.indexOf(";pd")}var t=backward?prev_curoff:next_curoff,o=backward?prev_lastoff:next_lastoff,a=n.split(/\n/g);r2.cmd("s",function(n){t=n});for(var c=a.length-1;c>0;c--){var i=a[c].match(/0x([a-fA-F0-9]+)/);if(i&&i.length>0){o=i[0].replace(/:/g,"");break}}if("afl"==r){for(var s="",c=0;c<a.length;c++){var f=a[c].replace(/\ +/g," ").split(/ /g);s+=f[0]+"  "+f[3]+"\n"}n=s}else if("f"==r[0]){if("s"==r[1]){for(var s="",c=0;c<a.length;c++){var f=a[c].replace(/\ +/g," ").split(/ /g),l="*"==f[1]?"*":" ",u=f[2]?f[2]:f[1];u&&(s+=f[0]+" "+l+" <a href=\"javascript:runcmd('fs "+u+"')\">"+u+"</a>\n")}n=s}}else if("i"==r[0]&&r[1]){for(var s="",c=0;c<a.length;c++){for(var d=a[c].split(/ /g),m="",p="",g=0;g<d.length;g++){var v=d[g].split(/=/);"addr"==v[0]&&(p=v[1]),"name"==v[0]&&(m=v[1]),"string"==v[0]&&(m=v[1])}s+=p+"  "+m+"\n"}n=s}return e(r)&&(n=n.replace(/function:/g,"<span style=color:green>function:</span>"),n=n.replace(/;(\s+)/g,";"),n=n.replace(/;(.*)/g,"// <span style='color:#209020'>$1</span>"),n=n.replace(/(bl|goto|call)/g,"<b style='color:green'>call</b>"),n=n.replace(/(jmp|bne|beq|js|jnz|jae|jge|jbe|jg|je|jl|jz|jb|ja|jne)/g,"<b style='color:green'>$1</b>"),n=n.replace(/(dword|qword|word|byte|movzx|movsxd|cmovz|mov\ |lea\ )/g,"<b style='color:#1070d0'>$1</b>"),n=n.replace(/(hlt|leave|iretd|retn|ret)/g,"<b style='color:red'>$1</b>"),n=n.replace(/(add|sbb|sub|mul|div|shl|shr|and|not|xor|inc|dec|sar|sal)/g,"<b style='color:#d06010'>$1</b>"),n=n.replace(/(push|pop)/g,"<b style='color:#40a010'>$1</b>"),n=n.replace(/(test|cmp)/g,"<b style='color:#c04080'>$1</b>"),n=n.replace(/(outsd|out|string|invalid|int |int3|trap|main|in)/g,"<b style='color:red'>$1</b>"),n=n.replace(/nop/g,"<b style='color:blue'>nop</b>"),n=n.replace(/(sym|fcn|str|imp|loc)\.([^:<(\\\/ \|)\->]+)/g,"<a href='javascript:r2ui.seek(\"$1.$2\")'>$1.$2</a>")),n=n.replace(/0x([a-zA-Z0-9]+)/g,"<a href='javascript:r2ui.seek(\"0x$1\")'>0x$1</a>"),backward?(prev_curoff=t,prev_lastoff=o):(next_curoff=t,next_lastoff=o,prev_curoff||(prev_curoff=next_curoff)),n};
var r2ui={};r2ui.selected_panel="Disassembler",r2ui.history=[],r2ui.history_idx=0,r2ui.colors={},r2ui.load_colors=function(){r2.cmdj("ecj",function(r){for(var i in r)r2ui.colors[".ec_"+i.replace("gui.","gui_")]="rgb("+String(r[i])+")"});for(var r in document.styleSheets){var i=document.styleSheets[r],o=i.cssRules?i.cssRules:i.rules;for(var e in o)if(void 0!==o[e].selectorText&&null!==o[e].selectorText&&0===o[e].selectorText.toLowerCase().indexOf(".ec_")){var u=o[e].selectorText,s=r2ui.colors[u];void 0!==s&&null!==s?".ec_gui_background"==u||".ec_gui_alt_background"==u?o[e].style.backgroundColor=s:".ec_border"==u?o[e].style.borderColor=s:o[e].style.color=s:".ec_gui_background"==u||".ec_gui_alt_background"==u?r2ui.colors[u]=o[e].style.backgroundColor:".ec_gui_border"==u?r2ui.colors[u]=o[e].style.borderColor:r2ui.colors[u]=o[e].style.color}}},r2ui.basic_blocks={},r2ui.use_sdb=!1,r2ui.get_fcn_BB=function(r,i){if(r2ui.use_sdb){var o="webui/graph/"+r+"/"+i,e=void 0;return r2.cmd("k "+o,function(r){var i=decodeURIComponent(r).split("\n");for(var o in i){var u=i[o];if(""!==u){e={};var s=u.split(",");e.x=s[0],e.y=s[1],""!=s[2]&&void 0!==s[2]||(s[2]="transparent"),e.color=s[2].replace(/\*\*/g,",")}}}),e}return r2ui.basic_blocks[i]},r2ui.get_fcn_BBs=function(r){if(r2ui.use_sdb){var i="webui/graph/"+r+"/*",o={};return r2.cmd("k "+i,function(r){var i=decodeURIComponent(r).split("\n");for(var e in i){var u=i[e];if(""!==u){offset=u.split("=")[0],u=u.split("=")[1];var s={},n=u.split(",");s.x=n[0],s.y=n[1],""!=n[2]&&void 0!==n[2]||(n[2]="transparent"),s.color=n[2].replace(/\*\*/g,","),o[offset]=s}}}),o}return r2ui.basic_blocks},r2ui.update_fcn_BB=function(r,i,o){if(r2ui.use_sdb){var e="webui/graph/"+r+"/"+i;void 0===o.color&&(o.color="transparent");var u=o.x+","+o.y+","+o.color.replace(/,/g,"**");r2.cmd("k "+e+"="+encodeURIComponent(u),function(){})}else r2ui.basic_blocks[i]=o},r2ui.current_fcn_offset=null,r2ui.graph=null,r2ui.console_lang="r2",r2ui.toggle_console_lang=function(){"r2"==r2ui.console_lang?r2ui.console_lang="js":"js"==r2ui.console_lang&&(r2ui.console_lang="r2"),$("#cmd_input > label").html(r2ui.console_lang)},r2ui.history_push=function(r){r!=r2ui.history_last()&&(r2ui.history_idx!=r2ui.history.length&&(r2ui.history=r2ui.history.splice(0,r2ui.history_idx)),r2ui.history_idx++,r2ui.history.push(r))},r2ui.history_pop=function(){return r2ui.history_idx==r2ui.history.length&&r2ui.history_idx--,r2ui.history.pop()},r2ui.history_last=function(){return r2ui.history.length>0?r2ui.history[r2ui.history_idx-1]:void 0},r2ui.history_prev=function(){return r2ui.history_idx>1&&r2ui.history_idx--,r2ui.history[r2ui.history_idx-1]},r2ui.history_next=function(){var r=r2ui.history[r2ui.history_idx];return r2ui.history_idx<r2ui.history.length&&r2ui.history_idx++,r},r2ui.next_instruction=function(){var r=parseInt(r2ui.history_last(),16);return r2.cmd("pdl 1",function(i){r+=parseInt(i.trim())}),"0x"+r.toString(16)},r2ui.prev_instruction=function(){var r=parseInt(r2ui.history_last(),16);return r2.cmdj("pdfj",function(i){if(void 0!==i&&null!==i)for(var o in i.ops)if(0!==o){var e=i.ops[o];if(e.offset==r){r=i.ops[o-1].offset;break}}}),"0x"+r.toString(16)},r2ui.seek=function(r,i,o){if(void 0!==r){if(0===r.indexOf("0x"))r=address_canonicalize(r);else{var e=r2.get_flag_address(r);null!==e?r=address_canonicalize(e):r2.cmd("s "+r+";s",function(i){r=address_canonicalize(i.replace("\n",""))})}i&&r2ui.history_push(r),r2.cmd("s "+r,function(){r2ui._dis.seek(r,o),r2ui._hex.seek(r,o)})}},r2ui.seek_in_graph=function(r,i){i&&r2ui.history_push(r),r2.cmd("s "+r,function(){rehighlight_iaddress(r),r2ui._hex.seek(r),r2ui._hex.scrollTo(0,0)})},r2ui.seek_prev=function(){var r=r2ui.history.pop();r2.cmd("s "+r,function(){r2ui._dis.seek(r),r2ui._dis.scrollTo(0,0),r2ui._hex.seek(r),r2ui._hex.scrollTo(0,0)})},r2ui.openpage=function(r,i){void 0===i&&(i=r,r=void 0),void 0!==r&&r2ui.seek(r,!0),2==r2ui.ra.getIndex()&&r2ui.ra.setIndex(1),r2ui.mp.openPage(i)},r2ui.opendis=function(r){r2ui.openpage(r,0)},r2ui.openhex=function(r){r2ui.openpage(r,2)};
