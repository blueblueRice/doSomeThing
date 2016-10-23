//gulp

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	babel = require('gulp-babel');

gulp.task('web-server', function(){
	connect.server({
		livereload: true,
		port: 3030
	})
});

gulp.task('babel', function(){
	return gulp.src('./js/*.js')
			   .pipe(babel({
			   		presets: ['es2015']
			   }))
			   .pipe(gulp.dest('./javascript'))
    		   .pipe(connect.reload());

})

gulp.task('watch', function(){
	gulp.watch('./js/*.js', ['babel']);
	gulp.watch('index.html', function(){
			gulp.src('index.html')
				.pipe(connect.reload())
		})
})

gulp.task('default', ['web-server', 'babel', 'watch']);
