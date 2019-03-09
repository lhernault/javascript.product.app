//Defining a class avec le method constructor. execute when a new element is created

class Product { // How the product will be structured
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }

} 
// this class interact with html. Display in the browser
class UI {
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong>: ${product.name} -
                    <strong>Price</strong>: ${product.price} - 
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }
    
// create method reset to clear/reset the form
    resetForm(){
        document.getElementById("product-form").reset();
       // this.resetForm();         calling the method here or outside
    }

    deleteProduct(element){ //check etarget adding parameter element -->ui deleteproduct
        if(element.name === "delete"){
          //  console.log(element.parentElement.parentElement.parentElement.remove()); //acces first to "a" link , then cardbody then card text center // check who is the parent
          element.parentElement.parentElement.parentElement.remove();
       //Show message that element was removed
            this.showMessage("Succesfully deleted", "danger")

        }

    }

    showMessage(message, cssClass){// 2 parameters. green if ok. red if it is mistake
            const div = document.createElement("div");
            div.className = `alert alert-${cssClass} mt-4` // + cssClass;  concatenate, mt=margin top
            div.appendChild(document.createTextNode(message));
            //display in DOM
            const container = document.querySelector(".container"); 
            const app = document.querySelector("#app");
            container.insertBefore(div,app); //to insert message into the container before the app code
       // call event to delete the message

       setTimeout(function(){
        document.querySelector(".alert").remove(); // all class start with .alert will be remove
       },3000); // 3 seconds
    }
}

//Events starts

document.getElementById("product-form")
.addEventListener ("submit", function(e){
//console.log(document.getElementById("name").value); taking the value of input. test works on console
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
   // console.log(name,price,year);
   // console.log(new Product(name,price,year)) create a new object with the product features
   const product = new Product(name,price,year);

    const ui = new UI(); // create a n object with method addproduct
    //check if all the info is validate
    if (name === "" || price === "" || year === "") {
        return ui.showMessage("Please complete all fields","danger"); //use return to stop there
        
    }    
    
    ui.addProduct(product); //display 
    ui.resetForm();      // method to reset the form
    ui.showMessage("Succesfully added", "info"); // success is the bootstrap class
    

    //create a preventdefault for avoid the page refresh without save the data.  function(e)
    e.preventDefault(); 

});

// to delete. add eventListener from document
document.getElementById("product-list").addEventListener("click", function(e){
  //  alert("delete works?") but click in all the div
 // console.log(e.target)  checking the target
    const ui = new UI();// storage
    ui.deleteProduct(e.target);
})