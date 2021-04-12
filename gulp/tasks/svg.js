module.exports = ()=>{
    $.gulp.task('svg', ()=>{
        return $.gulp.src('src/static/svg/**/*.svg')
            .pipe($.gp.svgmin())
            // .pipe($.gp.cheerio({
            //     run:($)=>{
            //         $('[fill]').removeAttr('fill')
            //         $('[stroke]').removeAttr('stroke')
            //         $('[style]').removeAttr('style')
            //     },
            //     parserOptions:{xmlMode:true}
            // }))
            // .pipe($.gp.replace('&gt;','>'))
            // .pipe($.gp.svgSprite({
            //     mode:{
            //         symbol:{
            //             sprite:"sprite.svg"
            //         }
            //     }
            // }))
            .pipe($.gulp.dest('build/static/svg/'))
            .on('end', $.bs.reload)
    })
}