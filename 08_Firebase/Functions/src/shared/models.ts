export interface PointTransaction {
  id: string;
  schoolId: string;
  studentId: string;
  points: number;
  reason: string;
  createdAt: any; // Firebase server timestamp
}

export interface Student {
  id: string;
  schoolId: string;
  houseId: string;
  totalPoints: number;
  rank: number;
}

export interface Activity {
  id?: string;
  schoolId: string;
  studentId: string;
  title: string;
  description: string;
  pointsAwarded: number;
  type: string;
  createdAt: any;
}
