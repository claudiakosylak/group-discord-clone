from flask_socketio import SocketIO, emit
import os
from .models import ChannelMessage, db
socketio = SocketIO()


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://discordia.onrender.com',
        'http://discordia.onrender.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    if data != "User connected!":
        channel_message = ChannelMessage(
            channel_id=data['channel_id'],
            user_id=data['user_id'],
            content=data['content']
        )
        db.session.add(channel_message)
        db.session.commit()

    emit("chat", data, broadcast=True)

# handle deleting chat messages
@socketio.on("delete_message")
def handle_delete(data):
    if data != "User connected!":
        channel_message = ChannelMessage.query.get(data["id"])
        db.session.delete(channel_message)
        db.session.commit()

    emit("delete_message", data, broadcast=True)