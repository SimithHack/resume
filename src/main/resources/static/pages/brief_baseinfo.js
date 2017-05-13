define("pages/brief_baseinfo",
    ["text!pages/brief_baseinfo.html","base/scaner","base/DrawUtil"],
function(htl,sc,drawUtil){
    var tmp = function(args){
        this.root = $(htl);
        this.fields={};
        sc.scan(this.root,"data-field",this.fields);
    };
    tmp.prototype={
        init:function(){
            var fd = this.fields,w=fd.rolllogo.width(),h=fd.rolllogo.height();
            var paper = Raphael(fd.rolllogo.get(0),w,h);
            var r=w/2-10,cx=w/ 2,cy=h/2;
           /* paper.circle(cx,cy,r).attr({
                fill:"white",
                stroke:"none"
            });*/
            this.outsider=paper.circle(cx,cy,w/2-2).attr({
                fill:"none",
                stroke:"white",
                "stroke-width":2,
                "stroke-dasharray":"- "
            });
            this.paper=paper;
            this.getSector({
                cx:cx,cy:cy,r:r,color:"red",reg:Raphael.rad(72),startReg:Raphael.rad(54),
                text:"学历信息"
            });
            this.getSector({
                cx:cx,cy:cy,r:r,color:"orange",reg:Raphael.rad(72),startReg:Raphael.rad(126),
                text:"通信方式"
            });
            this.getSector({
                cx:cx,cy:cy,r:r,color:"blue",reg:Raphael.rad(72),startReg:Raphael.rad(198),
                text:"政治背景"
            });
            this.getSector({
                cx:cx,cy:cy,r:r,color:"purple",reg:Raphael.rad(72),startReg:Raphael.rad(270),
                text:"身体状况"
            });
            this.getSector({
                cx:cx,cy:cy,r:r,color:"green",reg:Raphael.rad(72),startReg:Raphael.rad(342),
                text:"其他信息"
            });
        },
        getSector:function(args){
            args= $.extend({
                text:"",
                cx:0,cy:0,r:0,reg:0,startReg:0,
                color:"white"
            },args);
            args.paper=this.paper;
            var ctx = this;
            var sector = drawUtil.getSector(args);
            sector.attr({
                fill:args.color,
                "stroke":"none"
            });
            var dis = drawUtil.getCircleDis({
                reg:args.startReg+args.reg/2,d:5
            });
            if(!sector.overan){
                sector.overan=Raphael.animation({
                    transform:"t"+dis.x+","+(0-dis.y)
                },500,"bounce");
                sector.outan=Raphael.animation({
                    transform:"t0,0"
                },200,"bounce");
            }
            sector.mouseover(function(){
                this.stop();
                this.animate(this.overan);
                var infoView=ctx.fields[args.color+"Info"];
                if(infoView){
                    var bgColor=infoView.css("background-color");
                    infoView.animate({
                        "background-color":this.attr("fill"),
                        opacity:0.3
                    },200,"linear",function(){
                        infoView.animate({
                            "background-color":bgColor,
                            opacity:1
                        },500);
                    });
                }
            });
            sector.mouseout(function(){
                this.stop();
                this.animate(this.outan);
            });
            drawUtil.getRotateTexts({
                text:args.text,
                cx:args.cx,cy:args.cy,r:args.r-14,
                reg:args.reg/2+args.startReg,
                paper:this.paper,
                attr:{
                    "font-size":14,
                    "fill":"white"
                }
            });
            return sector;
        },
        hide:function(){
            this.root.addClass("hide");
            this.stop();
        },
        show:function(){
            this.root.removeClass("hide");
            this.play();
        },
        stop:function(){
            this.outsider.stop();
        },
        play:function(){
            var fd = this.fields, ctx=this;
            var h = fd.content.height();
            fd.content.css({
                height:"0px",
                opacity:"0.1"
            });
            fd.content.animate({
                height:h+"px",
                opacity:"1"
            },500,"easeOutBounce");
            //外围光圈动画
            if(!ctx.outsiderAn){
                ctx.outsiderAn=Raphael.animation({
                    transform:"r360"
                },60000).repeat("Infinity");
            }
            this.outsider.animate(ctx.outsiderAn);
            this.root.find(".info-box").css("opacity",0);
            setTimeout(function(){
                ctx.playInfo();
            },500);
        },

        playInfo:function(){
            var fd = this.fields;
            function play(view,cb){
                view.animate({
                    opacity:1
                },500,"linear",cb);
            }
            play(fd.redInfo,function(){
                play(fd.orangeInfo,function(){
                    play(fd.purpleInfo,function(){
                        play(fd.blueInfo,function(){
                            play(fd.greenInfo,function(){});
                        })
                    })
                })
            })
        }
    };
    return tmp;
});