/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        assets: {
            files: [{
                expand: true,
                cwd: './assets',
                src: ['**'],
                dest: '.tmp/public'
            }]
        },
        development: {
            files: [{
                expand: true,
                cwd: './frontend',
                src: ['fonts/**', 'img/**', 'views/**'],
                dest: '.tmp/public/frontend'
            }]
        },
        backendDevelopment: {
            files: [{
                expand: true,
                cwd: './backend',
                src: ['fonts/**', 'img/**', 'views/**', 'pageJson/**'],
                dest: '.tmp/public/backend'
            }]
        },
        jsDevelopment: {
            files: [{
                expand: true,
                src: require('../../frontend/files.js'),
                dest: '.tmp/public/frontend/js'
            }]
        },
        jsBackendDevelopment: {
            files: [{
                expand: true,
                src: require('../../backend/files.js'),
                dest: '.tmp/public/backend/js'
            }]
        },
        production: {
            files: [{
                expand: true,
                cwd: './frontend',
                src: ['fonts/**', 'img/**'],
                dest: '.tmp/public/frontend'
            }]
        },
        upload: {
            files: [{
                expand: true,
                src: ["app.js"],
                dest: '.tmp/uploads'
            }]
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
