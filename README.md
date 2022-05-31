# Phase-4-Final-Project Mock Store

## Description
This is my phase 4 final project for Flatiron School. It is a mock store. The link to the website is [here](https://sheltered-coast-42763.herokuapp.com/)

It is a website that is built with a rails backend, and a react frontend. I have a couple models set up on the backend, including a users model to allow for secure signup/login.

For styling, I mainly used bootstrap, as well as some custom CSS to style things that I couldn't do with bootstrap.

## Installation
First off, clone this repository and navigate your way to it through your command prompt. 

Then run

```bash
    bundle install
    npm install --prefix client
```

## Usage
### Home Page
On the website, you start off with a homepage view of all the items in the store, with their name, image, and description. You can use the search bar to search for items. You can also click on each product to be navigated to that products page. Currently, there are only 20 products. 

### Product page
On each product's page, you have a bigger image on the left. You have the name and description next to the image. 

You also have the ability to add the item to your cart, and view all reviews about that item. In order to add the item to your cart, you musted be logged in. If you try to add the item to your cart and you are not logged in, it will redirect you to the login page. 

Once logged in, you can add the item to your cart. You will also be able to add a review for a product if you are logged in.

### Login Form
If you do not have an account, there will be a link at the bottom of the login form that will take you to create an account. 

### Navbar
Once you are logged in, the login button will change to your name. You can click on it, and a dropdown will appear with links to your profile, your cart, and a button to logout.


## Roadmap
These are the things that I want to do in the future.

-Update styling for products page

-Add styling for mobile devices to have information shown properly

-Add more products

-Add a checkout page

-Update cart to be able to set quantity of items instead of displaying multiple of each item

-Update the search to be sent to a different page, and display those searches in the same way the home page is displayed. So when a user clicks the home page, the original products get displayed instead of having to search an empty string to get the original products.
