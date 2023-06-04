from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    channel = db.relationship('Channel', back_populates='channel_messages')
    user = db.relationship('User', back_populates='channel_messages')



    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'channel': self.channel.to_dict(),
            'user': self.user.to_dict()
        }
