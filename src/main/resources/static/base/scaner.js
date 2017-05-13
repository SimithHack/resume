/**
 * Created by ��ǿ on 2015/7/13 0013.
 */
define("base/scaner",[],function(){
    return {
        scan:function(root,key,map){
            root.find("["+key+"]").each(function(idx,dom){
                var tmp = $(dom);
                map[tmp.attr(key)]=tmp;
            });
        },
        concentricCircle:function(args){
            args=$.extend({
                cx:0,cy:0,rmax:100,rmain:10,paper:null
            },args);
            if(args.paper){
                var path = args.paper.path([
                    ["M",args.cx+args.rmax,args.cy],
                    ["A",args.rmax,args.rmax,0,1,0,args.cx+args.rmax,args.cy+0.01],
                    ["Z"]
                ]);
                return path;
            }else{
                throw "bad arguments!";
            }
        },
        getCirclePositon:function(args){
            return {
                x:args.cx+Math.cos(args.reg)*args.r,
                y:args.cy-Math.sin(args.reg)*args.r
            };
        },
        getRotateText:function(text,pos,reg,attr,paper){
            var middle={
                x:pos.r*Math.cos(reg)+pos.cx,
                y:pos.cy-pos.r*Math.sin(reg)
            };
            var txt = paper.text(middle.x,middle.y,text).attr(attr);
            txt.reg=reg;
            txt.rotate(90-(reg*180)/Math.PI);
            return txt;
        }
    };
});