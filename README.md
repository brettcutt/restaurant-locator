# Restaurant Locator

This project makes use of the Zomato API to filter through and display a wide variety of restaurants from the city of Adelaide.
- Live Project: 
  - https://brettcutt.github.io/restaurant-locator/
- GitHub: 
  - https://github.com/brettcutt/restaurant-locator

## Table of Contents
- [Update](https://github.com/brettcutt/restaurant-locator/blob/master/README.md#Update)
- [Running the code locally](https://github.com/brettcutt/restaurant-locator/blob/master/README.md#running-the-code-locally)
- [Deployment](https://github.com/brettcutt/restaurant-locator/blob/master/README.md#deployment)
- [Technologies, Libraries and Languages](https://github.com/brettcutt/restaurant-locator/blob/master/README.md#technologies-libraries-and-languages)
- [Validation](https://github.com/brettcutt/restaurant-locator/blob/master/README.md#validation)
- [Media](https://github.com/brettcutt/restaurant-locator/blob/master/README.md#media)

## Update
- 24-02-2019
  - Implemented a City selector.
- 25-02-2019
  - Added Gold Coast to the city selector.
  - Changed the city selector animation to move up the page as it rotates.
  - Improved mobile reponsiveness. Added a trigger button to drop down the filter menu.

## Running the code locally

- Clone the git repository
  - `git clone https://github.com/brettcutt/restaurant-locator.git`

- Get your own Zomato api key
  - Go to https://developers.zomato.com/api.
  - create an account
  - generate an api key
  - copy the api key

- Two ways to enter your api key
1. In the `main.js` file:
   - On the first line of the file, enter your api key between the arrows
   - `let apiKey = "<YOUR API-KEY-HERE>"`

2. When the browser is running:
    - Enter your api key in the input field after the page has loaded.

- Run the application.

## Deployment
- Start a `new project` in GitHub.
- In the cli:
  - `git init`
  - `git add`
  - `git commit -m ""`
  - `git push -u origin master`
- Go to settings in the projects repository.
- Scroll down to `GitHub Pages`.
- Change the source to `master branch`.
- Go to `https://brettcutt.github.io/restaurant-locator/`

## Technologies, Libraries and Languages
- HTML5
- CSS3
- Javascript
- Jquery
- Bootstrap
- Font Awesome
- Google Fonts
## Validation
- HTML passes the W3C validator.
- CSS3 passes the W3C validator.
- Javascript passes using JSHint.
## Media
- melbourne picture:
  - https://pixabay.com/en/melbourne-night-shot-station-city-966465/

- sydney:
  - https://picryl.com/media/darling-harbour-sydney-australia-architecture-buildings-b80b0e

- Brisbane
  - https://picryl.com/media/darling-harbour-sydney-australia-architecture-buildings-b80b0e

- Adelaide:
  - https://commons.wikimedia.org/wiki/File:Adelaide_Festival_Centre_at_Night.jpg

- Gold Coast
  - https://commons.wikimedia.org/wiki/File:Gold_Coast_Convention_and_Exhibition_Centre.jpg