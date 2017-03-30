'use strict';

module.exports = function() {
    $.gulp.task('copy:sites', function() {
        return $.gulp.src('./source/sites/**/*.*', { since: $.gulp.lastRun('copy:sites') })
            .pipe($.gulp.dest($.config.root + '/sites'));
    });
};