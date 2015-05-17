var origin = window.location.origin;
var pathname = window.location.pathname;
var baseUrl = origin + pathname.toLowerCase().replace("index.html", "");

require.config({
    baseUrl: baseUrl,
    async:true,
    paths: {
        aurelia: baseUrl + "libs/aurelia",
        views: baseUrl + "app/views"
    },
    shim: {
        underscore: {
            exports: "_"
        }
    }
});

require(["aurelia/aurelia-bundle-latest"], function(au) {
    require(["aurelia-bundle-manifest"], function(abm) {
        require(["aurelia-bootstrapper"], function(b) {});
    });
});
    