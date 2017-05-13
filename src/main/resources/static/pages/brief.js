/**
 * Created by xfq on 2015/7/13 0013.
 */
define("pages/brief",
    ["text!pages/brief.html","base/scaner","base/ProcessBar"],
function(ht,sc,ProcessBar){
    var tmp = function(){
        this.root=$(ht);
        this.fields={};
        sc.scan(this.root,"data-field",this.fields);
    };
    tmp.prototype={
        init:function(){
            this.views={};
            this.processBar = new ProcessBar({
                holder:this.root,
                count:5
            });
            this.regEvent();
        },
        regEvent:function(){
            var ctx = this;
        },
        hideAll:function(){
            for(var key in this.views){
                this.views[key].hide();
            }
        },
        jumpTo:function(type){
            var ctx = this;
            this.processBar.show();
            switch(type){
                case "baseInfo":
                    this.processBar.jumpTo(0);
                    require(["pages/brief_baseinfo"],function(BaseInfo){
                        ctx.hideAll();
                        if(!ctx.views.baseInfo){
                            ctx.views.baseInfo=new BaseInfo();
                            ctx.views.baseInfo.root.appendTo(ctx.root);
                            ctx.views.baseInfo.init();
                        }
                        ctx.views.baseInfo.show();
                    });
                    break;
                case "workExp":
                    this.processBar.jumpTo(1);
                    require(["pages/brief_workexp"],function(WorkExp){
                        ctx.hideAll();
                        if(!ctx.views.workView){
                            ctx.views.workView = new WorkExp();
                            ctx.views.workView.root.appendTo(ctx.root);
                            ctx.views.workView.init();
                        }
                        ctx.views.workView.show();
                    });
                    break;
                case "ability":
                    this.processBar.jumpTo(2);
                    break;
                case "projExp":
                    this.processBar.jumpTo(3);
                    break;
                case "other":
                    this.processBar.jumpTo(4);
                    break;
                default :
                    this.processBar.hide();
                    require(["pages/brief_index"],function(IndexView){
                        ctx.hideAll();
                        if(!ctx.views.indexView){
                            ctx.views.indexView = new IndexView();
                            ctx.views.indexView.root.appendTo(ctx.root);
                            ctx.views.indexView.init();
                        }
                        ctx.views.indexView.show();
                    });
                    break;
            }
        }
    };
    return tmp;
});