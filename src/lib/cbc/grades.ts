export type CBCPerformanceLevel = "EXCEEDS_EXPECTATION" | "MEETS_EXPECTATION" | "APPROACHES_EXPECTATION" | "BELOW_EXPECTATION";

export interface CBCAssessmentResult {
  subStrand: string;
  score: number;
  performanceLevel: CBCPerformanceLevel;
}

export interface CBCLearningAreaReport {
  learningArea: string;
  strands: Array<{
    name: string;
    score: number;
    performance: string;
  }>;
  overallPerformance: string;
}

export interface CBCStudentReport {
  name: string;
  class: string;
  term: string;
  learningAreas: CBCLearningAreaReport[];
  competencies: Array<{
    name: string;
    rating: string;
  }>;
  comments: string;
}

function scoreToPerformanceLevel(score: number): CBCPerformanceLevel {
  if (score >= 80) return "EXCEEDS_EXPECTATION";
  if (score >= 60) return "MEETS_EXPECTATION";
  if (score >= 40) return "APPROACHES_EXPECTATION";
  return "BELOW_EXPECTATION";
}

function performanceToLabel(level: CBCPerformanceLevel): string {
  const labels: Record<CBCPerformanceLevel, string> = {
    EXCEEDS_EXPECTATION: "Exceeds Expectation",
    MEETS_EXPECTATION: "Meets Expectation",
    APPROACHES_EXPECTATION: "Approaches Expectation",
    BELOW_EXPECTATION: "Below Expectation",
  };
  return labels[level];
}

const COMPETENCIES = [
  "Communication and Collaboration",
  "Critical Thinking and Problem Solving",
  "Creativity and Imagination",
  "Citizenship",
  "Learning to Learn",
  "Self-efficacy",
  "Digital Literacy",
];

export function computeCBCReport(
  assessments: CBCAssessmentResult[],
  learningAreas: string[]
): CBCStudentReport["learningAreas"] {
  return learningAreas.map((area) => {
    const areaAssessments = assessments.filter((a) => a.subStrand.startsWith(area));
    const avgScore = areaAssessments.length > 0
      ? areaAssessments.reduce((s, a) => s + a.score, 0) / areaAssessments.length
      : 0;

    return {
      learningArea: area,
      strands: areaAssessments.map((a) => ({
        name: a.subStrand,
        score: a.score,
        performance: performanceToLabel(scoreToPerformanceLevel(a.score)),
      })),
      overallPerformance: performanceToLabel(scoreToPerformanceLevel(avgScore)),
    };
  });
}

export { scoreToPerformanceLevel, performanceToLabel, COMPETENCIES };
