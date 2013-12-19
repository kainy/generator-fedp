module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          "jquery": true,
          "esnext": false,
          "bitwise": true,
          "camelcase": true,
          "curly": true,
          "eqeqeq": false,
          "immed": true,
          "indent": 4,
          "latedef": true,
          "newcap": false,
          "noarg": false,
          "quotmark": "single",
          "regexp": false,
          "undef": true,
          "unused": true,
          "strict": false,
          "trailing": false,
          "smarttabs": true,
          "white": false
        }
      }
    },
    cssmin: {
      build: {
        files: {
          'dist/css/style.min.css': [ 'src/css/*.css' ]
        }
      }
    },
    copy: {
      build: {
        cwd: 'src/css',
        src: [ '*.css', '!**/*.styl', '!**/*.less' ],
        dest: 'dist/css',
        expand: true
      },
    },
    watch: {
      coffee: {
        files: ['src/js/**/*.coffee'],
        tasks: ['build']
      },
      concat: {
        files: ['js/*.js', 'lib/*.js'],
        tasks: ['build']
      }
    },
    coffee: {
      compile: {
        options: {
          sourceMap: false
        },
        expand: true,
        cwd: 'src/js/coffee',
        src: ['*.coffee'],
        dest: 'src/js',
        ext: '.coffee.js'
      }
    },
    clean:{
      spm : {
        src: [ '**/.gitignore']
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        options: {
          paths: 'src/js',
          outdir: 'doc'
        }
      }
    }
  });

  grunt.registerTask('build', ['coffee','concat','copy','uglify','cssmin','yuidoc']);

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['clean']);
};