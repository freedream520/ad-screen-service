
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
          { expand: true, cwd: "bower_components/node-server/lib", src: ['**'], dest: 'dist/ad-screen/server' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['log4js.json'], dest: 'dist/config' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['log4js.json'], dest: 'dist/ad-screen/config' },
          { expand: true, cwd: "src/data", src: ['**'], dest: 'dist/data' },
          { expand: true, cwd: "src/config/dev", src: ['**'], dest: 'dist/ad-screen/config' },
          { expand: true, cwd: "src/config/pro", src: ['**'], dest: 'dist/config' },
          { expand: true, cwd: "src/bin", src: ['**'], dest: 'dist/ad-screen/bin' },
          { expand: true, cwd: "src/server", src: ['logs/**'], dest: 'dist/ad-screen/server' }
        ]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Default task.
  grunt.registerTask('default', ['clean', 'copy']);

};
