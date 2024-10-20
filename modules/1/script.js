const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Dummy data for modules and assistants with opening dates
const modules = [
    {
        moduleNumber: 'Module 1',
        moduleTitle: 'Limits',
        moduleImage: 'https://placehold.co/300x200?text=Module+1',
        assistantPic: 'https://placehold.co/50x50?text=A1',
        assistantName: 'Jono Dower',
        assistantId: '18221999',
        openDate: '2024-10-01' // YYYY-MM-DD format
    },
    {
        moduleNumber: 'Module 2',
        moduleTitle: 'The Derivative',
        moduleImage: 'https://placehold.co/300x200?text=Module+2',
        assistantPic: 'https://placehold.co/50x50?text=A2',
        assistantName: 'Jeni Siti',
        assistantId: '18221998',
        openDate: '2024-10-24'
    },
    {
        moduleNumber: 'Module 3',
        moduleTitle: 'Applications of the Derivative',
        moduleImage: 'https://placehold.co/300x200?text=Module+3',
        assistantPic: 'https://placehold.co/50x50?text=A3',
        assistantName: 'Mamat Joko',
        assistantId: '18221997',
        openDate: '2024-10-31'
    },
    {
        moduleNumber: 'Module 4',
        moduleTitle: 'The Definite Integral',
        moduleImage: 'https://placehold.co/300x200?text=Module+4',
        assistantPic: 'https://placehold.co/50x50?text=A4',
        assistantName: 'Sara Elia',
        assistantId: '18221996',
        openDate: '2024-11-05'
    },
    {
        moduleNumber: 'Module 5',
        moduleTitle: 'Applications of the Integral',
        moduleImage: 'https://placehold.co/300x200?text=Module+5',
        assistantPic: 'https://placehold.co/50x50?text=A5',
        assistantName: 'Ali Zain',
        assistantId: '18221995',
        openDate: '2024-11-12'
    },
    {
        moduleNumber: 'Module 6',
        moduleTitle: 'Transcendental Functions',
        moduleImage: 'https://placehold.co/300x200?text=Module+6',
        assistantPic: 'https://placehold.co/50x50?text=A6',
        assistantName: 'Nina Arif',
        assistantId: '18221994',
        openDate: '2024-11-19'
    },
    {
        moduleNumber: 'Module 7',
        moduleTitle: 'Techniques of Integration',
        moduleImage: 'https://placehold.co/300x200?text=Module+7',
        assistantPic: 'https://placehold.co/50x50?text=A7',
        assistantName: 'Harris Basir',
        assistantId: '18221993',
        openDate: '2024-11-26'
    },
    {
        moduleNumber: 'Module 8',
        moduleTitle: 'Indeterminate Forms and Improper Integrals',
        moduleImage: 'https://placehold.co/300x200?text=Module+8',
        assistantPic: 'https://placehold.co/50x50?text=A8',
        assistantName: 'Dina Fitria',
        assistantId: '18221992',
        openDate: '2024-12-03'
    }
    // Add more modules as needed
];

// Sample events data (could be fetched from an API or database)
const events = [
    { date: new Date(2024, 9, 20), title: "Pra Praktikum 1" },
    { date: new Date(2024, 9, 27), title: "Pra Praktikum 2" },
];

let currentDate = new Date();
const monthYearElement = document.getElementById("month-year");
const calendarDaysElement = document.getElementById("calendar-days");
const eventsListElement = document.getElementById("events-list");
let selectedDateElement = null; // Track the selected date element
let selectedEventElement = null; // Track the selected event element

function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Clear previous days
    calendarDaysElement.innerHTML = "";

    // Add empty slots for previous month's days
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarDaysElement.appendChild(emptyDiv);
    }

    // Add the days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;

        // Highlight today
        if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayElement.classList.add("today");
        }

        // Check if the day has an event and highlight it
        const eventOnThisDay = events.find(event => 
            event.date.getDate() === day &&
            event.date.getMonth() === month &&
            event.date.getFullYear() === year &&
            event.date >= new Date() // Ensure the event is not in the past
        );

        if (eventOnThisDay) {
            dayElement.classList.add("event-day");

            // Add click event to the date
            dayElement.addEventListener("click", () => {
                highlightEventForDate(eventOnThisDay, dayElement);
            });
        }

        calendarDaysElement.appendChild(dayElement);
    }

    renderEvents();
}

function renderEvents() {
    // Clear previous event list
    eventsListElement.innerHTML = "";

    // Filter events that are in the current month and have not yet occurred
    const filteredEvents = events.filter(event => {
        const eventMonth = event.date.getMonth();
        const eventYear = event.date.getFullYear();
        return eventMonth === currentDate.getMonth() &&
               eventYear === currentDate.getFullYear() &&
               event.date >= new Date(); // Ensure the event is not in the past
    });

    // Display the filtered events
    filteredEvents.forEach(event => {
        const eventItem = document.createElement("li");
        const eventDate = event.date.toDateString();
        eventItem.textContent = `${eventDate} - ${event.title}`;
        
        // Add click event to the event
        eventItem.addEventListener("click", () => {
            highlightDateForEvent(event, eventItem);
        });

        eventsListElement.appendChild(eventItem);
    });

    if (filteredEvents.length === 0) {
        const noEventItem = document.createElement("li");
        noEventItem.textContent = "No upcoming events.";
        eventsListElement.appendChild(noEventItem);
    }
}

function highlightEventForDate(event, dateElement) {
    // Remove the highlight from the previously selected date
    if (selectedDateElement) {
        selectedDateElement.classList.remove("selected-date");
    }

    // Highlight the newly selected date
    selectedDateElement = dateElement;
    selectedDateElement.classList.add("selected-date");

    // Highlight the corresponding event in the event list
    const eventListItems = document.querySelectorAll("#events-list li");
    eventListItems.forEach((eventItem) => {
        const eventText = eventItem.textContent;
        if (eventText.includes(event.title)) {
            highlightEvent(eventItem);
        }
    });
}

function highlightDateForEvent(event, eventElement) {
    // Remove the highlight from the previously selected event
    if (selectedEventElement) {
        selectedEventElement.classList.remove("selected-event");
    }

    // Highlight the newly selected event
    selectedEventElement = eventElement;
    selectedEventElement.classList.add("selected-event");

    // Highlight the corresponding date in the calendar
    const dayElements = document.querySelectorAll(".days div");
    dayElements.forEach(dayElement => {
        const day = parseInt(dayElement.textContent);
        if (event.date.getDate() === day && event.date.getMonth() === currentDate.getMonth()) {
            highlightEventForDate(event, dayElement);
        }
    });
}

function highlightEvent(eventItem) {
    // Remove the highlight from the previously selected event
    if (selectedEventElement) {
        selectedEventElement.classList.remove("selected-event");
    }

    // Highlight the newly selected event
    selectedEventElement = eventItem;
    selectedEventElement.classList.add("selected-event");
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Function to add module events
function addModuleEvents(modules, events) {
    modules.forEach(module => {
        const moduleOpenDate = new Date(module.openDate);
        // Add an event for the module opening
        events.push({
            date: moduleOpenDate,
            title: `Open: ${module.moduleTitle}` // Event title indicating module opening
        });
    });
}

// Call the function to add events
addModuleEvents(modules, events);

renderCalendar();

// mobile slide menu

document.getElementById("menu-button").addEventListener("click", function() {
    var bar = document.getElementById("left-bar");
    bar.classList.toggle("left-bar-hidden"); // Toggle the slide-in effect
    bar.classList.toggle("left-bar-visible"); // Toggle the slide-in effect
    document.body.classList.toggle("no-scroll");
});

document.getElementById("menu-close-button").addEventListener("click", function() {
    var bar = document.getElementById("left-bar");
    bar.classList.toggle("left-bar-hidden"); // Toggle the slide-in effect
    bar.classList.toggle("left-bar-visible"); // Toggle the slide-in effect
    document.body.classList.toggle("no-scroll");
});