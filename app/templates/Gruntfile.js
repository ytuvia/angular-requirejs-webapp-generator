// Generated on 2013-09-24 using generator-webapp 0.0.0
'use strict'; 
 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    connect:{
      options:{
        base: 'app',
        port: 8000,
        hostname: 'localhost'
      },
      preview:{
        options:{
          open: true,
          keepalive: true
        }
      }
    },
    karma:{
      unit:{
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    }
  });
 
  grunt.registerTask('server', ['connect:preview']);
  grunt.registerTask('test', ['karma']);
 
};
