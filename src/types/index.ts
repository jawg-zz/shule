export type DashboardStats = {
  totalStudents: number;
  totalStaff: number;
  totalClasses: number;
  totalFeesCollected: number;
  pendingFees: number;
  attendanceRate: number;
  passRate: number;
};

export type NavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: number;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type FeeSummary = {
  totalBilled: number;
  totalPaid: number;
  totalBalance: number;
  paymentRate: number;
};

export type KCSEAnalysis = {
  subject: string;
  meanScore: number;
  meanGrade: string;
  totalCandidates: number;
  gradeDistribution: Record<string, number>;
};

export type CBCReport = {
  studentName: string;
  class: string;
  term: string;
  learningAreas: {
    name: string;
    strands: {
      name: string;
      performance: string;
      score: number;
    }[];
    overall: string;
  }[];
  competencies: {
    name: string;
    rating: string;
  }[];
  comments: string;
};
