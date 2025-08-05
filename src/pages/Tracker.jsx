//Tracker part
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Task Item Component
const TaskCard = ({ day, taskKey, task, weekData, updateTaskValue }) => {
  const { isDarkMode } = useTheme();
  const current = weekData[day].tasks[taskKey];
  const progress = Math.min((current / task.target) * 100, 100);
  const isCompleted = progress >= 100;

  return (
    <div className={`rounded-xl p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-200 hover:transform hover:-translate-y-1 ${
      isDarkMode 
        ? 'bg-gray-900/70 hover:bg-gray-800/70'
        : 'bg-white hover:bg-gray-50'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{task.icon}</span>
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-blue-100' : 'text-blue-900'
          }`}>
            {task.name}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            max={task.max}
            step={task.step || 1}
            value={current}
            onChange={(e) => updateTaskValue(day, taskKey, e.target.value)}
            onBlur={(e) => {
              const value = parseFloat(e.target.value) || 0;
              if (value > task.max) {
                updateTaskValue(day, taskKey, task.max);
              }
            }}
            className={`w-20 px-3 py-2 border-2 border-blue-700 rounded-lg text-center focus:border-blue-400 focus:outline-none transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-blue-100'
                : 'bg-white text-blue-900'
            }`}
          />
          <span className={isDarkMode ? 'text-blue-300' : 'text-blue-700'}>
            / {task.target} {task.unit}
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div className={`rounded-full h-3 overflow-hidden ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'
            }`}
            style={{ width: progress + '%' }}
          />
        </div>
      </div>

      <div className="text-center text-sm">
        {isCompleted ? (
          <span className="text-green-400 font-semibold">✅ Goal Achieved!</span>
        ) : (
          <span className={isDarkMode ? 'text-blue-300' : 'text-blue-700'}>
            {Math.round(progress)}% completed
          </span>
        )}
      </div>
    </div>
  );
};

// Day Navigation Component
const DayNavigation = ({ daysOfWeek, currentDay, setCurrentDay, getDayStats }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`backdrop-blur-lg rounded-2xl p-6 mb-8 ${
      isDarkMode 
        ? 'bg-gray-900/50'
        : 'bg-white/50 border border-gray-200'
    }`}>
      <div className="flex flex-wrap justify-center gap-2">
        {daysOfWeek.map(day => {
          const dayStats = getDayStats(day);
          return (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                currentDay === day
                  ? 'bg-blue-700 text-blue-100 shadow-lg transform scale-105'
                  : isDarkMode
                    ? 'bg-gray-800 text-blue-300 hover:bg-gray-700'
                    : 'bg-white text-blue-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <div>{day}</div>
              <div className="text-xs mt-1">
                {dayStats.avgProgress}% • {dayStats.completedTasks}/{dayStats.totalTasks}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Mood Selector Component
const MoodSelector = ({ day, weekData, updateMood, moods }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`backdrop-blur-lg rounded-2xl p-6 mb-8 ${
      isDarkMode 
        ? 'bg-gray-900/50'
        : 'bg-white/50 border border-gray-200'
    }`}>
      <h2 className={`text-2xl font-semibold mb-6 text-center ${
        isDarkMode ? 'text-blue-100' : 'text-blue-900'
      }`}>
        How are you feeling on {day}?
      </h2>
      <div className="flex justify-center flex-wrap gap-4">
        {moods.map(mood => (
          <button
            key={mood.name}
            onClick={() => updateMood(day, mood.emoji)}
            className={`text-4xl p-4 rounded-full transition-all duration-200 ${
              weekData[day].mood === mood.emoji
                ? 'bg-blue-700 scale-110 ring-4 ring-blue-400'
                : isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 hover:scale-105'
                  : 'bg-white hover:bg-gray-50 hover:scale-105 border border-gray-200'
            }`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// Stats Sidebar Component
const StatsSidebar = ({ currentDay, currentDayStats, weekStats, daysOfWeek, getDayStats }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="lg:col-span-1">
      <div className={`backdrop-blur-lg rounded-2xl p-6 mb-6 ${
        isDarkMode 
          ? 'bg-gray-900/50'
          : 'bg-white/50 border border-gray-200'
      }`}>
        <h3 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-blue-100' : 'text-blue-900'
        }`}>
          {currentDay} Stats
        </h3>
        <div className="space-y-4">
          <div className={`rounded-xl p-4 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className={`text-3xl font-bold ${
              isDarkMode ? 'text-blue-100' : 'text-blue-900'
            }`}>
              {currentDayStats.avgProgress}%
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Overall Progress
            </div>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className={`text-3xl font-bold ${
              isDarkMode ? 'text-blue-100' : 'text-blue-900'
            }`}>
              {currentDayStats.completedTasks}/{currentDayStats.totalTasks}
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Tasks Completed
            </div>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className="text-3xl">{currentDayStats.mood || '😐'}</div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Current Mood
            </div>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-lg rounded-2xl p-6 mb-6 ${
        isDarkMode 
          ? 'bg-gray-900/50'
          : 'bg-white/50 border border-gray-200'
      }`}>
        <h3 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-blue-100' : 'text-blue-900'
        }`}>
          Weekly Overview
        </h3>
        <div className="space-y-4">
          <div className={`rounded-xl p-4 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-blue-100' : 'text-blue-900'
            }`}>
              {weekStats.avgWeekProgress}%
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Average Progress
            </div>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-blue-100' : 'text-blue-900'
            }`}>
              {weekStats.totalCompletedTasks}
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Total Tasks Done
            </div>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-blue-100' : 'text-blue-900'
            }`}>
              {weekStats.daysWithMood}/7
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Days Tracked
            </div>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-lg rounded-2xl p-6 ${
        isDarkMode 
          ? 'bg-gray-900/50'
          : 'bg-white/50 border border-gray-200'
      }`}>
        <h3 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-blue-100' : 'text-blue-900'
        }`}>
          Week at a Glance
        </h3>
        <div className="space-y-3">
          {daysOfWeek.map(day => {
            const stats = getDayStats(day);
            return (
              <div key={day} className="flex items-center gap-3">
                <div className={`w-16 text-sm ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  {day.slice(0, 3)}
                </div>
                <div className={`flex-1 rounded-full h-2 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`}>
                  <div 
                    className="bg-blue-400 h-full rounded-full transition-all duration-500"
                    style={{ width: stats.avgProgress + '%' }}
                  />
                </div>
                <div className={`text-sm w-12 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  {stats.avgProgress}%
                </div>
                <div className="text-lg">{stats.mood || '⚪'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const FitnessDashboard = ({ className = "", containerClassName = "" }) => {
  const { isDarkMode } = useTheme();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [currentDay, setCurrentDay] = useState('Monday');

  const initializeWeekData = () => {
    const weekData = {};
    daysOfWeek.forEach(day => {
      weekData[day] = {
        mood: null,
        tasks: {
          water: 0,
          steps: 0,
          workout: 0,
          sleep: 0,
          meals: 0,
          meditation: 0
        }
      };
    });
    return weekData;
  };

  const [weekData, setWeekData] = useState(initializeWeekData);

  const tasks = {
    water: { icon: '💧', name: 'Water Intake', target: 8, unit: 'glasses', max: 20 },
    steps: { icon: '👟', name: 'Steps Walked', target: 10000, unit: 'steps', max: 20000 },
    workout: { icon: '🏋‍♀', name: 'Workout Minutes', target: 60, unit: 'minutes', max: 180 },
    sleep: { icon: '😴', name: 'Sleep Hours', target: 8, unit: 'hours', max: 12, step: 0.5 },
    meals: { icon: '🥗', name: 'Healthy Meals', target: 3, unit: 'meals', max: 6 },
    meditation: { icon: '🧘‍♀', name: 'Meditation', target: 15, unit: 'minutes', max: 60 }
  };

  const moods = [
    { emoji: '🤩', name: 'amazing' },
    { emoji: '😊', name: 'happy' },
    { emoji: '😌', name: 'good' },
    { emoji: '😐', name: 'neutral' },
    { emoji: '😴', name: 'tired' },
    { emoji: '😰', name: 'stressed' },
    { emoji: '🤒', name: 'sick' }
  ];

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const updateTaskValue = (day, taskKey, value) => {
    const task = tasks[taskKey];
    let numValue = parseFloat(value);

    if (isNaN(numValue) || value === '') {
      numValue = 0;
    }

    const boundedValue = Math.max(0, Math.min(numValue, task.max));

    setWeekData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: {
          ...prev[day].tasks,
          [taskKey]: boundedValue
        }
      }
    }));
  };

  const updateMood = (day, mood) => {
    setWeekData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        mood: mood
      }
    }));
  };

  const getDayStats = (day) => {
    const dayData = weekData[day];
    let totalProgress = 0;
    let completedTasks = 0;

    Object.keys(tasks).forEach(taskKey => {
      const task = tasks[taskKey];
      const current = dayData.tasks[taskKey];
      const percentage = Math.min((current / task.target) * 100, 100);
      totalProgress += percentage;
      if (percentage >= 100) completedTasks++;
    });

    return {
      avgProgress: Math.round(totalProgress / Object.keys(tasks).length),
      completedTasks: completedTasks,
      totalTasks: Object.keys(tasks).length,
      mood: dayData.mood
    };
  };

  const getWeekStats = () => {
    let totalWeekProgress = 0;
    let totalCompletedTasks = 0;
    let daysWithMood = 0;

    daysOfWeek.forEach(day => {
      const stats = getDayStats(day);
      totalWeekProgress += stats.avgProgress;
      totalCompletedTasks += stats.completedTasks;
      if (stats.mood) daysWithMood++;
    });

    return {
      avgWeekProgress: Math.round(totalWeekProgress / 7),
      totalCompletedTasks,
      daysWithMood
    };
  };

  const resetDay = (day) => {
    if (window.confirm(`Reset all data for ${day}?`)) {
      setWeekData(prev => ({
        ...prev,
        [day]: {
          mood: null,
          tasks: {
            water: 0,
            steps: 0,
            workout: 0,
            sleep: 0,
            meals: 0,
            meditation: 0
          }
        }
      }));
    }
  };

  const resetWeek = () => {
    if (window.confirm('Reset all data for the entire week?')) {
      setWeekData(initializeWeekData());
    }
  };

  const currentDayStats = getDayStats(currentDay);
  const weekStats = getWeekStats();

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    } ${className}`}>
      <div className={`max-w-6xl mx-auto ${containerClassName}`}>
        <div className={`backdrop-blur-lg rounded-2xl p-8 mb-8 text-center ${
          isDarkMode 
            ? 'bg-gray-900/50 text-blue-100'
            : 'bg-white/50 text-blue-900 border border-gray-200'
        }`}>
          <h1 className="text-4xl font-bold mb-4">🏃‍♀ Weekly Fitness Tracker</h1>
          <p className="text-xl opacity-90">{getCurrentDate()}</p>
        </div>

        <DayNavigation 
          daysOfWeek={daysOfWeek}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          getDayStats={getDayStats}
        />

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <MoodSelector 
              day={currentDay}
              weekData={weekData}
              updateMood={updateMood}
              moods={moods}
            />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(tasks).map(([taskKey, task]) => (
                <TaskCard 
                  key={taskKey} 
                  day={currentDay} 
                  taskKey={taskKey} 
                  task={task}
                  weekData={weekData}
                  updateTaskValue={updateTaskValue}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => resetDay(currentDay)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:transform hover:-translate-y-1"
              >
                Reset {currentDay}
              </button>
              <button
                onClick={resetWeek}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:transform hover:-translate-y-1"
              >
                Reset Entire Week
              </button>
            </div>
          </div>

          <StatsSidebar 
            currentDay={currentDay}
            currentDayStats={currentDayStats}
            weekStats={weekStats}
            daysOfWeek={daysOfWeek}
            getDayStats={getDayStats}
          />
        </div>
      </div>
    </div>
  );
};

export default FitnessDashboard;
