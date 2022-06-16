<template>
  <div class="containerForBlur">
    <div class="loading" v-if="loading">
      <div class="text">Loading...</div>
    </div>
    <h1>CountryInfo</h1>
    <select id="countries-select" v-model="selectedC">
      <option selected disabled>Select country ...</option>
      <option
        v-for="(country, i) in countries"
        :value="i + 1"
        :key="country.alpha2code"
      >
        {{ country.name.common }}
      </option>
    </select>
    <div id="container">
      <div id="content">
        <div class="card front padding">
          <img
            v-if="selectedCountry && selectedCountry.flags"
            :src="selectedCountry.flags.png"
            class="card front"
          />
        </div>
        <div class="card back padding" v-if="selectedCountry">
          <div v-if="selectedCountry.name">
            <p><u>Capital:</u> {{ selectedCountry.capital.join(",") }}</p>
            <p><u>Population:</u> {{ selectedCountry.population | number }}</p>
            <p>
              <u>Internet domain:</u>
              {{ selectedCountry.tld.join(",") }}
            </p>
            <p>
              <u>Call number:</u>
              {{
                selectedCountry.idd &&
                selectedCountry.idd.root &&
                selectedCountry.idd.suffixes.length > 0
                  ? selectedCountry.idd.root + selectedCountry.idd.suffixes[0]
                  : "-"
              }}
            </p>
            <p>
              <u>Languages:</u>
              {{ Object.values(selectedCountry.languages).join(",") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre
      style="background: white"
    ><code dir="ltr" style="color:#000">{{ selectedCountry }}</code></pre> -->
  </div>
</template>

<script>
import getCountries from "./countryApi.js";
export default {
  filters: {
    number(value) {
      var numberFormatter = new Intl.NumberFormat();
      return numberFormatter.format(value);
    },
  },
  data: () => {
    return {
      loading: true,
      selectedC: null,
      countries: [],
    };
  },
  methods: {
    async loadCountries() {
      this.countries = await getCountries();
      this.loading = false;
    },
  },
  computed: {
    selectedCountry() {
      if (!this.selectedC) return null;
      return this.countries[this.selectedC - 1];
    },
  },
  created() {
    this.loadCountries();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kanit&display=swap");
@import url("https://fonts.googleapis.com/css?family=Turret+Road:400,800&display=swap");

* {
  box-sizing: border-box;
}

:root {
  --green: #9fea63;
  --blue: #3ba9f4;
  --dark: #282c34;
  --neka: #525252;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-image: url("../public/background.jpg");
  background-attachment: fixed;
  background-size: cover;
  color: #fff;
  font-family: Kanit, sans-serif;
  margin: 0;
}

.containerForBlur:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(5px);
  background: inherit;
  z-index: -1;
}

.containerForBlur {
  background: inherit;
  z-index: 1;
  width: 40%;
  height: 50vh;
  margin-top: 100px;
}

h1 {
  font-family: "Turret Road", cursive;
  font-weight: 800;
  font-size: 3rem;
  margin: 0 auto;
  color: var(--dark);
  text-align: center;
  margin-bottom: 50px;
}

#countries-select {
  width: 100%;
  margin-bottom: 60px;
  height: 50px;
  font-size: 22px;
  border: 1px solid var(--blue);
  color: var(--blue);
  cursor: pointer;
  transition: all 0.2s linear;
  background-color: var(--dark);
  color: var(--blue);
  padding-left: 8px;
}

#container {
  width: 100%;
  height: 70%;
  position: relative;
  cursor: pointer;
  perspective: 1000px;
}

#content:not(:empty) {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.7);
}

#container:hover #content {
  transform: rotateY(180deg);
}

img {
  display: block;
  height: 100%;
  width: 100%;
  object-position: 100% 100%;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 20px;
  border: 1px solid var(--blue);
}

.card.front {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}

.card.back {
  transform: rotateY(180deg);
  background-color: var(--dark);
  box-shadow: 0 0 50px inset rgba(0, 0, 0, 0.5);
  padding: 15px 0;
  color: var(--blue);
}

.card.padding {
  padding: 10px 10px;
}

@media only screen and (max-width: 600px) {
  .containerForBlur {
    width: 80%;
    margin: 40px 10px;
  }
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 50;
}

.loading .text {
  color: #000;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 10vw;
}
</style>
