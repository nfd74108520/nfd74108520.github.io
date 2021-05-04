fetch(
  "https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/AllData.json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonFil) {
    let totalMsg = "";
    let msg = document.getElementsByClassName("nav")[0];

    jsonFil.forEach((datas) => {
      let liCity = document.createElement("li");
      let ulCity = document.createElement("ul");
      liCity.innerHTML =
        "<a>" + datas.CityName + " " + datas.CityEngName + "</a>";
      liCity.appendChild(ulCity);
      msg.appendChild(liCity);

      datas.AreaList.forEach((data) => {
        let liArea = document.createElement("li");
        let ulArea = document.createElement("ul");
        liArea.innerHTML =
          "<a>" + data.ZipCode + " - " + data.AreaName + "</a>";
        ulCity.appendChild(liArea);
        liArea.appendChild(ulArea);

        data.RoadList.forEach((str) => {
          let liRoad = document.createElement("li");
          liRoad.innerHTML =
            "<a>" + str.RoadName + " - " + str.RoadEngName + "</a>";
          ulArea.appendChild(liRoad);
        });
      });
    });
  });
