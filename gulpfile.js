'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

gulp.task('styles', function () {
    return gulp.src('./src/css/**/*.css')
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'))
});


// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('./dist/js'))
});


gulp.task('pages', function () {
    return gulp.src(['./src/index.html'])
        .pipe(inject(gulp.src('./dist/css/**/*.css')))
        .pipe(inject(gulp.src('./dist/js/**/*.js')))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            port: 3000
        }));
});


gulp.task('default', function() {
    return gulp.watch('./', gulp.series('pages', 'webserver'))
});

// gulp.task('watch', ['serve'], function () {
//     gulp.watch('./', ['inject']);
// });