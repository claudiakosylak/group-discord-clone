from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

channel_topics = [
    "Announcements", "Introductions", "Off-Topic Discussions", "News and Current Events",
    "Q&A and Help", "Gaming Corner", "Music Recommendations", "Art and Creativity", "Memes and Funny Content",
    "Tech Talk", "Coding and Development", "Book Club", "Movie Reviews", "TV Series Discussions",
    "Anime and Manga", "Sports Talk", "Fitness and Wellness", "Travel Stories", "Food and Recipes",
    "Fashion and Style", "Photography Showcase", "Pet Lovers", "Science and Technology", "Debates and Discussions",
    "Language Exchange", "Writing and Poetry", "Career Advice", "Education and Learning", "Gaming News and Updates",
    "Virtual Events and Meetups", "Design and Graphics", "Podcast Recommendations", "Mental Health Support",
    "LGBTQ+ Community", "Relationship Advice", "Finance and Investing", "DIY Projects", "Gardening Tips",
    "Coding Challenges", "Productivity Hacks", "Fitness Challenges and Goals", "Movie Trivia", "Fan Theories",
    "Art Collaborations", "Coding Help and Troubleshooting", "Game Tutorials and Tips", "Fashion Trends and Tips",
    "Virtual Reality Discussions", "Server Feedback and Suggestions"
]




def seed_channels():
    channel_topic = 0

    for x in range(1, 11):
        channel1 = Channel(
            title='general', server_id = x, topic = "This is the general channel"
        )
        db.session.add(channel1)
        for y in range(1, 5):
            channel = Channel(
                title=channel_topics[channel_topic], server_id = x, topic=channel_topics[channel_topic]
            )
            channel_topic += 1
            db.session.add(channel)
    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
