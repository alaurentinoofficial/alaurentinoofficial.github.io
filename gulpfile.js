'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src(['./src/imgs/**/*.png', './src/imgs/**/*.jpg', './src/imgs/**/*.jpeg', './src/imgs/**/*.svg'])
        // Minify the photos
        .pipe(imagemin())
        // Output
        .pipe(gulp.dest('./dist/imgs'))
});

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
    return gulp.src(['./src/*.html'])
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
            open: true,
            port: 3000
        }));
});


gulp.task('watch', function () {
    gulp.watch(['./src/imgs/**/*.png', './src/imgs/**/*.jpg', './src/imgs/**/*.jpeg', './src/imgs/**/*.svg'], gulp.series('images'));
    gulp.watch('./src/*.html', gulp.series('pages'));
    gulp.watch('./src/css/**.css', gulp.series('styles'));
    gulp.watch('./src/js/**.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('webserver', 'watch'));