var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

var path = {
	root: 'src/',
	dist: function () {
		return this.root + 'dist/'
	}
};

//connect
gulp.task('connect', function () {
	connect.server({
		root: 'src',
		port: 3000,
		livereload: true
	});
});

//styles
gulp.task('styles', function () {
	return gulp.src([
			path.root + '**/reset.styl',
			path.root + '**/*.styl'
		])
		.pipe(concat('bundle.styl'))
		.pipe(stylus({
			use: [nib()],
			compress: false
		}))
		.pipe(gulp.dest(path.dist()))
		.pipe(connect.reload());
});

//html
gulp.task('html', function () {
	return gulp.src(path.root + '**/*.html')
		.pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
	gulp.watch(path.root + '**/*.styl', ['styles']);
	gulp.watch(path.root + '**/*.html', ['html']);
});

gulp.task('default', [
	'connect', 
	'styles', 
	'html', 
	'watch'
]);