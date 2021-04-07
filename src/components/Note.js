import React from 'react'

import NewButton from './NewButton.js';
import SaveControl from './SaveControl.js';
import NoteIdentity from './NoteIdentity.js';
import TimeControl from './TimeControl.js';

export default class Note extends React.Component{

	constructor(props) {
		super(props)
		this.state = {
			text: '',
			savedText: '',
			copied: false,
			saveLoading: false
		}
	}

	handleTextChange = (event) => {
		this.setState({text: event.target.value});
		console.log(this.state.text)
	}

	save = () => {

		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');

		headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
		headers.append('Access-Control-Allow-Credentials', 'true');

		headers.append('GET', 'POST', 'OPTIONS');

		this.setState({savedText: this.state.text, saveLoading: true});
		fetch('https://3lzatsbxak.execute-api.eu-central-1.amazonaws.com/beta/note',
		{	
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				'pk': 'note1',
				'password': 'efqwbkjvqeqekwq',
				'text': this.state.text
			})
		})
		.then( response => response.json() )
		.then((jsonResponse) => {
			console.log('jsonResponse', jsonResponse)
			this.setState({saveLoading: false});
		})
	}

	copy = () => {
		this.setState({copied: true})
		navigator.clipboard.writeText('https://notesapp.com/aaf8941fgf141jhf1')
	}

	render(){
		return(
			<div style={{backgroundColor: '#282c34', minHeight: '100vh', color: 'white', padding: '1vw'}}>
		      <div style={{margin: '1vw', flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
		        <NoteIdentity
		        copy={this.copy}
		        copied={this.state.copied}/>
		        <NewButton/>
		      </div>
		      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
		        <div style={{width: '80vw'}}>
		          <div style={{width: '100%', flexDirection: 'row', marginBottom: '2vh', marginTop: '7vh', alignItems: 'flex-end', display: 'flex', justifyContent: 'space-between'}}>
		            <TimeControl/>
		            <SaveControl
		            loading={this.state.saveLoading}
		            save={this.save}
		            isSaved={this.state.text==this.state.savedText}
		            />
		          </div>
		          <textarea
		          	value={this.state.text}
		          	onChange={this.handleTextChange}
		            style={{width: '76vw', outline: 'none', minHeight: '70vh', fontSize: 'calc(12px + 1vmin)', padding: '2vw', margin: 0, backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: 10, borderWidth: 0}}
		          />
		        </div>
		      </div>
		    </div>)
	}
}