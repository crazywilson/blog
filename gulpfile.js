var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var del = require('del');
const revReplace = require("gulp-rev-replace");
const runSequence = require('run-sequence');

gulp.task('clean', function() {
    return del(['docs', 'rev']);
});

gulp.task('copy', function() {
    return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/favicon.ico'], {
            base: 'public'
        })
        .pipe(gulp.dest('docs/'))
});

gulp.task('uglify', function() {
    return gulp.src('public/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
})

gulp.task('cssmin', function() {
    return gulp.src('public/css/*')
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'))
})

gulp.task('imagesMin', function() {
    return gulp.src('public/**/*.{jpg,png,svg,gif}', {
            base: 'public'
        })
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            multipass: true,
            svgoPlugins: [{ removeViewBox: true }],
            verbose: true,
        }))
        .pipe(gulp.dest('public'))
})

gulp.task("rev", function() {
    return gulp.src(['public/css/**/*.css', 'public/js/**/*.js', 'public/**/*.{jpg,png,svg,gif}'], {
            base: "public"
        })
        .pipe(rev())
        .pipe(gulp.dest("docs"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev"))
})

gulp.task("revreplace", function() {
    var manifest = gulp.src("rev/**/*.json");
    return gulp.src(["docs/js/**/*.js", "docs/css/**/*.css", 'docs/**/*.{jpg,png,svg,gif}', "docs/**/*.html"], {
            base: "docs"
        })
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest("docs"));
});

gulp.task('build', function(cb) {
    runSequence('clean', 'copy', ['uglify', 'imagesMin', 'cssmin'], 'rev', 'revreplace');
});
