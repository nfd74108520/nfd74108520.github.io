let allCities = [];

let cityObject = {};

let roadObject = {};

const citySelect = document.getElementById("city");
const districtSelect = document.getElementById("district");
const roadSelect = document.getElementById("road");

const submitButton = document.querySelector("input[type=submit]");
const msg = document.getElementById("msg");

console.log(dataTotal);

dataTotal.forEach((cityItem) => {
  allCities.push({
    id: `${allTrim(cityItem.CityEngName)}`,
    name: `${cityItem.CityName}`,
  });
  cityObject[allTrim(cityItem.CityEngName)] = [];
  cityItem.AreaList.forEach((areaItem) => {
    cityObject[allTrim(cityItem.CityEngName)].push({
      id: `${areaItem.ZipCode}`,
      district: `${areaItem.AreaName} - ${areaItem.ZipCode}`,
    });
    roadObject[areaItem.ZipCode] = [];
    areaItem.RoadList.forEach((roadItem) => {
      roadObject[areaItem.ZipCode].push({
        road: `${roadItem.RoadName}`,
      });
    });
  });

  window.onload = createSelectOptions;

  function createSelectOptions() {
    //Option1建立選項方式
    allCities.forEach((city, index) => {
      let option1 = document.createElement("option");
      option1.value = allCities[index].id;
      option1.text = allCities[index].name;
      citySelect.add(option1, null);
    });

    //Option2建立選項方式
    //這裡刻意稍後建請選擇的選項
    let option2 = document.createElement("option");
    option2.value = "";
    option2.text = "---請選擇縣市---";
    option2.selected = true;
    option2.setAttribute("selected", ""); //預設選項
    citySelect.add(option2, 0);
  }

  let option3 = document.createElement("option");
  option3.value = "";
  option3.text = "---請選擇行政區---";
  districtSelect.add(option3, null);

  districtSelect.disabled = true;

  let option4 = document.createElement("option");
  option4.value = "";
  option4.text = "---請選擇街道---";
  roadSelect.add(option4, null);

  roadSelect.disabled = true;

  //City選項變更事件
  citySelect.onchange = citySelectedChange;
  districtSelect.onchange = districtSelectedChange;

  function citySelectedChange(event) {
    let cityValue = citySelect.selectedOptions[0].value;
    let cityText = citySelect.selectedOptions[0].text;

    //清除並重新建立District <select>
    districtSelect.disabled = false;
    districtSelect.innerHTML = "";
    let option0 = document.createElement("option");
    option0.value = "";
    option0.text = "---請選擇行政區---";
    districtSelect.add(option0, null);

    //如果未選擇City則return
    if (cityValue == "") {
      districtSelect.disabled = true;
      roadSelect.disabled = true;
      msg.innerHTML = "";
      return;
    }

    //從Object[CityName]取得值，其值為陣列
    let districtArray = cityObject[cityValue];
    districtArray.forEach((item) => {
      let opt = document.createElement("option");
      opt.value = item.id;
      opt.text = item.district;
      districtSelect.add(opt);
    });
  }
  
  function districtSelectedChange(event) {
    let districtValue = districtSelect.selectedOptions[0].value;
    let districtText = districtSelect.selectedOptions[0].text;

    //清除並重新建立District <select>
    roadSelect.disabled = false;
    roadSelect.innerHTML = "";
    let option0 = document.createElement("option");
    option0.value = "";
    option0.text = "---請選擇街道---";
    roadSelect.add(option0, null);

    //如果未選擇district則return
    if (districtValue == "") {
      roadSelect.disabled = true;
      msg.innerHTML = "";
      return;
    }

    //從Object[districtName]取得值，其值為陣列
    let roadArray = roadObject[districtValue];
    roadArray.forEach((item) => {
      let opt = document.createElement("option");
      opt.value = item.id;
      opt.text = item.road;
      roadSelect.add(opt);
    });
  }

  districtSelect.addEventListener("change", function () {
    let cityValue = citySelect.selectedOptions[0].value;
    let cityText = citySelect.selectedOptions[0].text;
    let districtValue = districtSelect.selectedOptions[0].value;
    let districtText = districtSelect.selectedOptions[0].text;

    if (cityValue != "" && districtValue != "") {
      msg.innerText =
        citySelect.selectedOptions[0].text +
        "," +
        districtSelect.selectedOptions[0].text;
      submitButton.disabled = false;
    } else {
      msg.innerHTML = "";
      submitButton.disabled = true;
    }
  });
  
  roadSelect.addEventListener("change", function () {
    let districtValue = districtSelect.selectedOptions[0].value;
    let districtText = districtSelect.selectedOptions[0].text;
    let roadValue = roadSelect.selectedOptions[0].value;
    let roadText = roadSelect.selectedOptions[0].text;

    if (districtValue != "" && roadValue != "") {
      msg.innerText =
        districtSelect.selectedOptions[0].text +
        "," +
        roadSelect.selectedOptions[0].text;
      submitButton.disabled = false;
    } else {
      msg.innerHTML = "";
      submitButton.disabled = true;
    }
  });
});

submitButton.addEventListener("click", submitData);

//Submit提交資料
function submitData() {
  alert("你提交了資料");

  //建立FormData
  let formData = new FormData();
  formData.append("city", citySelect.selectedOptions[0].value);
  formData.append("district", districtSelect.selectedOptions[0].text);

  // 傳送FormData資料到指定的Server，將資料交由Server處理
  let request = new XMLHttpRequest();
  request.open("POST", "https://mujimono.azurewebsites.net/taiwan-city/");
  request.send(formData);
}

function allTrim(string) {
  let newString = "";
  string.split(" ").forEach((item) => {
    newString += item;
  });
  return newString;
}
