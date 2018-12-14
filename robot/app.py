#!/usr/bin/env python
from flask import Flask, render_template, Response, request, session
from flask_socketio import SocketIO, join_room, emit, leave_room, rooms
import os
#from gpiozero import Robot


try:
    import picamera
    from camera_pi import Camera
    print('imported pi camera')
except:
    from camera_opencv import Camera


async_mode = None

app = Flask(__name__) 
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

count = 0 
clients = []

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

@socketio.on('connection')
def onConnection(words):
    print("User " + str(request.sid) + " I am connected!")
    clients.append((request.sid))
    global count
    count += 1
    print(str(count) + " users connected")

    room = request.sid
    join_room(room)
    print("User " + str(request.sid) + "joined room: " + str(room))

    if count == 2:
        print('bidrectional video enabled!')
        emit('ping from server', broadcast=True)

@socketio.on('pong from client')
def pong(message):
    print("got message from client " + str(message))
    other_client_room = getRoom(request.sid)
    print("sending to room : " + other_client_room)
    emit('video from client', message, room=other_client_room)
def getRoom(id):
    if(clients[0] == id):
        return clients[1]
    else:
        return clients[0]

@socketio.on('disconnect')
def disconnect():
    global count
    count -= 1
    print("there are now " + str(count) + " users")

 
if __name__ == '__main__':
	socketio.run(app, host='0.0.0.0', debug=True)
