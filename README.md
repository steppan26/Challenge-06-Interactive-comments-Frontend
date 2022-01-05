# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments

### Screenshots

![Desktop view](./screenshots/desktop_view_screenshot.jpg)
![Mobile view](./screenshots/mobile_view_screenshot.jpg)

### Links

- Solution URL: [Frontend Mentor Page](https://www.frontendmentor.io/solutions/responsive-interactive-comments-section-react-scss-V_e4VeCOw)
- Live Site URL: [Github Pages site](https://steppan26.github.io/Challenge-06-Interactive-comments-Frontend/)

## My process

### Built with

- Semantic HTML5 markup
- SCSS
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

This project was chosen to give me the opportunity to get back into using React. I spent over 2 months attending a fullstack web developer bootcamp which was primarily focused on Ruby and Ruby on Rails (also some JS and Stimulus for the front end). The bootcamp gave me a more complete understanding of what I was doing previously with React, and as such I wanted a new project which would challenge me that would give me the opportunity to jump back into React. I opted to avoid using class components and instead use functional components and make use of React hooks (such as useState).
As the intention was to do a quick project to get back up to date, I did not plan making a backend or using a db but purely have it as a stand-alone front-end project, which actually in some ways complicated certain aspects relating to the CRUD actions as everything had to be done client-side instead of having dedicated functions on a server which would provided relevant data.

I am particularly happy with the piece of code below which is a function that renders different elements based on whether or not a comment belongs to the current user. If the comment belongs to the current user then they will see 2 buttons, one to 'edit' the post and the other to 'delete' it; whereas on the other hand, if the post does not belong to the current user, then it simply renders a 'reply' button.
The function is then put in the appropriate place within the return. The commentAction() function takes the event and a key word (either 'delete', 'edit' or 'reply') which is then passed into a switch statement to run the appropriate piece of code.
```js
  const postUserActions = (user.username === currentUser.username ?
    <>
      <div className='btn delete' onClick={ event => commentAction(event, 'delete') }><i className="fas fa-trash"></i> Delete</div>
      <div className='btn edit' onClick={ event => commentAction(event, 'update') }><i className="fas fa-pen"></i> Edit</div>
    </>
    :
    <div className='btn reply' onClick={ event => commentAction(event, 'reply') }><i className="fas fa-reply"></i> Reply</div>
  )
```

### Continued development

My intention going forward is to learn Python and Django, as these are technologies which are used by my future employer. However if possible I would like to delve back into this project someday to make use of local storage in order to make the changes persistant; or if time-permits I would like to develop it further yet into a fullstack app with a backend and db (possibly in Python & Django once I am comfortable with them).


## Author

- Website - [Stephane Baroux](https://www.sbaroux.com)
- Frontend Mentor - [@steppan26](https://www.frontendmentor.io/profile/steppan26)
- Github - [steppan26](https://github.com/steppan26)
