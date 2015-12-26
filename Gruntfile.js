'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('spinner.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      dist: [
        'dist',
        '*-dist.zip'
      ]
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'js/jquery.<%= pkg.name %>.js'
        ],
        dest: 'dist/js/jquery.<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/jquery.<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: 'js/tests/index.html'
    },
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      core: {
        src: 'js/*.js'
      },
      test: {
        options: {
          jshintrc: 'js/tests/unit/.jshintrc'
        },
        src: 'js/tests/unit/*.js'
      },
    },
    less: {
      core: {
        options: {
          sourceMap: true,
          sourceMapURL: 'bootstrap-spinner.css.map',
          outputSourceFiles: true
        },
        src: 'less/bootstrap-spinner.less',
        dest: 'dist/css/bootstrap-spinner.css'
      }
    },
    cssmin: {
      core: {
        options: {
          compatibility: 'ie8',
          sourceMap: true
        },
        expand: true,
        src: 'dist/css/*.css',
        ext: '.min.css'
      }
    },
    compress: {
      dist: {
        options: {
          archive: '<%= compress.dist.dest %>.zip'
        },
        expand: true,
        cwd: 'dist',
        src: '**',
        dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', [
    'jshint',
    'qunit',
    'clean',
    'concat',
    'uglify',
    'less',
    'cssmin',
  ]);

  grunt.registerTask('prep-release', [
    'default',
    'compress'
  ]);
};
