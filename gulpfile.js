var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
    return gulp.src(['./bower_components/bootstrap/less/bootstrap.less', './less/site.less'])
        .pipe(less({
            compress: true
        }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('minify-js', function() {
    return gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap/dist/js/bootstrap.js', './js/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('copy-fonts', function() {
    return gulp.src(['./bower_components/bootstrap/dist/fonts/*.*'])
        .pipe(gulp.dest('./static/fonts'));
});

gulp.task('jshint', function() {
    gulp.src(['./js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
    gulp.watch('./less/**/*.less', ['minify-css']);
    gulp.watch('./js/**/*.js', ['minify-js', 'jshint']);
});

gulp.task('default', ['minify-css', 'minify-js', 'watch']);
