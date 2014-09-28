/*jshint node:true */
module.exports = function(grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: "/*!\n" +
 "* @author <%= pkg.author %>\n" +
 "* @version <%= pkg.version %>\n" +
 "* @url <%= pkg.url %>\n" +
 "* @license MIT\n" +
 "* @description <%= pkg.description %>\n" +
 "*/\n",
        jshint: {
            options: {
                'jshintrc': '.jshintrc'
            },
            files: [
                'Gruntfile.js', 'src/taggle.js'
            ]
        },

        clean: {
            src: 'tmp'
        },

        concat: {
            ie8: {
                files: {
                    'tmp/taggle-ie8.concat.js': [
                        'src/taggle-ie8.js',
                        'src/taggle-ie9.js',
                        'src/taggle.js'
                    ]
                }
            },
            ie9: {
                files: {
                    'tmp/taggle-ie9.concat.js': [
                        'src/taggle-ie9.js',
                        'src/taggle.js'
                    ]
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            ie8: {
                files: {
                    'dist/taggle-ie8.min.js': [
                        'tmp/taggle-ie8.concat.js'
                    ]
                }
            },
            ie9: {
                files: {
                    'dist/taggle-ie9.min.js': [
                        'tmp/taggle-ie9.concat.js'
                    ]
                }
            },
            main: {
                files: {
                    'dist/taggle.min.js': [
                        'src/taggle.js'
                    ]
                }
            }
        },

        watch: {
            all: {
                files: ['Gruntfile.js', 'src/**/*'],
                tasks: ['jshint']
            }
        },

        mocha: {
            options: {
                reporter: 'Nyan',
                run: true
            },
            src: [
                'test/**/*.html'
            ]
        }

    });

    // register task
    grunt.registerTask('build', ['mocha', 'uglify:main', 'ie9', 'ie8']);
    grunt.registerTask('build:modern', ['mocha', 'uglify:main']);
    grunt.registerTask('ie9', ['mocha', 'concat:ie9', 'uglify:ie9', 'clean']);
    grunt.registerTask('ie8', ['mocha', 'concat:ie8', 'uglify:ie8', 'clean']);
    grunt.registerTask('dev', ['watch']);

};
