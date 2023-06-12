from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Membership


membership_routes = Blueprint("memberships", __name__)

@membership_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_membership(id):

    """Leave a server"""

    membership = Membership.query.get(id)
    db.session.delete(membership)
    db.session.commit()
    return {"message": "successful"}
