# 🎮 Anime Recommendation Application

## 📚 About

* This project is a part of the `Prüfungsvorleistung | Winter 2024/25` for the course `Middleware Technology` conducted at `Hochshule für Technik Stuttgart` and is to be used strictly for educational purposes.

* The `resources/docs/pvl` folder contain the submission checklist and 12-factor principles of our project.

## 🚶 Team Overview

* Jan Waidelich (Billionaire Philanthropist, contact him for free bitcoins)
* Sanjay Prabhu Kunjibettu (Professional Overthinker)

## 💼 Project Overview

This project is a middleware-powered application designed to recommend anime based on user preferences. It is inspired by modern web technologies and implements a full-stack solution with a `Django` backend and a `React+VITE` frontend.

> **🌟 Credits:** Special thanks to the author(s) of the site [Django React CRUD Tutorial](https://medium.com/django-unleashed/django-react-crud-a-simple-grocery-list-tutorial-7ae816d5832d), whose work inspired this project.

---

## 🔄 How to Use

### 💻 Prerequisites
Ensure you have the following tools installed:
- <img src="./resources/images/react-icon.png" width=21> **React Native Tools**
- <img src="./resources/images/python-icon.png" width=21> **Python**
- <img src="./resources/images/docker-icon.png" width=21> **Docker**

> [!TIP]
> Use GitHub Codespaces for a developer-friendly experience!
> Watch [this video](https://www.youtube.com/watch?v=uHgt8giw1LY) on how to get free `Github Developer PRO` license

---

### 🔢 Setup Instructions
1. **Install Frontend Dependencies**
   Navigate to the `frontend` folder and run:
   ```bash
   npm install
   ```

2. **Configure Docker Compose**
   Update the `composed_app/docker-compose.yml` file:
   - Rename the frontend environment to match your GitHub Codespace UID.
   - For local setups, use `localhost` but ensure appropriate changes in the VITE app configuration.

3. **Build and Launch the Application**
   Run the following command:
   ```bash
   docker-compose up --build
   ```
   > [!NOTE] 
   > Use this command only during the first setup. For subsequent runs, `docker-compose up` suffices.

4. **Access the Application**
   - Click on the `5173` port link that opens up.
   - If you're using GitHub Codespaces, you should see your unique codespace UID.

5. **Configure Database Visibility**
   - Ensure the visibility of the `8000` database port is set to **Public** for CORS to function correctly. 
   - This is especially relevant for Codespace deployments where all origins are selected.

---

## 🦾 Curious about the Project Setup ?

Welcome learner ! Please find the guides setup in our `resources/docs/` folder as follows:

1. [Setup Django Backend](./resources/docs/01_backend/README.md)
2. [Setup React + VITE Frontend](./resources/docs/02_frontend/README.md)
3. [Docker Setup](./resources/docs/03_docker/README.md)

---

## 📚 License
This project is licensed under the [MIT License](LICENSE).