import React from 'react'
import { FaLock, FaCheck } from "react-icons/fa";

export default class NoteIdentity extends React.PureComponent{
	render(){
		return(
			<div style={{flexDirection: 'row'}}>
	          <div style={{padding: '1vw', margin: 5, display: 'inline-block'}}>
	            <FaLock/>
	          </div>
	          <div style={{padding: '1vw', margin: 5, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.1)', display: 'inline-block', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1}}>
	            <p style={{margin: 0}}>https://notesapp.com/aaf8941fgf141jhf1</p>
	          </div>

	          <div style={{display: 'inline-block'}}>
		          <button 
		          onClick={this.props.copy}
		          style={{padding: '1vw', margin: 5, borderRadius: 5, display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.0)', borderWidth: 0, outline: 'none'}}>
		            <p style={{margin: 0, color: 'white', fontWeight: '600'}}>
		            	{this.props.copied?
		            		'copied':
		            		'copy'
		            	}
		            </p>
		            {this.props.copied && 
	            		<div style={{marginLeft: 6}}>
	            			<FaCheck color={'white'}/>
	            		</div>
	            	}
		          </button>
	          </div>
	        </div>
	    )
	}
}