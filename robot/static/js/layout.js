'use strict';

function Title(){
		return(
			<h1>Welcome to the Telepresence Robot</h1>
			)
}

function Button(props){
	return(
		<button className="control" onClick={props.onClick}>
		{props.value}
		</button>
		)
}

class Header extends React.Component{
		render(){
			return(
			<div className="header">
				<Title />
			</div>
			)
		}
		
}

{/*class Video extends React.Component{
	render(){
		return(
			<img src="{{ url_for('video_feed') }}" />
			)
	}

}*/}

class ButtonContainer extends React.Component{
	render(){
		return(
			<table>
				<tbody>
					<tr>
						<td>
							<Button value="Camera Up" />
							<Button value="Camera Down" />
							<Button value="Camera Left" />
							<Button value="Camera Right" />
						</td>
					</tr>
				</tbody>
			</table>)
	}
}

class Body extends React.Component{
	render(){
		return(
		<div className="body">
			<div className="video">
				<ButtonContainer />
			</div>
		</div>	
		)
	}
}

class Webpage extends React.Component{
	render(){
		return(
		<div>
			<Header />
				<div className="body">
					<Body />
				</div>	
		</div>
		)
	}
}

let domContainer = document.querySelector('#root');
ReactDOM.render(<Webpage />, domContainer);