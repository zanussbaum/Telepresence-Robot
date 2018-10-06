#!/usr/bin/env python
from flask import Flask, render_template, Response
from gpiozero import Robot
#gpio will only work on raspberry pi or if remote
#connections enabled 
from camera import Camera

app = Flask(__name__) 

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

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True, threaded=True)

