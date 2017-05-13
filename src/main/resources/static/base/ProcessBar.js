/**
 create by xfq
 2015/7/15 0015
 */
define("base/ProcessBar", [], function () {
    var tmp = function (args) {
        this.args = $.extend({
            holder:$("body"),
            count:5
        }, args);
        if (this.args.holder) {
            this.init();
        } else {
            throw "base arguments";
        }
    };
    tmp.prototype = {
        init:function(){
            var h = this.args.count*20, w=14;
            this.htl=$("<div/>");
            this.args.holder.append(this.htl);
            this.htl.css({
                position:"absolute",
                right:2,
                top:(this.args.holder.height()-h)/2,
                "width":w,
                "height":h,
                "z-index":1
            });
            this.paper = Raphael(this.htl.get(0),w,h);
            var r=w/2,per=h/this.args.count;
            var start = per/2;
            this.steps=this.paper.set();
            for(var i=0;i<this.args.count;i++){
                this.steps.push(this.createStep({
                    cy:start+(i*per),
                    cx:r,
                    r:r
                }));
            }
        },
        createStep:function(attr){
            var circle = this.paper.circle(attr.cx,attr.cy,attr.r).attr({
                cursor:"pointer"
            });
            var ctx = this;
            circle.mouseover(function(){
                if(ctx.activeEl!=circle) {
                    ctx.active(circle);
                }
            });
            circle.mouseout(function(){
                if(ctx.activeEl!=circle){
                    ctx.unactive(circle);
                }
            });
            this.unactive(circle);
            return circle;
        },
        active:function(el){
            el.attr({
                "fill":"orange",
                "stroke":"none"
            });
        },
        unactive:function(el){
            el.attr({
                "fill":"r#D0DABB-#969292",
                "stroke":1
            });
        },
        jumpTo:function(step){
            step=parseInt(step);
            if(step<0){
                step=0;
            }
            if(step>=this.args.count){
                step=this.args.count-1;
            }
            if(this.activeEl){
                this.unactive(this.activeEl);
            }
            this.active(this.steps[step]);
            this.activeEl=this.steps[step];
        },
        hide:function(){
            this.htl.hide();
        },
        show:function(){
            this.htl.show();
        }
    };
    return tmp;
});