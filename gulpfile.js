'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');


gulp.task('default', ['styles', 'scripts', 'pages']);

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
        .pipe(inject( gulp.src('./dist/css/**/*.css'), { relative:true } ))
        .pipe(inject( gulp.src('./dist/js/**/*.js'), { relative:true } ))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./'));
});