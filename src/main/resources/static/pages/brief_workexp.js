/**
 create by xfq
 2015/7/25 0025
 */
define("pages/brief_workexp", ["text!pages/brief_workexp.html","base/scaner"],
    function (htl,sc) {
    var tmp = function (args) {
        this.args = $.extend({}, args);
        if (true) {
            this.root=$(htl);
            this.fields={};
            sc.scan(this.root,"data-field",this.fields);
        } else {
            throw "base arguments";
        }
    };
    tmp.prototype = {
        init:function(){
            var fd = this.fields ;
            this.paper=Raphael(fd.svg.get(0),this.root.width(),this.root.height());
            this.paper.circle(300,300,100).attr({
                fill:"url(img/colleage_gate.png)"
            });
        },
        show:function(){
            this.root.show();
        },
        hide:function(){
            this.root.hide();
        }
    };
    return tmp;
});