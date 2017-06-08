import React, {Component} from 'react'

class CommentInput extends Component{
	constructor(){
		super()
		this.state={
			username:'',
			content:'',
		}
	}

	stateNameChanme(event){
		this.setState({
			username: event.target.value
		})
	}

	stateContentChanme(event){
		this.setState({
			content: event.target.value
		})
	}

	componentWillMount(){
		this._loadUsername()
	}

	_loadUsername(){
		const username=localStorage.username
		if(username){
			this.setState({username})
		}

	}

	componentDidMount(){
		this.textarea.focus()
	}

	handleSubmit () {
	    if (this.props.onSubmit) {
	    	// const { username, content } = this.state
	    	const username = this.state.username
	    	const content = this.state.content
	    	const time = Date.now()
	    	this.props.onSubmit({username, content, time})
	    }
	    this.setState({ content: '' })
	}

	_saveUsername(username){
		localStorage.setItem('username',username)
	}

	handleUsernameBlur(event){
		this._saveUsername(event.target.value)
	}

	render(){
		return (
			<div className='comment-input'>
		        <div className='comment-field'>
		          	<span className='comment-field-name'>用户名：</span>
		          	<div className='comment-field-input'>
		            	<input 
		            		value={this.state.username}
		            		onBlur={this.handleUsernameBlur.bind(this)}
		            		onChange={this.stateNameChanme.bind(this)} />
		          	</div>
		        </div>
		        <div className='comment-field'>
		          	<span className='comment-field-name'>评论内容：</span>
		          	<div className='comment-field-input'>
		            	<textarea 
		            		value={this.state.content}
		            		ref={(textarea)=>this.textarea=textarea}
		            		onChange={this.stateContentChanme.bind(this)} />
		          	</div>
		        </div>
		        <div className='comment-field-button'>
		          	<button onClick={this.handleSubmit.bind(this)}>
		            	发布
		          	</button>
		        </div>
		    </div>
		)
	}
}

export default CommentInput