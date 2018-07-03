import cv2 as cv
import numpy as np
from base_camera import BaseCamera
class Camera(BaseCamera):
	video_source = 0

	@staticmethod
	#setting video source to something else, initially set to 0 
	def set_video_source(source):
		Camera.video_source = source

	@staticmethod
	def frames():
		camera = cv.VideoCapture(Camera.video_source)

		if not camera.isOpened():
			raise RuntimeError('Could not start camera')

		while True:
			#get next frame

			retVal, img = camera.read()

			yield cv.imencode('.jpg', img)[1].tobytes()