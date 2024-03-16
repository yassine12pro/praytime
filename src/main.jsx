import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './prayer';
import "./main.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import moment from 'moment';


export default function Main() {
    const [timings,setTimings]=useState({
        "Fajr": "05:02",
    
        "Dhuhr": "12:25",
        "Asr": "15:49",

        "Maghrib": "18:24",
        "Isha": "19:50",
        
        
        
    })
    const prayers=["Fajr","Dhuhr","Asr","Maghrib","Isha"]
    const [selectedCity,setSelectedCity]=useState("Monastir")
    const [today,setToday]=useState("")
    const [today2,setToday2]=useState("")
    const [nextprayerindex,setnextprayerindex]=useState(0)
    const [remainingtime,setreminingtime]=useState("")




    const avcity =["Sousse","Monastir","Ariana","Benarous"]

    const getTimings= async ()=>{
        const response = await axios.get("https://api.aladhan.com/v1/timingsByCity?country=TN&city="+selectedCity)
        setTimings(response.data.data.timings)
    }
    useEffect(()=>{
        getTimings()
        
        
    },[selectedCity])

    useEffect(()=>{

        let interval = setInterval(()=>{
            setupcounterdownup()
        },1000)
        const t=moment()
        setToday(t.format("dddd Do MMMM YYYY"))
        setToday2(t.format("h:mm a"))
        return ()=>{
            clearInterval(interval)
        }
    },[timings])
    

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedCity(event.target.value);
      };
      const setupcounterdownup =()=>{
        const momentnow=moment()
        let nextprayer=0
        if(momentnow.isAfter(moment(timings["Fajr"],"hh:mm")) && momentnow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
            nextprayer=1
        }
        else if(momentnow.isAfter(moment(timings["Dhuhr"],"hh:mm")) && momentnow.isBefore(moment(timings["Asr"],"hh:mm"))){
            nextprayer=2
        }
        else if(momentnow.isAfter(moment(timings["Asr"],"hh:mm")) && momentnow.isBefore(moment(timings["Maghrib"],"hh:mm"))){
            nextprayer=3
        }
        else if(momentnow.isAfter(moment(timings["Maghrib"],"hh:mm")) && momentnow.isBefore(moment(timings["Isha"],"hh:mm"))){
            nextprayer=4
        }
        else{
            nextprayer=0
        }
        setnextprayerindex(nextprayer)
        //comment 
        const nextprayerobject = prayers[nextprayer]
        const nextpryertime=timings[nextprayerobject]
        const nextprayertimemoment=moment(nextpryertime,"hh:mm")

        let remainingtime=moment(nextpryertime,"hh:mm").diff(momentnow)

        if (remainingtime<0){
            const midnightdiff = moment("23:59:59","hh:mm:ss").diff(momentnow)
            const fajrtomidnightdiff=nextprayertimemoment.diff(moment("00:00:00","hh:mm:ss"))
            const total =midnightdiff + fajrtomidnightdiff
            remainingtime=total
        }
        const durationreminingtime= moment.duration(remainingtime)
        setreminingtime(`${durationreminingtime.hours()}:${durationreminingtime.minutes()}:${durationreminingtime.seconds()}`)
        
        
      }

  return (
    <div className='main'>
        <Grid  container justifyContent={'center'}>
            <Grid xs={4}>
                <div className='droit'>
                    <h2>{today2}</h2>
                    
                </div>
            </Grid>
            <Grid xs={4}>
                <div className='droit'>
                    <h2>{today}</h2>
                    <h3>{selectedCity}</h3>
                </div>
            </Grid>
            <Grid xs={4}>
                <div className='gauche'>
                    <h2>Rest for Pray Al {prayers[nextprayerindex]}:</h2>
                    <h3>{remainingtime}</h3>
                </div>
            </Grid>
        </Grid>

        <Divider style={{borderColor:"white"}}/>

        <Stack direction="row" justifyContent={'center'} spacing={3} marginTop={"50px"}>
            <Prayer  name="Fajr" time={timings.Fajr} img="../images/fajr-prayer.png"/>
            <Prayer name="Dhuhr" time={timings.Dhuhr} img="../images/dhhr-prayer-mosque.png"/>
            <Prayer name="Asr" time={timings.Asr} img="../images/asr-prayer-mosque.png"/>
            <Prayer name="Maghrib" time={timings.Maghrib} img="../images/sunset-prayer-mosque.png"/>
            <Prayer name="Isha" time={timings.Isha} img="../images/night-prayer-mosque.png"/>
        </Stack>

        <Stack direction="row" justifyContent={'center'}  marginTop={"30px"}>
            <FormControl style={{width:"20%"}}>
                <InputLabel id="demo-simple-select-label">MADINA</InputLabel>
                   <Stack direction="row">
                   <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Age"
                    onChange={handleChange}
                    style={{ color: 'white', backgroundColor: 'white',borderColor: 'white',width:"200px"}} // changer la couleur ici

                    >
                        {avcity.map((city)=>{
                            return(
                                <MenuItem value={city}>{city}</MenuItem>
                            )
                        })}
            
                    </Select>

                    
                   </Stack>
            </FormControl>
        </Stack>
    </div>
  )
}
