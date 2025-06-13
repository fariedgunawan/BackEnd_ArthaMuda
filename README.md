# **Dokumentasi Instalasi**
1. Pake GitHub Desktop lebih enak
2. Cloning Repositorynya
3. Cara run diterminal langsung aja
```
npm install
```

4. Buat database bebas namanya
isi table db sebagai berikut
```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance DECIMAL(15, 2) DEFAULT 0
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
)
```
6. Ganti .env dengan nama database yang udah dibuat
```
node server.js
```

# **Dokumentasi backend endpoint**
http://localhost:3000/api/auth/login (POST)
http://localhost:3000/api/auth/register (POST)
http://localhost:3000/api/auth/logout (POST)
http://localhost:3000/api/auth/me (GET) use token
http://localhost:3000/api/transactions (POST) to add data
http://localhost:3000/api/transactions (GET) to show all data
http://localhost:3000/api/transactions/income (GET) to show all data income
http://localhost:3000/api/transactions/outcome (GET) to show all data outcome
http://localhost:3000/api/transactions/:id (GET) to show data by id
http://localhost:3000/api/transactions/:id (PUT) to edit data income/outcome
http://localhost:3000/api/transactions/:id (DELETE) to delete data income/outcome
http://localhost:3000/api/transactions/balance (GET) to calculate and show update balance
http://localhost:3000/api/transactions/analysis (GET) to show avg use intelligent system 

**use Bearer Token to this endpoint**

## login register json

akun 1
{
  "username": "faried", 
  "password": "testpassword" %% hashing %%
}

akun 2
{
  "username": "fariedgunawan", 
  "password": "faried110904" %% hashing %%
}

akun 3
{
  "username": "alma", 
  "password": "alma160304" %% //hashing %%
  }
  
## add income or outcome json
{
  "type": "income",
  "name": "Salary",
  "amount": 5000,
  "date": "2024-11-22"
  }
  
## edit income or outcome json
{
  "name": "Salary",
  "amount": 5000,
  "date": "2024-11-22"
  }
