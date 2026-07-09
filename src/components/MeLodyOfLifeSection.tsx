import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';
import { saveMelodyOfLifeData, loadMelodyOfLifeData } from '@/lib/storage-utils';

type Step = 'exam' | 'why' | 'ambition' | 'result';

export function MeLodyOfLifeSection() {
  const [step, setStep] = useState<Step>('exam');
  const [examType, setExamType] = useState('');
  const [preprationWhy, setPreprationWhy] = useState('');
  const [trueAmbition, setTrueAmbition] = useState('');
  const [savedData, setSavedData] = useState<any>(null);

  useEffect(() => {
    const data = loadMelodyOfLifeData();
    if (data) {
      setSavedData(data);
    }
  }, []);

  const examOptions = [
    { value: 'NEET', label: 'NEET (Medical)' },
    { value: 'JEE', label: 'JEE (Engineering)' },
    { value: 'UPSC', label: 'UPSC (Civil Services)' },
    { value: 'CAT', label: 'CAT (Management)' },
    { value: 'GATE', label: 'GATE (Engineering)' },
    { value: 'Other', label: 'Other Competitive Exam' },
    { value: 'None', label: 'Not preparing for competitive exams' },
  ];

  const handleNext = () => {
    if (step === 'exam' && examType) {
      setStep('why');
    } else if (step === 'why' && preprationWhy) {
      setStep('ambition');
    } else if (step === 'ambition' && trueAmbition) {
      saveMelodyOfLifeData({ examType, preprationWhy, trueAmbition });
      setSavedData({ examType, preprationWhy, trueAmbition });
      setStep('result');
    }
  };

  const handleReset = () => {
    setStep('exam');
    setExamType('');
    setPreprationWhy('');
    setTrueAmbition('');
  };

  if (savedData && step === 'result') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 md:p-12">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-6"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Path is Your Own
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 leading-relaxed mb-8 italic"
          >
            "We hope you win in what you want to succeed. It is a privilege to do what you like,
            even if it feels like you're against the world. Your path is yours to create."
          </motion.p>

          {examType !== 'None' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 p-6 bg-white rounded-lg border border-purple-100"
            >
              <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Your Preparation</p>
              <p className="text-lg font-semibold text-gray-800 mb-4">{examType}</p>
              <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Your Why</p>
              <p className="text-lg text-gray-700 italic">"{preprationWhy}"</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-6 bg-white rounded-lg border border-indigo-100"
          >
            <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Your True Ambition</p>
            <p className="text-lg text-gray-700 leading-relaxed">"{trueAmbition}"</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 text-center"
          >
            <p className="text-gray-700">
              This moment of clarity is a gift. Hold it close. When the path feels hard, remember
              why you started.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Edit Your Journey
              </Button>
              <Button
                onClick={() => setStep('result')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Keep Going
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-2 border-purple-200 p-8 md:p-12 bg-gradient-to-br from-white to-purple-50">
        <AnimatePresence mode="wait">
          {step === 'exam' && (
            <motion.div
              key="exam"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Are you preparing for any competitive exams?
                </h2>
                <p className="text-gray-600">
                  This helps us understand your journey better and offer more relevant support.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {examOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setExamType(option.value)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 text-left transition-all font-medium ${
                      examType === option.value
                        ? 'border-purple-500 bg-purple-100 text-purple-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          examType === option.value
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {examType === option.value && (
                          <span className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </span>
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'why' && (
            <motion.div
              key="why"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  What is the deeper "why" behind your preparation?
                </h2>
                <p className="text-gray-600">
                  Share what truly motivates you (limit to ~30 words).
                </p>
              </div>

              <Textarea
                placeholder="What drives your ambition? What do you hope to achieve?"
                value={preprationWhy}
                onChange={(e) => setPreprationWhy(e.target.value.slice(0, 150))}
                className="h-24 mb-4 resize-none"
              />
              <p className="text-xs text-gray-500 mb-6">
                {preprationWhy.length}/150 characters
              </p>
            </motion.div>
          )}

          {step === 'ambition' && (
            <motion.div
              key="ambition"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  What is your true ambition or passion?
                </h2>
                <p className="text-gray-600">
                  If you don't have one right now, paint a joyful picture of your dream working
                  space or life (limit to ~100 words).
                </p>
              </div>

              <Textarea
                placeholder="Paint your dream. What does your ideal future look like?"
                value={trueAmbition}
                onChange={(e) => setTrueAmbition(e.target.value.slice(0, 500))}
                className="h-32 mb-4 resize-none"
              />
              <p className="text-xs text-gray-500 mb-6">
                {trueAmbition.length}/500 characters
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 justify-between pt-6 border-t border-gray-200">
          {step !== 'exam' && (
            <Button
              onClick={() => {
                if (step === 'why') setStep('exam');
                if (step === 'ambition') setStep('why');
              }}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          <div className="flex-1" />
          <Button
            onClick={handleNext}
            disabled={
              (step === 'exam' && !examType) ||
              (step === 'why' && !preprationWhy) ||
              (step === 'ambition' && !trueAmbition)
            }
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-2 disabled:opacity-50"
          >
            {step === 'ambition' ? 'Save My Journey' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
