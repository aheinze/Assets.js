Assets.js
=========

A simple assets manager utilizing jQuery's build in $.Deferred object.


    Assets.require(["mystyle.css", "myscript.js"], function(){
     
        alert("mystyle.css and myscript.js fully loaded!");
    });