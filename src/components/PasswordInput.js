import React from 'react'
import { FaLock, FaArrowAltCircleRight } from "react-icons/fa";

export default class PasswordInput extends React.PureComponent{
	passwrod = '';

	handlePasswordChange = (event) => {
		this.password = event.target.value
	} 

	submitPassowrd = () => {
		this.props.submitPassowrd(this.password)
	}

	render(){
		return(
			<div style={{marginBottom: '20vh'}}>	
				<div style={{marginBottom: 10}}>
					<p style={{margin: 0, color: 'white', fontWeight: '500'}}>{this.props.noteId}</p>
					{!this.props.wrongPassword && <p style={{margin: 0, color: 'white', fontWeight: '500', opacity: 0.4}}>password protected <FaLock/></p>}
					{this.props.wrongPassword && <p style={{margin: 0, color: 'red', fontWeight: '500', opacity: 0.8}}>wrong password</p>}
				</div>
				<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<input 
					type="text" 
					id="lname" 
					name="lname" 
					onChange={this.handlePasswordChange}
					style={{backgroundColor: 'rgba(255,255,255,0.2)', fontSize: 'calc(12px + 2vmin)', padding: '2vh', borderRadius: 10, borderWidth: 0, outline: 'none', color: 'white'}}
					/>
					<button
					onClick={this.submitPassowrd} 
					style={{margin: '1vw', backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0, outline: 'none'}}>
						<FaArrowAltCircleRight size={30} color={'rgb(0,122,255)'}/>
					</button>
				</div>
			</div>
			)
	}
}