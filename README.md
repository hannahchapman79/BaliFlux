# Bali Flux

## Table of Contents

- [Description](#description)
  - [Tech Stack](#tech-stack)
  - [Backend Repository](#backend-repository)
- [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Running Linting & Formatting](#running-linting--formatting)

## Description

Bali Flux is a Next.js and React front end that brings together AI & local knowledge to generate a personalised itinerary. The UI is built with Tailwind CSS and Hero UI.

### Tech Stack

**Frontend:** Built using Next.js, TypeScript, Tailwind, and React.  
<br>
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%23323330.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Backend Repository

The backend for Bali Flux is available here: https://github.com/hannahchapman79/BaliFlux-backend. <br><br>
It was built using Node.js, JavaScript, Express, MongoDB, Bcrypt for password hashing, JWT and intergrated with AI Model, Meta Llama 3.  
<br>
![NodeJS](https://img.shields.io/badge/node.js-%23518F4C?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23323330.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Getting Started

**Requirements**

- Node.js: v21.1.0

### Installation

1. Clone the repository
2. Run `npm install`

### Environment Variables

3. Create a `.env.local` file in the root of the project and add the following variable:

```ini
# Example .env.local file
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://baliflux-be.onrender.com/api
```

### Running the Application

4. Start the development server: `npm run dev`
5. Build the application for production: `npm run build`
6. Start the production server: `npm run start`

### Running Linting & Formatting

7. Run `npm run lint` to check for linting errors
8. Run `npm run format` to format code with Prettier
9.
