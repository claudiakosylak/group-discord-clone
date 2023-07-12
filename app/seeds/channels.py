from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

channel_topics = [
    "announcements",
    "introductions",
    "off-topic-discussions",
    "news-and-current-events",
    "q&a-and-help",
    "gaming-corner",
    "music-recommendations",
    "art-and-creativity",
    "memes-and-funny-content",
    "tech-talk",
    "coding-and-development",
    "book-club",
    "movie-reviews",
    "tv-series-discussions",
    "anime-and-manga",
    "sports-talk",
    "fitness-and-wellness",
    "travel-stories",
    "food-and-recipes",
    "fashion-and-style",
    "photography-showcase",
    "pet-lovers",
    "science-and-technology",
    "debates-and-discussions",
    "language-exchange",
    "writing-and-poetry",
    "career-advice",
    "education-and-learning",
    "gaming-news-and-updates",
    "virtual-events-and-meetups",
    "design-and-graphics",
    "podcast-recommendations",
    "mental-health-support",
    "lgbtq+-community",
    "relationship-advice",
    "finance-and-investing",
    "diy-projects",
    "gardening-tips",
    "coding-challenges",
    "productivity-hacks",
    "fitness-challenges-and-goals",
    "movie-trivia",
    "fan-theories",
    "art-collaborations",
    "coding-help-and-troubleshooting",
    "game-tutorials-and-tips",
    "fashion-trends-and-tips",
    "virtual-reality-discussions",
    "server-feedback-and-suggestions"
]





def seed_channels():
    channel_topic = 0

    for x in range(1, 21):
        channel1 = Channel(
            title='general', server_id = x, topic = "This is the general channel"
        )
        db.session.add(channel1)
        for y in range(1, 3):
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
