window.onload = init;

var restaurantBlacklist = [];

function init(){
    console.log("initializing")
    retrieve_blacklist();
    let restaurants = retrieve_restaurants();
    add_remove_button(restaurants);
    
}

function retrieve_restaurants(){
    do {
        var restaurants = document.getElementsByClassName("restaurant");
    } while (restaurants === null);
    return restaurants;
}

function hide_restaurants(restaurants){
    for (let id in restaurants){
        let restaurant = restaurants[id];
        if (restaurant.innerHTML == null){
            continue;
        }
        for (let restaurantName of restaurantBlacklist){
            if (restaurant.innerHTML.includes(restaurantName)){
                restaurant.style.display = "none";
            }
        }
    }
}

function add_remove_button(restaurants){
    for (let id in restaurants){
        let restaurant = restaurants[id];
        let removeBtn = document.createElement("button");
        removeBtn.innerHTML = "<span>🗑️</span>"
        removeBtn.onclick = remove_restaurant;
        restaurant.appendChild(removeBtn);
    }
}

function remove_restaurant(event){
    event.stopPropagation();
    let restaurantName = event.path[2].outerText.split("\n")[1]
    add_to_blacklist(restaurantName);
    hide_restaurants(retrieve_restaurants());
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

        hide_restaurants(retrieve_restaurants())
    });
}

function add_to_blacklist(restaurantName){
    if (restaurantBlacklist.indexOf(restaurantName) < 0){
        restaurantBlacklist.push(restaurantName);
    }
    chrome.storage.sync.set({"restaurant-blacklist": restaurantBlacklist})
    retrieve_blacklist()
}