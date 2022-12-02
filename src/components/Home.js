import React, { useEffect, useState } from 'react'
import './Home.css'
import Axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [city, setCity] = useState("")
    const [locationCity, setLocationCity] = useState("")
    const [country, setCountry] = useState("")
    const [time, setTime] = useState("")
    const [img, setImg] = useState("")

    const [temp, setTemp] = useState("")

    const getWeather = async () => {
        await Axios.get('https://weather-react-app-backend.onrender.com/getweather', { params: { city, country } })
        .then((result) => {
            console.log(result)
            setImg(result.data.current.imageUrl)
            setTemp(result.data.current.temperature)
            setLocationCity(city)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {      
        const interval = setInterval(() => {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            setTime(time)
        }, 1000);
        return () => clearInterval(interval);
    }, [])


  return (
    <div style={{ justifyContent: 'flex-end' }}>
        <div className="weatherForm" >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '20vh', fontSize: '1vw', verticalAlign: 'top'}}>
                    <input className="cityInput" onChange={(e) => setCity(e.target.value)} placeholder='City' />
                    <input className='countryInput'  onChange={(e) => setCountry(e.target.value)} placeholder='Country' />
                    <Button style={{ display: 'inline-block', fontSize: '1vw'}} onClick={getWeather} type="submit" variant="warning" size="sm" >Get Weather</Button>
                </div>
                <h2 className="time" >{time}</h2>

            </div>
        </div>
        <div className="weatherInfo">
            {temp !== "" ? (
                <>
                    <h1 className="temp" >Temperature in {locationCity}  {temp} °F</h1>
                    <img className="weatherImg" src={img} alt="weather" />
                </>
            ) : (<h1 style={{ fontSize: '2vw' }}>Type in the city and country you want to get weather for</h1>)}
        </div>
    </div>
  )
}

export default Home