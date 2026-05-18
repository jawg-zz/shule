export interface KCSEGradeResult {
  subject: string;
  code: string;
  score: number;
  grade: string;
  points: number;
}

export interface KCSEOverallResult {
  totalPoints: number;
  meanGrade: string;
  subjects: KCSEGradeResult[];
  bestSevenPoints: number;
}

const GRADE_POINTS: Record<string, number> = {
  A: 12, "A-": 11, "B+": 10, B: 9, "B-": 8,
  "C+": 7, C: 6, "C-": 5, "D+": 4, D: 3, "D-": 2, E: 1,
};

function scoreToGrade(score: number): { grade: string; points: number } {
  if (score >= 80) return { grade: "A", points: 12 };
  if (score >= 75) return { grade: "A-", points: 11 };
  if (score >= 70) return { grade: "B+", points: 10 };
  if (score >= 65) return { grade: "B", points: 9 };
  if (score >= 60) return { grade: "B-", points: 8 };
  if (score >= 55) return { grade: "C+", points: 7 };
  if (score >= 50) return { grade: "C", points: 6 };
  if (score >= 45) return { grade: "C-", points: 5 };
  if (score >= 40) return { grade: "D+", points: 4 };
  if (score >= 35) return { grade: "D", points: 3 };
  if (score >= 30) return { grade: "D-", points: 2 };
  return { grade: "E", points: 1 };
}

function gradeToMeanPoint(grade: string): number {
  return GRADE_POINTS[grade] || 0;
}

function calculateMeanGrade(totalPoints: number): string {
  if (totalPoints >= 80) return "A";
  if (totalPoints >= 75) return "A-";
  if (totalPoints >= 70) return "B+";
  if (totalPoints >= 65) return "B";
  if (totalPoints >= 60) return "B-";
  if (totalPoints >= 55) return "C+";
  if (totalPoints >= 50) return "C";
  if (totalPoints >= 45) return "C-";
  if (totalPoints >= 40) return "D+";
  if (totalPoints >= 35) return "D";
  if (totalPoints >= 30) return "D-";
  return "E";
}

export function computeKCSE(scores: Array<{ subject: string; code: string; score: number }>): KCSEOverallResult {
  const subjects: KCSEGradeResult[] = scores.map((s) => {
    const { grade, points } = scoreToGrade(s.score);
    return { ...s, grade, points };
  });

  const totalPoints = subjects.reduce((sum, s) => sum + s.points, 0);

  const sortedByPoints = [...subjects].sort((a, b) => b.points - a.points);
  const bestSeven = sortedByPoints.slice(0, 7);
  const bestSevenPoints = bestSeven.reduce((sum, s) => sum + s.points, 0);
  const meanGrade = calculateMeanGrade(bestSevenPoints);

  return { totalPoints, meanGrade, subjects, bestSevenPoints };
}

export function computeClassMean(results: KCSEOverallResult[]): { meanScore: number; meanGrade: string } {
  if (results.length === 0) return { meanScore: 0, meanGrade: "E" };
  const avg = results.reduce((sum, r) => sum + r.bestSevenPoints, 0) / results.length;
  return { meanScore: avg, meanGrade: calculateMeanGrade(Math.round(avg)) };
}
