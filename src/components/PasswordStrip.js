import React from 'react'
import { FaLock, FaCheck } from "react-icons/fa";

export default class PasswordStrip extends React.Component{
	state = {
		showPassword: false,
		copied: false
	}
	show = () => {
		this.setState({showPassword: true})
	}
	hide = () => {
		this.setState({showPassword: false})
	}
	copy = () => {
		navigator.clipboard.writeText(this.props.password)
		this.setState({copied: true})
		setTimeout(()=>{
			this.setState({copied: false})
		}, 2000)
	}
	render(){
		return(
			<button 
			style={{flexDirection: 'row', padding: '1vw', backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0, outline: 'none'}}
			onClick={this.copy}
			onMouseEnter={this.show}
	        onMouseLeave={this.hide}
	        >
	          <div style={{margin: 5, display: 'inline-block'}}>
	            <FaLock color={'white'}/>
	          </div>
	          <div style={{ margin: 5, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.0)', display: 'inline-block'}}>
	            {this.state.showPassword && <p style={{margin: 0, color: 'white'}}>{this.props.password}</p>}
	            {!this.state.showPassword && <p style={{margin: 0, color: 'white'}}>************</p>}
	          </div>
	          <div style={{margin: 5, display: 'inline-block'}}>
	            {this.state.copied && <p style={{margin: 0, color: 'white'}}>copied  <FaCheck color={'white'}/></p>}
	            {!this.state.copied && this.state.showPassword && <p style={{margin: 0, color: 'white'}}>copy</p>}
	          </div>
	        </button>
	    )
	}
}