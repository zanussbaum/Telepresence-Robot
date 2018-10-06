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
class MoveRobot extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			baseSite: window.location.href
		};
	}
	left(){
		const left = "left"
		this.setState({
			baseSite: this.state.baseSite + left
		})
	}
	right(){
		const right = "right"
		this.setState({
			baseSite: this.state.baseSite + right
		})
	}

	forward(){
		const forward = "forward"
		this.setState({
			baseSite: this.state.baseSite + forward
		})
	}
	back(){
		const back = "back"
		this.setState({
			baseSite: this.state.baseSite + back
		})
	}
	render(){
		return(
			<div className="container">
				<table>
					<tbody>
						<tr>
							<td>
								<Button value="Left" onClick={()=>this.left()}/>
								<Button value="Right" onClick={()=>this.right()}/>
								<Button value="Forward" onClick={()=>this.forward()} />
								<Button value="Back" onClick={()=>this.back()} />
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
			<img src={this.props.value} />
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
				<MoveRobot/>
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