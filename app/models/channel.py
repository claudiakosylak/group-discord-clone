from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable = False)

    server = db.relationship('Server', back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'server_id': self.server_id,
            'server': self.server.to_dict()
        }
