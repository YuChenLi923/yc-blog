const gulp = require('gulp'),
      sftp = require('gulp-sftp'),
      sftpConfig = require('./config/sftp');
gulp.task('default', () => {
  return gulp.src('dist/**')
    .pipe(sftp(sftpConfig));
});
