# Spin to win

This app is designed to be the best learning tool. 
It uses advanced memorization techniques like 
[Forgetting Curve](![image](https://user-images.githubusercontent.com/16031936/118256777-2996f400-b4ae-11eb-9f3f-8bd73a0ecba9.png)
)
mixed with 
[Fibonacci](![image](https://user-images.githubusercontent.com/16031936/118256818-31569880-b4ae-11eb-944c-b8813f84b1c1.png)
)

## Installation 

Make sure the `.env` is up to date on backoffice

## How to start : 

Start the backoffice : `nodemon server.ts` (I am going to deploy it soon, promise !
This is a message for ma future me, just in case)

Start the front : `yarn && yarn start`;


## Technical choices and libraries

### React Libraries

#### React-tooltip

A library used for tooltip display
[Documentation](https://www.npmjs.com/package/react-tooltip)
![image](https://user-images.githubusercontent.com/16031936/124700564-3bfd3f00-deed-11eb-9954-2445733efc84.png)


### Changelog 

#### 07/02/2023

Using styled components was a bad idea, I am going to use... SASS instead
Because it does not work well in local and I wanted to see the result on the server
I'm so sad because I had found a way to separate the concern, this is making my wonderful code ugly. :(


#### 08/02/2023
New feature : 
- [x] Add a new tab on review stats cards to display the exp progression

It is still a bit broken but it is working. I am going to fix it later.

#### 14/02/2023

- [x] Reworking the addCards page to make it more user friendly

#### 15/02/2023

Going through AWS S3 to host our static gif files
