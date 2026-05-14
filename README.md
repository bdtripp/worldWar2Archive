# WWII Soldier Surveys
A data‑driven React project that loads, parses, and displays historical WWII soldier surveys and their original handwritten responses, using a simple two‑view interface built on a relational dataset.

---

## Why This Project Matters

This project takes a collection of digitized handwritten WWII soldier surveys from the National Archives and presents them through a clean, data‑driven interface. These documents capture the voices of individual soldiers in their own handwriting, offering a rare look into daily life, morale, and personal experiences during the war. By parsing and integrating this data into a modern web application, the project makes these historical records accessible while demonstrating practical skills in handling real‑world datasets.

From an engineering perspective, the project demonstrates practical skills in:

- **Parsing multiple structured CSV datasets** with Papa Parse and transforming them into relational data models used across the application.
- **Managing shared application state** for surveys, questionnaires, questions, and responses, including loading and error handling at the top level.
- **Implementing client‑side routing** with React Router to support a clean two‑page interface for browsing surveys and viewing handwritten responses.
- **Linking related records across datasets** (survey → questionnaire → questions → responses) to dynamically filter and display the correct images and metadata.
- **Rendering a collection of scanned images efficiently** through a custom, responsive image carousel.
- **Building a fully client‑side React application** that loads, transforms, and displays data without relying on a backend.

The result is a focused, technically grounded project that combines modern frontend engineering with relational data modeling and digitized WWII survey data, demonstrating attention to detail, thoughtful UI design, and the ability to work with real‑world archival datasets.

---

## Data Model Diagram

<pre>
Survey (SURVEYS_identifier)
    1 → many
Questionnaire (QUESTIONNAIRES_identifier)
    1 → many
Question (QUESTIONS_identifier)
    1 → many
Response (RESPONSES_identifier)
    1 → 1
Image (RESPONSES_image)
</pre>

