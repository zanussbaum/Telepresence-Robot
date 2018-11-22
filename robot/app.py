#!/usr/bin/env python
from flask import Flask, render_template, Response
from flask_socketio import SocketIO
import os
#from gpiozero import Robot
from importlib import import_module

# import camera driver
if os.environ.get('CAMERA'):

    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    from camera import Camera

app = Flask(__name__) 
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def setup_robot():
	robot = Robot(left=(7,8), right=(9,10))
	return robot

#home page
@app.route('/')
def index():
	return render_template('index.html')

def gen(camera):
	while True:
		frame = camera.get_frame()
		yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
	return Response(gen(Camera()),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/left')
def turn_left():
	robot = setup_robot()
	robot.right(.5)

@app.route('/right')
def turn_right():
	robot = setup_robot()
	robot.left(.5)

@app.route('/forward')
def go_forward():
	robot = setup_robot()
	robot.forward(.5)

@app.route('/back')
def go_backward():
	robot = setup_robot()
	robot.backward(.5)

#creating bidirectional video for server to handle video from client	

#need to figure out how to encode video from js to python 
#look at xhr to decode video in js and then figure how to encode in python, then open up video? 
#also may need to refactor html so that it plays other video from that video source
@socketio.on('client_video')
def handle_message(video):
	print("getting video feed from client")
	print(video.value)

if __name__ == '__main__':
	socketio.run(app,host='0.0.0.0', debug=True)

