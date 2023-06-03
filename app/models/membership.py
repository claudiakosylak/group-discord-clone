from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Membership(db.Model):
    __tablename__ = 'memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    server = db.relationship('Server', back_populates='memberships')
    user = db.relationship('User', back_populates='memberships')

    def to_dict(self):
        return {
            'id': self.id,
            'role': self.role,
            'created_at': self.created_at,
            'server_id': self.server_id,
            'user_id': self.user_id,
            'server': self.server.to_dict(),
            'user': self.user.to_dict()
        }
