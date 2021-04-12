module.exports = ()=>{
    $.gulp.task('pug', ()=>{
        return $.gulp.src('src/pug/pages/*.html')
            // .pipe($.gp.pug({
            //     pretty: true// не минимизировать
            // }))
            .pipe($.gulp.dest('build'))
            .on('end', $.bs.reload);
    })
}