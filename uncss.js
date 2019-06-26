var uncss = require('uncss');

var files = ['dist/index.html', 'dist/contact.html'];
var options = {
        banner       : false,
        htmlroot     : 'dist/',
        ignore       : ['#added_at_runtime', /test\-[0-9]+/],
        ignoreSheets : [/fonts.googleapis/],
        jsdom        : {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
        },
        //  media        : ['(min-width: 1900px) handheld and (orientation: landscape)'],
        report       : false,
        strictSSL    : true,
        stylesheets  : ['css/styles-v1.css'],
        timeout      : 1000,
        userAgent    : 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
    };

var fs = require('fs');
var cssFileName = "dist/css/style.css";

console.log("------------------------------------------------------------");
console.log("uncss");

uncss(files, options, function (error, output) {

    if(error === null) {
        fs.writeFile(cssFileName, output, function(err) {
            if(err) {
                return console.log(err);
            } else {
                console.log("success");
                console.log("output file: " + cssFileName);    
            }
        });    
    } else {
        console.log(error);
    }

    
});