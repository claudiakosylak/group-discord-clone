<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/claudiakosylak/group-discord-clone">
    <img src="react-app/public/discord.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Discordia</h3>

  <p align="center">
    Discordia is a Discord clone where users can create and join servers to chat with other members in live time.
    <br />
    <a href="https://github.com/claudiakosylak/group-discord-clone"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://discordia.onrender.com">View Live Site</a>
    ·
    <a href="https://github.com/claudiakosylak/group-discord-clone/issues">Report Bug</a>
    ·
    <a href="https://github.com/claudiakosylak/group-discord-clone/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project


This project was a group collaboration to clone Discord and its core functionality. The initial MVP was due within just over a week's time. Socket.io is implemented to allow chats to happen in live time.

Feature Highlights:
* Users can create a server, edit that server's details and delete the server
* Users can create, edit and delete channels for the servers they own
* Users can send messages within channels for servers they own or are a part of in real time, and can delete their own messages
* Users can view all of their existing servers in the left nav bar
* Users can discover new servers to join, join servers, and leave a server

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file with your environment variables based on this example:

   SECRET_KEY=your_secret_key
   DATABASE_URL=your_db_url
   SCHEMA=your_schema_name

   S3_BUCKET=your_bucket_name
   S3_KEY=your_key
   S3_SECRET=your_secret_key

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To set up the front end, cd into react-app in another terminal. Then install dependencies and start the app:

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

### Sign Up

Users can sign in giving their details.

![signup](./images/signup_screenshot.png)

### Log In

Registered users can log in with their credentials. Users can also log in with one of two demo users to test functionality without creating an account.

![login](./images/login_screenshot.png)

### Send and Delete Messages

Users can send messages within channels for servers they are a part of. They can also delete messages that they have sent.

![send-delete-messages](./images/send-delete-message.gif)

### Create a Server

Users can create a new server and choose a name for that server. A general channel is always automatically created for new servers.

![create-server](./images/create-server.gif)

### Edit a Server

Users can edit the name for servers they own.

![edit-server](./images/edit-server.gif)

### Delete a Server

Users can delete a server that they own. They are prompted to enter the name of the server to match so that they do not delete a server by mistake.

![delete-server](./images/delete-server.gif)

### Create a Channel

Users can create a channel for servers they own, choosing a name and a topic for that channel.

![create-channel](./images/create-channel.gif)

### Edit a Channel

Users can edit the details for channels that they own by clicking the cog next to the channel name.

![edit-channel](./images/edit-channel.gif)

### Delete a Channel

Users can delete channels for servers they own by clicking Delete Channel from within the Edit Channel modal.

![delete-channel](./images/delete-channel.gif)

### Discover Servers

Users can go to the discover servers page from either the left navigation bar or the home page upon login. Here they can see all of the servers they are not yet a part of.

![discover-servers](./images/discover-servers.gif)

### Join a Server

Users can join servers from the discover servers page. They are redirected to the server page once they join.

![join-server](./images/join-server.gif)

### Leave a Server

Users can leave servers that they are currently members of.

![leave-server](./images/leave-server.gif)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] AWS implementation to be able to upload pictures for server and user icons.
- [ ] Add reactions for messages.
- [ ] Direct messaging between two specific users.

See the [open issues](https://github.com/claudiakosylak/group-discord-clone/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

* Claudia Kosylak - claudiakosylak@gmail.com - https://github.com/claudiakosylak/
* Matt McBurnett - mattmcburnett@gmail.com - https://github.com/mattmcburnett
* James Lee - https://github.com/lee963654
* Hanna Rosenfeld - hannazrosenfeld@gmail.com - https://github.com/hannarosenfeld

Project Link: [https://github.com/claudiakosylak/group-discord-clone](https://github.com/claudiakosylak/group-discord-clone)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
