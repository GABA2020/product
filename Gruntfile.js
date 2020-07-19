'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    sprite: {
      all: {
        src: 'src/assets/images/sprites/*.png',
        dest: 'src/assets/images/front/sprite.png',
        retinaSrcFilter: ['src/assets/images/sprites/*@2x.png'],
        retinaDest: 'src/assets/images/front/sprite@2x.png',
        destCss: 'src/assets/scss/partials/_sprites.scss',
        imgPath: 'src/assets/images/front/sprite.png',
        retinaImgPath: 'src/assets/images/front/sprite@2x.png',
        padding: 5,
      },
    },
    sass: {
      dev: {
        files: {
          'src/assets/css/common.css': 'src/assets/scss/common.scss',
        },
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'src/assets/css',
          ext: '.min.css',
        }],
      },
    },
    uglify: {
      my_target: {
        files: {
          'src/assets/javascripts/common.min.js': ['src/assets/javascripts/common.js'],
        },
      },
    },
    sasslint: {
      options: {
        configFile: 'config/.sass-lint.yml',
      },
      target: ['src/assets/scss/*.scss'],
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            //"css/*.css/*.scss",
            'css/*.scss',
            '*.html',
          ],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './',
          },
        },
      },
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'config/*.js'],
        options: {
          reload: true,
        },
      },
      options: {
        livereload: true,
      },
      html: {
        options: {
          livereload: true,
        },
        files: ['index.html', 'src/assets/scss/**/*.css'],
      },
      js: {
        files: ['javascripts/**/*.js'],
        tasks: ['uglify'],
      },
      sass: {
        options: {
          livereload: true,
        },
        files: ['src/assets/scss/**/*.scss'],
        tasks: ['sass'],
      },
      css: {
        options: {
          livereload: true,
        },
        files: ['src/assets/css/**/*.css'],
        tasks: ['cssmin'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Launch BrowserSync + watch task
  grunt.registerTask('default', ['sprite', 'sass', 'browserSync', 'cssmin', 'uglify', 'watch']);
};
