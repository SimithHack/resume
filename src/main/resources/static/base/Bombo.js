/**
 * Created by 富强 on 2015/7/15 0015.
 */
define("base/Bombo",[],function(){
    var tmp=function(args){
        this.args= $.extend({
            paper:null,
            ms:500,
            text:"",
            color:"orange",
            fontColor:"black",
            opacity:0.6,
            r:20,
            cx:0,cy:0
        },args);
        if(this.args.paper){
            this.init();
        }else{
            throw "bad arguments";
        }
    };
    tmp.prototype={
        init:function(){
            var paper = this.args.paper, attr = this.args, ctx = this;
            this.circle = paper.circle(attr.cx,attr.cy,attr.r).attr({
                fill:attr.color,
                "fill-opacity":attr.opacity,
                stroke:"none"
            });
            this.text = paper.text(attr.cx,attr.cy,attr.text).attr({
                "font-size":(attr.r *1.5)/(attr.text.split("").length),
                "fill":attr.fontColor
            });
            this.circle.animate({
                r:attr.r/2,
                "fill-opacity":0.1
            },attr.ms,function(){
                ctx.remove();
            });
        },
        remove:function(){
            this.circle.remove();
            this.text.remove();
            delete this;
        },
        toBack:function(){
            this.text.toBack();
            this.circle.toBack();
        }
    };
    return tmp;
});