/**
 * Created by ¸»Ç¿ on 2015/7/15 0015.
 */
define("base/FlowLine",[],function(){
    var tmp = function(args){
        this.args = $.extend({
            paper:null,
            x1:0,y1:0,
            x2:0,y2:0,
            len:80,color:"orange",ms:200
        },args);
        if(this.args.paper){
            this.init();
        }else{
            throw "bad arguments";
        }
    };
    tmp.prototype={
        init:function(){
            var paper = this.args.paper, args = this.args;
            this.line=paper.path([
                ["M",args.x1,args.y1-args.len],
                ["L",args.x1,args.y1]
            ]).attr({
                "stroke-width":1,
                "stroke":args.color
            });
            /*this.glow=this.line.glow({
                width:3,
                color:args.color,
                opacity:0.6
            });*/
            this.play();
        },
        play:function(){
            var ctx = this;
            var args = this.args;
            this.line.animate({
                path:[
                    ["M",args.x2,args.y2],
                    ["L",args.x2,args.y2+args.len]
                ]
            },args.ms,function(){
                ctx.remove();
            });
            /*this.glow.animate({
                path:[
                    ["M",args.x2,args.y2],
                    ["L",args.x2,args.y2+args.len]
                ]
            },args.ms,function(){
                ctx.remove();
            });*/
        },
        remove:function(){
            this.line.remove();
            /*this.glow.remove();*/
        },
        toBack:function(){
            this.line.toBack();
        }
    };
    return tmp;
});