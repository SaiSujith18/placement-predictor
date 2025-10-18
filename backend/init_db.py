# # backend/init_db.py
# import sqlite3

# conn = sqlite3.connect("users.db")  # creates users.db in backend/
# cur = conn.cursor()

# # Create users table
# cur.execute("""
# CREATE TABLE IF NOT EXISTS users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     name TEXT NOT NULL,
#     email TEXT UNIQUE NOT NULL,
#     password TEXT NOT NULL
# )
# """)

# conn.commit()
# conn.close()
# print("✅ Users table created")
