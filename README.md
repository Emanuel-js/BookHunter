
# **Book Hunter** 📚

![Logo!](https://github.com/Emanuel-js/BookHunter/blob/main/src/assets/img/logo.png)


## **Table of content 🗜️**

- [Introduction](#introduction-)
- [The Project](#the-project-)
- [Future](#future-)
- [Technologies](#technologies-)
- [Screenshots](#screenshots-)
- [Built With](#built-with-)
- [API](#api-%EF%B8%8F)
- [Author](#author)
- [Blog](#Blog)    
- [Acknowledgments](#acknowledgements)

## **Introduction** <img width="25px" src="https://img.icons8.com/ios-filled/50/000000/handshake.png"/>

###  ***The Project*** <img width="20px" src="https://img.icons8.com/nolan/64/project.png"/>

Reading books is crucial in our life but sometimes, We are not sure what book we have to read or not. Here is the book hunter shine. [**Book Hunter 📚**](https://bookhunter-edf43.web.app/) introduces good books with proper ratings, reviews and your category, so that you can find the perfect one for your taste. Also you can share your favorite book so other people can read it too. Book Hunter may help you to get the perfect book for your needs but it can’t provide a download file or pdf format ,so if you want to buy or read it you have to find another way. When you are not sure what book to read next, this is the right place for you. Book Hunter clarifies what book you have to read next .Book Hunter can be used by anyone who can use the internet.

I think that the book is the most expensive things in the world because of that we have to share what we have to the other people.

That is why I call it a book hunter.

### ***Future*** 🔭

Book Hunter is an online book library. It is a platform that makes the process of finding the perfect book as easy as possible. It enables you to find, share and download shard book by other people from all over the world.

## **Technologies** <img width="30px" src="https://img.icons8.com/fluency/48/000000/chatbot.png"/>

List of technology that involves in this project :
  
> Front End
-  React components handling routing
-  React BootStrap  for Nav bar and components styling 
-  API calls to manipulate database

> Dependencies

| Package Names | Version |
| --- | --- |
|axios|0.23.0|
|react-bootstrap|2.0.1|
|firebase|9.1.3|
|react|17.0.2|
|react-router-dom|5.3.0|
|  |  |
> Tools and editors
* Github
* Vscode
* Adobe Xd


## **Screenshots 📷** 

> Home Page

<img width=60% src="https://i.imgur.com/8nPlg6G.png" >

> Book Page

<img width=60% src="https://i.imgur.com/lb8emjl.png" >

> Reding Page

<img width=60% src="https://i.imgur.com/p4y6fhg.png" >

> Library Page

<img width=60% src="https://i.imgur.com/gQDfX6i.png" >

> Book upload

<img width=60% src="https://i.imgur.com/D0xLdrI.png" >

> Detail Page

<img width=60% src="https://i.imgur.com/Ur3Z4pE.png" >

## **Built With  ⛏️**
 
- Javascript  <img  width="20px" src="https://img.icons8.com/color/48/000000/javascript--v1.png"/> - The Frontend Language
- REACT <img width="20px"  src="https://img.icons8.com/office/50/000000/react.png"/>- The Web Development Framework 
- Firebase <img width="20px" src="https://img.icons8.com/color/48/000000/google-firebase-console.png"/> - NoSQL database and hosting

## **API ⚙️**

The API can be found in https://api.nytimes.com/svc/books/v3

Best Sellers Lists Services

```diff
☑️ /lists/names

+ GET: returns a list of all the NYT Best Sellers Lists.

☑️ /lists/current/hardcover-fiction

+ GET: return the latest list.

```
> sample code
```javascript
  useEffect(() => {
    const getname = async () => {
      await axios
        .get(`${url}lists/names.json?api-key=${APIKEY}`)
        .then((name) => {
          setListName(name.data.results);
        });
    };
    const getBookLists = async () => {
      await axios
        .get(`${url}lists/${value}.json?api-key=${APIKEY}`)
        .then((d) => {
          SetBookList(d.data.results);
        });
    };

    getname();
    getBookLists();
  }, [value]);

```
Book Reviews Services

```diff
☑️ /reviews.json?author

+ GET: return a list of book by there author

☑️/reviews.json?title

+ GET: return a list of book by there title

```
> sample code
```javascript
	useEffect(() => {
		const searchBook = async () => {
			await axios
				.get(`${url}reviews.json?${type}=${query}&api-key=${APIKEY}`)
				.then((d) => {
					console.log(d.data);
					setSearch(d.data.results);
					setIsLoad(!isLoad);
				})
				.catch((err) => console.log(err.message));
		};
		searchBook();
	}, [query]);
````

```diff
! POST -  upload book to library
! POST - create reding book and Favorite books
- DELETE -  reding book and Favorite books
- DELETE - Library Book
+ PUT - book reding finished
```

## **Author**
> Meet Amanuel Awol <img width="25px" src="https://img.icons8.com/external-linector-flat-linector/64/000000/external-avatar-man-avatar-linector-flat-linector-4.png"/>


I'm a full stack software engineer who enjoys both backend work and frontend work, taking charge of tasks from design to deployment. I have a deep understanding of the MEAN stack and proficiency in many languages. I am always eager to learn new technologies, frameworks, and languages because it is my passion.

> contact me on <img width="20px"  src="https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-video-chat-contact-and-message-itim2101-flat-itim2101.png"/>

[Twitter <img width="20px" src="https://img.icons8.com/color/48/000000/twitter--v1.png"/> ](https://twitter.com/emanuel94752162)

[Linkedin <img width="20px" src="https://img.icons8.com/color/48/000000/linkedin.png"/>](https://www.linkedin.com/in/emanuel-awol/)

## **Blog**
[bookHunter blog]()

## **Acknowledgements**

- Holberton School (Staff and Students)

