/**
 create by xfq
 2015/7/20 0020
 */
define("base/DrawUtil", [], function () {
    return {
        getCirclePositon:function(args){
            return {
                x:args.cx+Math.cos(args.reg)*args.r,
                y:args.cy-Math.sin(args.reg)*args.r
            };
        },
        getSector:function(args){
            args= $.extend({
                cx:0,cy:0,reg:0,r:0,paper:null,startReg:0
            },args);
            if(args.paper){
                var sp=this.getCirclePositon({cx:args.cx,cy:args.cy,r:args.r,reg:args.startReg});
                var ep=this.getCirclePositon({cx:args.cx,cy:args.cy,r:args.r,reg:args.startReg+args.reg});
                return args.paper.path([
                    ["M",args.cx,args.cy],
                    ["L",sp.x,sp.y],
                    ["A",args.r,args.r,0,0,0,ep.x,ep.y],
                    ["Z"]
                ]);
            }else{
                throw "bad arguments!";
            }
        },
        //ªÒ»°∑˘≥§æ‡¿Î
        getCircleDis:function(args){
            args= $.extend({
                reg:0,d:0
            },args);
            return {
                x:Math.cos(args.reg)*args.d,
                y:Math.sin(args.reg)*args.d
            }
        },
        getRotateTexts:function(args){
            var args = $.extend({
                text:"",
                cx:0,cy:0,r:0,
                reg:0,
                attr:{},
                paper:null
            },args);
            var ts = args.text.split("");
            var sets = args.paper.set();
            var len = ts.length*args.attr["font-size"];
            var treg = 2*Math.asin(len/(2*args.r));
            var startReg = args.reg+treg/2;
            var preg = treg/ts.length;
            for(var i=0;i<ts.length;i++){
                var tmp = $.extend(args,{
                    reg:startReg-(i*preg),
                    text:ts[i]
                });
                sets.push(this.getRotateText(tmp));
            }
            return sets;
        },
        getRotateText:function(args){
            var middle={
                x:args.r*Math.cos(args.reg)+args.cx,
                y:args.cy-args.r*Math.sin(args.reg)
            };
            var txt = args.paper.text(middle.x,middle.y,args.text).attr(args.attr);
            txt.reg=args.reg;
            txt.rotate(90-Raphael.deg(args.reg));
            return txt;
        }
    };
});