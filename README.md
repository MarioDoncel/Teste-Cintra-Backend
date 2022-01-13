<!-- TITLE -->
<h1> FEATURED MOVIES BACKEND</h1> <br>
<div align="center">
  <img src="movie-icon.png" alt="Logo" width="300px">
<br>

Project developed as a challenge for a job interview. Read the section About the Project for complete information. 
  
  This is the BACK-END.
  
  FRONT-END at [https://github.com/MarioDoncel/Teste-Cintra-React](https://github.com/MarioDoncel/Teste-Cintra-React)
</div><br>  

<!-- 
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] 
-->
[![MIT License][license-shield]](https://github.com/MarioDoncel/Teste-Cintra-Backend/blob/main/LICENSE)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/marioadoncel/)


<br />


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#objective">Objective</a></li>
        <li><a href="#status">Status</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
Application developed for an interview test. 

The main requirements was to consume the API, show the movies in a list of cards with pagination, a image slider, filter then by categories, show the data of the movies individually on a page. For tecnologies was asked to use ReactJS,Styled-Components, Redux SAGA (i used Redux-Toolkit for production, but there is a SAGA implementation on branch redux-saga), Axios, React Router. 

  I accomplished the challenge early and went further than the requirements asked, creating some other features and an API for users register/login/logout and validation with JWT and Refresh Token strategie seted in cookies httpOnly. Also i used Typescript for Front and Back, at Backend i used NodeJs (Express) connected to Mongo DB Atlas Database. In Database there are a collection user and whitelist (stores the valid refresh tokens to allow more control on users permissions, whith it i can revogate the access easily).
  
  At the end i added a cron-job to delete all expirated refresh tokens from database at 02:00AM everyday.
  
  Time of development: 7 days

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

<!-- This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples. -->

#### FrontEnd
* [Typescript](https://www.typescriptlang.org/)
* [ReactJS](https://pt-br.reactjs.org/)
* [Styled Components](https://styled-components.com/)
* [React Router](https://v5.reactrouter.com/web/guides/quick-start)
* [React Icons](https://react-icons.github.io/react-icons/)
* [Redux-SAGA](https://redux-saga.js.org/)
* [Redux-Toolkit](https://redux-toolkit.js.org/)
* ContextAPI
* [SwiperJS](https://swiperjs.com/)
* [Axios](https://axios-http.com/docs/intro)
* [JWT](https://jwt.io/)

#### Backend
* [Typescript](https://www.typescriptlang.org/)
* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/pt-br/)
* [JWT](https://jwt.io/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* Node-cron


<!-- 
* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Vue.js](https://vuejs.org/)
* [Angular](https://angular.io/)
* [Svelte](https://svelte.dev/)
* [Laravel](https://laravel.com)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
 -->
<p align="right">(<a href="#top">back to top</a>)</p>

### Objective

Project developed for a job interview.
<p align="right">(<a href="#top">back to top</a>)</p>

### Status

Finished.
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

<!-- This is an example of how to list things you need to use the software and how to install them. -->
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

<!-- _Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._
 -->

1. Clone the repo
   ```sh
   git clone https://github.com/MarioDoncel/Teste-Cintra-Backend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a database at MongoDB Atlas and configure your environment variables  `.env`

   ```.env
    MONGO_CONNECTION=mongodb+srv://<username>:<password>@<cluster>.oczo8.mongodb.net/<database>?retryWrites=true&w=majority
    JWT_SECRET=yoursecret
    ```
    
   
4. Run the application
    ```js
    npm start
    ```
  or 

1. Open it on the link bellow

  <a href="https://distracted-hypatia-ca905d.netlify.app/"> Featured Movies </a>


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

<img src="featuredmovies_GIF.gif" alt="Movies gif" width="500px">

### BaseURL - http://localhost:5000

# ROUTES

## Token

  ### GET: 
  
  * /validate -> Verify the JWT secret and expiration (1 hour of expiration), if its valid returns the JWT access token, if not valid or expired verify the refresh token expiration and 
  if its valid at the Whitelist collection in Mongo Database, if it is valid create new tokens set them to the user browser and returns the new JWT access token, if not authen
  ticated returns an error
  
     - Cookies (httpOnly): 

     ```
         AccessToken: JWT
         RefreshToken: {
            _id?:string;
            hash: string;
            userId: string;
            expiresIn:number;
         }
     ```
     
     
## Users

  ### GET:  
  
  * /login -> Make the basic authentication of the user and create and set the Access Token and the Refresh Token at cookies httpOnly.
  
    - Basic authentication: 

     ```
         'Basic email:password'
     ```
     
     - Response: 

     ```js
       return res.status(200).send(token)  - token = JWT Token
     ```
  * /:id -> Receives the id and return the user information
  
    - Params: 

     ```
         :id
     ```
     
     - Response: 

     ```json
       {
         "id": string;
         "username":string
         "email":string
         "password":string - encrypted
        }
     ```
     - i should remove the password from the response
     
  ### POST:
     
  * /create -> Create and register an user at database
  
    - Body: 

     ```json
       {
          "username":"string",
          "email": "string", 
          "password": "string"
        }
     ```
     
     - Response: 

     ```js
       return res.status(201).send(token)  - token = JWT Token
     ```
     
  ### PUT:
     
  * /logout -> Update the whitelist of refresh tokens at Mongo database, removing the current refresh token and delete the tokens from the cookies of user browser
        - might should use DELETE for this route
    - Cookies: 

     ```
        AccessToken
        RefreshToken
     ```

     - Response: 

     ```
        return res.status(200).send("success")
     ```
   

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Mario Andres Doncel Neto  

Email - 88mario.doncel@gmail.com <br>
Whatsapp - +55 19 99612 9909

Project Link: [https://github.com/MarioDoncel/Teste-Cintra-Backend](https://github.com/MarioDoncel/Teste-Cintra-Backend)

Link In Production: [Featured Movies](https://distracted-hypatia-ca905d.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Sergio Cintra JR
* DevFast

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
