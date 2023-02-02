# BenchIt - React Native Application

Welcome to BenchIt, a team project created with React Native. This is a one stop shop for getting , including prerequisites, installation, and usage.

## Table of Contents

- [BenchIt - React Native Application](#benchit---react-native-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Technologies](#technologies)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Backend Configuration](#backend-configuration)
  - [Expo CLI](#expo-cli)
  - [Usage](#usage)
  - [Contribution guidelines](#contribution-guidelines)
  - [Code of Conduct](#code-of-conduct)
  - [License](#license)
  - [Support](#support)
  - [Conclusion](#conclusion)
  - [Credits](#credits)
    - [Valentin Bizgan @valentinbiz](#valentin-bizgan-valentinbiz)
    - [Hasan Nakib @hsnnkb-dev](#hasan-nakib-hsnnkb-dev)
    - [Tom Legg @theCodedJourney](#tom-legg-thecodedjourney)
    - [Ibrahim Yusuf @iy2k22](#ibrahim-yusuf-iy2k22)
    - [Mukesh Thapa @m-thapa](#mukesh-thapa-m-thapa)

## Overview

BenchIt's mission is to combat loneliness by connecting individuals in their local community through the shared experience of sitting on a bench.
BenchIt is a [React Native](https://reactnative.dev/) app for booking and managing bench sessions to meet new people or old friends. With the ability to upload local benches and share the worlds love for benches in endless.

## Technologies

The Benchit app was built using a combination of technologies, including:

- React Native: A popular open-source framework for building cross-platform mobile applications using React.
- Firebase: A cloud-based platform for building and hosting web and mobile applications. The app uses Firebase for authentication, database management, and file storage.
- Expo: A free, open-source toolchain for building and publishing React Native apps, providing a streamlined development experience and access to a large collection of native APIs and components.
- Axios: A Promise-based HTTP client for making API requests, which was used to fetch data from the Firebase database.
- React: A JavaScript library for building user interfaces, which was used for building the UI components of the app.
- Emulators: Virtual devices used for testing and debugging the app during development. The team used emulators to simulate different devices and platforms, ensuring the app works as expected on a wide range of devices.
- Cypress: A JavaScript end-to-end testing framework, which was used to test the app's functionality and catch bugs before release.

With these technologies, the team was able to build a high-quality, user-friendly app that delivers a seamless experience on multiple platforms.

## Prerequisites

Before getting started with the app, you'll need to install the following tools and technologies on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [Firebase account for the backend](https://firebase.google.com/)

## Installation

To get started with the project, follow the steps below:

1. Clone the repository to your local machine:

```
git clone https://github.com/<your-github-username>/BenchIt.git
```

2. Navigate into the project directory:

```
cd BenchIt
```

3. Install the required packages and dependencies using npm:

```
npm install
```

## Backend Configuration

BenchIt uses Firebase as the backend database. To configure the backend, follow these steps:

1. Create a Firebase project on the Firebase website.
1. From the Firebase Console, select the project that you just created.
1. Click the `Add Firebase to your web app` button to obtain your Firebase configuration details.
1. In the project directory, create a file named `firebase.js` and paste the Firebase configuration details into the file.
1. In the Firebase Console, go to the `Authentication` section and enable email/password authentication.

## Expo CLI

[Expo CLI](https://docs.expo.dev/workflow/expo-cli/) was used in the development of BenchIt. To run the app, use the following command in the project directory:

```
npm start
```

This will start the development server and open the [Expo CLI](https://expo.dev/tools#client). You can then use an Android or iOS emulator, or the Expo Client app on your physical device to run the app.

## Usage

BenchIt allows users to book and manage bench sessions. To use the app, follow these steps:

1. Login to the app using your email and password.
2. Go to the sessions page and book a session that you like the look of
3. View and edit your existing sessions by clicking on the
4. Edit sessions depending on your preferences

If you dont find a bench local to you and would like to attract more people to this bench, follow these steps:

1. Login to the app using your email and password.
2. Navigate to the bench upload page and follow the on screen steps to get started.
3. Recieve confirmation of your changes.
4. Book a session at your newly uploaded bench by following the steps in the section above

## Contribution guidelines

If you would like to contribute to the project, please follow the below guidelines:

1. Fork the repository
1. Create a branch for your feature
1. Make your changes
1. Test your changes thoroughly
1. Create a pull request

## Code of Conduct

We ask that all contributors adhere to our code of conduct, which can be found in the CODE_OF_CONDUCT.md file.

## License

BenchIt is released under the MIT license.

## Support

If you have any questions, concerns, or need help with using the Benchit app, please do not hesitate to reach out to our support team at support@benchit.com. Our team is available 24/7 to help you with any issues you may encounter while using the app.

In addition, if you are reporting a bug or suggesting a new feature, please include as much detail as possible in your email so we can better understand and address your issue. If possible, please also include screenshots or any other relevant information that may help us resolve the issue.

We are committed to providing our users with a positive experience, and we appreciate your help in making Benchit a better app for everyone. Thank you for choosing Benchit!

## Conclusion

This readme has provided a comprehensive guide to setting up and running the React Native application. If you encounter any issues, please feel free to reach out to the team or check the documentation for React Native.

## Credits

### Valentin Bizgan [@valentinbiz](https://github.com/valentinbiz)

### Hasan Nakib [@hsnnkb-dev](https://github.com/hsnnkb-dev)

### Tom Legg [@theCodedJourney](https://github.com/TheCodedJourney)

### Ibrahim Yusuf [@iy2k22](https://github.com/iy2k22)

### Mukesh Thapa [@m-thapa](https://github.com/m-thapa)
