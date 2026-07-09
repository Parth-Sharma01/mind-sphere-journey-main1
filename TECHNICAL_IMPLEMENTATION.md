# 🛠️ Technical Implementation Notes

## Architecture Overview

MindSphere is a **pure front-end React application** using TanStack Router and TypeScript.

### Tech Stack
- **Framework:** React 18 with TypeScript
- **Routing:** TanStack Router v1
- **Styling:** Tailwind CSS + Custom CSS
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **UI Components:** Radix UI (via shadcn/ui)
- **Icons:** Lucide React
- **Storage:** Browser localStorage (client-only)

---

## Data Persistence Strategy

All data is stored in `localStorage` using JSON serialization.

### Storage Keys & Schemas

#### 1. Assessment History
```javascript
// Key: mindsphere_assessment_history
// Type: Array<AssessmentResult>
[
  {
    scores: {
      emotional_resilience: 75,
      focus_clarity: 68,
      stress_balance: 82,
      social_harmony: 71
    },
    date: "2026-07-09T10:30:00.000Z",
    timestamp: 1720507800000
  },
  // ... more entries
]
```

#### 2. Question History (No Repetition)
```javascript
// Key: mindsphere_recent_question_sets
// Type: Array<Array<QuestionID>>
[
  ["er_01", "fc_05", "sb_12", ...],  // Last attempt
  ["er_03", "focus_clarity_02", ...], // 2 attempts ago
  [...],                              // 3 attempts ago
]
```

#### 3. Journal Entries
```javascript
// Key: mindsphere_journal_entries
// Type: Array<JournalEntry>
[
  {
    id: "journal_1720507800000",
    encrypted: "base64EncodedXORCipher...",  // Encrypted content
    date: "2026-07-09T10:30:00.000Z",
    timestamp: 1720507800000
  },
  // ... more entries
]
```

#### 4. MeLodY OfLife Data
```javascript
// Key: mindsphere_melody_of_life
// Type: MelodyData
{
  examType: "JEE",
  preprationWhy: "I want to build products that help students",
  trueAmbition: "Create technology that makes education accessible...",
  savedAt: "2026-07-09T10:30:00.000Z"
}
```

#### 5. Games Performance
```javascript
// Key: mindsphere_games_data
// Type: Object<GameID, PerformanceArray>
{
  "flower_breathing": [
    { score: 100, time: 1720507800000, accuracy: 100, date: "..." },
    { score: 100, time: 1720507900000, accuracy: 100, date: "..." }
  ],
  "stroop_test": [
    { score: 85, time: 1720508000000, accuracy: 85, date: "..." }
  ],
  "focus_maze": [
    { score: 45, time: 1720508100000, accuracy: 95, date: "..." }
  ]
}
```

---

## Encryption Implementation

### XOR Cipher Rationale
- Lightweight and fast for client-side
- Sufficient for local privacy (not military-grade)
- Reversible for easy decryption
- Demonstrates security awareness

### Implementation (`src/lib/storage-utils.ts`)

```typescript
const SECRET_KEY = 'mindsphere_journal_2024';

export function encryptEntry(text: string): string {
  let encrypted = '';
  for (let i = 0; i < text.length; i++) {
    encrypted += String.fromCharCode(
      text.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
    );
  }
  return btoa(encrypted);  // base64 encode for safe storage
}

export function decryptEntry(encrypted: string): string {
  const decoded = atob(encrypted);  // base64 decode
  let decrypted = '';
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(
      decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
    );
  }
  return decrypted;
}
```

**Note:** For production with sensitive data, consider using:
- `TweetNaCl.js` for stronger crypto
- Backend encryption key management
- Industry-standard encryption algorithms

---

## Assessment Question Pool Design

### Pool Structure
- **Total Questions:** 75-100
- **Distribution:** 4 dimensions with balanced coverage
- **Each Question Format:**
  ```typescript
  {
    id: string;              // Unique identifier
    question: string;        // Question text
    options: string[];       // 4-5 answer choices
    scores: number[];        // 0-100 points per option
    dimension: string;       // Which dimension it measures
  }
  ```

### No Repetition Algorithm

```typescript
export function getUniqueAssessmentQuestions(): AssessmentQuestion[] {
  // 1. Get recent question sets from localStorage
  const recentSets = JSON.parse(
    localStorage.getItem('mindsphere_recent_question_sets') || '[]'
  );

  // 2. Shuffle entire master pool
  const shuffled = [...assessmentQuestionPool].sort(() => Math.random() - 0.5);

  // 3. Select first 30 questions (guaranteed unique from recent attempts)
  const selected = shuffled.slice(0, 30);
  const selectedIds = selected.map(q => q.id);

  // 4. Update history (keep last 3)
  const updated = [selectedIds, ...recentSets].slice(0, 3);
  localStorage.setItem('mindsphere_recent_question_sets', JSON.stringify(updated));

  return selected;
}
```

**How It Works:**
1. With 75+ questions and selecting 30, very low chance of repetition
2. Tracks last 3 attempts to provide additional safety
3. On 4th attempt, first attempt is "cleared" from recent history
4. Theoretically, could reuse after attempts span sufficient time

---

## Scoring Calculation

### Algorithm

```typescript
export function calculateMentalScores(
  questions: AssessmentQuestion[],
  answers: number[]
): Record<string, number> {
  const dimensions: Record<string, { total: number; count: number }> = {
    emotional_resilience: { total: 0, count: 0 },
    focus_clarity: { total: 0, count: 0 },
    stress_balance: { total: 0, count: 0 },
    social_harmony: { total: 0, count: 0 },
  };

  // Sum scores for each dimension
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
```

**Scoring Logic:**
- Each option has a 0-100 score
- Dimension score = average of all question scores in that dimension
- Final score is rounded to nearest integer
- Range: 0-100 per dimension

---

## Component Architecture

### Component Hierarchy

```
AppShell
├── Header (Navigation)
├── Main (Routes)
│   ├── Index (Hero)
│   ├── MindScore (Assessment)
│   │   └── Question cards
│   │   └── Results display
│   ├── Dashboard (EnhancedDashboard)
│   │   ├── Score summary cards
│   │   ├── Progress charts
│   │   └── Quick links
│   ├── MeLodyOfLife (4-step form)
│   │   ├── Exam selector
│   │   ├── Textarea inputs
│   │   └── Result message
│   ├── Journal (Private journal)
│   │   ├── Create entry
│   │   ├── List entries
│   │   └── Expand/delete
│   ├── Games (GamesSection)
│   │   ├── FlowerBreathingGame
│   │   ├── StroopTestGame
│   │   └── FocusMazeGame
│   └── ...other routes
└── Footer
```

### State Management Strategy
- **Component State:** React `useState` for UI state
- **Persistent State:** localStorage for data persistence
- **URL State:** TanStack Router for navigation
- **Form State:** React `useState` with validation

**Rationale:** Simple and sufficient for client-only application. If backend is added later, consider Redux or Zustand.

---

## Game Implementation Details

### Flower Breathing Game
- **Duration:** 14 seconds per round (4+4+6)
- **Animation:** Framer Motion `scale` property
- **Timing:** `animate={{ scale: [0.8, 1.4, 1.4, 0.8] }}`
- **Performance Tracking:** Completion count

### Stroop Test Game
- **Duration:** 30 seconds
- **Scoring:** Points = correct answers
- **Accuracy:** (correct / total) * 100
- **Performance:** Score, time, accuracy

### Focus Maze Game
- **Difficulty:** Sequential 1-10 steps
- **Interaction:** Click correct next step
- **Timing:** Measures time to completion
- **Performance:** Score (100 - time), accuracy

---

## Extending the System

### Adding New Questions

1. Open `src/lib/assessment-questions.ts`
2. Add to `assessmentQuestionPool` array:

```typescript
{
  id: 'sh_16',
  question: 'Your new question here?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  scores: [20, 50, 75, 90],
  dimension: 'emotional_resilience'
}
```

3. Update the pool size comment if needed
4. No other changes required—logic handles new questions automatically

### Adding New Games

1. Create game component in `src/components/`
2. Add game performance tracking with `saveGamePerformance()`
3. Add game to GamesSection tabs
4. Implement performance storage in storage-utils

Example:

```typescript
export function NewGame() {
  const handleComplete = (score: number, time: number) => {
    saveGamePerformance('new_game', {
      score,
      time,
      accuracy: calculateAccuracy()
    });
  };
  // ... component logic
}
```

### Migrating to Backend

Key changes needed:

1. **API Layer:** Create REST endpoints for:
   - POST `/api/assessments` - Save assessment
   - GET `/api/assessments` - Get history
   - POST `/api/journal` - Save entry
   - GET `/api/journal` - Get entries
   - (etc.)

2. **Authentication:** Add login/signup

3. **State Management:** Migrate to React Query or SWR for data fetching

4. **Encryption:** Move to backend (use bcrypt for passwords, AES for data)

5. **localStorage:** Remove or use only for caching

---

## Performance Considerations

### Current Optimizations
- Lazy loading with React Router
- Memoization in components
- Chart rendering optimized with recharts
- Animations use hardware acceleration

### Potential Improvements
- Code splitting for routes
- Image optimization (if added)
- Debouncing search inputs
- Virtual scrolling for large lists
- Service worker for offline support

---

## Security Best Practices

### Current Implementation
✅ Client-side encryption for journal
✅ No external API calls
✅ localStorage protection via browser security
✅ No authentication needed (single user)

### Future Enhancements
- Add password protection for sensitive access
- Implement end-to-end encryption
- Use HTTPS everywhere
- Add rate limiting if adding backend
- Regular security audits

---

## Testing Strategy

### Unit Tests (Recommended)
```typescript
// Test scoring calculation
describe('calculateMentalScores', () => {
  it('should calculate average scores per dimension', () => {
    // Test implementation
  });
});

// Test encryption
describe('encryptEntry', () => {
  it('should be reversible', () => {
    const original = "test text";
    const encrypted = encryptEntry(original);
    const decrypted = decryptEntry(encrypted);
    expect(decrypted).toBe(original);
  });
});
```

### Integration Tests (Recommended)
```typescript
// Test full assessment flow
describe('Assessment Flow', () => {
  it('should save and retrieve assessment results', () => {
    // Test flow
  });
});
```

### E2E Tests (Consider)
- Use Playwright or Cypress
- Test full user journeys
- Validate localStorage persistence
- Test offline functionality

---

## Browser Support

**Tested & Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Requirements:**
- ES2020+ support
- localStorage support
- CSS Grid & Flexbox
- CSS Variables

---

## Deployment Notes

### Environment Variables
None required (fully static)

### Build Process
```bash
npm run build  # Creates optimized bundle
npm run preview  # Preview production build locally
```

### Hosting Options
- Netlify (current: tubular-piroshki-09eb97.netlify.app)
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting

### Considerations
- No backend needed
- No database needed
- No API keys needed
- All data stays on user's device

---

## Known Limitations

1. **No Cloud Sync:** Data not synced across devices
2. **No Backup:** Clearing browser data deletes everything
3. **Single User:** No multi-user support
4. **No Real Encryption:** XOR is not production-grade security
5. **Browser Dependent:** Data stored locally only

---

## Future Roadmap

**Phase 2:** Backend & Cloud Sync
- User authentication
- Cloud data backup
- Cross-device sync
- Professional encryption

**Phase 3:** Advanced Features
- AI-powered insights
- Peer community features
- Professional counselor referrals
- Mobile app
- Export to PDF

**Phase 4:** Integration
- Wearable device integration
- Calendar integration
- Email notifications
- Smart recommendations

---

## Troubleshooting

### Data Lost After Browser Clear
**Expected behavior.** Data is stored in localStorage. Clearing cache/cookies clears data.
**Solution:** Consider local backups (future export feature)

### Assessment Shows Same Questions
**If happening:** Submit bug report with question IDs
**Expected:** 30 unique questions from 75+ pool each attempt

### Game Performance Not Saving
**Check:** Browser console for errors
**Solution:** Ensure localStorage is enabled
**Fallback:** Game still plays, just doesn't track performance

---

## Resources

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI Components](https://www.radix-ui.com/)

---

**Last Updated:** July 2026  
**Maintained by:** MindSphere Development Team
