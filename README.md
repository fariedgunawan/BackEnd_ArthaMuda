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
