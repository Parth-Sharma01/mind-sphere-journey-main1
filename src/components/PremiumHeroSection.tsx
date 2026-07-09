import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Premium hero section with elegant gradient background and wave animation
 */
export function PremiumHeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background with premium colors */}
      <div className="absolute inset-0 z-0">
        {/* The main background is now transparent, letting the AppShell's aurora show through. */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Wave SVG animation - Light mode */}
        <svg
          className="absolute bottom-0 w-full h-auto opacity-40 dark:hidden"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#a78bfa", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#d0e2d5", stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            className="animate-wave"
          />
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"            
            fill="#d0e2d5" // Sage green for light theme
            opacity="0.15"            
            className="animate-wave-delayed"
          />
        </svg>

        {/* Wave SVG animation - Dark mode */}
        <svg
          className="absolute bottom-0 w-full h-auto opacity-40 hidden dark:block"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#a855f7", stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: "#1e293b", stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z"
            fill="url(#waveGradientDark)"
            className="animate-wave"
          />
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="#1e293b" // Slate-800 for dark theme
            opacity="0.15"
            className="animate-wave-delayed"
          />
        </svg>

        {/* Frosted glass effect overlay */}
        <div
          className="absolute inset-0 backdrop-blur-sm bg-gray-50/10 dark:bg-black/10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <p className="text-sm md:text-base font-medium text-purple-700/70 dark:text-purple-300/70 tracking-wide uppercase">
            Premium Mental Wellness Platform
          </p>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Know Yourself,{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Elevate Your Mind
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          A scientifically-grounded platform designed for students seeking mental clarity,
          resilience, and authentic personal growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/assessment"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 group dark:shadow-purple-900/50"
          >
            Begin Your Mind Score
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-white/70 backdrop-blur text-purple-700 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200 border border-purple-200/30 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/10"
          >
            Explore Dashboard
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-purple-200/30"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Designed for students seeking authentic growth
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-700 dark:text-gray-300">Privacy-first design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-700 dark:text-gray-300">Scientifically grounded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-700 dark:text-gray-300">All data stored locally</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes drift {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
        
        @keyframes drift-slow {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(-40px, 20px);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            d: path('M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z');
          }
          50% {
            d: path('M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z');
          }
        }
        
        @keyframes wave-delayed {
          0%, 100% {
            d: path('M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z');
          }
          50% {
            d: path('M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z');
          }
        }
        
        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }
        
        .animate-drift-slow {
          animation: drift-slow 12s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 6s ease-in-out infinite;
        }
        
        .animate-wave-delayed {
          animation: wave-delayed 6s ease-in-out infinite 2s;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
