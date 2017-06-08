import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component{
	static propTypes={
		comment:PropTypes.object.isRequired,
		onDeleteComment:PropTypes.func,
		index:PropTypes.number
	}

	handleDeleteComment () {
    	if (this.props.onDeleteComment) {
      		this.props.onDeleteComment(this.props.index)
    	}
  	}

	constructor(){
		super()
		this.state={
			time:''
		}
	}

	componentWillMount(){
		this._updateTIme()
		this._timer = setInterval(
      		this._updateTIme.bind(this),
      		5000
    	)
    	clearInterval(this._timer)
	}

	_updateTIme(){
		const durationTime=(Date.now() - this.props.comment.time)/1000
		this.setState({
			time:durationTime>60
			? `${Math.round(durationTime / 60)} 分钟前`
        	: `${Math.round(Math.max(durationTime, 1))} 秒前`
		})
	}

	_getProcessedContent (content) {
    	return content
    		.replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  	}

	render(){
		return (
			<div className='comment'>
		        <div className='comment-user'>
		          	<span>{this.props.comment.username} </span>：
		        </div>
		        <p dangerouslySetInnerHTML={{
  					__html: this._getProcessedContent(this.props.comment.content)
				}} />
		        <span className='comment-createdtime'>
          			{this.state.time}
        		</span>
        		<span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
          			删除
        		</span>
		    </div>
		)
	}
}

export default Comment