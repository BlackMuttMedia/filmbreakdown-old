var ElementButtonList = React.createClass({
	getInitialState: function() {

		return { elementName: null, genreName: null };
	},
	render: function() {
		var categoryHeaderStyle = {
			fontWeight: 'bold'
		};

		var buttonStyle = {
			padding: '8px;'
		};
		var item = <ElementSummary heading={this.state.genreName + ' Summary'} genreName={this.state.genreName} elementName={this.state.elementName} />;

		return( 
			<div className="row">
				<div className="small-12 columns">
					<span style={categoryHeaderStyle}>Atmosphere</span>
					<div className="row">
						<div className="small-12 columns">
							<ul className="inline-list">
				        {_.map(this.props.items, function(item, i) {
				          return (
				            <li key={i}><a href="#" onClick={this.handleClick.bind(this, i)} style={buttonStyle} className="button tiny radius">{item}</a></li>
				          );
				        }, this)}
							</ul>
						</div>
					</div>
				</div>
				<FoundationReveal ref='summaryReveal' revealContent={item} revealStyle={this.props.revealStyle} />
			</div>
		);
	},
	handleClick: function(i, e) {
		e.preventDefault();
		var elementName = this.props.items[i];
		var genreName = "Adventure";
		this.setState({ elementName: elementName, genreName: genreName }, 
			function() { this.refs.summaryReveal.handleClick(); });
	}
});

var ElementSummaryReveal = React.createClass({
	render: function(){
		var revealContent = 
			<div>
				<h2>Summary</h2>
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
			</div>;

		return (
			<FoundationReveal ref='foundationReveal' revealContent={revealContent} revealStyle={this.props.revealStyle} />
		);
	},
	handleClick: function(e) {
		this.refs['foundationReveal'].handleClick(e);
	}
});

var ElementSummary = React.createClass({
	render: function(){

		return (
			<div>
				<h2>{this.props.heading}</h2>
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<PostDisplay genreName={this.props.genreName} elementName={this.props.elementName} />
				<div className="row">
					<div className="small-12 columns text-right">
						<a href="#">Add more ...</a>
					</div>
				</div>
			</div>
		);
	},
	handleClick: function(e) {
		this.refs['foundationReveal'].handleClick(e);
	}
});






var ElementList = React.createClass({
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
});

var ElementHeader = React.createClass({
	render: function() { 
		return (
			<h1>{this.props.headerContent}</h1>
		);
	}
});

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

var ElementListItem = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="small-12 columns">
					<p>{this.props.itemContent}</p>
					{ this.props.showSeparator == true ? <hr /> : null }
				</div>
			</div>
		);
	}
});

var ElementForm = React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className="small-12 columns">
					<div className="row">
						<div className="small-12 columns">
							<textarea ref="ElementContent" placeholder={this.props.placeholderText}></textarea>
						</div>
					</div>
					<div className="row">
						<div className="small-12 text-right columns">
							<a onClick={this.handleSubmit} href="#">{this.props.ElementText || 'Element'}</a>
						</div>
					</div>
				</div>
			</div>
		);
	},
	handleSubmit: function(e) {
		var ElementContent = this.refs.ElementContent.getDOMNode().value.trim();
		this.props.handleElement({ ElementContent: ElementContent }, e);
	}
});

var ElementLink = React.createClass({
	render: function() {
		var ElementLink;
		if(this.props.userid > 0){
			ElementLink = <a onClick={this.props.handleClick} href={this.props.anchorHref || '#'}>{this.props.anchorText || 'Add Element ...'}</a>;
		}
		else{
			ElementLink = <a href={this.props.noUserAnchorHref || '#'}>{this.props.noUserAnchorText || 'Log In to Add Element ...'}</a>;
		}

		return(
			<div className="row">
				<div className="small-12 text-right columns">
					{ElementLink}
				</div>
			</div>
		);
	}
});

var ElementAlert = React.createClass({
	render: function() {
		return (
			<div data-alert className={this.props.alertClass}>
			  {this.props.alertMessage}
			  <a onClick={this.props.handleClose} href="#" className="close">&times;</a>
			</div>
	);
	}
})
