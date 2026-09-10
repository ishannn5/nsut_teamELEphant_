# System Architecture

## High-level flow

```text
                         HELP MATE
                             |
              +--------------+--------------+
              |                             |
              v                             v
        Elderly User                    Caregiver
              |                             |
              v                             v
       Elderly Interface            Caregiver Dashboard
              |
      +-------+-------+----------------+
      |               |                |
      v               v                v
 Cognitive Games   Daily Routine   User Preferences
      |               |                |
      +-------+-------+----------------+
              |
              v
      User Performance Data
              |
              v
     Personalization Engine
              |
      +-------+--------+--------+
      |                |        |
      v                v        v
 Cognitive Profile   Cultural   Environment
                     Context     Context
      |                |        |
      +----------------+--------+
                       |
                       v
            Activity Recommendation
                       |
             +---------+---------+
             |                   |
             v                   v
      Cognitive Activity    Hobby Activity
             |                   |
             +---------+---------+
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

## Components

### Frontend

Handles interaction with elderly users and caregivers.

The elderly interface provides simple navigation, large controls, cognitive games, personalized activities, daily routines, reminders, and voice-assisted interaction.

### Cognitive Gaming Module

Provides activities focused on memory, attention, concentration, pattern recognition, object recognition, and routine recall.

The difficulty of activities can be adjusted based on the user's previous performance.

### Personalization Engine

Combines information about the user's cognitive performance, interests, hobbies, accessibility requirements, language preferences, cultural preferences, and environment to recommend suitable activities.

### Cultural Context

Uses the user's selected region as contextual information and asks the user about their actual preferences rather than making assumptions based only on location.

For example, Help Mate may ask whether the user enjoys traditional songs, stories, festivals, crafts, food, or other culturally familiar activities.

The user's responses are used to personalize future activities.

### Environment Context

Considers the user's surrounding environment and available activities when generating recommendations.

For example, the system can recommend activities related to nearby parks, gardening, community activities, cultural events, or other suitable local opportunities.

### Activity Recommendation

Generates personalized cognitive and hobby-based activities using the user's profile, performance, interests, cultural preferences, and environmental context.

For example:

```text
User enjoys traditional music
            |
            v
Preferred regional music identified
            |
            v
Music-based memory activity
            |
            v
User performance measured
            |
            v
Next activity adapted
```

### Adaptation Engine

Uses user performance and feedback to adjust future activities.

Factors can include:

- Accuracy
- Response time
- Completion
- Repeated errors
- Activity preferences

The system uses this information to personalize the difficulty and type of subsequent activities.

### Daily Routine and Reminder Module

Supports reminders for important daily activities such as:

- Medication
- Hydration
- Cognitive activities
- Appointments
- Other routine activities

### Caregiver Dashboard

Allows caregivers or authorized health workers to view relevant user activity and performance information.

It can provide:

- Activity history
- Cognitive performance trends
- Routine status
- Progress information
- Changes from the user's normal performance

### Voice Interaction

Provides voice-assisted interaction to reduce dependence on reading and typing.

It can be used for instructions, activity prompts, reminders, and other interactions.

### Offline Support

The platform is designed for low-connectivity environments.

Core functionality can be made available locally, while user activity data can be synchronized with backend services when connectivity becomes available.



Help Mate is currently implemented as a React and Vite prototype focused on demonstrating the core user experience and personalization workflow.

The current prototype primarily demonstrates the frontend, cognitive activities, personalized activity flow, daily routines, reminders, cultural and environmental personalization concepts, and caregiver interface.

Future versions can integrate backend APIs, persistent databases, machine-learning models, offline synchronization, expanded multilingual voice interaction, and more advanced personalization services.
