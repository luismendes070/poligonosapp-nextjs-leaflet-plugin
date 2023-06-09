import React, {useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export function onMapClick(e:any) {
  alert("You clicked the map at " + e.latlng);
} // end onMapClick e function

export function poligonosappWindow(map:any){

  try{

// Import stylesheets
// import './style.css';

const L = require("leaflet");

// Write Javascript code!
const appDiv:any = document.getElementById('app');
appDiv.innerHTML = `<div id="map"></div>`;

// initialize the map on the "map" div with a given center and zoom
map = L.map('map', {
  center: [51.505, -0.09],
  zoom: 13
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// create a red polygon from an array of LatLng points
const latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];

const polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);

map.on('click', onMapClick);

// zoom the map to the polygon
map.fitBounds(polygon.getBounds());

}catch(error){

console.log('\n Home page index exception.');

}finally{

console.log('\n Home function finally.');

}

} // end function

export default function Home() {

  const map: any;

try{

useEffect(
  () => {
     // https://blog.sethcorker.com/question/how-to-solve-referenceerror-next-js-window-is-not-defined/
    window.navigator.geolocation.getCurrentPosition(
      (newPos) => setPosition(newPos),
      console.error
    );

    if (typeof window !== "undefined") {
      // Client-side-only code
      poligonosappWindow(map);
    }
  }
    , []
);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org"> @poligonosapp leafletJS plugin + Next.js!</a>
        </h1>

        <p className={styles.map}>{poligonosappWindow(map)}</p>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created with&nbsp;<b>next.new</b>&nbsp;⚡️
        </a>
      </footer>
    </div>
  );
}

function setPosition(newPos: GeolocationPosition): void {
throw new Error('Function not implemented.');
}
