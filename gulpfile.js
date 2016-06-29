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
var concat = require('gulp-concat'); //concatenate files
var lint = require('gulp-eslint'); //linting the js and jsx
var clean = require('gulp-clean');//Removes files and folders.
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
    gulp.watch(config.paths.js,['js','lint']);
});

//moving the src files into dest
gulp.task('html',function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
});

gulp.task('js',function(){
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error',console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload())
});

gulp.task('css',function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('lint',function(){
        return gulp.src(config.paths.js)
            .pipe(lint({config:'eslint.config.json'}))
            .pipe(lint.format())
            .pipe(lint.failAfterError());
});

gulp.task('clean',function(){
    return gulp.src(config.paths.dist + "/*", {read: false})
        .pipe(clean());
});



gulp.task('default',['clean','html','css','js','lint','open','watch']);

