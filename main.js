var restaurantBlacklist = [];

window.onload = function(){
    retrieve_blacklist()
}

function alertMe(){
    var restaurants = document.getElementsByClassName("restaurant")
    restaurants.array.forEach(element => {
        restaurantBlacklist.forEach((name) => {
            if (element.innerHTML.contains(name)){
                element.style.display = "none";
            }
        })
    });
}

function update_list_of_restaurants(){
    const listElem = document.getElementById("restaurant-list");
    listItems = "";
    for (item in restaurantBlacklist){
        listItems += "<li style=\"width:300px;\"><button style=\"margin-right:10px;\"id=\"" + item + "\">Del</button>" + restaurantBlacklist[item] + "</li>";
    }
    listElem.innerHTML = listItems;

    for (item in restaurantBlacklist){
        document.getElementById(item).onclick = remove_from_blacklist
    }
}

function remove_from_blacklist(event){
    console.log(event);
    restId = event.srcElement.id
    restaurantBlacklist.splice(restId, 1)
    chrome.storage.sync.set({"restaurant-blacklist": restaurantBlacklist})
    update_list_of_restaurants()
}

function retrieve_blacklist(){
    chrome.storage.sync.get("restaurant-blacklist", (items) => {
        console.log(items)
        if (items["restaurant-blacklist"] == null){
            restaurantBlacklist = []
        }
        else{
            restaurantBlacklist = items["restaurant-blacklist"]
        }
        console.log(restaurantBlacklist)
        update_list_of_restaurants()
    });
}