
let settings = {
    styles: true,
    scripts: true,
    reload: true
};


/**
 * Paths to project folders
 */
let paths = {
    input: ['lib/', 'templates/', 'content/'],
    utilityClassesSources: ['templates/**/*.html', 'content/**/*.lr', 'content/**/*.js'],
    output: 'assets/static/',
    styles: {
        input: 'lib/css/*.css',
        output: 'assets/static/css/'
    },
    scripts: {
        input: 'lib/js/*.js',
        polyfills: '.polyfill.js',
        output: 'assets/static/js/'
    },
    reload: './assets/static/'
};


/**
 * Gulp Packages
 */

// General
let {gulp, src, dest, watch, series, parallel} = require('gulp');

let flatmap = require('gulp-flatmap');
let lazypipe = require('lazypipe');
let rename = require('gulp-rename');
// let package = require('./package.json');

// Scripts
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let concat = require('gulp-concat');
let uglify = require('gulp-terser');
let optimizejs = require('gulp-optimize-js');

// Styles
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const minify = require('gulp-cssnano');

// BrowserSync
let browserSync = require('browser-sync');


// Repeated JavaScript tasks
let jsTasks = lazypipe()
    .pipe(optimizejs)
    .pipe(dest, paths.scripts.output)
    .pipe(rename, {suffix: '.min'})
    .pipe(uglify)
    .pipe(optimizejs)
    .pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
let buildScripts = function (done) {

    // Make sure this feature is activated before running
    if (!settings.scripts) return done();

    // Run tasks on script files
    return src(paths.scripts.input)
        .pipe(flatmap(function(stream, file) {

            console.log(paths.scripts.input);
            // If the file is a directory
            if (file.isDirectory()) {

                // Setup a suffix variable
                let suffix = '';

                // If separate polyfill files enabled
                if (settings.polyfills) {

                    // Update the suffix
                    suffix = '.polyfills';

                    // Grab files that aren't polyfills, concatenate them, and process them
                    src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
                        .pipe(concat(file.relative + '.js'))
                        .pipe(jsTasks());

                }

                // Grab all files and concatenate them
                // If separate polyfills enabled, this will have .polyfills in the filename
                src(file.path + '/*.js')
                    .pipe(concat(file.relative + suffix + '.js'))
                    .pipe(jsTasks());

                return stream;

            }

            // Otherwise, process the file
            return stream.pipe(jsTasks());

        }));

};

// Lint scripts
let lintScripts = function (done) {

    // Make sure this feature is activated before running
    if (!settings.scripts) return done();

    // Lint scripts
    return src(paths.scripts.input)
        .pipe(jshint({ "esversion": 6 }))
        .pipe(jshint.reporter('jshint-stylish'));

};

// Process, lint, and minify Sass files
let buildStyles = function (done) {

    // Make sure this feature is activated before running
    if (!settings.styles) return done();

    // Run tasks on all Sass files
    return src(paths.styles.input)
        // new postcss stuff (with tailwind)
        .pipe(postcss([
                tailwindcss,
                prefix,
                purgecss({
                    content: paths.utilityClassesSources,
                    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
                }),
            ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify({
            discardComments: { removeAll: true }
        }))

        .pipe(dest(paths.styles.output));

};


// Watch for changes to the src directory
let startServer = function (done) {

    // Make sure this feature is activated before running
    if (!settings.reload) return done();

    // Initialize BrowserSync
    browserSync.init({
        proxy: 'localhost:5000',
    });
    // Signal completion
done();

};

// Reload the browser when files change
let reloadBrowser = function (done) {
    if (!settings.reload) return done();
        browserSync.reload();
    done();
};

// Watch for changes
let watchSource = function (done) {
    watch(paths.input, series(exports.default, reloadBrowser));
    done();
};

/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
    parallel(
        buildStyles,
        buildScripts,
        lintScripts
    )
);

// Watch and reload
// gulp watch
exports.watch = series(
    exports.default,
    startServer,
    watchSource
);
