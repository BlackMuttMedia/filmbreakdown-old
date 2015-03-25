var ElementList = React.createClass({
	render: function() {
		var self = this;
		var Elements = this.props.Elements;
		return (
			<div className="row">
				<div className="small-12 columns">
					{Elements && typeof Elements[0] !== 'undefined' && Elements[0] !== null ? 
						Elements.map(function(Element){
							return <ElementListItem key={Element.id} itemContent={Element.content} showSeparator={self.props.showSeparator} />
						}) : 
						<p>{this.props.defaultText}</p>
					} 
				</div>
			</div>
		);
	}
});





/*var ElementList = React.createClass({
  getInitialState: function() {
      return { 
      	showElementBox: false, 
      	showElementLink: true, 
      	Elements: this.props.Elements, 
      	ElementContent: null,
      	showAlert: false,
      	alertMessage: null,
      	alertClass: null };
  },
	render: function() {
		return(
			<div>				
				<div className="row">
					<div className="small-12 columns">
						{this.props.header ? <ElementHeader headerContent={this.props.header} /> : null }
						<ElementList Elements={this.state.Elements} showSeparator={this.props.showSeparator} defaultText={this.props.defaultText} />
						{ this.state.showAlert ? <ElementAlert alertMessage={this.state.alertMessage} alertClass={this.state.alertClass } handleClose={this.hideAlert} /> : null }
						{ this.state.showElementBox ? <ElementForm ElementText={this.props.ElementText} placeholderText={this.props.placeholderText} handleElement={this.handleSubmit} /> : null }
						{ this.state.showElementLink ? <ElementLink anchorText={this.props.anchorText} handleClick={this.showElementBox} userid={this.props.userid}
								noUserAnchorHref={this.props.noUserAnchorHref} noUserAnchorText={this.props.noUserAnchorText}  /> : null }
					</div>
				</div>
			</div>
		);
	},
	showElementBox: function(e) {
    this.setState({ showElementBox: true, showElementLink: false });
    e.preventDefault();
	},
	handleSubmit: function(data, e) {
		var ElementContent = data.ElementContent;
		var ElementData = { 
			parentId: this.props.parentId, 
			content: ElementContent,
			userid: this.props.userid
		};

		this.setState({ ElementContent: ElementContent });

		$.ajax({
		  type: "Element",
		  url: this.props.endpointUrl,
		  data: ElementData,
		  success: this.handleSubmitSuccess,
		  error: this.handleSubmitFailure,
		  dataType: 'json'
		});

		e.preventDefault();
	},
	handleSubmitSuccess: function(data){
		if(data.status == 'ok') {
			var Elements = this.state.Elements || [];
			Elements.push(data.object)

			this.setState({
				alertMessage: this.props.successMessage || 'Element submitted' ,
				alertClass: 'alert-box success radius',
				showAlert: true,
				Elements: Elements,
				showElementBox: false, 
				showElementLink: true 
			});
		}
		else{
			this.setState({
				alertMessage: data.message || 'There was an error submitting your Element' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
		}
	},
	handleSubmitFailure: function(xhr, ajaxOptions, thrownError){
      //alert(xhr.status);
      //alert(thrownError);
			this.setState({
				alertMessage: thrownError || 'There was an error submitting your Element' ,
				alertClass: 'alert-box alert radius',
				showAlert: true
			});
	},
	hideAlert: function(e)
	{
		this.setState({
			alertMessage: null,
			alertClass: null,
			showAlert: false
		});
		e.preventDefault();
	}
});*/

