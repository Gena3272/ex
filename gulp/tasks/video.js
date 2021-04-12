module.exports = ()=>{
    $.gulp.task('video', ()=>{
        return $.gulp.src('src/static/video/**/*')
            .pipe($.gulp.dest('build/static/video'))
            .pipe($.bs.reload({
                    stream: true,
                }));
    })
}
