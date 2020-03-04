var gulp 		= require('gulp');
var browserSync = require('browser-sync').create();
var sass 		= require('gulp-sass');
var plumber 	= require('gulp-plumber');
var notify 		= require('gulp-notify');
var autoprefixer= require('gulp-autoprefixer');
var watch 		= require('gulp-watch');
var csscomb		= require('gulp-csscomb');

gulp.task('default', ['server', 'styles', 'watch'] );

gulp.task('server', function() {
	browserSync.init({
		server: { baseDir: './app/'},
		browser: 'chrome',
		notify: true
	});
	
	// watch('./app/#source/*.css', {readDelay: 500}, function(){gulp.start('styles');});
    // watch(['./app/*.html', './app/img/**/*.*']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
	gulp.watch('./app/#source/*.css', {readDelay: 500}, function(){gulp.start('styles');});
	gulp.watch(['./app/*.html', './app/style1.css', './app/*.js', './app/img/**/*.*']).on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src('./app/#source/style.css')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Styles',
				sound: false,
				message: err.message
			}
		})
	}))
	.pipe(autoprefixer({
		browsers: ['last 6 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./app'))
	.pipe(browserSync.stream());
});

gulp.task('comb', function() {
  return gulp.src('./app/#source/style.css')
    .pipe(csscomb())
    .pipe(gulp.dest('./app/#source'));
});

