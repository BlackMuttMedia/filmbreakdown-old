var DetailsList = React.createClass({
	render: function() {
		var items = this.getItems();
		var fullClass='';

		return (
			<ul className={fullClass}>
				{items}
			</ul>);
  	return (
  		<div className="row">
	    	<h5 className="small-4 columns">{this.props.label}</h5>
	    	<h6 className="small-8 columns subheader">
	      	{items}
	      </h6>
	    </div>
    );
	},
	getItems: function() {
		var self = this;
		var details = [];

		if( Object.prototype.toString.call( this.props.items ) === '[object Array]' ) {
			details = this.props.items.map(
				function(item){
					return <DetailItem key={item.id} id={item.id} name={item.name} baseUrl={self.props.baseUrl} displayValue={item.displayValue} />;
			});
		}

		return details;
	}
});
