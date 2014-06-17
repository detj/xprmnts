/* jshint strict: false */
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'static/**/*.js', '!static/bower_components/**/*.js'],
      options: {
        node: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        quotmark: true,
        regexp: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        smarttabs: true,
        browser: true
      }
    },

    clean: ['dist/js/bundle.js'],

    watch: {
      js: {
        files: [ 'static/js/main.js', 'Gruntfile.js' ],
        tasks: [ 'default' ]
      },

      less: {
        files: [ 'static/less/**/*.less' ],
        tasks: [ 'less' ]
      }

    },

    less: {
      development: {
        options: {},
        files: {
          'dist/css/style.css': 'static/less/style.less'
        }
      },
      production: {
        options: { cleancss: true },
        files: {
          'dist/css/style.css': 'static/less/style.less'
        }
      }
    },

    browserify: {
      dist: {
        src: ['static/js/**/*.js'],
        dest: 'dist/js/bundle.js',
        options: {
          bundleOptions: { debug: true },
          transform: ['debowerify']
        }
      }
    },

    notify: {
      built: {
        options: {
          title: '👍',
          message: 'Yay!'
        }
      }
    }
  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-notify');

  // Default task(s)
  grunt.registerTask('default', ['jshint', 'build']);
  grunt.registerTask('build', ['clean', 'less', 'browserify', 'notify']);

};