/*
 Greg Koenig
 Visual Frameworks 1302
*/

/*
    .getElementById("string"); >>> gets the HTML line of the particular ID
    .getElementsByTagName(); >>>> returns an Array of the elements tagged
    .value >>>> returns the value of an ID from the HTML 
    .addEventListener("event", function);
    .setAttribute ("attribute name", "attribute value");
    .removeAttribute ();
    .innerHTML >>> returns text from the HTML tag
                    var myh2 = document.getElementById("ID of H2 tag");
                    console.log(myh2.innerHTML)
                    
    .addEventListener("click or blur or focus", whatToDo) >>> change, mouseover, mouseout
    .createElement("string");  >>>>> example    document.createElement("li");
    .appendChild("string");
    
*/

//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

    //getElementByID function
    function GetID(x){
        var element = document.getElementById(x);
        return element;   
    }

    var openBlankWindow = function() {
        window.open("blank.html", "_self");
    };
    
    //Getting the form variables //
    var accessCategory = GetID("addaBoard").Category;
    var boardWidth = GetID("width");
    var bearingType = GetID("addaBoard").bearing;
    var truckBrand = GetID("truckBrand");
    var accessChecked = GetID("addaBoard").accessories;
    var manuDate = GetID("date");
    var notes = GetID("notes");
    var createLi = GetID("li");
    var createUl = GetID("ul");
    var accessories;
    var bearingValue;
    var accessoryValue;
     
    var deleteCategoryItems = accessCategory;
    deleteCategoryItems.innerHTML="";
    
    //Create more categories
    var categoryAdds = ["Vintage", "Novelty", "Art", "Rider", "Broken"];
    for (i=0, j=categoryAdds.length; i<j; i++) {
        var createOption = document.createElement("option");
        createOption.innerHTML = categoryAdds[i];
        createOption.value = categoryAdds[i];
        accessCategory.appendChild(createOption);    
    }
    
    
    // Get the value of the check boxes
    var getAccessories = function(){
        accessoryValue =[];
        for (i=0, j=accessChecked.length; i<j; i++){
            if(accessChecked[i].checked){
                accessoryValue.push(accessChecked[i].value);
                
            }
        }
        
    };
    
    //get value of Bearing radio buttons
    var getBearingRating = function(){
        for (i=0, j=bearingType.length; i<j; i++){
            if(bearingType[i].checked){
                bearingValue = bearingType[i].value;
            }
        }
        
    };
    
    
    //Get the data into storage!
    var saveData = function (key){
        //if no key create a new one.
        var id;
        if(!key) {
            id = Math.floor(Math.random()*100000000);
            //if same set it as the old.
        }else{
            id = key;
        }
        
        //Get form fields and put in object
        //Object will contain value and input
        getAccessories();
        getBearingRating();
        var formItem = {};
            formItem.board = ["Board: ", GetID("brand").value];
            formItem.category = ["Category: ", GetID("Category").value];
            formItem.width = ["Width: ", GetID("width").value];
            formItem.bearing = ["Bearings: ", bearingValue];
            formItem.trucks = ["Trucks: ", GetID("truckBrand").value];
            formItem.accessories = ["Accessories: ", accessoryValue];
            formItem.manudate = ["Manufacturer's Date: ", GetID("date").value];
            formItem.notes = ["Notes: ", GetID("notes").value];
            //save data into local storage using stringify.
            localStorage.setItem(id, JSON.stringify(formItem));
            alert("Board is saved");
    };
    
    
    //togglecontrols
    var toggleControls = function(n){
        switch(n){
            case "on":    
                GetID("addaBoard").style.display = "none";
                GetID("clearButton").style.display = "inline";
                GetID("displayBoards").style.display = "none";
                GetID("addNew").style.display = "inline";
                
                break;
            case "off":
                GetID("addaBoard").style.display = "block";
                GetID("clearButton").style.display = "inline";
                GetID("displayBoards").style.display = "inline";
                GetID("addNew").style.display = "none";
                GetID("NewBoards").style.display = "none";
                break;
            default:
                return false;
        }
        
    };
    
    //creates the edit links for each item
    var makeEditLinks = function(key, editLinks){
        var editItemLink = document.createElement ("a");
        editItemLink.setAttribute("class", "editlinks");
        editItemLink.href = "#";
        editItemLink.key = key;
        var editBoardText = "Edit Board";
        editItemLink.addEventListener("click", editBoard);
        editItemLink.innerHTML = editBoardText;
        editLinks.appendChild(editItemLink);
        
        //add break
        var breakTag = document.createElement("br");
        editLinks.appendChild(breakTag);
        
        var deleteBoard = document.createElement("a");
        deleteBoard.setAttribute("class", "editlinks");
        deleteBoard.href = "#";
        deleteBoard.key = key;
        var deleteBoardText = "Delete Board";
        deleteBoard.addEventListener("click", deleteSingleBoard);
        deleteBoard.innerHTML = deleteBoardText;
        editLinks.appendChild(deleteBoard);
        
    };
    
    var deleteSingleBoard = function(){
        var ask=confirm("Delete board?");
        if (ask){
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Board not deleted");
        }
        
    };
    
    //put data to the browser
    var getData = function(){
        
        toggleControls("on");
        if(localStorage.length ===0){
            alert("Ya gotta add a board first - default data added!");
            defaultFillData();
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "NewBoards");
        
        
        /*var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);*/
        document.body.appendChild(makeDiv);
        /*GetID("NewBoards").style.display = "block";*/
        GetID("NewBoards").innerHTML = "";
        for (var i=0, j=localStorage.length; i<j; i++) {
            /*var makeLi = document.createElement("li");*/
            var editLinks = document.createElement("li");
            /*makeDiv.appendChild(makeLi);*/
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //connecting string in localstorage to an object
            var object = JSON.parse(value);
            
            var newBoard = document.createElement('div');
            makeDiv.appendChild(newBoard);
            newBoard.setAttribute("class", "newBoard");
            getCategoryImage(object.category[1], newBoard);
            var boardSpecs = document.createElement('div');
            newBoard.appendChild(boardSpecs);
            boardSpecs.setAttribute("class", "boardSpecs");
            
            var makeSubList = document.createElement("ul");
            boardSpecs.appendChild(makeSubList);
            
            for ( var n in object ){
                var makeSubLi = document.createElement("li");
                makeSubList.appendChild(makeSubLi);
                var optSubText = object[n][0] + " " + object[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(editLinks);
            }
            /*for ( var n in object ){
                var makeSubLi = document.createElement("li");
                makeSubList.appendChild(makeSubLi);
                var optSubText = object[n][0] + " " + object[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(editLinks);
            }*/
            makeEditLinks(localStorage.key(i), editLinks); //creates the edit links for each item
            
        }
        
    };
    
    
    function getCategoryImage(catName, newBoard){
        var imageLineItem = document.createElement('div');
        newBoard.appendChild(imageLineItem);
        imageLineItem.setAttribute("class", "boardPicture");
        var newImage = document.createElement('img');
        var setSource = newImage.setAttribute("src", "img/"+ catName +".png");
        var setID = newImage.setAttribute("class", "deckpic");
        imageLineItem.appendChild(newImage);
        
    }
    
    //Default data load = json.js
    function defaultFillData(){
        for ( var n in json){
            var id = Math.floor(Math.random()*100000000);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
        
        
    };
    
    var editBoard = function(){
        GetID("NewBoards").innerHTML = "";
        var value = localStorage.getItem(this.key);
        var object = JSON.parse(value);
        
        //show the form
        toggleControls("off"); 
        
        //populate the form
        GetID('brand').value = object.board[1];
        GetID('Category').value = object.category[1];
        GetID('width').value = object.width[1];
        for (i=0, j=bearingType.length; i<j; i++){
            if(bearingType[i].value === object.bearing[1]){
                bearingType[i].setAttribute("checked", "checked");
            }else{
                bearingType[i].removeAttribute("checked");
            }
        };
        for (i=0, j=accessChecked.length; i<j; i++){
            if(accessChecked[i].value === object.accessories[1][i]){
                accessChecked[i].setAttribute("checked", "checked");
                
            }else{
                accessChecked[i].removeAttribute("checked");
            }
            
        };
        
         /*for (i=0, j=accessChecked.length; i<j; i++){
            var accessValue = object.accessories[1];
            if(accessValue[i] === "checked"){
                accessChecked[i].setAttribute("checked", "checked");
            }else{
                accessChecked[i].removeAttribute("checked");
            }
        };
        */
        
        GetID("truckBrand").value = object.trucks[1];
        GetID("date").value = object.manudate[1];
        GetID("notes").value = object.notes[1];
        
        //Remove listener from 
        saveBoard.removeEventListener("click", saveData);
        //Change Submit button value to Save Changes Button
        GetID("submitbutton").value = "Save Changes";
        var editSubmitButton = GetID("submitbutton");
        
        //Save key value as a property of the EditSubmitButton
        editSubmitButton.addEventListener("click", validateForm);
        editSubmitButton.key = this.key;
    };
    
    var validateForm = function(e){
        //define elements to check
        var getBoardName = GetID("brand");
        
        //Reset error messages
        GetID("errors").innerHTML = "";
        getBoardName.style.border = "1px solid black";
        
        //Get error messages
        var errorArray = [];
        if (getBoardName.value === ""){
            var getBoardNameError = ("Please give this board a name");
            getBoardName.style.border = "1px solid red";
            errorArray.push(getBoardNameError);
        }
        
        //display errors on the screen
        if(errorArray.length >=1){
            for(i=0, j=errorArray.length; i<j; i++){
                var text = document.createElement("li");
                text.innerHTML = errorArray[i];
                GetID("errors").appendChild(text);
            }
            e.preventDefault();
            return false;
        }else{
            //Save data. Send key value.
            // this value was passed through the editSubmitButton listener
            saveData(this.key);
        }
        
    };
    
    
    var clearData = function(){
        if(localStorage.length === 0){
            alert ("There is no data to clear.")
            
        }else{
            localStorage.clear();
            alert ("All boards deleted.");
            window.location.reload();
            return false;
        }
        
    };
    
    //check form inputs
    var checkBoardInput =function(){
        valid=true
        if(document.addaBoard.brand.value === ""){
        alert ("Please fill in the board name.");
        valid=false;
        }
        return valid;
    };
    
    var openAddWindow = function() {
        window.open("additem.html", "_self");
    };
    
    
    //form button actions
    var displayBoards = GetID("displayBoards");
    displayBoards.addEventListener("click", getData);
    var clearButton = GetID("clearButton");
    clearButton.addEventListener("click", clearData);
    var saveBoard = GetID("submitbutton");
    saveBoard.addEventListener("click", validateForm);
    var addBoard = GetID("addNew");
    addBoard.addEventListener("click", openAddWindow);
    
    /*
    //show categories browser
    var showCategory = function(){
        var pushedCat = Vintage;
        toggleControls("on");
        if(localStorage.length ===0){
            alert("No boards saved - default data added!");
            defaultFillData();
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "NewBoards");
        document.body.appendChild(makeDiv);
        GetID("NewBoards").style.display = "block";
        for (var i=0, j=localStorage.length; i<j; i++) {
            var editLinks = document.createElement("li");
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            //connecting string in localstorage to an object
            var object = JSON.parse(value);
            
            var newBoard = document.createElement('div');
            makeDiv.appendChild(newBoard);
            newBoard.setAttribute("class", "newBoard");
            
            if (object[i].category[1] == pushedCat) {
                getCategoryImage(object[i].category[1], newBoard);
                var boardSpecs = document.createElement('div');
                newBoard.appendChild(boardSpecs);
                boardSpecs.setAttribute("class", "boardSpecs");
                var makeSubList = document.createElement("ul");
                boardSpecs.appendChild(makeSubList);
            
                var makeSubLi = document.createElement("li");
                makeSubList.appendChild(makeSubLi);
                var optSubText = object[i][0] + " " + object[i][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(editLinks);
            };
                makeEditLinks(localStorage.key(i), editLinks); //creates the edit links for each item
        };
        
        
    };
    

    //index page buttons
    var vintageButton = GetID("vintageButton");
    vintageButton.addEventListener("click", openBlankWindow);
    var noveltyButton = GetID("noveltyButton");
    noveltyButton.addEventListener("click", openBlankWindow);
    var artButton = GetID("artButton");
    artButton.addEventListener("click", openBlankWindow);
    var riderButton = GetID("riderButton");
    riderButton.addEventListener("click", openBlankWindow);
    var brokenButton = GetID("brokenButton");
    brokenButton.addEventListener("click", openBlankWindow);
   */

} );