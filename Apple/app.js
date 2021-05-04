let appleProduct = document.querySelectorAll('[name="product"]');

let productPhoto = document.querySelector(".phone-photo>.row");
let description = document.getElementById("description");
let typeName = document.getElementById("typeName");
let typeRow = document.getElementById("type");
let color = document.getElementById("color");
let capacity = document.getElementById("capacity");
let price = document.getElementById("price");
let size = document.getElementById("size");
let priceText = document.getElementById("phonePrice");
let taxText = document.getElementById("phoneTax");

appleProduct.forEach((item) => {
  item.addEventListener("click", () => {
    let keys = Object.keys(product[`${item.value}`]);

    typeRow.innerHTML = "";
    color.innerHTML = "";
    capacity.innerHTML = "";
    size.innerHTML = "";
    typeName.innerHTML = "";
    productPhoto.innerHTML = "";
    description.innerHTML = "";
    priceText.innerText = "NT$0";
    taxText.innerText = "含加值型營業稅：約 NT$0*。";

    keys.forEach((key) => {
      let div = document.createElement("div");
      div.classList.add("col-2");
      div.innerHTML = `
      <label class="select d-flex justify-content-center">
        <input type="radio" name="type" value="${key}" />
        <span class="color">${key}</span>
      </label>
      `;
      typeRow.appendChild(div);
    });

    let phoneType = document.querySelectorAll('[name="type"]');

    phoneType.forEach((typeItem) => {
      typeItem.addEventListener("click", changeTypeName);
      typeItem.addEventListener("click", changePhoneFamily);
      typeItem.addEventListener("click", changeSize);
      typeItem.addEventListener("click", changeColor);
      typeItem.addEventListener("click", cleanPrice);
    });
  });
});

function cleanPrice() {
  priceText.innerText = "NT$0";
  taxText.innerText = "含加值型營業稅：約 NT$0*。";
}

function changeTypeName() {
  let typeNameValue = document.querySelector('[name="type"]:checked').value;
  typeName.innerText = `購買 ${typeNameValue}`;
}

function changeSize() {
  let productNameValue = document.querySelector('[name="product"]:checked')
    .value;
  let typeNameValue = document.querySelector('[name="type"]:checked').value;

  size.innerHTML = "";
  capacity.innerHTML = "";

  let sizeArray = product[`${productNameValue}`][`${typeNameValue}`];

  let sizeKeys = Object.keys(sizeArray);

  sizeKeys.forEach((key) => {
    let div = document.createElement("div");
    div.classList.add("col-10", "p-0");
    div.innerHTML = `
    <label class="select w-100">
      <input type="radio" name="size" value="${key}"/>
      <p class="color py-4 d-flex justify-content-between">
        <span class="">${sizeArray[`${key}`].size}</span><span>NT$${
      sizeArray[`${key}`].standard[0].price
    } 起</span>
      </p>
    </label>
    `;
    div.addEventListener("click", changeCapacity);
    div.addEventListener("click", cleanPrice);
    size.appendChild(div);
  });
  phoneEvent();
}

function changeCapacity() {
  let productNameValue = document.querySelector('[name="product"]:checked')
    .value;
  let typeNameValue = document.querySelector('[name="type"]:checked').value;
  let capacityNameValue = document.querySelector('[name="size"]:checked').value;
  capacity.innerHTML = "";

  let capacityArray =
    product[`${productNameValue}`][`${typeNameValue}`][`${capacityNameValue}`]
      .standard;

  capacityArray.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("col-5", "p-0");
    div.innerHTML = `
    <label class="select-color w-100">
      <input type="radio" name="price" value="${item.price}" />
      <div class="color d-flex flex-column align-items-center">
        <h4>${item.capacity}<span class="fs-6 fw-bold">GB</span>&sup2</h4>
        NT$${item.price}
      </div>
    </label>
    `;
    capacity.appendChild(div);
  });
  phoneEvent();
}

function changePhoneFamily() {
  let productNameValue = document.querySelector('[name="product"]:checked')
    .value;
  let typeNameValue = document.querySelector('[name="type"]:checked').value;

  let photoImg = document.createElement("img");
  let div = document.createElement("div");
  div.classList.add("col-10");
  div.appendChild(photoImg);

  description.innerHTML = `
  <div class="col-4 d-flex flex-column align-items-center">
    <i class="fab fa-apple fa-2x"></i>
    <p class="fs-6 fw-light">快速且免額外付費的運送服務</p>
  </div>
  <div class="col-4 d-flex flex-column align-items-center">
    <i class="fas fa-mobile-alt fa-2x"></i>
    <p class="fs-6 fw-light">免額外付費的個人化解說服務</p>
  </div>
  <div class="col-4 d-flex flex-column align-items-center">
    <i class="fab fa-apple-pay fa-2x"></i>
    <p class="fs-6 fw-light">免額外付費輕鬆退貨</p>
  </div>
  `;

  productPhoto.innerHTML = "";
  photoImg.src = `./img/${productNameValue}/${typeNameValue}/family.jfif`;
  photoImg.style.width = "100%";
  productPhoto.appendChild(div);
}

function changeColor() {
  let productNameValue = document.querySelector('[name="product"]:checked')
    .value;
  let typeNameValue = document.querySelector('[name="type"]:checked').value;

  color.innerHTML = "";

  let colorArray = product[`${productNameValue}`][`${typeNameValue}`].color;

  colorArray.forEach((colorItem) => {
    let div = document.createElement("div");
    div.classList.add("col-5", "p-0");
    div.innerHTML = `
    <label class="select-color w-100">
      <input type="radio" name="color" value="${colorItem.value}"/>
      <span class="color d-flex flex-column align-items-center"
        ><img
          src="${colorItem.url}"
          alt=""
          class="w-25"
        />${colorItem.text}</span
      >
    </label>
    `;
    color.appendChild(div);
  });
  phoneEvent();
}

function phoneEvent() {
  let phoneSize = document.querySelectorAll('[name="size"]');
  let phoneColor = document.querySelectorAll('[name="color"]');
  let phonePrice = document.querySelectorAll('[name="price"]');
  phoneSize.forEach((phoneType) => {
    phoneType.addEventListener("click", changePhoneImg);
  });
  phoneColor.forEach((phoneColor) => {
    phoneColor.addEventListener("click", changePhoneImg);
  });
  phonePrice.forEach((phonePrice) => {
    phonePrice.addEventListener("click", changePriceText);
  });
}

function changePriceText() {
  let priceValue = document.querySelector('[name="price"]:checked').value;
  priceText.innerText = `NT$ ${priceValue}`;
  taxText.innerText = `含加值型營業稅：約 NT$ ${priceValue * 0.04}*。`;
}

function changePhoneImg() {
  let productNameValue = document.querySelector('[name="product"]:checked')
    .value;
  let typeNameValue = document.querySelector('[name="type"]:checked').value;
  let sizeNameValue = document.querySelector('[name="size"]:checked').value;
  let colorNameValue = document.querySelector('[name="color"]:checked').value;

  let photoImg = document.createElement("img");
  productPhoto.innerHTML = "";
  photoImg.src = `./img/${productNameValue}/${typeNameValue}/${sizeNameValue}/${colorNameValue}.png`;
  photoImg.style.width = "100%";
  productPhoto.appendChild(photoImg);
}
