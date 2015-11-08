module.exports = function(grunt) {
	grunt.initConfig({
		concurrent: {
			dev: {
        tasks: ['nodemon:dev'],
			  options: {
				  logConcurrentOutput: true
			  }
      }
		},
		nodemon: {
			dev: {
				script: 'src/app.js',
				options: {
					env: {
						'NODE_ENV': 'dev'
					},
					cwd: __dirname,
					watch: ['settings.js', 'app.js', 'src/', 'node_modules/'],
					delay: 300,
          nodeArgs: ['--debug'],
          callback: function(nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
          }
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default',  ['concurrent:dev']);
	grunt.registerTask('run', ['concurrent:dev']);
};