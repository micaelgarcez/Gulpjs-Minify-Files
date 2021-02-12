const gulp =  require('gulp')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const pipeline = require('readable-stream').pipeline
const htmlmin = require('gulp-htmlmin')
const del = require('del')

function minifyCss() {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie10'}))
    .pipe(gulp.dest('./dist/css'));
}

function minifyJs() {
  return pipeline(
    gulp.src('./src/js/*.js'),
    uglify(),
    gulp.dest('./dist/js')
  );
}

function minifyHtml() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
}

async function deleteMinify() {
  await del('dist');
  return;
}

exports.default = gulp.series(deleteMinify, minifyCss, minifyJs, minifyHtml);