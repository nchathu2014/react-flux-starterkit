/**
 * Created by UCHATNU on 6/29/2016.
 */

var config={
    port:9005,
    devBaseUrl:'http://localhost',
    paths:{
        html:'./src/*.html',
        js:'./src/**/*.js',
        css:[
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist:'./dist',
        mainJs:'./src/main.js'
    }
};

module.exports = config;