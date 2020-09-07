;(function($, win){

    win.Assets = {

        _ress: {},

        require: function(ress, callback, failcallback) {

            var req  = [],
                ress = $.isArray(ress) ? ress:[ress];

            for (var i=0, len=ress.length; i<len; i++) {

                if(!ress[i]) continue;

                if (!this._ress[ress[i]]) {
                   var url = ress[i].split("?")[0];
                   if (url.match(/\.js$/)) {
                    this._ress[ress[i]] = this.getScript(ress[i]);
                   } else {
                    this._ress[ress[i]] = this.getCss(ress[i]);
                   }
                }
                req.push(this._ress[ress[i]]);
            }

            return $.when.apply($, req).done(callback).fail(function(){
                failcallback ? failcallback() : $.error("Require failed: \n"+ress.join(",\n"));
            });
        },

        getScript: function(url, callback) {

            var d = $.Deferred(), script = document.createElement('script');

            script.async = true;

            script.onload = function() {
                d.resolve();
                if(callback) { callback(script); }
            };

            script.onerror = function() {
                d.reject(url);
            };

            script.src = url;

            document.getElementsByTagName('head')[0].appendChild(script);

            return d.promise();
        },

        getCss: function(url, callback){
            var d         = $.Deferred(),
                link      = document.createElement('link');
                link.type = 'text/css';
                link.rel  = 'stylesheet';
                link.href = url;

            document.getElementsByTagName('head')[0].appendChild(link);

            var img = document.createElement('img');
                img.onerror = function(){
                    d.resolve();
                    if(callback) callback(link);
                };
                img.src = url;

            return d.promise();
        }
    };

})(jQuery, window);
