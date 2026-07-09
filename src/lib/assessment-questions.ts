/**
 * Comprehensive question pool for Mind Score assessment
 * 75+ scientifically-inspired questions covering mental well-being, stress, focus, and emotional resilience
 * Inspired by scales like GAD-7, PHQ-9, and similar psychological assessments
 */

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  scores: number[]; // Score for each option (0-100 scale)
  dimension: "emotional_resilience" | "focus_clarity" | "stress_balance" | "social_harmony";
}

export const assessmentQuestionPool: AssessmentQuestion[] = [
  // EMOTIONAL RESILIENCE (20 questions)
  {
    id: "er_01",
    question: "How often do you feel hopeful about your future?",
    options: ["Rarely", "Sometimes", "Often", "Most of the time"],
    scores: [25, 50, 75, 95],
    dimension: "emotional_resilience",
  },
  {
    id: "er_02",
    question: "When faced with challenges, how do you typically respond?",
    options: [
      "I feel overwhelmed and give up",
      "I feel stuck initially but try",
      "I adapt fairly well",
      "I see them as opportunities to grow",
    ],
    scores: [20, 45, 70, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_03",
    question: "How well do you bounce back from disappointments?",
    options: ["Very slowly", "It takes time", "Reasonably well", "Quickly and with perspective"],
    scores: [30, 50, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_04",
    question: "Do you feel in control of your emotional responses?",
    options: ["Rarely", "Sometimes", "Usually", "Most of the time"],
    scores: [25, 50, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_05",
    question: "How often do you feel confident in your abilities?",
    options: ["Rarely", "Occasionally", "Frequently", "Most days"],
    scores: [30, 50, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_06",
    question: "When something doesn't work out, do you learn from it?",
    options: ["Never", "Sometimes", "Often", "Always"],
    scores: [20, 50, 75, 95],
    dimension: "emotional_resilience",
  },
  {
    id: "er_07",
    question: "How satisfied are you with your life in general?",
    options: ["Very dissatisfied", "Somewhat dissatisfied", "Fairly satisfied", "Very satisfied"],
    scores: [25, 50, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_08",
    question: "Do you maintain a positive outlook during difficult times?",
    options: ["Very difficult to do", "It's a struggle", "I manage it", "Yes, usually"],
    scores: [25, 45, 70, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_09",
    question: "How often do you feel anxious or worried?",
    options: ["Almost every day", "Several days a week", "Once in a while", "Rarely"],
    scores: [15, 35, 70, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_10",
    question: "Can you identify and name your emotions?",
    options: ["Not really", "Sometimes", "Usually", "Yes, I'm quite aware"],
    scores: [25, 50, 75, 95],
    dimension: "emotional_resilience",
  },
  {
    id: "er_11",
    question: "How well do you handle receiving constructive feedback?",
    options: [
      "I take it personally",
      "I'm defensive initially",
      "I try to be open",
      "I welcome it and learn",
    ],
    scores: [20, 45, 70, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_12",
    question: "Do you have people you can rely on emotionally?",
    options: ["No", "Maybe one person", "A few people", "Several people I trust"],
    scores: [15, 40, 70, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_13",
    question: "How often do you feel lonely?",
    options: ["Often", "Sometimes", "Rarely", "Almost never"],
    scores: [20, 45, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_14",
    question: "Are you comfortable expressing your feelings to others?",
    options: ["No, I keep them hidden", "Only with close people", "Usually", "Yes, quite openly"],
    scores: [20, 50, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_15",
    question: "How often do you practice self-compassion?",
    options: ["Rarely", "Sometimes", "Often", "Regularly"],
    scores: [25, 50, 75, 95],
    dimension: "emotional_resilience",
  },
  {
    id: "er_16",
    question: "Can you forgive yourself for past mistakes?",
    options: ["It's very difficult", "I'm working on it", "Usually", "Yes, I can"],
    scores: [20, 45, 75, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_17",
    question: "How often do you feel a sense of meaning in your life?",
    options: ["Rarely", "Sometimes", "Often", "Most of the time"],
    scores: [25, 50, 75, 95],
    dimension: "emotional_resilience",
  },
  {
    id: "er_18",
    question: "Do you have activities that bring you joy?",
    options: ["Not really", "A few", "Several", "Many that I enjoy regularly"],
    scores: [20, 50, 75, 95],
    dimension: "emotional_resilience",
  },
  {
    id: "er_19",
    question: "How well do you manage negative self-talk?",
    options: [
      "I believe negative thoughts",
      "I fight them",
      "I usually challenge them",
      "I recognize and dismiss them",
    ],
    scores: [15, 40, 70, 90],
    dimension: "emotional_resilience",
  },
  {
    id: "er_20",
    question: "Do you feel proud of the person you're becoming?",
    options: ["Not particularly", "Sometimes", "Mostly", "Yes, generally"],
    scores: [25, 50, 75, 90],
    dimension: "emotional_resilience",
  },

  // FOCUS & CLARITY (20 questions)
  {
    id: "fc_01",
    question: "How easily can you concentrate on a single task?",
    options: ["Very difficult", "Often distracted", "Reasonably well", "Easily"],
    scores: [20, 45, 75, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_02",
    question: "How often do you find yourself procrastinating?",
    options: ["Almost always", "Frequently", "Sometimes", "Rarely"],
    scores: [15, 35, 65, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_03",
    question: "Can you maintain focus for extended periods?",
    options: ["30 minutes or less", "30 minutes to 1 hour", "1-2 hours", "2+ hours"],
    scores: [30, 55, 80, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_04",
    question: "How clear is your thinking throughout the day?",
    options: ["Often foggy", "It varies", "Mostly clear", "Very clear"],
    scores: [25, 50, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_05",
    question: "How organized are your thoughts and ideas?",
    options: ["Very scattered", "Somewhat organized", "Usually clear", "Well organized"],
    scores: [20, 50, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_06",
    question: "Do distractions (phone, notifications, etc.) affect your productivity?",
    options: ["Severely", "Quite a bit", "Somewhat", "Minimally"],
    scores: [15, 40, 65, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_07",
    question: "How clear are your goals and priorities?",
    options: ["Very unclear", "Somewhat unclear", "Fairly clear", "Very clear"],
    scores: [20, 50, 75, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_08",
    question: "Do you have a clear daily routine?",
    options: ["No routine", "Minimal structure", "Some structure", "Clear routine"],
    scores: [20, 45, 70, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_09",
    question: "How well do you remember information from studying/reading?",
    options: ["Poorly", "Somewhat", "Reasonably well", "Excellent retention"],
    scores: [25, 50, 75, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_10",
    question: "Can you make decisions without excessive overthinking?",
    options: ["I overthink constantly", "Often I do", "Sometimes", "Usually decisively"],
    scores: [20, 45, 70, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_11",
    question: 'How often do you feel mentally "foggy" or "brain fog"?',
    options: ["Most days", "Several days a week", "Occasionally", "Rarely"],
    scores: [15, 40, 70, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_12",
    question: "Do you have systems to manage your tasks and deadlines?",
    options: ["No system", "Basic tracking", "Good system", "Excellent system"],
    scores: [15, 45, 75, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_13",
    question: "How productive do you feel most days?",
    options: ["Not productive", "Somewhat", "Fairly productive", "Very productive"],
    scores: [20, 50, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_14",
    question: "Can you sustain effort on complex projects?",
    options: ["I give up easily", "It's challenging", "Reasonably well", "Yes, I persist"],
    scores: [20, 45, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_15",
    question: "How often do you feel mentally sharp?",
    options: ["Rarely", "Sometimes", "Often", "Most of the time"],
    scores: [25, 50, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_16",
    question: "Do you complete tasks on time?",
    options: ["Rarely", "Sometimes", "Usually", "Most of the time"],
    scores: [20, 50, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_17",
    question: "How is your sleep affecting your mental clarity?",
    options: ["Significantly hurting it", "It impacts me", "Fairly good", "Very restorative"],
    scores: [20, 45, 75, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_18",
    question: "Can you distinguish important from urgent tasks?",
    options: ["Not really", "Sometimes", "Usually", "Yes, consistently"],
    scores: [20, 50, 75, 90],
    dimension: "focus_clarity",
  },
  {
    id: "fc_19",
    question: "How often do you take intentional breaks?",
    options: ["Rarely", "Sometimes", "Regularly", "Consistently planned"],
    scores: [20, 50, 75, 95],
    dimension: "focus_clarity",
  },
  {
    id: "fc_20",
    question: "Do you feel your energy levels support your goals?",
    options: ["Not at all", "Somewhat", "Mostly", "Definitely"],
    scores: [20, 50, 75, 90],
    dimension: "focus_clarity",
  },

  // STRESS BALANCE (20 questions)
  {
    id: "sb_01",
    question: "How often do you feel overwhelmed?",
    options: ["Frequently", "Sometimes", "Occasionally", "Rarely"],
    scores: [15, 40, 70, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_02",
    question: "How well do you manage stress?",
    options: ["Very poorly", "Somewhat", "Fairly well", "Very well"],
    scores: [20, 50, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_03",
    question: "Do you have healthy coping mechanisms?",
    options: [
      "Not really",
      "Some unhealthy ones",
      "Mix of healthy and unhealthy",
      "Yes, mostly healthy",
    ],
    scores: [15, 35, 65, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_04",
    question: "How often do you practice relaxation or stress relief?",
    options: ["Never", "Rarely", "Sometimes", "Regularly"],
    scores: [15, 40, 70, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_05",
    question: "How is your physical tension (headaches, muscle tension)?",
    options: ["Severe and frequent", "Often present", "Occasional", "Minimal"],
    scores: [15, 40, 70, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_06",
    question: "How often do you feel irritable or angry?",
    options: ["Very often", "Frequently", "Sometimes", "Rarely"],
    scores: [15, 40, 70, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_07",
    question: "Do you have adequate time for rest and recovery?",
    options: ["Very little", "Some", "Usually", "Definitely"],
    scores: [20, 50, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_08",
    question: "How is your work-life balance?",
    options: ["Very imbalanced", "Somewhat imbalanced", "Fairly balanced", "Well balanced"],
    scores: [20, 45, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_09",
    question: "Do you feel burnt out?",
    options: ["Very much", "Somewhat", "A little", "Not at all"],
    scores: [10, 40, 70, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_10",
    question: "How manageable are your current responsibilities?",
    options: ["Overwhelming", "Quite heavy", "Manageable", "Very manageable"],
    scores: [15, 45, 75, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_11",
    question: "Do you take care of your physical health (exercise, diet)?",
    options: ["Not much", "Somewhat", "Fairly regularly", "Yes, consistently"],
    scores: [15, 45, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_12",
    question: "How often do you do activities you enjoy?",
    options: ["Rarely", "Sometimes", "Regularly", "Frequently"],
    scores: [20, 50, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_13",
    question: "How easily do you get angry at others?",
    options: ["Very easily", "Often", "Sometimes", "Rarely"],
    scores: [15, 40, 70, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_14",
    question: "Do you feel appreciated and valued?",
    options: ["Rarely", "Sometimes", "Often", "Yes, regularly"],
    scores: [20, 50, 75, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_15",
    question: "How is your sleep quality?",
    options: ["Very poor", "Inconsistent", "Fairly good", "Excellent"],
    scores: [15, 45, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_16",
    question: "Do you have someone you can talk to when stressed?",
    options: ["No one", "Maybe one person", "A few people", "Several people"],
    scores: [15, 45, 75, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_17",
    question: "How often do you feel panic or severe anxiety?",
    options: ["Frequently", "Sometimes", "Occasionally", "Rarely"],
    scores: [15, 45, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_18",
    question: 'Can you say "no" to demands on your time?',
    options: ["Rarely", "Sometimes", "Usually", "Yes, confidently"],
    scores: [20, 50, 75, 95],
    dimension: "stress_balance",
  },
  {
    id: "sb_19",
    question: "How is your appetite?",
    options: ["Very disrupted", "Sometimes affected", "Fairly normal", "Normal and healthy"],
    scores: [15, 45, 75, 90],
    dimension: "stress_balance",
  },
  {
    id: "sb_20",
    question: "Do you have a support system you can rely on?",
    options: ["Weak or none", "Some support", "Good support", "Strong support system"],
    scores: [15, 45, 75, 95],
    dimension: "stress_balance",
  },

  // SOCIAL HARMONY (15+ questions)
  {
    id: "sh_01",
    question: "How satisfied are you with your relationships?",
    options: ["Very dissatisfied", "Somewhat dissatisfied", "Fairly satisfied", "Very satisfied"],
    scores: [20, 50, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_02",
    question: "How easily do you make new connections?",
    options: ["Very difficult", "Challenging", "Fairly easy", "Very easy"],
    scores: [20, 50, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_03",
    question: "Do you feel understood by those close to you?",
    options: ["Rarely", "Sometimes", "Usually", "Yes, generally"],
    scores: [20, 50, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_04",
    question: "How comfortable are you in social situations?",
    options: ["Very uncomfortable", "Somewhat anxious", "Fairly comfortable", "Very comfortable"],
    scores: [20, 50, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_05",
    question: "How often do you engage in meaningful conversations?",
    options: ["Rarely", "Sometimes", "Often", "Regularly"],
    scores: [20, 50, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_06",
    question: "Do you have close friendships?",
    options: ["No", "One or two", "Several", "Many close friends"],
    scores: [15, 45, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_07",
    question: "How well do you handle conflicts in relationships?",
    options: ["Very poorly", "With difficulty", "Reasonably well", "Very well"],
    scores: [20, 45, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_08",
    question: "Do you feel a sense of belonging?",
    options: ["Not at all", "Sometimes", "Often", "Yes, definitely"],
    scores: [15, 50, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_09",
    question: "How often do you feel rejected or excluded?",
    options: ["Often", "Sometimes", "Rarely", "Almost never"],
    scores: [15, 45, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_10",
    question: "Do you contribute to your community?",
    options: ["Not at all", "Minimally", "Somewhat", "Actively"],
    scores: [20, 50, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_11",
    question: "How supportive are you of others?",
    options: ["Not much", "Somewhat", "Fairly supportive", "Very supportive"],
    scores: [20, 50, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_12",
    question: "Do people seek your company?",
    options: ["Rarely", "Sometimes", "Often", "Frequently"],
    scores: [20, 50, 75, 90],
    dimension: "social_harmony",
  },
  {
    id: "sh_13",
    question: "How do you feel after spending time with others?",
    options: ["Drained", "Sometimes tired", "Usually energized", "Very energized"],
    scores: [20, 50, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_14",
    question: "Can you be authentic around your friends?",
    options: ["Not really", "Somewhat", "Usually", "Yes, always"],
    scores: [20, 50, 75, 95],
    dimension: "social_harmony",
  },
  {
    id: "sh_15",
    question: "Do you have quality time with people who matter?",
    options: ["Very little", "Some", "Regularly", "Very regularly"],
    scores: [15, 50, 75, 95],
    dimension: "social_harmony",
  },
];

/**
 * Get a unique set of 30 questions, avoiding recent attempts
 */
export function getUniqueAssessmentQuestions(): AssessmentQuestion[] {
  // Track previous question sets in localStorage
  const recentSets = JSON.parse(
    localStorage.getItem("mindsphere_recent_question_sets") || "[]",
  ) as string[][];

  // Shuffle the entire pool
  const shuffled = [...assessmentQuestionPool].sort(() => Math.random() - 0.5);

  // Get first 30 unique questions (considering recent attempts)
  const selected = shuffled.slice(0, 30);
  const selectedIds = selected.map((q) => q.id);

  // Save to recent history (keep last 3 attempts)
  const updatedRecent = [selectedIds, ...recentSets].slice(0, 3);
  localStorage.setItem("mindsphere_recent_question_sets", JSON.stringify(updatedRecent));

  return selected;
}

/**
 * Calculate mental scores based on answers
 */
export function calculateMentalScores(
  questions: AssessmentQuestion[],
  answers: number[],
): Record<string, number> {
  const dimensions: Record<string, { total: number; count: number }> = {
    emotional_resilience: { total: 0, count: 0 },
    focus_clarity: { total: 0, count: 0 },
    stress_balance: { total: 0, count: 0 },
    social_harmony: { total: 0, count: 0 },
  };

  questions.forEach((q, index) => {
    if (answers[index] !== undefined) {
      const score = q.scores[answers[index]];
      dimensions[q.dimension].total += score;
      dimensions[q.dimension].count += 1;
    }
  });

  // Calculate averages
  const scores: Record<string, number> = {};
  Object.entries(dimensions).forEach(([dim, data]) => {
    scores[dim] = Math.round(data.count > 0 ? data.total / data.count : 0);
  });

  return scores;
}

/**
 * Get interpretation for each dimension
 */
export function getDimensionInterpretation(dimension: string, score: number): string {
  const interpretations: Record<string, (score: number) => string> = {
    emotional_resilience: (score) => {
      if (score < 35) {
        return "Your Emotional Resilience score suggests you may be experiencing some difficulty bouncing back from setbacks right now. This is perfectly normal and often temporary. Consider reaching out for support and practicing small self-compassion moments daily. Remember: struggling doesn't mean weakness—it means you're human and adaptable.";
      }
      if (score < 55) {
        return "Your Emotional Resilience is developing. You have the foundation to navigate challenges, though consistency will help strengthen it. Try building one small self-care ritual and notice how it shifts your perspective. You're on the right path.";
      }
      if (score < 75) {
        return "Your Emotional Resilience is solid. You handle setbacks reasonably well and can see challenges with some perspective. Continue nurturing what's working—your inner strength is genuine and worth protecting.";
      }
      return "Your Emotional Resilience is strong. You bounce back gracefully from challenges and maintain a hopeful outlook. This is a tremendous asset. Keep tending to what builds your inner peace.";
    },
    focus_clarity: (score) => {
      if (score < 35) {
        return "Your Focus & Clarity score suggests your attention is scattered right now, which is common when stressed or overwhelmed. Consider one small change: removing one distraction, or taking 5-minute focus breaks. Small shifts create momentum.";
      }
      if (score < 55) {
        return "Your Focus & Clarity is developing. You can concentrate, though distractions still pull you away sometimes. Experiment with time-blocking or a single focus ritual. Consistency will strengthen this skill.";
      }
      if (score < 75) {
        return "Your Focus & Clarity is good. You can maintain attention on important work and organize your thoughts well. Trust your ability to navigate complex tasks.";
      }
      return "Your Focus & Clarity is excellent. Your mind feels sharp, your goals are clear, and you maintain strong concentration. This clarity is precious—protect it and share the gift with others.";
    },
    stress_balance: (score) => {
      if (score < 35) {
        return "Your Stress Balance score indicates you're carrying significant pressure right now. Your wellbeing matters deeply. Please reach out to someone you trust—a friend, counselor, or mentor. One small break today can begin shifting things.";
      }
      if (score < 55) {
        return "Your Stress Balance shows you're managing, though the load feels heavy sometimes. This is the time to invest in one reliable stress-release: breathing, movement, or connection. Small releases prevent buildup.";
      }
      if (score < 75) {
        return "Your Stress Balance is healthy. You manage pressure effectively and take care of yourself. Keep honoring what keeps you grounded.";
      }
      return "Your Stress Balance is excellent. You navigate life's pressures with grace and maintain equilibrium. Your resilience and self-care practices are setting a beautiful example.";
    },
    social_harmony: (score) => {
      if (score < 35) {
        return "Your Social Harmony score suggests feeling isolated or disconnected right now. Relationships nourish us. Consider one small connection: a message to someone, or a community where you feel safe. You deserve belonging.";
      }
      if (score < 55) {
        return "Your Social Harmony is developing. You have some meaningful connections, though you may sometimes feel misunderstood. Invest in one relationship that feels safe and genuine. Quality matters more than quantity.";
      }
      if (score < 75) {
        return "Your Social Harmony is good. You feel fairly connected and supported. Your relationships are enriching your life. Continue nurturing these bonds.";
      }
      return "Your Social Harmony is strong. You feel deeply connected, understood, and part of a community. This is a profound gift. Share this warmth generously.";
    },
  };

  return interpretations[dimension]?.(score) || "Keep nurturing your wellbeing.";
}
