'use strict';

var Marionette = require( 'backbone.marionette' );
var UserItemView = require( './views/UserItemView' );
var App = new Marionette.Application();

App.addRegions( {
	'todoListRegion' : '#todo-list'
} );

App.addInitializer( function ( options ) {
	console.log( 'App started....' );
	console.log( new UserItemView() );
} );

App.on( 'initialize:after', function () {
	
} );

module.exports = App;