var app = new Vue({
    el:"#app",
    data(){
return{
nutrition:{
Energy:0,
Cholesterol:0,
CalciumCa:0,
TotalFat:0,
Sodium:0,
Carbohydrate:0,
Protein:0,
Iron:0,
Pottassium:0,
VitaminC:0,

},
noServe:1,
recipe:"",
show:true
}
},

methods:{
clearAll(){
this.nutrition.Energy=0
this.nutrition.Cholesterol=0
this.nutrition.CalciumCa=0
this.nutrition.TotalFat=0
this.nutrition.Sodium=0
this.nutrition.Carbohydrate=0
this.nutrition.Protein=0
this.nutrition.Iron=0
},
//function for separating the input Recipe into list of words separated by \n escape sequence and store it in array named arrayOfItems.
//Itrate through each element of array. Search for that item in the FoodData Central database using api and return the nutrition details of first search result. Store it.
//Itrate through properties of each Nutrient and find needed field and store needed data.
async getNutri(){
var noServe=parseInt(this.noServe)//Change the type of selected number of serving to integer and store in local variable noServe 
var arrayOfItems =""
// differentiate and store the recipe items from value of textarea by \n as separator
arrayOfItems =this.recipe.split("\n")
// loop through list of recipe items
for(var i in arrayOfItems){


var a= arrayOfItems[i]
await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?dataType=Branded&api_key=wZ1Pb65Z9edyuzNYEhzfP1hktg5jygbtZbqN4YJf&query=${a}`)
.then((response)=>{

var totalNutri=response.data.foods[0].foodNutrients
// Loop through the list of nutrients
for(var i in totalNutri){ 
    switch(totalNutri[i].nutrientName){
      case "Total lipid (fat)":{
        this.nutrition.TotalFat+=(totalNutri[i].value*noServe)
      }
      break;
      case "Protein":{
        this.nutrition.Protein+=(totalNutri[i].value*noServe)
      }
      break;
      case "Carbohydrate, by difference":{
        this.nutrition.Carbohydrate+=(totalNutri[i].value*noServe)
      }
      break;
      case "Energy":{
        this.nutrition.Energy+=(totalNutri[i].value*noServe)
      }
      break;
      case "Sodium, Na":{
        this.nutrition.Sodium+=(totalNutri[i].value*noServe)
      }
      break;
      case "Calcium, Ca":{
        this.nutrition.CalciumCa+=(totalNutri[i].value*noServe)
      }
      break;
      case "Vitamin C, total ascorbic acid":{
        this.nutrition.VitaminC+=(totalNutri[i].value*noServe)
      }
      break;
      case "Iron, Fe":{
        this.nutrition.Iron+=(totalNutri[i].value*noServe)
      }
      break;
    }

}

},(error)=>{
console.log(error);

});
}



}

}
})