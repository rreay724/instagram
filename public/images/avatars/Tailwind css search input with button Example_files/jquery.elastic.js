!function(t){jQuery.fn.extend({elastic:function(){var e=["paddingTop","paddingRight","paddingBottom","paddingLeft","fontSize","lineHeight","fontFamily","width","fontWeight","border-top-width","border-right-width","border-bottom-width","border-left-width","borderTopStyle","borderTopColor","borderRightStyle","borderRightColor","borderBottomStyle","borderBottomColor","borderLeftStyle","borderLeftColor"];return this.each(function(){if("textarea"!==this.type)return!1;var r=jQuery(this),i=jQuery("<div />").css({position:"absolute",display:"none","word-wrap":"break-word","white-space":"pre-wrap"}),o=parseInt(r.css("line-height"),10)||parseInt(r.css("font-size"),"10"),n=parseInt(r.css("height"),10)||3*o,h=parseInt(r.css("max-height"),10)||Number.MAX_VALUE;h<0&&(h=Number.MAX_VALUE),i.appendTo(r.parent());for(var a=e.length;a--;)i.css(e[a].toString(),r.css(e[a].toString()));function d(){var t=Math.floor(parseInt(r.width(),10));i.width()!==t&&(i.css({width:t+"px"}),p(!0))}function s(t,e){var i=Math.floor(parseInt(t,10));r.height()!==i&&r.css({height:i+"px",overflow:e})}function p(t){var e=r.val().replace(/&/g,"&amp;").replace(/ {2}/g,"&nbsp;").replace(/<|>/g,"&gt;").replace(/\n/g,"<br />"),a=i.html().replace(/<br>/gi,"<br />");if((t||e+"&nbsp;"!==a)&&(i.html(e+"&nbsp;"),Math.abs(i.height()+o-r.height())>3)){var d=i.height()+o;d>=h?s(h,"auto"):s(d<=n?n:d,"hidden")}}r.css({overflow:"hidden"}),r.bind("keyup change cut paste",function(){p()}),t(window).bind("resize",d),r.bind("resize",d),r.bind("update",p),r.bind("blur",function(){i.height()<h&&(i.height()>n?r.height(i.height()):r.height(n))}),r.bind("input paste",function(t){setTimeout(p,250)}),p()})}})}(jQuery);