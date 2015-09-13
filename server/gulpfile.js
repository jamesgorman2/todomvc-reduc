var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('default', function() {
  gulp.start('build');
});

gulp.task('build', function() {
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  watch('**/*.js', batch(function (events, done) {
    gulp.start('build', done);
  }));
});
