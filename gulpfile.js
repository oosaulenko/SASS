/**
 * Created by oosaulenko on 03.04.2017.
 */
var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    sass = require('gulp-sass'),
    // sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('compass-importer'),
    notify = require("gulp-notify"),
    watch = require('gulp-watch'),
    dest = require('gulp-dest'),
    combineMq = require('gulp-combine-mq');
/**
 * For svg sprite
 * */
// var svgstore = require('gulp-svgstore'),
//     svgmin = require('gulp-svgmin'),
//     path = require('path');

gulp.task('START', ['sass', 'browsersync'], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('browsersync', function () {
    browsersync.init({
        //logLevel: "debug",
        //logConnections: true,
        snippetOptions: {
            // Provide a custom Regex for inserting the snippet.
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) { return snippet + match; }
            }
        },
        // proxy: {
        //     target: "http://rock.com"
        // },
        // host: 'rock.com',
        // port: 80,        //socket: {
        open: false,
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        reloadDelay: 0,
        reloadOnRestart: true,
        //scrollProportionally: true,
        // rewriteRules: [
        //     {
        //         match: /(http?\:)?\/\/(rock)?(\.)?(com)?(com)?(localhost)?(\:)?(81)?(3001)?(8080)?(3000)?\/style\.css(\?)?([^\s]*)?(?=\")/g,
        //         fn: function () {
        //             return ('/style.css')
        //         }
        //     }
        // ],
        files: "*.css",
        middleware: require("serve-static")("./")
        // injectChanges: true // Inject CSS changes
    })
});

gulp.task('sass', function () {
    return gulp.src('sass/style.scss')
    // .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded', // libsass support expanded, compressed, nested
            precision: 10,
            errLogToConsole: true,
            importer: compass,
            includePaths: [
                './node_modules/susy/sass', //required for sass
                './node_modules/breakpoint-sass/stylesheets' //required for sass
            ]
        }).on('error', sass.logError))
        //.pipe(autoprefixer('last 4 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(sourcemaps.write())
        //// Reinitialise sourcemaps, loading inline sourcemap.
        //.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(combineMq({
            beautify: true
        }))
        // .pipe(sourcemaps.write(''))
        //.pipe(minifyCSS()) //move to prod settings
        .pipe(gulp.dest(''))
        .pipe(notify({
            message: 'Компиляция SASS прошла успешно !'
        }))
});