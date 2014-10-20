
module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  // Project configuration.
  grunt.initConfig({

    pkg: pkg,
    clean: {
      dist: ['dist']
    },
    copy: {
      dist: {
        files: [ 
          { expand: true, cwd: "bower_components/node-server/lib", src: ['**'], dest: 'dist/ad-screen/server' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['log4js.json'], dest: 'dist/config' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['log4js.json'], dest: 'dist/ad-screen/config' },
          { expand: true, cwd: "bower_components/ad-screen/dist", src: ['index.html'], dest: 'dist/ad-screen/templates' },
          { expand: true, cwd: "lib", src: ['**'], dest: 'dist/ad-screen/server' },
          { expand: true, cwd: "src/data", src: ['**'], dest: 'dist/data' },
          { expand: true, cwd: "src/tmp", src: ['**'], dest: 'dist/tmp' },
          { expand: true, cwd: "src/tmp", src: ['**'], dest: 'dist/ad-screen/tmp' },
          { expand: true, cwd: "src/static", src: ['**'], dest: 'dist/static' },
          { expand: true, cwd: "src/static", src: ['**'], dest: 'dist/ad-screen/static' },
          { expand: true, cwd: "src/config/dev", src: ['**'], dest: 'dist/ad-screen/config' },
          { expand: true, cwd: "src/config/pro", src: ['**'], dest: 'dist/config' },
          { expand: true, cwd: "src/bin", src: ['**'], dest: 'dist/ad-screen/bin' },
          { expand: true, cwd: "src/server", src: ['logs/**'], dest: 'dist/ad-screen/server' }
        ]
      }
    },
    replace: {
      info: {
        options: {
            "patterns": [ 
                { "match": "NAME", "replacement": pkg.name },
                { "match": "VERSION", "replacement": pkg.version },
                { "match": "DESCRIPTION", "replacement": pkg.description }
            ]
        },
        files: [
          { expand: true, flatten: true, src: ['src/server/package.json'], dest: 'dist/ad-screen/server'}
        ]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');

  // Default task.
  grunt.registerTask('default', ['clean', 'copy', 'replace']);
};
