// // class Rectangle {
// //   constructor(height, width) {
// //     this.name = "四邊形";
// //     this.height = height;
// //     this.width = width;
// //   }

// //   get area() {
// //     return this.height * this.width;
// //   }
// // }

// // var r = new Rectangle(6, 3);

// // console.log(r);
// // console.log(r.area);

// //宣告陳列
// var taiwanArray = ["台灣", 41, 1, 12];
// var chinaArray = ["中國", 80134, 2914, 44595];
// var americaArray = ["美國", 9665, 146, 694];
// var map = new Map(); //初始化Map物件
// //Ex1 - 加入key-value pairs資料到Map物件
// map.set("taiwan", taiwanArray);
// map.set("china", chinaArray);
// map.set("america", americaArray);

// //Ex2 - 讀取Map成員
// console.log(map.get("america"));
// console.log(map.get("taiwan"));
// console.log(map.get("china"));
// console.log("---------------");

// // //Ex3 - 刪除指定key的key-value pair
// // map.delete("china");
// // console.log(map);
// // console.log('---------------');

// // //Ex4 - clear()全部清除
// // map.clear();
// // console.log(map);
// // console.log('---------------');

// for (let key of map.keys()) {
//   console.log(key);
// }
// console.log('---------------');
// //Ex4 - value
// for (let value of map.values()) {
//   console.log(value);
// }
// console.log('---------------');
// //Ex5 - key & value
// for (let [key, value] of map) {
//   console.log(`${key} : ${value}`);
// }


//Ex1 - 建立Set
let set = new Set();
set.add(1);
set.add(3);
set.add(5);
set.add(7);
console.log(set);
console.log('size : ' + set.size)
console.log('type : ' + typeof set);