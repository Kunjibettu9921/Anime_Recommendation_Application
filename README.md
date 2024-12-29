# Anime_Recommendation_Application

# About
Prüfungsvorleistung Application | Middleware Technology | Winter Semester 2024/2025 | HFT Stuttgart

# How to use ?

1. Go to the `composed_app/docker-compose.yml` and rename the frontend environment to your github codespace uid. If you wish to run it locally, you can very well use the localhost too but make sure you make apt changes in the VITE app.

2. Commands
```bash
docker-compose up --build # if you are doing it for the first time
```
3. Click on the `5173` port that will open up. If you are on github codespace, you will also see your codespace uid.

4. Remember to make the visibility of `8000` database post as `Public` for the CORS to work here as all origins have been selected for codespace.