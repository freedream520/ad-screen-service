
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist']
    },
    copy: {
      dist: {
        files: [ 
          { expand: true, cwd: "bower_components/node-server/lib", src: ['**'], dest: 'dist/server' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['package.json'], dest: 'dist/server' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['log4js.json'], dest: 'dist/config' },
          { expand: true, cwd: "src/bin", src: ['**'], dest: 'dist/bin' },
          { expand: true, cwd: "src/config", src: ['**'], dest: 'dist/config' },
          { expand: true, cwd: "lib", src: ['**'], dest: 'dist/server' }
        ]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Default task.
  grunt.registerTask('default', ['clean', 'copy']);

};
