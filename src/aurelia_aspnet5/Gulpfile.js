/// <binding BeforeBuild='build-ts' Clean='tsd' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var tsd = require('gulp-tsd');
var ts = require('gulp-typescript');
var merge = require('merge2');

gulp.task('build-ts', function () {
    var tsResult = gulp.src([
        './wwwroot/app/**/*.ts',
        './typings/**/*.d.ts',
        './*.ts'
    ],
        { base: "." })
    .pipe(ts({
        typescript: require('typescript'),
        declarationFiles: false,
        noExternalResolve: true,
        target: "es5",
        module: "amd",
        emitDecoratorMetadata: true
    }));

    return merge([
        tsResult.dts.pipe(gulp.dest('.')),
        tsResult.js.pipe(gulp.dest('.'))
    ]);
});

gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});
