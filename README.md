
# CODEWAVE-Hackathon
# Doc Talk Decode

An AI-powered medical translator that simplifies complex medical diagnoses into understandable language, with a focus on improving health literacy for health-illiterate populations.

## Team Name
**SASS**  
- Saral Sainju  
- Shubham Shakya  
- Subham K Shrestha  

## Project Theme
Natural Language Processing (NLP) and AI Models

## Problem Statement
Patients, especially in developing regions, often face challenges in understanding medical diagnoses due to:
- **Long wait times** for clarifications.
- **Misplaced medical records**, causing confusion and delays.
- **Low health literacy**, particularly in chronic disease management (COPD, Diabetes Mellitus, Hypertension).

## Solution: Doc Talk Decode
An AI-driven platform that:
- **Decodes complex medical reports** into layman-friendly language using GPT-4.
- **Extracts medical information** from physical or scanned documents via OCR (Optical Character Recognition) technology.
- **Translates medical terms** into local languages, such as Nepali, making healthcare more accessible.

### Features
- **AI-Powered Medical Translator**: GPT-4 simplifies complex medical terminologies.
- **Multilingual Support**: Provides translations in Nepali and other local languages.
- **Medical Record Storage**: Organizes medical history for easy access and tracking.
- **Reduces Doctor Visits**: Helps patients understand their conditions, cutting down on unnecessary follow-ups.

## Tech Stack
- **Frontend**: React
- **Backend**: FastAPI
- **Database**: Firebase (for medical record storage)
- **AI Model**: GPT-4 for NLP and translation
- **OCR**: For reading physical/scanned documents

### System Flow
1. **Input**: User uploads a scanned or physical medical document.
2. **OCR**: Extracts text from the document.
3. **AI Processing**: GPT-4 interprets and simplifies medical terms.
4. **Output**: Provides easy-to-understand diagnosis and explanations in the user's language.
5. **Storage**: Medical records are stored in Firebase for future reference and use.

## Future Enhancements
- **AI Learning**: Continuous updates from medical literature to enhance accuracy.
- **Predictive Analytics**: Use AI to predict potential health issues based on patient history.
- **Telemedicine Integration**: Summarize AI-diagnosed results for doctor consultations.

## Limitations
- **OCR Accuracy**: Handwritten doctor notes may be hard for OCR to read accurately.
- **AI Reliability**: GPT-4 may not always fully comprehend complex medical contexts, which could lead to incomplete or inaccurate diagnoses.

## How to Run
1. Clone the repository:
   ```bash
   https://github.com/suwubham/CODEWAVE_DocTalk-Decode.git
