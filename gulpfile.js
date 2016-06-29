/**
 * Created by UCHATNU on 6/29/2016.
 */

'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); //start a local dev server
var open = require('gulp-open'); //open url in a browser
var browserify = require('browserify'); // Bundling JS
var reactify = require('reactify');//transforming jsx to js
var source = require('vinyl-source-stream');//Use conventional text stream with gulp
var config = require("./config/client-config");//require the client config properties

//start a local development server
gulp.task('connect',function(){
    connect.server({
        root:['dist'],
        port:config.url,
        base:config.devBaseUrl,
        livereload:true
    });
});

//open files on the dev server
gulp.task('open',['connect'],function(){
    gulp.src('dist/index.html')
        .pipe(open({ uri:config.devBaseUrl + ":" + config.port + "/"}));
});

//watch files
gulp.task('watch',function(){
    gulp.watch(config.paths.html,['html']);
});

//moving the src files into dest
gulp.task('html',function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
});

gulp.task('js',function(){

});



gulp.task('default',['html','open','watch']);

