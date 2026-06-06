import * as admin from 'firebase-admin';

function generateSearchPrefixes(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const prefixes = new Set<string>();
  
  for (const word of words) {
    let current = '';
    for (const char of word) {
      current += char;
      prefixes.add(current);
    }
  }
  return Array.from(prefixes);
}

export async function seedStudents(db: admin.firestore.Firestore) {
  const batch = db.batch();
  const schoolId = 'school_1';

  // Specific student tied to our student_1 persona
  const student1Ref = db.collection(`schools/${schoolId}/students`).doc('student_1');
  batch.set(student1Ref, {
    fullName: 'Bart Simpson',
    admissionNumber: 'ADM-001',
    grade: '4',
    section: 'A',
    houseId: 'house_gryffindor',
    totalPoints: 120,
    rank: 1,
    status: 'active',
    archiveState: 'active',
    schoolId: schoolId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    searchKeywords: [
      ...generateSearchPrefixes('Bart Simpson'),
      ...generateSearchPrefixes('ADM-001')
    ],
    schemaVersion: 1,
  });

  // Generate 50 realistic random students for pagination testing
  const firstNames = ['Lisa', 'Milhouse', 'Nelson', 'Ralph', 'Martin', 'Sherri', 'Terri', 'Database', 'Kearney', 'Jimbo'];
  const lastNames = ['Simpson', 'Van Houten', 'Muntz', 'Wiggum', 'Prince', 'Mackleberry', 'Jones'];
  const grades = ['1', '2', '3', '4', '5'];
  const sections = ['A', 'B', 'C'];
  const houses = ['house_gryffindor', 'house_slytherin', 'house_ravenclaw', 'house_hufflepuff'];

  for (let i = 2; i <= 51; i++) {
    const studentRef = db.collection(`schools/${schoolId}/students`).doc(`student_${i}`);
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    
    batch.set(studentRef, {
      fullName: `${firstName} ${lastName}`,
      admissionNumber: `ADM-${String(i).padStart(3, '0')}`,
      grade: grades[i % grades.length],
      section: sections[i % sections.length],
      houseId: houses[i % houses.length],
      totalPoints: Math.floor(Math.random() * 500),
      rank: i,
      status: i % 10 === 0 ? 'suspended' : 'active',
      archiveState: i % 15 === 0 ? 'archived' : 'active',
      schoolId: schoolId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      searchKeywords: [
        ...generateSearchPrefixes(`${firstName} ${lastName}`),
        ...generateSearchPrefixes(`adm-${String(i).padStart(3, '0')}`)
      ],
      schemaVersion: 1,
    });
  }

  await batch.commit();
  console.log('   -> Seeded 51 Students for Pagination/Search testing');
}
