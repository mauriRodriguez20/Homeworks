import { City } from "./City";

export class CityGraph {
  constructor() {
    this.cities = [];    
    this.adjacency = {}; 
  }

  
  addCity(name) {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === name) {
        console.warn("La ciudad ya existe:", name);
        return this.cities[i];
      }
    }

    const city = new City(name);
    this.cities.push(city);
    this.adjacency[name] = [];
    return city;
  }

  
  removeCity(name) {
    this.cities = this.cities.filter((c) => c.name !== name);
    delete this.adjacency[name];

    for (const key in this.adjacency) {
      this.adjacency[key] = this.adjacency[key].filter(
        (neighbor) => neighbor !== name
      );
    }
  }

  
  addConnection(nameA, nameB) {
    if (!this.adjacency[nameA] || !this.adjacency[nameB]) {
      console.warn("Alguna de las ciudades no existe:", nameA, nameB);
      return;
    }

    if (!this.adjacency[nameA].includes(nameB)) {
      this.adjacency[nameA].push(nameB);
    }

    if (!this.adjacency[nameB].includes(nameA)) {
      this.adjacency[nameB].push(nameA);
    }
  }

  getNeighbors(name) {
    if (!this.adjacency[name]) return [];
    return this.adjacency[name];
  }

  getCity(name) {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === name) {
        return this.cities[i];
      }
    }
    return null;
  }

  getCityZonesStats(name) {
    const city = this.getCity(name);
    if (!city) {
      return { total: 0, height: 0 };
    }

    return {
      total: city.getTotalZones(),
      height: city.getZonesHeight(),
    };
  }

  
  toJSON() {
    const adjacencyCopy = {};
    for (const key in this.adjacency) {
      adjacencyCopy[key] = [...this.adjacency[key]];
    }

    return {
      cities: this.cities.map((city) => city.serialize()),
      adjacency: adjacencyCopy,
    };
  }

  loadFromData(data) {
    this.cities = [];
    this.adjacency = {};

    if (!data || !Array.isArray(data.cities)) {
      return;
    }

    for (let i = 0; i < data.cities.length; i++) {
      const cityData = data.cities[i];
      const city = this.addCity(cityData.name);
      city.loadFromData(cityData.zones);
    }

    if (data.adjacency) {
      for (const key in data.adjacency) {
        this.adjacency[key] = [...data.adjacency[key]];
      }
    }
  }
}
