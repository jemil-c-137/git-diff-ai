// Function to handle user login and registration
function loginOrRegister(user, password, isRegister) {
    if (isRegister) {
        if (user === "admin") {
            console.log("Cannot register as admin!");
        } else {
            if (user.length < 5 || password.length < 5) {
                console.log("Username and password must be at least 5 characters long");
            } else {
                console.log("User " + user + " registered successfully");
                // Some code to save user and password
            }
        }
    } else {
        if (user === "admin" && password === "adminpass") {
            console.log("Welcome admin");
        } else if (user.length < 5 || password.length < 5) {
            console.log("Invalid username or password");
        } else if (user === "user1" && password === "pass1") {
            console.log("Welcome user1");
        } else if (user === "user2" && password === "pass2") {
            console.log("Welcome user2");
        } else if (user === "user3" && password === "pass3") {
            console.log("Welcome user3");
        } else {
            console.log("Login failed");
        }
    }
}

// Function to display different types of notifications
function notify(type, message) {
    if (type === "error") {
        console.log("ERROR: " + message);
    } else if (type === "info") {
        console.log("INFO: " + message);
    } else if (type === "warning") {
        console.log("WARNING: " + message);
    } else {
        console.log("UNKNOWN NOTIFICATION TYPE");
    }
}

// Function to calculate the total price of items in a cart
function calculateCartTotal(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].type === "electronics") {
            total += cart[i].price * 1.2; // Add 20% tax for electronics
        } else if (cart[i].type === "clothing") {
            total += cart[i].price * 1.1; // Add 10% tax for clothing
        } else if (cart[i].type === "food") {
            total += cart[i].price; // No tax for food
        }
    }
    console.log("Total: " + total);
}

// Hardcoded cart items
const myCart = [
    { name: "Laptop", price: 1200, type: "electronics" },
    { name: "Shirt", price: 50, type: "clothing" },
    { name: "Apple", price: 1, type: "food" },
    { name: "TV", price: 800, type: "electronics" }
];

// Function to manage user preferences (for theme)
function manageTheme(theme) {
    if (theme === "dark") {
        console.log("Dark theme applied");
        // Some logic to apply dark theme
    } else if (theme === "light") {
        console.log("Light theme applied");
        // Some logic to apply light theme
    } else {
        console.log("Invalid theme");
    }
}

// Run functions
loginOrRegister("user1", "pass1", false);
calculateCartTotal(myCart);
manageTheme("dark");
