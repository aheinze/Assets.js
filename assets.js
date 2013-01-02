;(function($, win){
 
    win.Assets = {
 
        _ress: {},
 
        require: function(ress, callback) {
 
            var req  = [],
                ress = $.isArray(ress) ? ress:[ress];
 
            for (var i=0, len=ress.length; i<len; i++) {
 
                if (!this._ress[ress[i]]) {
                   if (ress[i].match(/\.js$/)) {
                    this._ress[ress[i]] = this.getScript(ress[i]);
                   } else {
                    this._ress[ress[i]] = this.getCss(ress[i]);
                   }
                }
                req.push(this._ress[ress[i]]);
            }
 
            $.when.apply(null, req).done(callback);
        },
 
        getScript: function(url, callback) {
            return $.getScript(url, callback);
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