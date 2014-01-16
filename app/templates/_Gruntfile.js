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
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        beautify: {
          ascii_only: true
        },
        compress: {
          global_defs: {
            'DEBUG': false
          },
          dead_code: true
        }
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
        "jquery": true,
        "bitwise": false,
        "browser": true,
        "devel":true,
        "camelcase": true,
        "curly": true,
        "eqeqeq": false,
        "es3":true,
        "esnext": false,
        "expr": true,
        "forin":false,    
        "freeze":false,
        "immed": true,
        "indent": false,
        "latedef": true,
        "maxdepth":3,
        "maxparams":3,
        "newcap": false,
        "noarg": false,
        "noempty":false,
        "nonew":false,
        "plusplus":false,
        "quotmark": "single",
        "scripturl": true,
        "smarttabs": true,
        "strict": false,
        "sub": true,
        "undef": true,
        "unused": false,
        "multistr": false,
        globals: {
          
        }
      }
    },
    cssmin: {
      build: {
        files: {
          'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css': [ 'src/css/*.css' ]
        }
      }
    },
    copy: {
      css: {
        cwd: 'src/css',
        src: [ '*.css' ],
        dest: 'dist/css',
        expand: true
      }
    },
    watch: {
      coffee: {
        files: ['src/js/**/*.coffee'],
        tasks: ['build']
      },
      concat: {
        files: ['js/**.js', 'lib/**.js'],
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
        src: [ '**/.gitignore','**/.npmignore']
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

  grunt.registerTask('build', ['test','coffee','concat','copy','uglify','cssmin','yuidoc']);

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['clean','build', 'watch']);
};