from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    private_status = db.Column(db.Boolean, default=False)
    preview_icon = db.Column(db.String(255), default='https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg')
    created_at = db.Column(db.DateTime, default=datetime.now())
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    user = db.relationship('User', back_populates='servers')
    channels = db.relationship('Channel', back_populates='server')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'private_status': self.private_status,
            'preview_icon': self.preview_icon,
            'owner_id': self.owner_id,
            'user': self.user.to_dict(),
            'channels': self.channels.to_dict()
        }
