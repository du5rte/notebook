# Databases

Resouces:
- [Mongodb Tutorial for Beginners - YouTube](https://www.youtube.com/watch?v=W-WihPoEbR4)

## Schema
The organization of data and how it's sectioned, it's blueprint, and releationship within it's data pieces.

| SQL            | MongoDB        |
| :------------- | :------------- |
| Database       | Database       |
| table          | Collection     |
| Index          | Index          |
| Row            | Document       |
| Join           | Emdedding & Linking |

## Tabular vs Document Orientated
While `tabular` databases Work much like spreadsheets where data is structured in `row` and `columns`, in `document` oriented databases data is structured in `collections` (objects) within `documentes` (json like files)

#### Relational Databases
- MySQL
- SQLite
- Postgres

#### Others
- MongoDB
- CouchDB
- Redis

### Tabular
Here we have a table of `Account Holders` and a second table with `Accounts`, accounts are not directly liked to their holder, but instead we would have to `joint` the `account holder` against `holder ID` to find his account.

#### Account Holders

| ID | first_name | last_name |
| :- | :--------- | :-------- |
| 0  | Johnathan  | Smith     |
| 1  | Chang      | Yung      |

#### Accounts

| ID | account_type | balance  | currency | holder ID |
| :- | :----------- | :------- | :------- | :-------- |
| 0  | Investment   | 80000.00 | USD      | 0         |
| 1  | Savings      | 5000.00  | USD      | 0         |
| 2  | Checking     | 750.00   | USD      | 0         |
| 3  | Investment   | 50000.00 | YEN      | 1         |
| 4  | Savings      | 3000.00  | YEN      | 1         |

### Document Oriented
Here each person is an `Collection` and each account is part of it's `holder`

```json
[
  {
    "ID": 0,
    "first_name": "Johnathan",
    "last_name": "Smith",
    "accounts": [
      {
        "id": 0,
        "account_type": "Investment",
        "account_ballance": "8000.00",
        "currency": "USD"
      },
      {
        "id": 1,
        "account_type": "Savings",
        "account_ballance": "5000.00",
        "currency": "USD"
      },
      {
        "id": 2,
        "account_type": "Checking",
        "account_ballance": "750.00",
        "currency": "USD"
      }
    ]
  },
  {
    "ID": 0,
    "first_name": "Chang",
    "last_name": "Yung",
    "accounts": [
      {
        "id": 0,
        "account_type": "Investment",
        "account_ballance": "50000.00",
        "currency": "YEN"
      },
      {
        "id": 1,
        "account_type": "Savings",
        "account_ballance": "3000.00",
        "currency": "YEN"
      }
    ]
  }
]
```
