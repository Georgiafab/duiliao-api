(this.webpackJsonpduiliao=this.webpackJsonpduiliao||[]).push([[18],{79:function(e,t,a){"use strict";a.r(t);var n=a(9),i=a(10),s=a(12),c=a(11),l=a(13),r=a(0),o=a.n(r),u=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(c.a)(t).call(this,e))).state={},a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.friendList,a=t.map((function(t){return o.a.createElement("li",{key:t._id,onClick:function(){e.onSendMessage(t._id)}},o.a.createElement("img",{src:t.averImg||"https://m.baidu.com/se/static/wiseatom/personalcenter/assets/img/default_icon_02f13d8.png",alt:t.name}),o.a.createElement("div",{className:"item-right"},o.a.createElement("h3",null,t.name),o.a.createElement("span",null,t.city||"\u672a\u77e5\u5730\u533a")))})),n=o.a.createElement("div",{className:"nofriend"},"\u4f60\u8fd8\u6ca1\u6709\u597d\u53cb\u54e6\uff01");return o.a.createElement("div",{className:"list"},o.a.createElement("div",{className:"cont"},o.a.createElement("ul",null,t.length?a:n)))}},{key:"onSendMessage",value:function(e){this.props.history.push("/chat/"+e)}}]),t}(o.a.Component);t.default=u}}]);
//# sourceMappingURL=18.559d06c1.chunk.js.map