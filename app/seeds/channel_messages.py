from app.models import db, ChannelMessage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

conversation = [
    [1, "Hey everyone! I'm excited to start our software development project!"],
    [2, "Me too! This is a great opportunity to learn and collaborate."],
    [3, "Absolutely! I'm still new to coding, but I'm eager to contribute."],
    [4, "Don't worry, we're all here to support each other. What's our first step?"],
    [5, "I suggest we have a brainstorming session to gather project ideas."],
    [6, "Good idea! Let's schedule a meetup this weekend. Who's available?"],
    [7, "Count me in! I'm free on Saturday afternoon."],
    [8, "Saturday works for me too. Let's aim for late morning."],
    [9, "I have another commitment on Saturday, but I'm available on Sunday."],
    [10, "Sunday works for me as well. We can start fresh then."],
    [3, "Okay, let's finalize the meetup for Sunday. What's the location?"],
    [2, "How about we meet at a local coffee shop with free Wi-Fi?"],
    [6, "Sounds good. Can someone suggest a coffee shop near downtown?"],
    [4, "I know a great place called 'Coding Brew.' It's close to the library."],
    [1, "Perfect! Let's meet at Coding Brew on Sunday at 10 AM. Agreed?"],
    [5, "Agreed! Looking forward to meeting everyone and discussing ideas."],
    [9, "Count me in. See you all on Sunday at Coding Brew."],
    [8, "Sunday at Coding Brew it is. I'll bring my laptop."],
    [7, "Excited to join! Sunday at 10 AM, Coding Brew it is."],
    [10, "I'll make sure to come prepared. Can't wait for the meetup!"],
    [2, "Before we wrap up, does anyone have any specific agenda points?"],
    [3, "We should discuss our preferred programming languages and tools."],
    [4, "Agreed. We should also decide on the scope and goals of our project."],
    [6, "Let's create an agenda document and share it with everyone."],
    [1, "Great idea! I'll set up a shared Google Doc for our agenda."],
    [5, "Thanks for taking the lead, Demo. We appreciate it!"],
    [7, "Looking forward to collaborating with all of you. See you Sunday!"],
    [10, "Same here! Sunday can't come soon enough. See you all then!"],
    [8, "Thanks, Demo! See you all on Sunday for an exciting journey!"],
    [9, "Wishing everyone a productive meetup. Sunday, here we come!"]
]

conversation2 = [
    [4, "Hey everyone, did you see the news about that car crash? It looked pretty severe."],
    [6, "Yes, I saw it! It was a terrifying scene. I hope everyone involved is okay."],
    [8, "Oh no, that's terrible! Accidents like these are always so tragic. I hope they get the help they need."],
    [10, "I missed the news. Can someone fill me in on what happened?"],
    [12, "There was a multi-vehicle collision on the highway. It caused a major traffic jam and emergency services are on the scene."],
    [4, "I saw a few clips online. The wreckage was extensive. I hope they can determine the cause and prevent similar incidents in the future."],
    [6, "Absolutely! It's a reminder of how important it is to drive safely and be aware of our surroundings on the road."],
    [8, "It's crucial to follow traffic rules and maintain a responsible attitude while driving. Safety should always be our top priority."],
    [10, "Thanks for the update, Sophia. It's a sobering reminder to be cautious and mindful while on the road."],
    [12, "You're welcome, Isabella. Let's hope everyone involved in the accident recovers quickly and that we can learn from this incident."],
]


introductions = [
    [1, "Hey everyone! I'm Demo, and I'm excited to be here. I'm a beginner software developer with a passion for web development."],
    [2, "Hello, fellow developers! I'm Marnie. I'm new to coding, but I'm eager to learn and contribute to our project."],
    [3, "Hi, everyone! I'm Ethan, and I'm still exploring the world of programming. Looking forward to collaborating with all of you."],
    [4, "Greetings, team! I'm Olivia, and I'm thrilled to join this software development project. Let's create something amazing together!"],
    [5, "Hey there! I'm Liam, a coding enthusiast ready to dive into this project. Excited to meet everyone and see what we can achieve."],
    [6, "Hi, folks! I'm Emma, a budding software developer. Looking forward to brainstorming and working with all of you."],
    [7, "Hello, everyone! I'm Noah, and I can't wait to contribute to this project. Let's build something great together!"],
    [8, "Hey, all! I'm Ava, a beginner coder passionate about software development. Looking forward to collaborating and learning from you."],
    [9, "Greetings, team members! I'm Aiden, an aspiring software developer. Excited to embark on this project and grow together."],
    [10, "Hey everyone! I'm Isabella, a novice programmer eager to dive into this project. Let's make our mark in the world of software development!"]
]

off_topic_convo = [
    [4, "Hey everyone! Have you ever seen a walrus? They are so cute!"],
    [6, "Yes, I completely agree! Walruses have this adorable charm about them."],
    [8, "Absolutely! Those big tusks and their plump bodies make them irresistibly cute."],
    [10, "I've never seen a walrus in person, but they always look adorable in pictures and videos."],
    [12, "Walruses are incredible creatures. Their whiskers and blubbery appearance just make them even more endearing."],
    [4, "Did you know that walruses are highly social animals? They form tight-knit communities in the wild."],
    [6, "That's fascinating! It's heartwarming to think about how walruses interact and care for one another."],
    [8, "Absolutely! It's incredible to see how they communicate and show affection within their groups."],
    [10, "I'd love to see a walrus in person someday. I can only imagine how adorable they must be up close."],
    [12, "If you ever get the chance, don't miss it! They have such a unique and lovable presence. You'll be smitten."],
]

local_election = [
    [4, "Hey everyone! Just a friendly reminder to make sure you're registered to vote in your local elections."],
    [6, "That's a great point! Local elections have a direct impact on our communities. Every vote counts!"],
    [8, "Absolutely! It's crucial to participate and have a say in the decisions that shape our neighborhoods."],
    [10, "I completely agree. Local elections often decide policies that directly affect our schools, parks, and infrastructure."],
    [12, "Remembering to vote is an essential civic duty. Let's encourage everyone we know to get out there and make their voices heard!"],
]

anime = [
    [6, "Hey everyone! I can't contain my excitement about the latest anime series. It's absolutely amazing!"],
    [9, "Oh, I'm glad you mentioned it! I've been looking for a new anime to watch. Which series are you talking about?"],
    [12, "I think I know the one! The animation and storyline are top-notch. I've been hooked since the first episode."],
    [15, "You guys are talking about that new fantasy anime, right? I've heard nothing but great things about it!"],
    [18, "I'm always up for some good anime recommendations. What's the name of this series, and where can I watch it?"],
    [6, "The anime is called 'Chronicles of the Elements.' You can watch it on a popular streaming platform. Trust me, it's worth it!"],
    [9, "Thanks for sharing, Emma! I'll definitely add it to my watchlist. I'm excited to dive into this captivating series."],
    [12, "Logan, you won't be disappointed. The animation quality and character development are outstanding."],
    [15, "That's what I've been hearing! I can't wait to start watching it. It sounds like a true masterpiece."],
    [18, "Thanks for the recommendation, Emma. I'll make sure to check it out. I'm always in search of compelling anime to enjoy."],
]

qa = [
    [6, "Hey, does anyone know how to add a new channel to the server? I think we could benefit from having a dedicated channel for game discussions."],
    [9, "That's a great idea! However, only the server owner has the permission to create new channels. We should reach out to them and suggest it."],
    [12, "Exactly, Emma. It's the server owner's responsibility to manage the channels and permissions. They can create a new channel for us if they find it suitable."],
    [15, "I agree. It's best to ask the server owner about adding a new channel. They can assess if it aligns with the server's purpose and make the necessary arrangements."],
    [18, "Thanks for clarifying, Aiden and Sophia. I'll message the server owner and propose the idea. Hopefully, they will consider adding a game discussions channel."],
]

gaming = [
    [6, "Hey everyone! What games have you been playing lately? I'm looking for some recommendations."],
    [9, "I've been hooked on a new RPG game. The storytelling and immersive world are incredible. You should definitely give it a try!"],
    [12, "I've been exploring the world of competitive online gaming. It's intense but so much fun!"],
    [15, "I've been diving into a multiplayer shooter. The fast-paced action and teamwork make it a thrilling experience."],
    [18, "I've been enjoying a strategy game that challenges my critical thinking skills. It's a great way to unwind after a long day."],
    [6, "Thanks for the suggestions! I'll definitely check them out. Gaming is such a fantastic way to relax and have fun."],
    [9, "Absolutely! Gaming allows us to escape into different worlds and experiences. It's a great form of entertainment."],
    [12, "Gaming also helps me connect with friends from around the world. It's amazing how games can bring people together."],
    [15, "I agree, Sophia! The online gaming community is so diverse and vibrant. It's like a whole new social network."],
    [18, "Gaming has evolved so much over the years. It's impressive how it can be both a form of entertainment and a platform for socializing."],
]

art_show = [
    [8, "Hey everyone! There's a local art show happening this weekend. Who's interested in going?"],
    [12, "I love art shows! Count me in. I'm always excited to explore and support local artists."],
    [1, "I'm definitely interested! Art shows are a great way to discover new talents and get inspired."],
    [16, "I've been meaning to attend more art events. It's a wonderful opportunity to appreciate creativity and expressiveness."],
    [20, "I'm up for it too! It's always fascinating to see different art styles and interpretations."],
    [24, "That sounds intriguing! I'd love to join and immerse myself in the local art scene. Let's make plans to go together."],
    [8, "Great! Let's set a date and time. The art show starts at 5 PM on Saturday. How about we meet up at 4:30 PM near the entrance?"],
    [12, "Sounds like a plan, Ava. I'll mark it on my calendar. Can't wait to explore the art exhibits with all of you."],
    [1, "I'll be there too! Looking forward to discussing the art pieces and sharing our thoughts on the creative expressions."],
    [16, "I'll make sure to be there on time. It'll be a refreshing experience to see the local art scene come to life."],
]

music_recommendations = [
    [8, "Hey everyone! I'm looking for some new music recommendations. What are you all currently listening to?"],
    [12, "Lately, I've been into indie rock bands. I can recommend a few artists if you're interested in that genre."],
    [1, "I'm open to any genre! Share some of your indie rock recommendations, User 12. I'm always looking to expand my music library."],
    [16, "I've been exploring electronic music lately. It's a diverse genre with so many subgenres and talented artists to discover."],
    [20, "I'm a big fan of hip-hop. If you're interested, I can suggest some amazing artists and albums you might enjoy."],
    [8, "Thanks for the recommendations, everyone! I'll check out the indie rock artists, electronic music, and hip-hop suggestions. Can't wait to broaden my musical horizons!"],
]

art_creativity = [
    [8, "Hey everyone! Let's talk about art and creativity. What does art mean to you?"],
    [12, "Art, to me, is a form of self-expression. It allows me to communicate emotions, thoughts, and perspectives in unique ways."],
    [1, "I see art as a powerful means of storytelling. It has the ability to convey messages and evoke emotions that words sometimes can't."],
    [16, "Art is a way to explore and challenge boundaries. It encourages us to think outside the box and embrace our imagination."],
    [20, "For me, art is a source of inspiration and a way to appreciate beauty in its various forms. It brings joy and wonder into my life."],
    [24, "Art is a reflection of the artist's soul. It's a visual representation of their experiences, passions, and interpretations of the world."],
    [8, "I love how art can be interpreted differently by each person who experiences it. It sparks conversations and encourages diverse perspectives."],
    [12, "Absolutely, Ava! Art has the power to connect people, inspire dialogue, and ignite creativity in both the artist and the audience."],
]

professor = [
    [1, "Hey everyone, have you had a class with Professor Smith? I find their teaching style frustrating."],
    [10, "I'm in that class too, and I completely agree. Their lectures are so disorganized, and it's hard to follow along."],
    [15, "I've had them before, and I had a similar experience. It's frustrating when a professor can't effectively communicate the course material."],
    [20, "I've heard similar complaints from other students as well. It's unfortunate when a professor's teaching style hinders our learning experience."],
    [25, "I'm currently in their class too, and it's been a struggle. The lack of clarity and guidance makes it challenging to grasp the concepts."],
    [30, "I had Professor Smith last quarter, and it wasn't a positive experience. Their grading seemed inconsistent, which was frustrating."],
    [35, "I can relate to that. I had them for a different course, and it was one of my least favorite classes. Their teaching methods need improvement."],
    [1, "It's reassuring to know I'm not the only one struggling with this professor. I wonder if there's anything we can do to address our concerns."],
    [10, "We could potentially provide feedback to the department or speak to the professor directly about our difficulties. It's worth considering."],
    [15, "That's a good idea, Isabella. Constructive feedback might help them reflect on their teaching methods and make necessary adjustments."],
]

memes = [
    [1, "Hey everyone! Where do you usually find the best funny memes? I need some laughs."],
    [10, "I often find hilarious memes on social media platforms like Reddit and Twitter. The meme communities there are quite active."],
    [15, "Agreed, Isabella. Reddit is my go-to for funny memes. There are specific subreddits dedicated to memes that always deliver the laughs."],
    [20, "I also find great memes on Instagram. Many meme pages and accounts curate funny content, and you can explore different meme genres too."],
    [25, "Besides social media, I find funny memes on meme websites like 9GAG and Imgur. They have a vast collection of memes to browse through."],
    [30, "If you're into video memes, TikTok is worth checking out. Many creators there come up with creative and humorous short videos."],
    [35, "I find a lot of funny memes on Facebook too. There are meme groups and pages where users share hilarious content regularly."],
]

tech_talk = [
    [1, "Hey everyone! Let's talk about the latest trends in AI. What exciting developments have you come across recently?"],
    [10, "I've been following the advancements in natural language processing. AI models are getting better at understanding and generating human-like text."],
    [15, "That's fascinating, User 10! I've been intrigued by the progress in computer vision. AI algorithms can now analyze images and videos with remarkable accuracy."],
    [20, "I've been exploring the applications of AI in healthcare. It's impressive how AI is assisting in early disease detection and personalized treatments."],
    [25, "User 20, that's an exciting area! I've also been reading about AI in autonomous vehicles. It's evolving rapidly, and we may see self-driving cars become more common in the near future."],
    [30, "Another trend I've noticed is the integration of AI in cybersecurity. AI algorithms can help detect and prevent cyber threats more effectively."],
    [35, "I'm particularly excited about AI in robotics. The advancements in AI are enabling robots to perform complex tasks and interact more naturally with humans."],
]


announcement_messages = [
    "📢 Announcement: Welcome to our Discord community! We're thrilled to have you all here. Feel free to introduce yourself and get to know other members. Enjoy your stay!",
    "📢 Announcement: Server Maintenance Scheduled for tomorrow, 8 PM UTC. Expect temporary downtime as we work on improving server performance. Thank you for your patience!"
]


def seed_channel_messages():
    for message in conversation:
        new_message = ChannelMessage(
        content = message[1], user_id = message[0], channel_id = 1
        )
        db.session.add(new_message)
    db.session.commit()

    for message in conversation2:
        new_message = ChannelMessage(
        content = message[1], user_id = message[0], channel_id = 4
        )
        db.session.add(new_message)
    db.session.commit()

    for message in off_topic_convo:
        new_message = ChannelMessage(
        content = message[1], user_id = message[0], channel_id = 5
        )
        db.session.add(new_message)
    db.session.commit()

    for message in local_election:
        new_message = ChannelMessage(
        content = message[1], user_id = message[0], channel_id = 6
        )
        db.session.add(new_message)
    db.session.commit()

    for message in announcement_messages:
        new_message = ChannelMessage(
            content = message, user_id = 1, channel_id = 2
        )
        db.session.add(new_message)
    db.session.commit()

    for message in introductions:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 3
        )
        db.session.add(new_message)
    db.session.commit()

    for message in anime:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 7
        )
        db.session.add(new_message)
    db.session.commit()

    for message in qa:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 8
        )
        db.session.add(new_message)
    db.session.commit()

    for message in gaming:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 9
        )
        db.session.add(new_message)
    db.session.commit()

    for message in art_show:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 10
        )
        db.session.add(new_message)
    db.session.commit()

    for message in music_recommendations:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 11
        )
        db.session.add(new_message)
    db.session.commit()

    for message in art_creativity:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 12
        )
        db.session.add(new_message)
    db.session.commit()

    for message in professor:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 13
        )
        db.session.add(new_message)
    db.session.commit()


    for message in memes:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 14
        )
        db.session.add(new_message)
    db.session.commit()

    for message in tech_talk:
        new_message = ChannelMessage(
            content=message[1], user_id = message[0], channel_id = 15
        )
        db.session.add(new_message)
    db.session.commit()



def undo_channel_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_messages"))

    db.session.commit()
