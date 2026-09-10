# Help Mate

TEAM Elephant 

## 1. Project Information

- **Project Title:** Help Mate – AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients
- **PS ID:** [YOUR ACTUAL PS ID]
- **PS Title:** AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)
- **Category:** Software
- **Theme:** [YOUR OFFICIAL SIH THEME]

## 2. Problem Statement

Elderly people experiencing dementia and cognitive decline may face difficulties with memory, attention, routine activities, and maintaining meaningful engagement in daily life.

Existing digital cognitive-training solutions may rely heavily on repetitive games and may not adequately consider the user's personal interests, physical abilities, local environment, language, or the availability of caregivers.

The problem is particularly important in the North Eastern Region (NER), where remote locations, connectivity limitations, language diversity, and access to healthcare and caregivers can create additional challenges.

A practical solution should provide accessible cognitive stimulation, personalized activities, routine assistance, and caregiver support while remaining usable in low-connectivity environments.

## 3. Proposed Solution

Help Mate is an AI-assisted cognitive gaming and memory support platform designed for elderly users and their caregivers.

The platform combines cognitive games, personalized activities, hobby-based engagement, daily reminders, cultural personalization, environmental context, and caregiver monitoring in a simple and accessible interface.

Instead of relying only on conventional brain games, Help Mate builds a personalized cognitive profile using the user's performance, interests, hobbies, physical accessibility, language preferences, cultural preferences, and surrounding environment.

Help Mate can also use the user's location or selected region to understand the cultural context around them. The system can ask users about familiar songs, stories, traditions, festivals, food, hobbies, and activities they enjoy. Their responses are then used to personalize future cognitive activities.

For example, if an elderly user enjoys traditional music from their region, Help Mate can ask about their preferred type of songs and use familiar music as part of memory and recognition activities. Similarly, a user interested in local gardening can receive activities involving plant identification, remembering watering schedules, sequencing gardening tasks, and recalling previous activities.

The system continuously learns from user interaction and feedback so that activities can become increasing

## 4. Key Features

- Personalized cognitive games for memory, attention, concentration, and pattern recognition
- Adaptive difficulty based on user performance
- AI-assisted personalized hobby and activity recommendations
- Hobby-based cognitive engagement and learning
- Cultural-context-aware activity personalization
- Region-aware recommendations based on the user's selected location or surrounding environment
- Personalized music, stories, traditions, festivals, and culturally familiar activities
- User preference questions to continuously improve personalization
- Daily routine and medication reminders
- Hydration reminders
- Appointment and activity reminders
- Voice-assisted interaction
- Multilingual interface designed for Indian and North Eastern languages
- Caregiver dashboard for monitoring user activity and cognitive performance
- Performance history and progress tracking
- Change-from-baseline insights for caregiver attention
- Environment-aware activity recommendations
- Elderly-friendly interface with large buttons and simple navigation
- Offline-first design for low-connectivity environments
- Secure handling of user and caregiver data

## 5. Technology Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **UI:** Responsive web interface designed for elderly users and tablets
- **Voice Interaction:** Browser Speech Synthesis / Web Speech APIs
- **AI/ML:** Adaptive recommendation and cognitive-performance analysis
- **Backend:** Planned REST API using Python and FastAPI
- **Database:** Planned PostgreSQL
- **Offline Storage:** IndexedDB / browser local storage
- **Deployment:** Web / PWA
- **Future AI Integration:** Machine-learning models for personalized activity recommendation and performance analysis

The current prototype focuses on demonstrating the user experience and core interaction flow. Advanced AI/ML models and backend services can be integrated into the next implementation stage.

## 6. Architecture

Help Mate follows a modular architecture in which the elderly-facing application, personalization engine, activity system, cultural context, environmental context, and caregiver dashboard work together.

```text
                         HELP MATE
                             |
              +--------------+--------------+
              |                             |
              v                             v
       Elderly User                    Caregiver
              |                             |
              v                             v
       User Interface                Caregiver Dashboard
              |
      +-------+--------+----------------+
      |                |                |
      v                v                v
 Cognitive Games   Daily Routine   User Preferences
      |                |          / Interests / Hobbies
      +--------+-------+----------------+
               |
               v
       User Performance Data
               |
               v
       Personalized User Profile
               |
      +--------+---------+---------+
      |                  |         |
      v                  v         v
 Cognitive Profile   Cultural   Environment
                    Context      Context
      |                  |         |
      +------------------+---------+
                         |
                         v
              Activity Recommendation
                         |
          +--------------+--------------+
          |                             |
          v                             v
  Cognitive Activity             Hobby Activity
          |                             |
          +--------------+--------------+
                         |
                         v
                   User Feedback
                         |
                         v
                 Adaptation Engine
                         |
                         v
              Updated User Profile
                         |
                         v
               Next Activity
```

## 7. Installation

Clone the repository and install the required dependencies:

```bash
git clone https://github.com/ishannn5/nsut_teamELEphant_.git
cd nsut_teamELEphant_
npm install
```

## 8. Run

```bash
npm run dev
```


