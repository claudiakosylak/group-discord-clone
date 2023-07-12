from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import random

dob1 = datetime.strptime('1990-11-11', '%Y-%m-%d')

about_sections = [
    "Passionate gamer seeking a community to share epic adventures in this Discord clone.",
    "Tech lover exploring the digital realm and eager to connect with fellow enthusiasts here.",
    "Artist and dreamer looking for inspiration and creative collaboration in this Discord clone.",
    "Sports fanatic ready to join the competitive spirit and discuss thrilling games on this Discord clone.",
    "Science geek fascinated by discoveries and eager to engage in scientific discussions here.",
    "Bookworm seeking literary companions to dive into captivating stories in this Discord clone.",
    "Music lover looking for melodic harmony and passionate discussions in this Discord clone.",
    "Fitness enthusiast on a journey to wellness, seeking motivation and support in this Discord clone.",
    "Film enthusiast eager to discuss movies, analyze storytelling, and share recommendations here.",
    "Foodie exploring flavors, recipes, and culinary experiences with fellow gastronomes on this Discord clone.",
    "Photographer capturing life's moments and seeking a space to share visual stories in this Discord clone.",
    "Entrepreneur with a vision, looking to connect with like-minded individuals on this Discord clone.",
    "Fashion enthusiast discussing trends, style tips, and expressing creativity in this Discord clone.",
    "Nature lover and adventurer seeking fellow explorers to share outdoor experiences in this Discord clone.",
    "Anime fan embracing the world of anime and manga, seeking a community to share excitement here.",
    "Educator passionate about learning, seeking discussions and knowledge exchange in this Discord clone.",
    "Parent navigating the joys and challenges of parenthood, seeking support and advice on this Discord clone.",
    "Coder and problem solver, ready to collaborate on coding projects and explore new technologies here.",
    "Writer sharing thoughts, stories, and seeking feedback from fellow writers in this Discord clone.",
    "Language learner embracing linguistic journeys and language exchange opportunities in this Discord clone.",
    "History buff fascinated by the past, seeking discussions and insights on historical events here.",
    "Movie critic analyzing films, sharing reviews, and engaging in thought-provoking discussions here.",
    "Animal lover passionate about pets, wildlife, and seeking a community of fellow animal enthusiasts here.",
    "Political enthusiast discussing current events, policies, and engaging in civil debates on this Discord clone.",
    "Tech support guru providing assistance, troubleshooting tips, and sharing knowledge on this Discord clone.",
    "Fitness coach inspiring and guiding others on their fitness journey within this Discord clone.",
    "Traveler sharing travel experiences, tips, and recommendations for wanderlust seekers in this Discord clone.",
    "Podcast enthusiast discussing favorite podcasts, sharing recommendations, and engaging in lively conversations here.",
    "Gamer and streamer seeking fellow gamers to team up, share gaming highlights, and create epic moments here.",
    "Digital artist showcasing artwork, offering insights, and connecting with fellow artists on this Discord clone.",
    "LGBTQ+ advocate fostering a safe space, providing support, and embracing diversity within this Discord clone.",
    "Student navigating the education journey, seeking study buddies, and academic support on this Discord clone.",
    "Film industry enthusiast discussing behind-the-scenes, analyzing cinematography, and connecting with filmmakers here.",
    "Parenting advice and support for new parents, sharing parenting hacks, and creating a supportive community here.",
    "Fitness enthusiast sharing workout routines, healthy recipes, and motivating others within this Discord clone.",
    "Freelancer connecting with clients, sharing freelance experiences, and providing professional advice in this Discord clone.",
    "AI and technology enthusiast discussing artificial intelligence, machine learning, and future innovations here.",
    "Fashionista sharing fashion inspiration, style tips, and connecting with fellow fashion lovers on this Discord clone.",
    "Astronomy enthusiast exploring the mysteries of the universe, discussing celestial events, and sharing astronomical insights here.",
    "Self-improvement journey sharing personal growth experiences, tips, and motivational stories within this Discord clone.",
    "Food blogger sharing culinary adventures, recipes, and food photography with fellow food enthusiasts here.",
    "Film production collaboration connecting filmmakers, actors, and creatives to bring captivating stories to life in this Discord clone.",
    "Startup founder sharing startup experiences, challenges, and networking with fellow entrepreneurs on this Discord clone.",
    "Fitness community supporting each other's fitness goals, sharing progress, and celebrating achievements within this Discord clone.",
    "Game developer exchanging ideas, discussing game design, and collaborating on game development projects in this Discord clone.",
    "Art therapy space connecting individuals through art, providing a supportive environment for self-expression within this Discord clone.",
    "Music producer and beatmaker sharing music production techniques, collaborating on music projects, and connecting with fellow producers here.",
    "Environmental activist discussing sustainability, sharing eco-friendly tips, and taking action to protect the planet within this Discord clone."
]


user_images = [
    "https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80",
    "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80",
    "https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1753&q=80",
    "https://images.unsplash.com/photo-1503516459261-40c66117780a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    "https://images.unsplash.com/photo-1485031828708-859c036d5a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1621346653382-1029ef81cd65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80",
    "https://images.unsplash.com/photo-1461800919507-79b16743b257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=932&q=80",
    "https://images.unsplash.com/photo-1474291102916-622af5ff18bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1492567291473-fe3dfc175b45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    "https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1701&q=80",
    "https://images.unsplash.com/photo-1500336624523-d727130c3328?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1497120573086-6219573cf71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    "https://images.unsplash.com/photo-1515202913167-d9a698095ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1439778615639-28529f7628bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/reserve/wVlfnlTbRtK8eGvbnBZI_VolkanOlmez_005.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2229&q=80",
    "https://images.unsplash.com/photo-1460904577954-8fadb262612c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2780&q=80",
    "https://images.unsplash.com/photo-1494368308039-ed3393a402a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80",
    "https://images.unsplash.com/photo-1445295029071-5151176738d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1489712310660-bbce44cc541d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1777&q=80",
    "https://images.unsplash.com/photo-1525206809752-65312b959c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1444011283387-7b0f76371f12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=886&q=80",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1474031317822-f51f48735ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://plus.unsplash.com/premium_photo-1663076097937-461f9feec2f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1494403687614-8ca3e13f154f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1460482930131-41238907db52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1834&q=80",
    "https://images.unsplash.com/photo-1503066375319-00fef06b159e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1749&q=80",
    "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1451444635319-e5e247fbb88d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1487546331507-fcf8a5d27ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    "https://images.unsplash.com/photo-1490723186985-6d7672633c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    "https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1474073705359-5da2a8270c64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=784&q=80",
    "https://images.unsplash.com/photo-1481456384069-0effc539ab7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1469989011449-f7b46079781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1431037242647-4c2c27cb5bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1495226476277-80789737b747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1459259191495-52eccde892c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1456363787828-7253b13b9e35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"

]

defaultImages = [
        "https://i.imgur.com/dHWrBJK.png",
        "https://i.imgur.com/vQrEpS1.png",
        "https://i.imgur.com/PI7kWup.png",
        "https://i.imgur.com/sidVfiL.png",
        "https://i.imgur.com/fDinbtN.png"
    ]

first_names = [
    "Ethan", "Olivia", "Liam", "Emma", "Noah", "Ava", "Aiden", "Isabella", "Lucas", "Sophia",
    "Mason", "Mia", "Logan", "Harper", "Jackson", "Amelia", "Elijah", "Charlotte", "Caleb", "Abigail",
    "Henry", "Emily", "Alexander", "Avery", "Sebastian", "Ella", "Benjamin", "Scarlett", "James", "Grace",
    "Jacob", "Chloe", "Samuel", "Victoria", "Michael", "Lily", "Daniel", "Layla", "Matthew", "Zoe",
    "Joseph", "Nora", "David"
]

first_names2 = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
    "Harper", "Evelyn", "Luna", "Ella", "Elizabeth", "Grace", "Sofia", "Victoria", "Avery", "Scarlett",
    "Mila", "Lily", "Eleanor", "Hannah", "Zoey", "Aria", "Penelope", "Leah", "Audrey", "Violet",
    "Stella", "Bella", "Claire", "Lucy", "Paisley", "Everly", "Nova", "Brooklyn", "Ellie", "Savannah",
    "Layla", "Naomi", "Skylar", "Liam", "Noah", "Jackson", "Aiden", "Lucas", "Caden", "Grayson",
    "Mason", "Elijah", "Logan", "Oliver", "Ethan", "Avery", "Benjamin", "Henry", "Daniel", "Alexander",
    "Sebastian", "Matthew", "Jack", "William", "James", "Michael", "David", "Joseph", "Samuel", "Owen",
    "Wyatt", "Carter", "John", "Luke", "Gabriel", "Anthony", "Dylan", "Isaac", "Andrew", "Joshua",
    "Julian", "Levi", "Christopher", "Leo", "Nathan", "Adam", "Thomas", "Ryan", "Eli", "Aaron"
]

new_first_names = list(set(first_names2) - set(first_names))


# Adds a demo user, you can add other users here if you want
def seed_users():
    about_num = 1
    pic_num = 2
    pass_num = 1
    demo = User(
        username='Demo', email='demo@aa.io', password='password', date_of_birth=dob1.date(), about=about_sections[0], profile_pic=user_images[0])

    db.session.add(demo)
    db.session.commit()

    marnie = User(
        username='Marnie', email='marnie@aa.io', password='password', date_of_birth=dob1.date(), about="I am an avid fan of Discordia and its communities! Reach out.", profile_pic=user_images[1])

    db.session.add(marnie)
    db.session.commit()

    for name in first_names:
        user = User(
            username=name, email=f'{name}@email.com', password='password', date_of_birth=dob1.date(), about=about_sections[about_num], profile_pic=user_images[pic_num]
        )
        about_num += 1
        pic_num += 1
        db.session.add(user)
        db.session.commit()

    for name in new_first_names:
        user = User(
            username=name, email=f'{name}@aa.io', password=f"password{pass_num}", date_of_birth=dob1.date(), profile_pic=random.choice(defaultImages)
        )
        pass_num += 1
        db.session.add(user)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
