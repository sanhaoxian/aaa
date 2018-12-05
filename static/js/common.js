import Vue from 'vue'
import $ from 'jquery'

const Common = {
    ajaxRequest: function (urls, _this, callback) {
        var reqs = [];                       //定义一个容器（数组：用来盛放返回来的json数据）  
        
        //判断传过来的路径参数，是否为数组，不是的话转换为数组
        if( Array.isArray(urls) === false ){
            urls = [urls];
        }
       
        //each()遍历每一个urls数组中的每个元素，dummy是urls数组的索引，url是urls数组中的当前元素 
        $.each(urls, function(dummy, url) { 
            // _this.$http.get(url).then( 
            //     (response) => {
            //        return  reqs.push(response);
            // })
            //reqs.push(_this.$http.get(url, {emulateJSON:true}));
            try {
                //将每一个通过$.get获取的返回的json数据，push到容器reqs里面去
                reqs.push($.get(encodeURI(url), null, null, 'json'))
            }catch(error){
                console.log(error)
            }
        })  
        
        //console.log(reqs)
        
        /*
        *done()就是起回调函数的作用，在前者执行完了之后再运行
        *when()提供一种基于零个或多个可执行对象执行回调函数的方法
        *（可以兼容jQuery.ajax方法，处理promise对象，所以可以返回内容json数据）
        */
        
        $.when.apply(undefined, reqs).done( function () {
            var argArr = [];
            if( reqs.length > 1 ){
                $.each(arguments, function(dummy, arg){
                    var arg = $.makeArray(arg);
                    argArr.push(arg[0]);
                })
            }else{
                argArr.push(arguments[0]);
            }
            callback(argArr);
        })
        
    },
    zGetNode(a, b) {
        if (a.target.tagName === b) {
            return a.target;
        } else if (a.target.parentNode.tagName === b) {
            return a.target.parentNode;
        } else if (a.target.parentNode.parentNode.tagName === b) {
            return a.target.parentNode.parentNode;
        } else if (a.target.parentNode.parentNode.parentNode.tagName === b) {
            return a.target.parentNode.parentNode.parentNode;
        } else if (a.target.parentNode.parentNode.parentNode.parentNode.tagName === b) {
            return a.target.parentNode.parentNode.parentNode.parentNode;
        } else if (a.target.parentNode.parentNode.parentNode.parentNode.parentNode.tagName === b) {
            return a.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        } else {
            //console.warn("所选元素过长，不建议采用。");
            return a.target;
        }
    }
}

export default Common;