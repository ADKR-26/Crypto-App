import React, { useEffect, useState } from "react";
import axios from "axios";

function DeviceData() {


    const [deviceInfo, setDeviceInfo] = useState({
        ip: "",
        country: "",
        city: "",
        latitude: "",
        longitude: "",
        isp: "",
        network: "",
        postal: ""
    });

    useEffect(() => {
        fetch('https://api.ipify.org')
            .then((res) => res.text())
            .then((ip) => {
                console.log(`IP Address: ${ip}`);
                fetch(`https://ipapi.co/${ip}/json/`)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log("DATA", data);
                        // const isp = data.org;
                        const { ip, country, city, latitude, longitude, org, network, postal } = data;
                        setDeviceInfo({ ip, country, city, latitude, longitude, org, network, postal });
                        // console.log('DEVICE', deviceInfo.ip)
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        const postData = async () => {
            try {
                await axios.post('https://counter-api.onrender.com/setdata', {
                    name: 'Crypto-app-IP-Data',
                    ip: `${deviceInfo.ip}`,
                    info: {
                        country: `${deviceInfo.country}`,
                        city: `${deviceInfo.city}`,
                        latitude: `${deviceInfo.latitude}`,
                        longitude: `${deviceInfo.longitude}`,
                        org: `${deviceInfo.org}`,
                        network: `${deviceInfo.network}`,
                        postal: `${deviceInfo.postal}`,
                    }
                })
                // console.log("TIMES")
            } catch (error) {
                console.error(error);
            }
        }

        postData();
    }, [deviceInfo])



    return (
        <>
        </>
    );
}

export default DeviceData;
