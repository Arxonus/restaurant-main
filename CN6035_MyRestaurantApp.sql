-- Δημιουργία βάσης δεδομένων για την εφαρμογή κρατήσεων
CREATE DATABASE IF NOT EXISTS my_restaurant_app CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_general_ci;

-- Χρήση της βάσης δεδομένων
USE my_restaurant_app;

-- Πίνακας χρηστών (Users)
CREATE TABLE
  tbl_users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Κωδικός χρήστη (Primary Key)
    full_name VARCHAR(100) NOT NULL, -- Ονοματεπώνυμο
    email VARCHAR(100) NOT NULL UNIQUE, -- Email (μοναδικό)
    password_hash VARCHAR(255) NOT NULL -- Κρυπτογραφημένος κωδικός
  );

-- Πίνακας εστιατορίων (Restaurants)
CREATE TABLE
  tbl_restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Κωδικός εστιατορίου (Primary Key)
    restaurant_name VARCHAR(100) NOT NULL, -- Όνομα εστιατορίου
    location VARCHAR(100) NOT NULL, -- Τοποθεσία
    description TEXT -- Περιγραφή
  );

-- Πίνακας κρατήσεων (Bookings)
CREATE TABLE
  tbl_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Κωδικός κράτησης (Primary Key)
    user_id INT NOT NULL, -- Αναφορά στον χρήστη
    restaurant_id INT NOT NULL, -- Αναφορά στο εστιατόριο
    reservation_date DATE NOT NULL, -- Ημερομηνία κράτησης
    reservation_time TIME NOT NULL, -- Ώρα κράτησης
    guests_count INT NOT NULL, -- Αριθμός ατόμων
    FOREIGN KEY (user_id) REFERENCES tbl_users (id),
    FOREIGN KEY (restaurant_id) REFERENCES tbl_restaurants (id)
  );