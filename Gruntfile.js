module.exports = function (grunt) {
    grunt.initConfig({
        clean: [
            "dist",
            "tmp"
        ],

        useminPrepare: {
            html: 'index.html'
        },

        uglify: {
            extension_scripts: {
                expand: true,
                src: ['content_scripts/**/*.js',
                    'background_scripts/**/*.js'],
                dest: 'dist'
            },
            templates: {
                files: {
                    '.tmp/templates.min.js': ['.tmp/templates.js']
                }
            }
        },

        ngtemplates: {
            app: {
                src: 'templates/**/**.html',
                dest: '.tmp/templates.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }

            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    src: ['img/**'],
                    dest: 'dist/'
                }]
            },
            index: {
                files: [{
                    expand: true,
                    src: ['index.html'],
                    dest: '.tmp/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts/',
                    src: ['*.*'],
                    dest: 'dist/fonts/'

                }]
            },
            select2: {
                files: [{
                    expand: true,
                    cwd: 'lib/select2/',
                    src: ['*.png', '*.gif'],
                    dest: 'dist/css/'

                }]
            }
        },

        htmlmin: {
            index: {
                files: {
                    'dist/index.html': '.tmp/index.html'
                },
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true, // Only if you don't use comment directives!
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            }
        },

        concat: {
            options: {
                separator: '',
            },
            dist: {
                src: ['dist/js/scripts.js', '.tmp/templates.min.js'],
                dest: 'dist/js/scripts.js'
            }
        },

        minjson: {
            mainfest: {
                files: {
                    'dist/manifest.json': 'manifest.json'
                }
            }
        },

        usemin: {
            html: ['.tmp/index.html']
        },

        version: {
            // options: {},
            package: {
                src: ['js/version.js']
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/dist.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*']
                    }, // includes files in path and its subdirs
                ]
            }
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-minjson');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-version');

    // register default task
    grunt.registerTask('default', [
        'clean',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'uglify:extension_scripts',
        'cssmin:generated',
        'copy',
        'ngtemplates',
        'uglify:templates',
        'concat:dist',
        'usemin',
        'htmlmin',
        'minjson',
        'version',
        'compress:dist'
    ]);
};