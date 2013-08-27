'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: {
                build: ["build"]
            },
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                build: {
                    src: 'build/game.js',
                    dest: 'dist/game.min.js'
                }
            },
            concat: {
                options: {
                    stripBanners: true
                },
                dist: {
                    src: 'src/*.js',
                    dest: 'build/game.js'
                }
            },
            replace: {
                build: {
                    options: {
                        variables: {
                            'include': '<%= grunt.file.read("templates/build-scripts.html") %>'
                        }
                    },
                    files: [
                        {src: ['templates/index.html'], dest: 'index-dev.html'}
                    ]
                },
                dist: {
                    options: {
                        variables: {
                            'include': '<%= grunt.file.read("templates/dist-scripts.html") %>'
                        }
                    },
                    files: [
                        {src: ['templates/index.html'], dest: 'index.html'}
                    ]
                }
            }
        }
    )
    ;

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['replace', 'concat', 'uglify', 'clean']);
}
;