var gulp = require('gulp'),
	connect = require('gulp-connect'),
	babel = require('gulp-babel'),
	webpack = require('webpack-stream');

gulp.task('web-server', function(){
	connect.server({
		livereload: true,
		port: 3030
	})
});

gulp.task('babel', function(){
	return gulp.src('./es6/*.js')
			   .pipe(babel({
			   		presets: ['es2015']
			   }))
			   .pipe(gulp.dest('./es5'))
    		   .pipe(connect.reload());
})

gulp.task('webpack', function(){
	return gulp.src('./es5/*.js')
			   .pipe(webpack({
			   		output: {
			   			filename: '../javascript/boundle.js'
			   		}
			   }))
			   .pipe(gulp.dest('./javascript'))
    		   .pipe(connect.reload());
})


gulp.task('index', function(){
	gulp.src('index.html')
		.pipe(connect.reload());
})


gulp.task('watch', function(){
	gulp.watch('./js/*.js', ['babel']);
	gulp.watch('./es5/*.js', ['webpack']);
	gulp.watch('index.html', ['index']);
})

gulp.task('default', ['web-server', 'babel', 'webpack', 'watch']);
