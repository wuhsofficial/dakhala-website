import { db } from './firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { publicUniversities } from '../data/universities';

export const migrateUniversitiesToCloud = async () => {
  if (!db) {
    alert("Database not connected.");
    return false;
  }
  
  try {
    // Check if data already exists to prevent accidental overwrites
    const existingSnap = await getDocs(collection(db, 'universities'));
    if (existingSnap.size > 0) {
      const confirmMsg = `There are already ${existingSnap.size} universities in Firestore. Do you want to OVERWRITE them with the static data?`;
      if (!window.confirm(confirmMsg)) return false;
    }

    let count = 0;
    // Iterate through all static universities and push to Firestore
    for (const uni of publicUniversities) {
      const uniRef = doc(db, 'universities', uni.id);
      await setDoc(uniRef, uni);
      count++;
    }

    alert(`Successfully migrated ${count} universities to Firestore!`);
    return true;
  } catch (error) {
    console.error("Migration error:", error);
    alert("Failed to migrate data. Check console for details.");
    return false;
  }
};
