module.exports =()=>{
    $.gulp.task('serve', function() {
        $.bs.init({
            server: {
                baseDir: "./build"
            }
        });
    });
}