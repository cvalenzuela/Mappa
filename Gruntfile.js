/**
*  This is the Gruntfile for p5.maps. It is based on the original p5.js Gruntfile.js
*  Grunt is a task runner/builder
*  which is what p5.js uses to build the source code into the library
*  and handle other housekeeping tasks.
*
*  Main tasks:
*
*  grunt             - This is the default task, which builds the code, tests it
*                      using jslint and then minifies it.
*
*  grunt watch       - This watches the source for changes and rebuilds on
*                      every file change, running the linter and tests.
*
*/

module.exports = function(grunt) {

  grunt.initConfig({

    // read in the package, used for knowing the current version, et al.
    pkg: grunt.file.readJSON('package.json'),
    // Configure style consistency checking for this file, the source, and the tests.
    jscs: {
      options: {
        config: '.jscsrc',
        reporter: require('jscs-stylish').path
      },
      build: {
        src: [
          'Gruntfile.js',
          'build/**/*.js'
        ]
      },
      source: {
        src: [
          'src/**/*.js'
        ]
      }
    },

    // Configure hinting for this file and the source
    jshint: {
      build: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'Gruntfile.js',
          'build/**/*.js'
        ]
      },
      source: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      }
    },

    // Set up the watch task, used for live-reloading during development.
    watch: {
      // Watch the codebase for changes
      main: {
        files: ['src/**/*.js'],
        tasks: ['newer:jshint:source'],
        options: {
          livereload: true
        }
      }
    },

    // This minifies the javascript into a single file and adds a banner to the
    // front of the file.
    uglify: {
      options: {
        banner: '/*! p5.maps.js v<%= pkg.version %> <%= grunt.template.today("mmmm dd, yyyy") %> */ '
      },
      build: {
        src: 'lib/p5.maps.js',
        dest: 'lib/p5.maps.min.js'
      }
    },

  });

  // Load task definitions
  grunt.loadTasks('build/tasks');

  // Load the external libraries used.
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-update-json');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  // Create the multitasks.
  grunt.registerTask('build', ['browserify', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jscs', 'build']);
  grunt.registerTask('default', ['test']);
};
