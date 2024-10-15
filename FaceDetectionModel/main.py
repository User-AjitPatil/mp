# import cv2
# import time
# import winsound
# import numpy as np
# from datetime import datetime
# import requests
# import threading
# from facial_detections import detectFace
# from blink_detection import isBlinking
# from mouth_tracking import mouthTrack
# from object_detection import detectObject
# from eye_tracker import gazeDetection
# from head_pose_estimation import head_pose_detection

# # Global variables
# data_record = []  # This will hold all records
# running = True

# # For Beeping
# frequency = 2500
# duration = 1000

# # Function to send results to the admin
# def send_results_to_admin(results):
#     api_url = 'http://localhost:5000/api/send_results'  # Ensure this matches your Flask server's URL
#     headers = {'Content-Type': 'application/json'}

#     # Send results as JSON
#     response = requests.post(api_url, json=results, headers=headers)

#     # Check if the request was successful
#     if response.status_code == 200:
#         print("Results sent to admin successfully.")
#         return response.json()  # Return response from the server
#     else:
#         print("Failed to send results to admin:", response.status_code)
#         print("Response:", response.json())  # Print the error response for debugging
#         return None  # Or handle the error accordingly

# # OpenCV videocapture for the webcam
# cam = cv2.VideoCapture(0)

# # Function to handle face count detection
# def faceCount_detection(faceCount):
#     if faceCount > 1:
#         time.sleep(5)
#         winsound.Beep(frequency, duration)
#         return "Multiple faces have been detected."
#     elif faceCount == 0:
#         time.sleep(5)
#         winsound.Beep(frequency, duration)
#         return "No face has been detected."
#     else:
#         return "Face detecting properly."

# # Main function 
# def proctoringAlgo():
#     global data_record
#     blinkCount = 0
#     start_time = time.time()  # Record the start time

#     while running:
#         ret, frame = cam.read()

#         # Check if the frame is successfully captured
#         if not ret:
#             print("Error: Could not read frame from camera.")
#             continue  # Skip to the next iteration if the frame is not valid

#         # Reading the current time
#         current_time = datetime.now().strftime("%H:%M:%S.%f")
#         print("Current time is:", current_time)

#         # Returns the face count and will detect the face.
#         faceCount, faces = detectFace(frame)
#         remark = faceCount_detection(faceCount)
#         print(remark)

#         # Initialize a record for this iteration
#         record = {
#             'timestamp': current_time,
#             'face_count': faceCount,
#             'face_detection_status': remark,
#             'blink_count': 0,
#             'eye_status': '',
#             'mouth_position': '',
#             'object_detected': '',
#             'head_pose': '',
#         }

#         if faceCount == 1:
#             # Blink Detection
#             blinkStatus = isBlinking(faces, frame)
#             print(blinkStatus[2])
#             if blinkStatus[2] == "Blink":
#                 blinkCount += 1
#                 record['blink_count'] = blinkCount
#                 record['blink_status'] = blinkStatus[2]
#             else:
#                 record['blink_status'] = blinkStatus[2]

#             # Gaze Detection
#             eyeStatus = gazeDetection(faces, frame)
#             print(eyeStatus)
#             record['eye_status'] = eyeStatus

#             # Mouth Position Detection
#             mouth_position = mouthTrack(faces, frame)
#             print(mouth_position)
#             record['mouth_position'] = mouth_position

#             # Object detection using YOLO
#             objectName = detectObject(frame)
#             print(objectName)
#             record['object_detected'] = objectName

#             if len(objectName) > 1:
#                 time.sleep(4)
#                 winsound.Beep(frequency, duration)
#                 continue

#             # Head Pose estimation
#             headPose = head_pose_detection(faces, frame)
#             print(headPose)
#             record['head_pose'] = headPose

#         # Append the current record to the data_record
#         data_record.append(record)

#         # Check if 1 minute has passed
#         if time.time() - start_time >= 60:  # 60 seconds = 1 minute
#             # Send consolidated results to admin
#             response = send_results_to_admin(data_record)
#             if response:
#                 print("Response from admin:", response)
#             # Reset the timer and data record
#             start_time = time.time()
#             data_record = []  # Clear the record after sending

#         # Convert the frame to JPEG format
#         _, buffer = cv2.imencode('.jpg', frame)
#         frame = buffer.tobytes()

#         # Ensure that the frame is a valid NumPy array before showing it
#         if isinstance(frame, (bytes, bytearray)):  # Check if the frame is still a valid byte array
#             # Convert bytes back to a NumPy array for imshow
#             frame = cv2.imdecode(np.frombuffer(frame, np.uint8), cv2.IMREAD_COLOR)

#             # Show the camera frame
#             cv2.imshow('Frame', frame)

#         # Exit condition: press 'q' to exit the loop
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cam.release()
#     cv2.destroyAllWindows()

# # Start the proctoring algorithm
# proctoringAlgo()


import cv2
import time
import winsound
import numpy as np
from datetime import datetime
import requests
import threading
from facial_detections import detectFace
from blink_detection import isBlinking
from mouth_tracking import mouthTrack
from object_detection import detectObject
from eye_tracker import gazeDetection
from head_pose_estimation import head_pose_detection

# Global variables
data_record = []  # This will hold all records
running = True
data_lock = threading.Lock()  # A lock to manage access to the data_record

# For Beeping
frequency = 2500
duration = 1000

# Function to send results to the admin
def send_results_to_admin(results):
    api_url = 'http://localhost:4000/api/send_results'  # Ensure this matches your Flask server's URL
    headers = {'Content-Type': 'application/json'}

    # Send results as JSON
    response = requests.post(api_url, json=results, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        print("Results sent to admin successfully.")
        return response.json()  # Return response from the server
    else:
        print("Failed to send results to admin:", response.status_code)
        print("Response:", response.json())  # Print the error response for debugging
        return None  # Or handle the error accordingly

# Function to periodically send results every minute
def periodic_send():
    while running:
        time.sleep(60)  # Wait for 60 seconds
        with data_lock:  # Ensure that we are accessing the data_record safely
            if data_record:
                response = send_results_to_admin(data_record)
                if response:
                    print("Response from admin:", response)
                data_record.clear()  # Clear the record after sending

# OpenCV videocapture for the webcam
cam = cv2.VideoCapture(0)

# Function to handle face count detection
def faceCount_detection(faceCount):
    if faceCount > 1:
        time.sleep(5)
        winsound.Beep(frequency, duration)
        return "Multiple faces have been detected."
    elif faceCount == 0:
        time.sleep(5)
        winsound.Beep(frequency, duration)
        return "No face has been detected."
    else:
        return "Face detecting properly."

# Main function 
def proctoringAlgo():
    global data_record
    blinkCount = 0
    start_time = time.time()  # Record the start time

    while running:
        ret, frame = cam.read()

        # Check if the frame is successfully captured
        if not ret:
            print("Error: Could not read frame from camera.")
            continue  # Skip to the next iteration if the frame is not valid

        # Reading the current time
        current_time = datetime.now().strftime("%H:%M:%S.%f")
        print("Current time is:", current_time)

        # Returns the face count and will detect the face.
        faceCount, faces = detectFace(frame)
        remark = faceCount_detection(faceCount)
        print(remark)

        # Initialize a record for this iteration
        record = {
            'timestamp': current_time,
            'face_count': faceCount,
            'face_detection_status': remark,
            'blink_count': 0,
            'eye_status': '',
            'mouth_position': '',
            'object_detected': '',
            'head_pose': '',
        }

        if faceCount == 1:
            # Blink Detection
            blinkStatus = isBlinking(faces, frame)
            print(blinkStatus[2])
            if blinkStatus[2] == "Blink":
                blinkCount += 1
                record['blink_count'] = blinkCount
                record['blink_status'] = blinkStatus[2]
            else:
                record['blink_status'] = blinkStatus[2]

            # Gaze Detection
            eyeStatus = gazeDetection(faces, frame)
            print(eyeStatus)
            record['eye_status'] = eyeStatus

            # Mouth Position Detection
            mouth_position = mouthTrack(faces, frame)
            print(mouth_position)
            record['mouth_position'] = mouth_position

            # Object detection using YOLO
            objectName = detectObject(frame)
            print(objectName)
            record['object_detected'] = objectName

            if len(objectName) > 1:
                time.sleep(4)
                winsound.Beep(frequency, duration)
                continue

            # Head Pose estimation
            headPose = head_pose_detection(faces, frame)
            print(headPose)
            record['head_pose'] = headPose

        # Append the current record to the data_record
        with data_lock:  # Ensure thread safety when accessing data_record
            data_record.append(record)

        # Convert the frame to JPEG format
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Ensure that the frame is a valid NumPy array before showing it
        if isinstance(frame, (bytes, bytearray)):  # Check if the frame is still a valid byte array
            # Convert bytes back to a NumPy array for imshow
            frame = cv2.imdecode(np.frombuffer(frame, np.uint8), cv2.IMREAD_COLOR)

            # Show the camera frame
            cv2.imshow('Frame', frame)

        # Exit condition: press 'q' to exit the loop
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cam.release()
    cv2.destroyAllWindows()

# Start the periodic sending in a separate thread
send_thread = threading.Thread(target=periodic_send)
send_thread.start()

# Start the proctoring algorithm
proctoringAlgo()

# Stop the sending thread gracefully
running = False
send_thread.join()  # Wait for the send_thread to finish before exiting