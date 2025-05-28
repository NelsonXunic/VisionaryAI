# VisionaryAI: Accessible Content Insights

## Description/Motivation

VisionaryAI is an intelligent web application designed to enhance content accessibility and provide rapid insights from visual media. It leverages Hugging Face models for image captioning, visual question answering (VQA), and text-to-speech (TTS) to deliver rich audio descriptions and precise visual information extraction.

The primary motivation behind VisionaryAI is to bridge the gap between visual content and understanding, particularly for individuals who may face barriers accessing visual information. By transforming images into descriptive text and audio, and enabling interactive questioning, we aim to:
- Significantly improve accessibility for visually impaired users.
- Facilitate quick content summarization and information retrieval for all users.
- Provide a platform for exploring the capabilities of modern multimodal AI.

## Key Hugging Face Tasks

VisionaryAI integrates three core AI tasks from the Hugging Face ecosystem:
- **Image-to-Text (Image Captioning):** Generates detailed textual descriptions from images.
- **Visual Question Answering (VQA):** Answers natural language questions about the content of an image.
- **Text-to-Speech (TTS):** Converts generated text (captions, VQA answers) into natural-sounding speech for audio playback.

## Project Logo
![Project Logo](./logo.png)

## [Project Concept](./concept.md)

## Scope

This project aims to develop a fully functional and user-friendly web application for VisionaryAI. The initial focus is on offering robust core functionalities for processing user-uploaded images and URLs. The application will include features like:
- Direct image upload and URL input for analysis.
- Generation and display of image captions.
- Interactive question-answering on images, with text answers.
- Conversion of generated text (captions/answers) into playable audio.
- Asynchronous processing of AI tasks using Celery and Redis for responsiveness.
- A clean, responsive user interface built with modern web technologies.
- A well-structured backend API using FastAPI.
- Local development environment setup using Docker.

In terms of this project's current scope, we consider out of scope (but potential future extensions):
- Direct support for video analysis (beyond single image frames).
- Custom model fine-tuning or training within the application.
- Integration with an extensive array of other AI models (beyond the core three tasks).
- Complex, highly scalable cloud deployment architectures beyond basic setup.

## Vision

This project envisions VisionaryAI as an intuitive tool that democratizes access to visual information. It aspires to empower users with immediate, accessible insights from images, transforming how they interact with online content. By bridging theoretical AI advancements with practical, user-centric application, VisionaryAI aims to be a valuable resource for both individuals seeking enhanced accessibility and those eager to explore the practical applications of cutting-edge AI. In the long term, it could serve as a foundation for further research into AI-driven content understanding and accessibility solutions.

## Prerequisites

To run and develop this application locally, you will need:
- **Python 3.x**: For the backend development.
- **Node.js (with npm or yarn)**: For the frontend development.
- **Docker Desktop**: For running local services like Redis and potentially containerizing the application.
- **Git**: For version control and cloning the repository.

Once deployed, users will only need a modern web browser and an internet connection to access the application.

## Built With

VisionaryAI is built using a modern and robust technology stack:
- **Python 3.x**: The primary programming language for the backend.
- **FastAPI**: A modern, fast (high-performance) web framework for building the backend API.
- **React.js / Next.js**: A powerful JavaScript framework for building the interactive and responsive user interface.
- **Hugging Face Transformers**: The core library for seamless integration and utilization of state-of-the-art pre-trained AI models for multimodal tasks.
- **PyTorch**: An open-source machine learning framework, serving as the underlying deep learning engine for the Hugging Face models.
- **Celery**: An asynchronous task queue for processing computationally intensive AI inferences, ensuring the backend API remains responsive.
- **Redis**: An in-memory data structure store, used as the message broker and result backend for Celery tasks.
- **Docker**: A platform used for developing, shipping, and running applications in containers, ensuring consistent environments.
- **Pillow**: The Python Imaging Library, used for efficient image manipulation and processing on the backend.
- **`python-dotenv`**: A library for loading environment variables from a `.env` file, facilitating local configuration.
- **Visual Studio Code / PyCharm**: Popular IDEs used for development, offering powerful tools for code editing, debugging, and testing.

## Author

- **Nelson Xunic**: *VisionaryAI* [NelsonXunic](https://github.com/NelsonXunic)
- **About the Lead Developer:** Nelson D. Xunic Cua graduated from Berea College where he majored in Mathematics and Computer & Information Science. He was born and raised in the mountainside of Guatemala and coming from a low-income family, he wants to support students from Guatemala who are interested in studying science but do not have the resources to do so.
In his free time, he enjoys learning origami while listening to music. He is also passionate about all kinds of crafts, his favorite being broomcraft. His prefered form of exercise is running, he says it helps him focus on his academics as he uses it as away to distress. He joined the cross-country and track teams during his third year at Berea College. He prefers long-distance events over sprints and short-distance events.

## Acknowledgments

The author would like to express gratitude to the following individuals and resources for their support and contributions to the VisionaryAI project:
- The Hugging Face team and community for providing accessible, state-of-the-art AI models and libraries that form the core of this application.
- The developers of FastAPI, React.js, Next.js, Celery, Redis, Docker, and other open-source tools that made this project feasible and enjoyable to build.

## [Setup and Use Guide](./setup.md)

## License
This project is licensed under the [MIT](./LICENSE) License.
