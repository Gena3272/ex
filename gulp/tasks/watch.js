module.exports =()=>{
    $.gulp.task('watch',()=>{
        $.gulp.watch('src/pug/**/*.html',$.gulp.series('pug'))
        $.gulp.watch('src/static/stylus/**/*.styl',$.gulp.series('stylus'))
        $.gulp.watch('src/static/js/**/*.js',$.gulp.series('scripts'))
        $.gulp.watch('src/static/img/**/*',$.gulp.series('img:dev'))
        $.gulp.watch('src/static/video/**/*',$.gulp.series('video'))
        $.gulp.watch('src/static/svg/**/*.svg',$.gulp.series('svg'))
    });
}