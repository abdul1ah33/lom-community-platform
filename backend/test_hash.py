from backend.app.core.auth.security import hash_password, verify_password

password = "MyPassword123!"

hashed = hash_password(password)

print(hashed)

print(verify_password(password, hashed))

print(verify_password("wrong_password", hashed))