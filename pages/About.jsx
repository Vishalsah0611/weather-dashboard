export default function About() {
  return (
    <section className="about-page">
      <h1>About WeatherScope</h1>
      <p>
        WeatherScope pulls its data from OpenWeatherMap's 5 day / 3 hour forecast API — 40
        slots covering the next five days for any city, grouped here into day tabs so you
        can flip through one day at a time instead of scrolling a long list.
      </p>
      <p>You can either type a city name or let the browser share your current location.</p>
    </section>
  );
}
