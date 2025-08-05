import React from 'react';
import { Star, Phone, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const GymTrainerPage = () => {
  const { isDarkMode } = useTheme();
  
  const trainers = [
    {
      id: 1,
      name: "Om Soni",
      specialty: "Strength Training & Bodybuilding",
      rating: 4.8,
      reviews: 127,
      description: "Certified personal trainer with 8+ years of experience. Specializes in strength training, muscle building, and competition prep.",
      phone: "+917867564534",
      email: "OmSoni@flexfitness.com",
      location: "Floor 1, Zone A",
      image: "https://img.freepik.com/premium-photo/muscular-beard-man-fitness-trainer-smiling-front-background-gym-healthy-lifestyle-sport_100800-26095.jpg?w=2000",
    },
    {
      id: 2,
      name: "Joginder Singh",
      specialty: "Yoga & Flexibility",
      rating: 4.9,
      reviews: 89,
      description: "Yoga instructor and flexibility coach. Helps clients improve mobility, reduce stress, and achieve mind-body balance.",
      phone: "+917867564534",
      email: "JoginderSingh@flexfitness.com",
      location: "Floor 1, Zone B",
      image: "https://img.freepik.com/premium-photo/man-portrait-confident-gym-training-bodybuilding-personal-workout-health-muscle-strength-male-person-arms-crossed-proud-active-living-fitness-cardio-exercise_590464-418327.jpg",
    },
    {
      id: 3,
      name: "Pawan Sahu",
      specialty: "HIIT & Cardio",
      rating: 4.7,
      reviews: 156,
      description: "High-intensity interval training specialist. Perfect for weight loss, cardiovascular health, and athletic performance.",
      phone: "+917867564534",
      email: "PawanSahu@flexfitness.com",
      location: "Floor 2, Cardio Zone",
      image: "https://thumbs.dreamstime.com/b/indian-young-body-builder-man-fitness-trainer-man-fit-muscular-body-indian-young-body-builder-man-fitness-trainer-167796265.jpg",
    },
    {
      id: 4,
      name: "Neeraj Goyat",
      specialty: "Functional Training",
      rating: 4.8,
      reviews: 94,
      description: "Functional movement specialist focusing on everyday strength, injury prevention, and rehabilitation exercises.",
      phone: "+917867564534",
      email: "NeerajGoyat@flexfitness.com",
      location: "Floor 1, Zone B",
      image: "https://img.freepik.com/premium-photo/indian-man-personal-trainer-gym-ready-coach-fitness-workout-concept-fitness-training-gym-workouts-personal-trainer-healthy-lifestyle-wellness-coaching_864588-121922.jpg",
    },
    {
      id: 5,
      name: "Neeraj Pepsu",
      specialty: "CrossFit & Athletic Training",
      rating: 4.6,
      reviews: 112,
      description: "CrossFit Level 2 trainer with background in athletic performance. Specializes in Olympic lifting and competitive fitness.",
      phone: "+917867564534",
      email: "NeerajPepsu@flexfitness.com",
      location: "Floor 2, Zone 1",
      image: "https://img.freepik.com/premium-photo/smiling-young-indian-man-wearing-sportswear-posing-gym_512242-7506.jpg",
    },
    {
      id: 6,
      name: "Matt Roberts",
      specialty: "Pilates & Core Strength",
      rating: 4.9,
      reviews: 78,
      description: "Certified Pilates instructor specializing in core strengthening, posture correction, and low-impact fitness routines.",
      phone: "+917867564534",
      email: "MattRoberts@flexfitness.com",
      location: "Floor 2, Zone 2",
      image: "https://img.freepik.com/free-photo/handsome-black-man-is-engaged-gym_1157-29625.jpg?semt=ais_hybrid&w=740",
    }
  ];

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? 'fill-blue-400 text-blue-400'
              : i < rating
              ? 'fill-blue-200 text-blue-200'
              : isDarkMode 
                ? 'text-gray-600'
                : 'text-gray-400'
          }`}
        />
      ))}
      <span className={`text-sm ml-1 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {rating} ({trainers.find(t => t.rating === rating)?.reviews} reviews)
      </span>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`py-8 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Personal Trainers</h1>
          <p className={isDarkMode ? 'text-blue-200' : 'text-blue-100'}>
            Meet our certified fitness professionals ready to help you achieve your goals
          </p>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div key={trainer.id} className={`rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-750'
                : 'bg-white hover:bg-gray-50'
            }`}>
              {/* Trainer Image */}
              <div className="h-48 bg-gray-700 rounded-t-lg overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Trainer Info */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {trainer.name}
                </h3>
                <p className="text-blue-400 font-medium mb-3">{trainer.specialty}</p>

                {/* Rating */}
                <div className="mb-4">
                  {renderStars(trainer.rating)}
                </div>

                {/* Description */}
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {trainer.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>{trainer.phone}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>{trainer.email}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>{trainer.location}</span>
                  </div>
                </div>

                {/* Book Session Button */}
                <button className={`w-full mt-4 py-2 px-4 rounded-lg transition-all duration-200 font-medium hover:transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-900 hover:to-blue-800 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}>
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`py-16 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900'
          : 'bg-gradient-to-r from-gray-100 to-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Start Your Fitness Journey?
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Book a session with one of our expert trainers and take the first step towards your fitness goals.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default GymTrainerPage;