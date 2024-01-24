let cities = [
    {
        arabicName: "جدة",
        name: "Makkah al Mukarramah"
    },
    {
        arabicName: "الرياض",
        name: "Ar Riyāḑ"
    },
    {
        arabicName: "نجران",
        name: "Najrān"
    },
    {
        arabicName: "الباحة",
        name: "Al Bāḩah"
    },
    {
        arabicName: "المدينة المنورة",
        name: "Al Madīnah al Munawwarah"
    },
    {
        arabicName: "تبوك",
        name: "Tabūk"
    },
    {
        arabicName: "الشرقية",
        name: "Ash Sharqīyah"
    }
]
for (let city of cities ) {
    const content = `
    <option>${city.arabicName}</option>
    `
    document.getElementById("selectt").innerHTML += content
}
document.getElementById("selectt").addEventListener("change",function() {
    document.getElementById("city-name").innerHTML = this.value
    let cityName =""
    for (let city of cities) {
        if (city.arabicName === this.value) {
            cityName = city.name
        }
    }
    prayers(cityName)
})

function prayers (cityName) {
    let params = {
        country: "SA",
        city: cityName 
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {
            const timings = response.data.data.timings;
            allTimes("fajr",timings.Fajr)
            allTimes("sunrise",timings.Sunrise)
            allTimes("dhuhr",timings.Dhuhr)
            allTimes("asr",timings.Asr)
            allTimes("sunset",timings.Sunset)
            allTimes("isha",timings.Isha)
            const date = response.data.data.date.readable;
            const weekDay = response.data.data.date.hijri.month.ar
            document.getElementById("date").innerHTML = (weekDay + " " + date)
    })
        .catch(function (error) {
            console.log(error);
    })
    
}

prayers("Makkah al Mukarramah")

function allTimes(id,name) {
    document.getElementById(id).innerHTML = name
}