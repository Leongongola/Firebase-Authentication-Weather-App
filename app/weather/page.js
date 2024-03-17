"use client"; // This directive indicates that we're using this file in a client-side environment.

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../auth-context"; // Adjust the path as needed
import Link from "next/link";

export default function Weather() {
  const [city, setCity] = useState(""); // State to hold the value of the city input
  const [weatherData, setWeatherData] = useState(null); // State to hold weather data for the searched city
  const { user } = useUserAuth();

  const fetchWeather = async (city) => {
    const apiKey = "8a9503adfaa344e32beba1d91fe656ee";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  };

  const handleSearch = async () => {
    try {
      const weatherData = await fetchWeather(city);
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      // Load weather data for a default city when the component mounts (optional)
      fetchWeather("calgary")
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-blue-100">
      <h1 className="text-2xl font-bold mb-4 text-black">Weather Updates</h1>
      {user ? (
        <>
          <div className="mb-4">
            <input
              type="text"
              className="mr-2 p-2 border border-gray-400 rounded"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>Search</button>
          </div>
          {weatherData ? (
            <div>
              <h2 className="text-xl font-bold mb-2 text-black">{weatherData.name}</h2>
              <p className="text-black">Temperature: {weatherData.main.temp}°C</p>
              <p className="text-black">Feels like: {weatherData.main.feels_like}°C</p>
              <p className="text-black">Max temperature: {weatherData.main.temp_max}°C</p>
              <p className="text-black">Min temperature: {weatherData.main.temp_min}°C</p>
              <p className="text-black">Humidity: {weatherData.main.humidity}%</p>
              <p className="text-black">Wind Speed: {weatherData.wind.speed} m/s</p>
              <p className="text-black">Cloudiness: {weatherData.clouds.all}%</p>
              {weatherData.rain && <p className="text-black">Rainfall: {weatherData.rain["1h"] || 0}mm</p>}
              {weatherData.snow && <p className="text-black">Snowfall: {weatherData.snow["1h"] || 0}mm</p>}
              <p className="text-black">Condition: {weatherData.weather[0].description}</p>
            </div>
          ) : (
            <p className="text-black">Enter a city name to see weather information.</p>
          )}
        </>
      ) : (
        <p className="text-black">Please log in to see the weather information.</p>
      )}
      <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        <Link href="/">Home</Link>
      </button>
    </main>
  );
}
