'use strict';
var gulp       = require( 'gulp' );
var jshint     = require( 'gulp-jshint' );
var concat     = require( 'gulp-concat' );
var less       = require( 'gulp-less' );
var browserify = require( 'gulp-browserify' );
var express    = require( 'express' );

var serverport = 3000;

var server = express();

server.use( express.static( './dist') );

server.all( '/*', function ( req, res ) {
	res.sendfile( 'index.html', { 'root' : 'dist' } );
} );

gulp.task( 'lint', function () {
	gulp.src( [ './app/js/*.js'] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) );
} );

gulp.task( 'browserify', function () {
	gulp.src( [ './app/js/main.js' ] )
		.pipe( browserify( {
			'insertGlobals' : true,
			'debug'         : true,
			'shim' : {
				'jquery': {
					'path'    : 'node_modules/jquery/dist/jquery.js',
					'exports' : '$'
				},
				'underscore' : {
					'path'    : 'node_modules/underscore/underscore.js',
					'exports' : '_'
				},
				'backbone' : {
					'path'    : 'node_modules/backbone/backbone.js',
					'exports' : 'Backbone',
					'depends' : {
						'jquery' : '$',
						'underscore' : '_'
					}
				},
				'backbone.babysitter': {
					'path' : 'node_modules/backbone.babysitter/lib/backbone.babysitter.js',
					'exports' : 'Backbone.Babysitter',
					'depends': {
						'backbone': 'Backbone'
					}
				},
				'backbone.wreqr' : {
					'path'    : 'node_modules/backbone.wreqr/lib/backbone.wreqr.js',
					'exports' : 'Backbone.Wreqr',
					'depends' : {
						'backbone' : 'Backbone'
					}
				},
				'backbone.marionette' : {
					'path'    : 'node_modules/backbone.marionette/lib/backbone.marionette.js',
					'exports' : 'Marionette',
					'depends' : {
						'jquery'     : '$',
						'underscore' : '_',
						'backbone'   : 'Backbone',
					}
				}
			},
			'transform' : [ 'browserify-compile-templates' ],
			'extensions' : [ '.html' ]
		} ) )
		.pipe( concat( 'bundle.js' ) )
		.pipe( gulp.dest( 'dist/js' ) );
} );

gulp.task( 'views', function () {
	gulp.src( './app/index.html' )
		.pipe( gulp.dest( 'dist/' ) );

	gulp.src( './app/views/**/*' )
		.pipe( gulp.dest( 'dist/views' ) );
} );

gulp.task( 'less', function () {
	gulp.src( './app/css/styles.less' )
		.pipe( less() )
		.pipe( gulp.dest( 'dist/css' ) );
} );

gulp.task( 'start', function () {
	server.listen( serverport );
	gulp.watch( [ './app/js/*.js', './app/js/**/*.js' ], [
			'lint',
			'browserify'
		] );
	gulp.watch( [ './app/css/*.less' ], [
			'less'
		] );
	gulp.watch( [ './app/index.html', './app/views/**/*.html' ], [
			'views'
		] );
} );