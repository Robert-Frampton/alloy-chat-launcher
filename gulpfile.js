var gulp = require('gulp');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');

gulp.task(
    'lint',
    function() {
        return gulp.src('chat-launcher.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    }
);

gulp.task(
    'minify',
    function() {
        var minify = gulp.src('chat-launcher.js')
            .pipe(gulp.dest('build'))
            .pipe(rimraf())
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('build'));

        return minify;
    }
);

gulp.task('default', ['lint', 'minify']);