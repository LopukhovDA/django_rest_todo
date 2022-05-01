import requests

response = requests.post('http://127.0.0.1:8000/api-token-auth/',
                         data={'username': 'rest', 'password': 'geekbrains'})
print(response.status_code)  # 200
print(response.json())  # {'token': 'bbc01756243b49e1cd05c7887620649b98b9b5fd'}
