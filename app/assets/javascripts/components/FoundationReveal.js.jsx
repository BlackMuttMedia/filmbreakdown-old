var FoundationReveal = React.createClass({
	render: function(){
		return (
			<div>
			</div>
		);
	},
	handleClick: function(e){
		if(e && typeof e.preventDefault == 'function') {
			e.preventDefault();
		}

		var contentDiv = $('<div>');
		var anchor = $('<a class="close-reveal-modal">&#215;</a>');
		var reveal = $('<div class="reveal-modal" data-reveal>').append($(contentDiv)).append($(anchor));
		$(reveal).foundation().foundation('reveal', 'open');
		//$(reveal).bind('closed.fndtn.reveal', function(e){ React.unmountComponentAtNode(this); });

		if(React.isValidElement(this.props.revealContent)) {
			React.render(this.props.revealContent, $(contentDiv)[0]);
		}
		else {
			$(contentDiv).append(this.props.revealContent);
		}
	}
});