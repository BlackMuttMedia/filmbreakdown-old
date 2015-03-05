var FoundationReveal = React.createClass({
	getInitialState: function(){
		return { visible: false };
	},
	render: function(){
		return (
			<div>
				{this.state.visible ? <FoundationRevealBody revealContent={this.props.revealContent} revealStyle={this.props.revealStyle} handleClose={this.handleClosed} /> : null }
			</div>
		);
	},
	handleClick: function(e){
		//console.log(this.props.revealContent);
		this.setState({ visible: true });
		e.preventDefault();
	},
	handleClosed: function(){
		this.setState({ visible: false });
	}
});

var FoundationRevealBody = React.createClass({
	render: function(){
		return (
			<div ref="foundationReveal" className="reveal-modal" style={this.props.revealStyle} data-reveal>
				<form>
					{this.props.revealContent}
					<a className="close-reveal-modal">&#215;</a>
				</form>
			</div>
		);
	},
	componentDidMount: function()
	{
		var reveal = this.refs['foundationReveal'].getDOMNode();
		$(reveal).foundation('reveal', 'open');
		$(reveal).bind('closed.fndtn.reveal', function(){ this.handleClosed(); }.bind(this));
	},
	handleClosed: function(){
		this.props.handleClose();
	}
});
