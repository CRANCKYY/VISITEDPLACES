function Place(location, landmarks, timeOfYear, notes) {
    this.location = location;
    this.landmarks = landmarks;
    this.timeOfYear = timeOfYear;
    this.note = notes;  // Note: you use 'note' here but 'notes' later - fixed below
}

function PlaceBook() {
    this.places = {};
    this.currentid = 0;
}

PlaceBook.prototype.assignid = function () {
    this.currentid += 1;
    return this.currentid;
};

PlaceBook.prototype.addPlace = function (place) {
    place.id = this.assignid();
    this.places[place.id] = place;
};

PlaceBook.prototype.findPlace = function (id) {
    return this.places[id];  // ✅ This works perfectly!
};

const placeBook = new PlaceBook();

function displayPlaces(placeBook) {
    const List = document.getElementById("places-list");
    List.innerHTML = "";  // ✅ Fixed: innerHTML (not inlinerHTML)

    for (let id in placeBook.places) {
        const li = document.createElement("li");
        li.innerText = placeBook.places[id].location;
        li.setAttribute("data-id", id);  // ✅ Added: needed for click handler
        List.appendChild(li);
    }
}

function displayPlaceDetails(place) {
    document.getElementById("details-location").innerText = place.location;
    document.getElementById("details-landmarks").innerText = place.landmarks;
    document.getElementById("details-time").innerText = place.timeOfYear;
    document.getElementById("details-notes").innerText = place.note;  // ✅ Fixed: 'note' not 'notes'
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("place-form").addEventListener("submit", function (event) {  // ✅ Fixed: "placce-form" → "place-form"
        event.preventDefault();

        const location = document.getElementById("location").value;
        const landmarks = document.getElementById("landmarks").value;
        const timeOfYear = document.getElementById("time").value;
        const notes = document.getElementById("notes").value;

        const newPlace = new Place(location, landmarks, timeOfYear, notes);
        placeBook.addPlace(newPlace);
        displayPlaces(placeBook);
        // this.reset();  // Better than requestFullscreen() - clears form
    });

    document.getElementById("places-list").addEventListener("click", function (event) {  // ✅ Fixed: "addEvetListener" → "addEventListener"
        if (event.target.tagName === "LI") {  // ✅ Added: check it's an LI element
            const id = event.target.getAttribute("data-id");
            const place = placeBook.findPlace(id);  // ✅ Now this works!
            if (place) {
                displayPlaceDetails(place);
            }
        }
    });
});