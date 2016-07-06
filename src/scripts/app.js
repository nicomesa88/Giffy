import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import AppView from './AppView.js'

const app = function() {

	const GifCollection = Backbone.Collection.extend({
		url: 'http://api.giphy.com/v1/gifs/search',
		// how search url looks: ?q=funny+cat&api_key=dc6zaTOxFJmzC
		_key: 'dc6zaTOxFJmzC',
		parse: function(rawJSON){
			return rawJSON.data
		}
	})

	var gifColl = new GifCollection()

	const GifRoute = Backbone.Router.extend({
		routes:{
			'search/:query' : 'handleSearch'
		},

		initialize: function() {
			Backbone.history.start()
		},

		handleSearch: function(){
			gifColl.fetch({
				data: {
				api_key: gifColl._key,
				q: query,
				}
			})

			ReactDOM.render(<AppView collection={gifColl}/>, document.querySelector('.container'))
		}
	})

new GifRoute()

}

app()