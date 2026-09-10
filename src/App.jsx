import { useState } from 'react'
import './App.css'

const environments = [
  {
    id: 'kitchen',
    icon: '🍳',
    name: 'Kitchen',
    activity: 'Cooking',
    reason: 'Cooking can practise sequencing, attention and memory.',
  },
  {
    id: 'plants',
    icon: '🌱',
    name: 'Plants or garden',
    activity: 'Gardening',
    reason: 'Gardening can practise recognition, routine and recall.',
  },
  {
    id: 'table',
    icon: '🪑',
    name: 'Table and objects',
    activity: 'Sound & Touch',
    reason: 'Simple sensory activities can practise attention and observation.',
  },
  {
    id: 'books',
    icon: '📚',
    name: 'Books',
    activity: 'Storytelling',
    reason: 'Stories can practise language, listening and memory.',
  },
  {
    id: 'music',
    icon: '🎵',
    name: 'Music',
    activity: 'Music & Rhythm',
    reason: 'Music activities can practise auditory attention and recall.',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    name: 'Family or people',
    activity: 'Conversation',
    reason: 'Conversation can encourage memory, language and social engagement.',
  },
]

const activities = [
  {
    id: 'cooking',
    icon: '🍳',
    name: 'Cooking',
    description: 'Learn simple recipes while practising memory and sequencing.',
  },
  {
    id: 'gardening',
    icon: '🌱',
    name: 'Gardening',
    description: 'Care for plants while practising recognition and routine.',
  },
  {
    id: 'music',
    icon: '🎵',
    name: 'Music & Rhythm',
    description: 'Listen, identify sounds and practise rhythm and recall.',
  },
  {
    id: 'story',
    icon: '📖',
    name: 'Storytelling',
    description: 'Listen to stories and remember important details.',
  },
  {
    id: 'sound',
    icon: '🪑',
    name: 'Sound & Touch',
    description: 'Explore familiar objects through simple sensory activities.',
  },
  {
    id: 'conversation',
    icon: '💬',
    name: 'Conversation',
    description: 'Talk about familiar memories, people and everyday experiences.',
  },
]

const gameQuestions = {
  Cooking: [
    {
      question: 'Which item would you use to cut a vegetable?',
      options: ['Knife', 'Cup', 'Plate', 'Spoon'],
      answer: 'Knife',
    },
    {
      question: 'What should you usually do before cooking vegetables?',
      options: ['Wash them', 'Hide them', 'Freeze them', 'Paint them'],
      answer: 'Wash them',
    },
  ],

  Gardening: [
    {
      question: 'What do plants usually need to grow?',
      options: ['Water', 'Shoes', 'Books', 'Keys'],
      answer: 'Water',
    },
    {
      question: 'Which one is a plant?',
      options: ['Rose', 'Spoon', 'Clock', 'Chair'],
      answer: 'Rose',
    },
  ],

  'Music & Rhythm': [
    {
      question: 'Which object can make music?',
      options: ['Drum', 'Plate', 'Pillow', 'Book'],
      answer: 'Drum',
    },
    {
      question: 'What do we use to hear music?',
      options: ['Ears', 'Hands', 'Feet', 'Eyes'],
      answer: 'Ears',
    },
  ],

  Storytelling: [
    {
      question: 'What helps you remember a story?',
      options: ['Listening carefully', 'Closing the book immediately', 'Ignoring it', 'Walking away'],
      answer: 'Listening carefully',
    },
    {
      question: 'A story usually has...',
      options: ['Events', 'Only numbers', 'Only colours', 'Nothing'],
      answer: 'Events',
    },
  ],

  'Sound & Touch': [
    {
      question: 'Which sense helps you hear a sound?',
      options: ['Hearing', 'Smell', 'Taste', 'Sight'],
      answer: 'Hearing',
    },
    {
      question: "Which sense helps you feel an object's texture?",
      options: ['Touch', 'Taste', 'Hearing', 'Smell'],
      answer: 'Touch',
    },
  ],

  Conversation: [
    {
      question: 'What is useful when listening to someone?',
      options: ['Paying attention', 'Looking away', 'Ignoring them', 'Leaving'],
      answer: 'Paying attention',
    },
    {
      question: 'Which can help us remember a person?',
      options: ['Their name', 'A random number', 'A blank page', 'Nothing'],
      answer: 'Their name',
    },
  ],
}

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.rate = 0.9

    window.speechSynthesis.speak(speech)
  }
}

function App() {
  const [page, setPage] = useState('home')

  const [activityMode, setActivityMode] = useState(null)

  const [selectedEnvironment, setSelectedEnvironment] = useState(null)

  const [selectedActivity, setSelectedActivity] = useState(null)

  const [gameIndex, setGameIndex] = useState(0)

  const [score, setScore] = useState(0)

  const [gameMessage, setGameMessage] = useState('')

  const [interest, setInterest] = useState('Gardening')

  const [mobility, setMobility] = useState('Comfortable')

  const [difficulty, setDifficulty] = useState('Easy')

  const [aiInput, setAiInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const [profileComplete, setProfileComplete] = useState(false)
  const [userName, setUserName] = useState("")
  const [userAge, setUserAge] = useState("")
  const [preferredLanguage, setPreferredLanguage] = useState("English")

  const questions =
    gameQuestions[selectedActivity?.name] ||
    gameQuestions.Gardening

  function startGame(activity = selectedActivity) {
    if (activity) {
      setSelectedActivity(activity)
    }

    setGameIndex(0)
    setScore(0)
    setGameMessage('')
    setPage('game')

    speak(
      `Let's try a ${activity?.name || selectedActivity?.name || 'memory'} activity.`
    )
  }

  function answerQuestion(option) {
    const question = questions[gameIndex]

    if (option === question.answer) {
      setScore((current) => current + 1)
      setGameMessage('Correct. Well done.')
      speak('Correct. Well done.')
    } else {
      setGameMessage(`The answer is ${question.answer}.`)
      speak(`The answer is ${question.answer}.`)
    }
  }

  function nextQuestion() {
    if (gameIndex < questions.length - 1) {
      setGameIndex((current) => current + 1)
      setGameMessage('')
    } else {
      setPage('activity')
      setGameMessage('')
    }
  }

  function chooseEnvironment(environment) {
    setSelectedEnvironment(environment)

    const activity = activities.find(
      (item) => item.name === environment.activity
    )

    setSelectedActivity(activity)

    speak(
      `You have ${environment.name} nearby. I recommend ${environment.activity}.`
    )
  }

  function findActivity() {
    setPage('environment')
    setActivityMode('nearby')

    speak(
      'I will help you find an activity using things around you.'
    )
  }

  function searchActivity() {
    setPage('search')
    setActivityMode('search')

    speak('Choose something you would like to learn or enjoy.')
  }

  
  function askHelpMate() {
    const text = aiInput.toLowerCase()

    let activity = null
    let response = ''

    if (
      text.includes('kitchen') ||
      text.includes('cooking') ||
      text.includes('cook') ||
      text.includes('food')
    ) {
      activity = activities.find((item) => item.name === 'Cooking')

      response =
        'I can see an opportunity for cooking. We can turn a simple recipe into a memory and sequencing activity.'
    } else if (
      text.includes('plant') ||
      text.includes('garden') ||
      text.includes('flower') ||
      text.includes('tree')
    ) {
      activity = activities.find((item) => item.name === 'Gardening')

      response =
        'You have plants nearby. Let us use them for a simple recognition, observation and memory activity.'
    } else if (
      text.includes('table') ||
      text.includes('cup') ||
      text.includes('spoon') ||
      text.includes('object')
    ) {
      activity = activities.find((item) => item.name === 'Sound & Touch')

      response =
        'I found some everyday objects. Let us try a simple sound and touch activity using them.'
    } else if (
      text.includes('book') ||
      text.includes('story') ||
      text.includes('read')
    ) {
      activity = activities.find((item) => item.name === 'Storytelling')

      response =
        'Books are nearby. We can listen to a short story and practise remembering its important details.'
    } else if (
      text.includes('music') ||
      text.includes('song') ||
      text.includes('instrument')
    ) {
      activity = activities.find((item) => item.name === 'Music & Rhythm')

      response =
        'You have music nearby. We can try a simple listening and rhythm activity.'
    } else {
      response =
        'I would like to know a little more. Tell me what you can see around you, such as a kitchen, plants, table, books or music.'
    }

    setSelectedActivity(activity)
    setAiResponse(response)

    if (activity) {
      speak(response)
    }
  }

  function recommendActivity() {
    let recommended = interest

    if (mobility === 'Limited' && interest === 'Gardening') {
      recommended = 'Music & Rhythm'
    }

    const activity = activities.find(
      (item) => item.name === recommended
    )

    setSelectedActivity(activity)
    setPage('activity')

    speak(`I recommend ${activity.name} for you.`)
  }

  function chooseActivity(activity) {
    setSelectedActivity(activity)
    setPage('activity')

    speak(`${activity.name} is ready.`)
  }
  function completeProfile(e) {
    e.preventDefault()

    if (!userName.trim() || !userAge) {
      return
    }

    setProfileComplete(true)
    setPage("home")
  }

  return (
     <>
        {!profileComplete ? (
          <div className="welcome-screen">
            <div className="welcome-card">

              <div className="welcome-logo">
                <div className="welcome-logo-icon">H</div>
                <span>Help Mate</span>
              </div>

              <h1>Welcome to Help Mate</h1>

              <p className="welcome-subtitle">
                Let's personalize your experience.
              </p>

              <form onSubmit={completeProfile}>

                <div className="form-group">
                  <label>Your name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your age</label>

                  <input
                    type="number"
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred language</label>

                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                  >
                    <option value="English">English</option>

                    <option disabled>
                      Hindi — Coming soon
                    </option>

                    <option disabled>
                      Assamese — Coming soon
                    </option>

                    <option disabled>
                      Bengali — Coming soon
                    </option>

                    <option disabled>
                      Bodo — Coming soon
                    </option>

                    <option disabled>
                      Khasi — Coming soon
                    </option>

                    <option disabled>
                      Garo — Coming soon
                    </option>

                    <option disabled>
                      Mizo — Coming soon
                    </option>

                    <option disabled>
                      Meitei — Coming soon
                    </option>

                    <option disabled>
                      Nepali — Coming soon
                    </option>

                    <option disabled>
                      Kokborok — Coming soon
                    </option>

                    <option disabled>
                      Odia — Coming soon
                    </option>

                    <option disabled>
                      Marathi — Coming soon
                    </option>

                    <option disabled>
                      Gujarati — Coming soon
                    </option>

                    <option disabled>
                      Punjabi — Coming soon
                    </option>

                    <option disabled>
                      Tamil — Coming soon
                    </option>

                    <option disabled>
                      Telugu — Coming soon
                    </option>

                    <option disabled>
                      Kannada — Coming soon
                    </option>

                    <option disabled>
                      Malayalam — Coming soon
                    </option>

                    <option disabled>
                      Urdu — Coming soon
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="primary-button welcome-button"
                >
                  Continue
                </button>

              </form>

              <p className="language-note">
                More languages will be added in future versions.
              </p>

            </div>
          </div>
        ) : (
      <div className="app">

        {/* HEADER */}

        <header className="topbar">

          <div className="brand">

            <div className="brand-icon">
              ✦
            </div>

            <div>
              <h1>Help Mate</h1>
              <p>Your personal cognitive companion</p>
            </div>

          </div>

          <button
            className="voice-button"
            onClick={() => speak('Welcome to Help Mate')}
          >
            🔊 Voice
          </button>

        </header>


        {/* NAVIGATION */}

        <nav className="nav">

          <button
            className={page === 'home' ? 'active' : ''}
            onClick={() => setPage('home')}
          >
            Home
          </button>

          <button
            className={
              ['search', 'environment', 'activity', 'game'].includes(page)
                ? 'active'
                : ''
            }
            onClick={() => setPage('activities')}
          >
            Activities
          </button>

          <button
            className={page === 'routine' ? 'active' : ''}
            onClick={() => setPage('routine')}
          >
            Routine
          </button>

          <button
            className={page === 'caregiver' ? 'active' : ''}
            onClick={() => setPage('caregiver')}
          >
            Caregiver
          </button>

        </nav>


        {/* MAIN */}

        <main className="main">


          {/* HOME */}

          {page === 'home' && (
            <section>

              <div className="hero">

                <div>

                  <span className="tag">
                    PERSONALIZED COGNITIVE SUPPORT
                  </span>

                  <h2>
                    Technology that
                    <br />
                    <strong>understands you.</strong>
                  </h2>

                  <p>
                    Help Mate turns your interests, surroundings
                    and everyday activities into meaningful cognitive
                    experiences.
                  </p>

                  <div className="hero-buttons">

                    <button
                      className="primary-button"
                      onClick={() => setPage('activities')}
                    >
                      Find an activity
                    </button>

                    <button
                      className="secondary-button"
                      onClick={() => speak('What would you like to do today?')}
                    >
                      🔊 Talk to Help Mate
                    </button>

                  </div>

                </div>


                <div className="hero-visual">

                  <div className="brain">
                    ✦
                  </div>

                  <div className="floating-card card-one">
                    Personalised
                  </div>

                  <div className="floating-card card-two">
                    Adaptive
                  </div>

                  <div className="floating-card card-three">
                    Voice enabled
                  </div>

                </div>

              </div>


              <div className="section-heading">

                <div>
                  <h2>Today's experience</h2>
                  <p>
                    Something simple to keep your mind engaged.
                  </p>
                </div>

              </div>


              <div className="card-grid">

                <div className="feature-card">

                  <div className="feature-icon">
                    ✦
                  </div>

                  <h3>AI Activity Discovery</h3>

                  <p>
                    Tell Help Mate what is around you and
                    it can suggest something meaningful to do.
                  </p>

                  <button onClick={() => setPage('activities')}>
                    Discover →
                  </button>

                </div>


                <div className="feature-card">

                  <div className="feature-icon">
                    🧠
                  </div>

                  <h3>Personalised Games</h3>

                  <p>
                    Cognitive activities adapt to interests
                    and previous performance.
                  </p>

                  <button
                    onClick={() => {
                      const activity = activities[1]
                      setSelectedActivity(activity)
                      startGame(activity)
                    }}
                  >
                    Try a game →
                  </button>

                </div>


                <div className="feature-card">

                  <div className="feature-icon">
                    📅
                  </div>

                  <h3>Daily Routine</h3>

                  <p>
                    Gentle reminders for important daily
                    activities.
                  </p>

                  <button onClick={() => setPage('routine')}>
                    View routine →
                  </button>

                </div>

              </div>


              <div className="disclaimer">

                Help Mate provides assistive cognitive support.
                <br />
                It is not a diagnostic or treatment system.

              </div>

            </section>
          )}


          {/* ACTIVITIES LANDING */}

          {/* ACTIVITIES */}

          {page === 'activities' && (
            <section>

              <div className="page-title">

                <span className="tag">
                  HELP MATE
                </span>

                <h2>
                  What would you like to do?
                </h2>

                <p>
                  You can tell Help Mate what you want to learn,
                  or simply describe what is around you.
                </p>

              </div>


              <div className="activity-choice-grid">


                {/* SEARCH */}

                <div className="activity-choice-card">

                  <div className="choice-top">

                    <div className="choice-icon">
                      🔎
                    </div>

                    <span className="choice-label">
                      SEARCH
                    </span>

                  </div>

                  <h3>
                    I know what I want to do
                  </h3>

                  <p>
                    Tell Help Mate what you would like to learn
                    or what activity you enjoy.
                  </p>


                  <div className="ai-input-box">

                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="e.g. I want to learn cooking"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchInput.trim()) {
                          const found = activities.find((item) =>
                            item.name.toLowerCase().includes(
                              searchInput.toLowerCase()
                            )
                          )

                          if (found) {
                            chooseActivity(found)
                          } else {
                            setAiInput(searchInput)
                            setPage('search')
                          }
                        }
                      }}
                    />

                    <button
                      onClick={() => {
                        if (!searchInput.trim()) return

                        const found = activities.find((item) =>
                          item.name.toLowerCase().includes(
                            searchInput.toLowerCase()
                          )
                        )

                        if (found) {
                          chooseActivity(found)
                        } else {
                          setAiInput(searchInput)
                          setPage('search')
                        }
                      }}
                    >
                      →
                    </button>

                  </div>


                  <div className="suggestions">
                    <span>Try</span>
                    <button onClick={() => setSearchInput('Gardening')}>
                      Gardening
                    </button>
                    <button onClick={() => setSearchInput('Cooking')}>
                      Cooking
                    </button>
                    <button onClick={() => setSearchInput('Music')}>
                      Music
                    </button>
                  </div>

                </div>



                {/* AI AGENT */}

                <div className="activity-choice-card ai-card">

                  <div className="choice-top">

                    <div className="choice-icon ai-icon">
                      ✦
                    </div>

                    <span className="choice-label">
                      HELP MATE AI
                    </span>

                  </div>


                  <h3>
                    Tell me what's around you
                  </h3>

                  <p>
                    You don't need to know what activity you want.
                    Just describe what you can see around you.
                  </p>


                  <div className="ai-chat-box">

                    <textarea
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="e.g. I have a table, a cup and a spoon near me..."
                      rows="4"
                    />

                    <div className="ai-input-bottom">

                      <span>
                        Help Mate will suggest an activity
                      </span>

                      <button
                        onClick={askHelpMate}
                      >
                        Ask Help Mate →
                      </button>

                    </div>

                  </div>


                  {aiResponse && (
                    <div className="ai-response">

                      <div className="response-icon">
                        ✦
                      </div>

                      <div>

                        <strong>
                          I have an idea for you
                        </strong>

                        <p>
                          {aiResponse}
                        </p>

                        {selectedActivity && (
                          <button
                            className="response-button"
                            onClick={() => setPage('activity')}
                          >
                            Try {selectedActivity.name} →
                          </button>
                        )}

                      </div>

                    </div>
                  )}

                </div>

              </div>


              {/* AI EXPLANATION */}

              <div className="ai-explanation">

                <div className="ai-explanation-icon">
                  ✦
                </div>

                <div>

                  <strong>
                    Your surroundings can become an activity.
                  </strong>

                  <p>
                    Help Mate looks at what you tell it about your
                    environment and connects it with an appropriate
                    cognitive activity.
                  </p>

                </div>

              </div>

            </section>
          )}


          {/* SEARCH ACTIVITY */}

          {page === 'search' && (
            <section>

              <button
                className="back-button"
                onClick={() => setPage('activities')}
              >
                ← Back
              </button>

              <div className="page-title">

                <span className="tag">
                  SEARCH
                </span>

                <h2>
                  What are you interested in?
                </h2>

                <p>
                  Help Mate will use your preference to
                  personalise your experience.
                </p>

              </div>


              <div className="recommendation-panel">

                <div className="form-grid">

                  <label>
                    What interests you?

                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                    >
                      <option>Gardening</option>
                      <option>Cooking</option>
                      <option>Music & Rhythm</option>
                      <option>Storytelling</option>
                      <option>Sound & Touch</option>
                      <option>Conversation</option>
                    </select>

                  </label>


                  <label>
                    Mobility

                    <select
                      value={mobility}
                      onChange={(e) => setMobility(e.target.value)}
                    >
                      <option>Comfortable</option>
                      <option>Limited</option>
                    </select>

                  </label>


                  <label>
                    Preferred difficulty

                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option>Easy</option>
                      <option>Moderate</option>
                    </select>

                  </label>

                </div>


                <button
                  className="primary-button"
                  onClick={recommendActivity}
                >
                  ✦ Create my activity
                </button>

              </div>

            </section>
          )}


          {/* ENVIRONMENT */}

          {page === 'environment' && (
            <section>

              <button
                className="back-button"
                onClick={() => setPage('activities')}
              >
                ← Back
              </button>

              <div className="page-title">

                <span className="tag">
                  ENVIRONMENT DISCOVERY
                </span>

                <h2>
                  What's around you?
                </h2>

                <p>
                  You don't need to know what activity to choose.
                  Just tell Help Mate what you can see.
                </p>

              </div>


              <div className="hobby-grid">

                {environments.map((environment) => (

                  <div
                    className="hobby-card"
                    key={environment.id}
                    onClick={() => chooseEnvironment(environment)}
                  >

                    <div className="hobby-icon">
                      {environment.icon}
                    </div>

                    <h3>
                      {environment.name}
                    </h3>

                    <p>
                      I have this nearby
                    </p>

                    <button className="secondary-button">
                      Choose
                    </button>

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* ACTIVITY */}

          {page === 'activity' && (
            <section>

              <button
                className="back-button"
                onClick={() => setPage('activities')}
              >
                ← Back
              </button>


              <div className="learning-panel">

                <div className="learning-icon">
                  {selectedActivity?.icon || '✦'}
                </div>

                <span className="tag">
                  HELP MATE RECOMMENDS
                </span>

                <h2>
                  {selectedActivity?.name}
                </h2>

                <p>
                  {selectedActivity?.description}
                </p>


                {selectedEnvironment && (
                  <div className="recommendation-result">

                    <span>
                      {selectedEnvironment.icon}
                    </span>

                    <div>

                      <strong>
                        Because you have this nearby
                      </strong>

                      <p>
                        {selectedEnvironment.reason}
                      </p>

                    </div>

                  </div>
                )}


                <div className="steps">

                  <div className="step">

                    <span>1</span>

                    <div>
                      <strong>Explore</strong>

                      <p>
                        Start with a simple activity.
                      </p>
                    </div>

                  </div>


                  <div className="step">

                    <span>2</span>

                    <div>
                      <strong>Remember</strong>

                      <p>
                        Recall what you just experienced.
                      </p>
                    </div>

                  </div>


                  <div className="step">

                    <span>3</span>

                    <div>
                      <strong>Adapt</strong>

                      <p>
                        Future activities respond to your performance.
                      </p>
                    </div>

                  </div>

                </div>


                <button
                  className="primary-button"
                  onClick={() => startGame(selectedActivity)}
                >
                  Start personalised activity
                </button>

              </div>

            </section>
          )}


          {/* GAME */}

          {page === 'game' && (
            <section className="game-screen">

              <button
                className="back-button"
                onClick={() => setPage('activity')}
              >
                ← Back
              </button>


              <div className="game-panel">

                <span className="tag">
                  PERSONALISED COGNITIVE ACTIVITY
                </span>

                <h2>
                  {questions[gameIndex].question}
                </h2>


                <div className="object-display">
                  {selectedActivity?.icon || '🧠'}
                </div>


                <p className="game-instruction">
                  Take your time. There is no rush.
                </p>


                <div className="options">

                  {questions[gameIndex].options.map((option) => (

                    <button
                      key={option}
                      onClick={() => answerQuestion(option)}
                    >
                      {option}
                    </button>

                  ))}

                </div>


                {gameMessage && (
                  <div className="result-message">
                    {gameMessage}
                  </div>
                )}


                {gameMessage && (
                  <button
                    className="primary-button"
                    onClick={nextQuestion}
                  >
                    {gameIndex < questions.length - 1
                      ? 'Next'
                      : 'Finish'}
                  </button>
                )}

              </div>

            </section>
          )}


          {/* ROUTINE */}

          {page === 'routine' && (
            <section>

              <div className="page-title">

                <span className="tag">
                  DAILY ASSISTANCE
                </span>

                <h2>
                  Today's routine
                </h2>

                <p>
                  Gentle reminders for important activities.
                </p>

              </div>


              <div className="routine-list">

                <div className="routine-item completed">

                  <div className="routine-time">
                    8:00 AM
                  </div>

                  <div className="routine-icon">
                    💊
                  </div>

                  <div className="routine-info">
                    <h3>Morning medicine</h3>
                    <p>Completed</p>
                  </div>

                  <span className="check">
                    ✓
                  </span>

                </div>


                <div className="routine-item">

                  <div className="routine-time">
                    10:00 AM
                  </div>

                  <div className="routine-icon">
                    🧠
                  </div>

                  <div className="routine-info">
                    <h3>Cognitive activity</h3>
                    <p>Personalised for you</p>
                  </div>

                  <button
                    onClick={() => setPage('activities')}
                  >
                    Start
                  </button>

                </div>


                <div className="routine-item">

                  <div className="routine-time">
                    12:30 PM
                  </div>

                  <div className="routine-icon">
                    💧
                  </div>

                  <div className="routine-info">
                    <h3>Drink water</h3>
                    <p>Stay hydrated</p>
                  </div>

                  <button
                    onClick={() =>
                      speak('It is time to drink some water.')
                    }
                  >
                    Remind me
                  </button>

                </div>

              </div>

            </section>
          )}


          {/* CAREGIVER */}

          {page === 'caregiver' && (
            <section>

              <div className="page-title">

                <span className="tag">
                  CAREGIVER
                </span>

                <h2>
                  Activity overview
                </h2>

                <p>
                  A simple view of engagement and progress.
                </p>

              </div>


              <div className="stats-grid">

                <div className="stat-card">
                  <span>🧠</span>
                  <strong>82%</strong>
                  <p>Game performance</p>
                </div>

                <div className="stat-card">
                  <span>📅</span>
                  <strong>91%</strong>
                  <p>Routine completion</p>
                </div>

                <div className="stat-card">
                  <span>✦</span>
                  <strong>6</strong>
                  <p>Activities completed</p>
                </div>

                <div className="stat-card">
                  <span>7</span>
                  <strong>days</strong>
                  <p>Activity streak</p>
                </div>

              </div>


              <div className="dashboard-panel">

                <h3>
                  Cognitive activity trend
                </h3>

                <div className="fake-chart">

                  <div style={{ height: '45%' }}>72</div>
                  <div style={{ height: '55%' }}>76</div>
                  <div style={{ height: '62%' }}>79</div>
                  <div style={{ height: '70%' }}>81</div>
                  <div style={{ height: '76%' }}>82</div>
                  <div style={{ height: '82%' }}>84</div>
                  <div style={{ height: '88%' }}>86</div>

                </div>

                <div className="chart-labels">

                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>

                </div>

              </div>


              <div className="alert-panel">

                <span>ℹ️</span>

                <div>

                  <strong>
                    Help Mate insight
                  </strong>

                  <p>
                    The user is consistently participating
                    in personalised activities. Significant
                    changes from their usual baseline can
                    be surfaced to a caregiver.
                  </p>

                </div>

              </div>

            </section>
          )}

        </main>


        <footer>
          Help Mate · AI-assisted cognitive engagement platform
        </footer>

      </div>
    )}
  </>
  )
}
export default App