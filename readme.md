# Run frontend ( requirements: NodeJS )
# Note: react may require some packages. Assuming package.json would be helpful, requires investigation
cd frontend
npm start

# Run backend
# Requirements: update settings.py with your database information
# Note: python may require some packages to be installed, I should create a venv
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver_plus --cert-file your_certificate.crt --key-file your_key.key

# If security is not required:
python manage.py

# However, this requires you to change all the API calls from http to https. I should use axios
