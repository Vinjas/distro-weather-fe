# Distro Weather Tool for Solar Energy Planning 

**Analyze the viability of Solar panels installation based on +70 years of weather historic data**

Introducing Distro Energy's cutting-edge Solar Radiation Calculator, a powerful tool designed to accurately forecast and manage solar radiation levels (Shortwave Solar Radiation GHI, Diffuse Solar Radiation DHI and Shortwave Radiation Sum) for any selected location and date range.

## Deployed APP
Currently deployed at:

https://distro-weather-llz2v3s81-daniel-vinyas-projects.vercel.app/

### Screenshots
<img src="./screenshots/Screenshot%202024-03-01%20at%2007.15.21.png" alt="drawing" width="500"/>
<img src="./screenshots/Screenshot 2024-03-01 at 07.16.47.png" alt="drawing" width="500"/>

## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to Run locally
- Clone this repository in your local machine
- Navigate to the root of the project and install all the neccesary dependencies with `npm i`
- To run the project locally in your `localhost` you must execute the following command in your terminal, while your are located in the root folder: `npm run start`
- Vite will start the project locally by default in `http://localhost:5173/`. Navigate there through your browser and you should be able to see the APP running

## Open-Meteo API
To get all the weather data, specifically the solar radiation historical data, the API used was Open-Meteo 

https://open-meteo.com/

Open-Meteo is an open-source weather API and offers free access for non-commercial use. 

No API key required.

## Main dependencies used
**Requests:**
- axios https://www.npmjs.com/package/axios

**Charts:**
- highcharts-react-official https://www.npmjs.com/package/highcharts-react-official

**Date range:**
- react-date-range https://www.npmjs.com/package/react-date-range

**Translation template:**
- i18next https://www.npmjs.com/package/i18next
- react-i18next https://www.npmjs.com/package/react-i18next

**Maps and Geocoder:**
- react-map-gl https://www.npmjs.com/package/react-map-gl
- mapbox-gl https://www.npmjs.com/package/mapbox-gl

For a full list of dependencies check `package.json` file.
