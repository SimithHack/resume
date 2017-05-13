/**
 * Created by ��ǿ on 2015/7/13 0013.
 */
$(function(){
    requirejs.config({
        baseUrl:"lib",
        paths:{
            "pages":"../pages",
            "base":"../base"
        }
    });
    require(["text","base/scaner"],function(_txt,sc){
        var content = $(".content");
        var navs = $(".nav");
        var fds = {};
        sc.scan(navs,"data-field",fds);
        var Router = Backbone.Router.extend({
            initialize:function(){
                this.views={};
            },
            routes:{
                "home":"home",
                "blog":"blog",
                "other":"other",
                "brief/:type":"brief",
                "brief":"brief"
            },
            home:function(){
                fds.home.trigger("click");
                require(["pages/home"],function(Home){
                   /*var home = new Home();
                    home.root.appendTo(content);*/
                });
            },
            blog:function(){
                fds.blog.trigger("click");
            },
            other:function(){
                fds.other.trigger("click");
            },
            brief:function(type){
                var ctx = this;
                fds.brief.trigger("click");
                require(["pages/brief"],function(Brief){
                    ctx.hideAll();
                    if(!ctx.views.brief){
                        ctx.views.brief=new Brief();
                        ctx.views.brief.root.appendTo(content);
                        ctx.views.brief.init();
                    }
                    ctx.views.brief.root.removeClass("hide");
                    ctx.views.brief.jumpTo(type);
                });
            },
            hideAll:function(){
                for(var key in this.views){
                    this.views[key].root.addClass("hide");
                }
            }
        });
        var router = new Router();
        eve.on("router.navigate",function(des){
           router.navigate(des,{trigger:true});
        });
        navs.on("click","li",function(){
            navs.find(">li").removeClass("active");
            $(this).addClass("active");
        });
        Backbone.history.start();
    });
});