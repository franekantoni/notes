import React from 'react'

export default class TimeControl extends React.PureComponent{
	render(){
		return(
			<div style={{flexDirection: 'row'}}>
              <div style={{margin: 5, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.0)', flexDirection: 'row', display: 'inline-block', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1}}>
                <p style={{margin: 0}}>Available for</p> 
              </div>
              <a href="#">
                <div style={{margin: 5, borderRadius: 5, display: 'inline-block', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1}}>
                  <p style={{margin: 0, fontWeight: '600', color: 'rgb(0,122,255)'}}>23h</p>
                </div>
              </a>
            </div>)
	}
}