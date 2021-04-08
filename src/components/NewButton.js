import React from 'react'
import { FaFeatherAlt } from "react-icons/fa";

export default class NewButton extends React.PureComponent{
	openNewNote = () => {
		console.log('openNewNote1',)
		this.props.openNewNote()
	}
	render(){
		return(
			<button
			onClick={this.openNewNote} 
			style={{padding: '1vw', paddingRight: '2vw', paddingLeft: '2vw', margin: 5, borderRadius: 5, display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,1.0)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1}}>
		      <p style={{margin: 0, marginRight: 4, color: '#282c34', fontWeight: '600'}}>New</p> 
		      <FaFeatherAlt color={"#282c34"}/>
		    </button>
			)
	}
}