var React = require('react');
var CreateForm = require('../components/CreateForm');
var Button = require('elemental').Button;

var View = React.createClass({
	
	displayName: 'ListView',
	
	getInitialState: function() {
		return {
			createIsVisible: Keystone.showCreateForm,
			animateCreateForm: false
		};
	},
	
	toggleCreate: function(visible) {
		this.setState({
			createIsVisible: visible,
			animateCreateForm: true
		});
	},
	
	renderCreateButton: function() {
		if (Keystone.list.autocreate) {
			return (
				<div className="toolbar">
					<a href={'?new' + Keystone.csrf.query} className="btn btn-default btn-create btn-create-item">
						<span className="octicon octicon-plus mr-5 mr-5" />
						Create {Keystone.list.singular}
					</a>
				</div>
			);
		}
		return (
			<div className="toolbar">
				<Button type="success" onClick={this.toggleCreate.bind(this, true)}>
					<span className="octicon octicon-plus mr-5 mr-5" />
					Create {Keystone.list.singular}
				</Button>
			</div>
		);
	},
	
	renderCreateForm: function() {
		if (!this.state.createIsVisible) return null;
		return <CreateForm list={Keystone.list} animate={this.state.animateCreateForm} onCancel={this.toggleCreate.bind(this, false)} values={Keystone.createFormData} err={Keystone.createFormErrors} />;
	},
	
	render: function() {
		if (Keystone.list.nocreate) return null;
		return (
			<div className="create-item">
				{this.renderCreateButton()}
				{this.renderCreateForm()}
				<hr />
			</div>
		);
	}
	
});

React.render(<View />, document.getElementById('list-view'));