var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
    return gulp.src(['./public/bootstrap/less/bootstrap.less', './public/less/site.less'])
        .pipe(less({
            compress: true
        }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('minify-js', function() {
    return gulp.src(['./public/jquery/dist/jquery.js', './public/bootstrap/dist/js/bootstrap.js', './public/js/**/*.js'])
        .pipe(uglify())
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('./public/**/*.less', ['minify-css']);
    gulp.watch('./public/js/**/*.js', ['minify-js']);
});

gulp.task('default', ['watch', 'minify-css', 'minify-js']);
