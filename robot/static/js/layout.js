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
	render(){
		return(
			<img src={this.props.value}ß />
			);
	}
}
class VideoContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			baseSite: window.location.href,
			isRunning: false
		};
	}

	play(){
		const feed = "video_feed";
		if(this.state.isRunning){
			return;
		}
		this.setState({
			baseSite: this.state.baseSite + feed,
			isRunning: !this.state.isRunning
		});

	}

	pause(){
		if(!this.state.isRunning){
			return;
		}
		this.setState({
			baseSite: window.location.href,
			isRunning: !this.state.isRunning
		});
	}
	render(){
		const path = this.state.baseSite;
		return(
			<table>
				<tbody>
					<tr>
						<td>
							<Video  value={path} />
						</td>
					</tr>
					<tr>
						<td>
							<Button value="Start" onClick={() =>this.play()} />
						</td>
					</tr>
					<tr>
						<td>
							<Button value="Stop" onClick={() => this.pause()} />
						</td>
					</tr>
				</tbody>
			</table>
			);
	}
}
class Body extends React.Component{
	render(){
		return(
		<div className="body">
			<div className="video">
				<VideoContainer />
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