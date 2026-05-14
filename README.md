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

## How It Works

The application loads four CSV datasets (surveys, questionnaires, questions, and responses) on startup and transforms them into a relational structure entirely in the browser. Papa Parse is used to parse each file, after which the data is linked by identifier:

### Data Model Diagram

<pre>
Survey 
    └── 1 → many ──> Questionnaire
                        └── 1 → many ──> Question
                                            └── 1 → many ──> Response
                                                                └── 1 → 1 ──> Image
</pre>

All parsed data is stored in shared React state at the top level of the application. Once loaded, the app exposes two main routes:

- **Home View (`/`)** — Displays all surveys and their associated questionnaires. Users select a questionnaire to explore its questions and handwritten responses.

- **Responses View (`/responses`)** — Displays the typed questions and original handwritten responses for the questionnaire selected on the Home page. The selected questionnaire is determined using the `questionnaireId` query parameter in the URL (e.g., `/responses?questionnaireId=S002w`).

When viewing a questionnaire, the application dynamically filters the linked questions and responses, resolves the correct scanned image for each response, and displays them through a responsive image carousel. All data loading, parsing, and rendering happens entirely client‑side with no backend required.


