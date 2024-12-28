# Step 1: Use an official Python runtime as a parent image
FROM python:3.11-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the requirements.txt into the container
COPY requirements.txt /app/

# Step 4: Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of the application code into the container
COPY . /app/

# Step 6: Expose the port that the app will run on
EXPOSE 8000

# Step 7: Setup ADMIN (if not set)
ENV DJANGO_SUPERUSER_USERNAME=admin
ENV DJANGO_SUPERUSER_EMAIL=admin@example.com
ENV DJANGO_SUPERUSER_PASSWORD=admin123

# Step 8: Set the default command to run the Django app
# CMD ["python", "manage.py", "runserver", "8000"]
RUN python manage.py migrate && python manage.py collectstatic --noinput && python manage.py createsuperuser --noinput || true