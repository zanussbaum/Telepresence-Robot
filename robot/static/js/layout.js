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

class ButtonContainer extends React.Component{
	render(){
		return(
			<div className="container">
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
				</table>
			</div>)
	}
}

class Video extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			baseSite: window.location.href
		}
	}

	render(){
		const feed = "video_feed";

		const path = this.state.baseSite + feed;

		return(
			<img src={path} />
			);
	}
}

class Body extends React.Component{
	render(){
		return(
		<div className="body">
			<div className="video">
				<Video />
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