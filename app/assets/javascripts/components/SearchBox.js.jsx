var SearchBox = React.createClass({
	render: function() { 
		return (
			  <div className="row collapse">
	      		<div id="searchContainer" className="small-9 medium-9 large-10 columns">
	      			<input type="text" className="titleSearch" placeholder="Search For Movies" />
	      		</div>
	      		<div className="small-3 medium-3 large-2 end columns">
	      			<a href="#" className="tiny button secondary">Go</a>
	      		</div>
	  		  </div>
		)
	}
});