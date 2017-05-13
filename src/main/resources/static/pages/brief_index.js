/**
 create by xfq
 2015/7/18 0018
 */
define("pages/brief_index", ["text!pages/brief_index.html","base/Ability"], function (htl,Ability) {
    var tmp = function (args) {
        this.args = $.extend({}, args);
        this.root=$(htl);
        this.init();
    };
    tmp.prototype = {
        init:function(){
            var pos = this.getPos();
            this.paper=Raphael(this.root.get(0),pos.w,pos.h);
            this.initSvg();
            this.initMain();
        },
        initSvg:function () {
            var pos = this.getPos(),step=10;
            for(var i=0;i<pos.w;){
                this.paper.path("M"+i+" 0L "+i+" "+pos.h).attr({
                    stroke:"#F4F3E7"
                });
                i+=step;
            }
        },
        getPos:function(){
            return {
                w:this.root.width(),h:this.root.height()
            };
        },
        initMain:function(){
            var pos = this.getPos();
            var main = this.paper.circle(pos.w/2,pos.h/2,150).attr({
                fill:"#5E9F27",
                stroke:"none"
            });
            this.mainGlow = this.paper.circle(pos.w/2,pos.h/2,160).attr({
                "stroke-width":4,
                "stroke-dasharray":"- ",
                "stroke":"#5E9F27"
            });
            main.glow({
                width:14,
                opacity:0.6,
                color:"#5E9F27"
            });
            this.paper.circle(pos.w/2,pos.h/2,230).attr({
                "stroke-width":6,
                "stroke":"#4D4D66",
                "fill":"none"
            });
            var cx = main.attr("cx"),cy=main.attr("cy"),r=230;
            this.abilities = {};
            this.abilities.baseInfo=new Ability({
                cx:cx,cy:cy,reg:Math.PI*0.5,color:"#C74481",text:"基本信息",paper:this.paper,r:r,
                type:"baseInfo"
            });
            this.abilities.workExp = new Ability({
                cx:cx,cy:cy,reg:Math.PI*0.1,color:"#C9B241",text:"工作经历",paper:this.paper,r:r,
                type:"workExp"
            });

            this.abilities.ability=new Ability({
                cx:cx,cy:cy,reg:Math.PI*0.9,color:"#9C41CA",text:"技能特长",paper:this.paper,r:r,
                type:"ability"
            });
            this.abilities.projExp=new Ability({
                cx:cx,cy:cy,reg:Math.PI*1.3,color:"#458BC7",text:"项目经验",paper:this.paper,r:r,
                type:"projExp"
            });
            this.abilities.other=new Ability({
                cx:cx,cy:cy,reg:Math.PI*1.7,color:"#44C941",text:"其他",paper:this.paper,r:r,
                type:"other"
            });
            this.regEvent();
        },
        regEvent:function(){
            var ctx = this;
            eve.on("element.ability.click",function(){
                eve("router.navigate",ctx,"brief/"+this.args.type);
            });
        },
        show:function(){
            this.root.removeClass("hide");
            this.play();
        },
        hide:function(){
            this.root.addClass("hide");
            this.stop();
        },
        play:function(){
            if(!this.mainGlowAn){
                this.mainGlowAn=Raphael.animation({
                    transform:"r360"
                },30000).repeat("Infinity");
            }
            this.mainGlow.animate(this.mainGlowAn);
            $.each(this.abilities,function(key,ab){
               ab.play();
            });
        },
        stop:function(){
            this.mainGlow.stop();
            $.each(this.abilities,function(key,ab){
                ab.stop();
            });
        }
    };
    return tmp;
});