CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance DECIMAL(15, 2) DEFAULT 0;
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Foreign key untuk user
    type ENUM('income', 'outcome') NOT NULL, -- Tipe transaksi
    name VARCHAR(255) NOT NULL, -- Nama sumber/destinasi transaksi
    amount DECIMAL(15, 2) NOT NULL, -- Nominal transaksi
    date DATE NOT NULL, -- Tanggal transaksi
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);