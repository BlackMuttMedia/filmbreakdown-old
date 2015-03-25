var DetailItem = React.createClass({
	render: function() {
		var detailItem;
		var label = this.props.displayValue || this.props.name;

		if(this.props.baseUrl)
		{
			var fullUrl = this.props.baseUrl + this.props.id + '-' + getUrlKey(this.props.name);

			detailItem = 
				<div className="row">
					<a href={fullUrl}>{label}</a>
				</div>;
		}
		else
		{
			detailItem = <div className="row">{label}</div>;
		} 

		return detailItem;
	}
});
