module.exports = ()=>{
    $.gulp.task('font', ()=>{
        return $.gulp.src('src/static/fonts/**/*.ttf')
            .pipe($.gulp.dest('build/static/fonts'))
    })
}
