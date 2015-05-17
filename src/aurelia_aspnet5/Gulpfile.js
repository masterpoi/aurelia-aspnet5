/// <binding AfterBuild='build' Clean='tsd' />

 
var gulp = require('gulp');
var tsd = require('gulp-tsd');
var ts = require('gulp-typescript');
var merge = require('merge2');
var bower = require('gulp-bower');
var concat = require('gulp-concat');

var assetsRoot = "wwwroot/assets/";


gulp.task('bower', function () {
    return bower()
      .pipe(gulp.dest('wwwroot/libs/'))
});

gulp.task('custlibs', function() {
    return gulp.src("customlibs/**/*.*")
        .pipe(gulp.dest('wwwroot/libs'));
});

gulp.task('css', function() {
    return gulp.src(assetsRoot + 'css/**/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest(assetsRoot));
});
gulp.task('build', ['bower', 'css', 'build-ts', 'custlibs']);


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
