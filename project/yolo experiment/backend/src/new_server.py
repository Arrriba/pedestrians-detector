import base64
import io
import os
import time

import PIL.Image
import eventlet
import numpy
import socketio
from imageai.Detection import ObjectDetection
from flask import Flask, jsonify, request, send_from_directory, abort
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = '*'

HEIGHT_LIMIT = 480
archive_path = "../archive/"


def save_image(numpy_picture):
    im = PIL.Image.fromarray(numpy_picture)
    fingerprint = int(time.time())
    im.save(archive_path + str(fingerprint) + ".png")


#sio = socketio.Server()
#app = socketio.WSGIApp(sio, static_files={
#    '/': {'content_type': 'text/html', 'filename': 'index.html'}
#})


# DO NOT CHANGE signature !!
@app.route('/login', methods=['GET'])
@cross_origin()
def connect():
    print('connect ')
    # sio.emit('socket_connected', {'message': 'Connection successful'})
    return jsonify('connection successful')


@app.route('/image', methods=['POST'])
@cross_origin()
def send_camera():
    picture = request.files['image']
    if picture:
        image = PIL.Image.open(picture).copy()
    numpy_picture = numpy.array(image)

    save_image(numpy_picture)

    shape = numpy_picture.shape
    height = shape[0]
    width = shape[1]
    if height > HEIGHT_LIMIT:
        ratio = HEIGHT_LIMIT / height
        resulting_width = int(width * ratio)

        img = PIL.Image.fromarray(numpy_picture)
        result = img.resize(size=(resulting_width, HEIGHT_LIMIT))
        resized = numpy.array(result)

        picture = convert_picture(resized)
    else:
        picture = convert_picture(numpy_picture)
    save_image(picture)
    pil_img = PIL.Image.fromarray(picture)
    buff = io.BytesIO()
    pil_img.save(buff, format="PNG")
    new_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")

    # sio.emit('message_from_server', {'text': new_image_string})
    #return jsonify(' successful')
    return picture

# @sio.event
# def disconnect(sid):
#     print('disconnect ', sid)


def convert_picture(picture):
    input_array = picture

    # HERE
    model_path = "../models/yolo-tiny.h5"

    os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'

    detector = ObjectDetection()
    detector.setModelTypeAsTinyYOLOv3()
    detector.setModelPath(model_path)
    detector.loadModel()
    detection = detector.detectObjectsFromImage(input_image=input_array,
                                                #output_image_path=output_path,
                                                input_type="array",
                                                output_type="array")

    return detection[0]


if __name__ == '__main__':
    # eventlet.wsgi.server(eventlet.listen(('192.168.0.105', 8000)), app)
    app.run(host='192.168.0.105', port=8000, debug=True)
