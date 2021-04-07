import React from 'react'

export default class SaveControl extends React.PureComponent{
	render(){
		const {isSaved, save, loading} = this.props;
		const buttonColor = (isSaved || loading)? 'gray' : '#ff7b00';
		return(
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
				<div style={{display: 'inline-block', marginRight: '1vw'}}>
					{!isSaved && <p style={{margin: 0, marginBottom: 1, color: 'white', fontSize: '13px'}}>Changes not saved</p>}
				</div>
				<button 
				disabled={isSaved} 
				onClick={save}
				style={{padding: '1vw', paddingRight: '2vw', paddingLeft: '2vw', borderRadius: 5, backgroundColor: buttonColor, display: 'inline-block', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1}}
				>
					<div>
						<p style={{margin: 0, color: 'white', fontWeight: '600'}}>{loading ? 'Saving...' : 'Save'}</p>
					</div>
				</button>
			</div>
			)
	}
}