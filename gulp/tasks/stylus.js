module.exports =()=>{
    $.gulp.task('stylus', ()=>{
        return $.gulp.src('src/static/stylus/*.styl')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.stylus({
                'include css': true
            }))
            .pipe($.gp.autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .on("error", $.gp.notify.onError({
                title: "stylus"
            }))
            .pipe($.gp.csso())
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest('build/static/css/'))
            .pipe($.bs.reload({
                stream: true,
            }));
    })
}