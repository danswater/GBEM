'use strict';

var Marionette = require( 'backbone.marionette' );
var templte    = require( '../templates/index.html' );

module.exports = Marionette.ItemView.extend( {
	'onRender' : function () {
		console.log( templte );
	}
} );