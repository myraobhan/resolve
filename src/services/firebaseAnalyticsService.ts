import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

interface FormDownloadData {
  complainantName: string;
  oppositePartyName: string;
  forumType: string;
  totalValue: string;
  downloadedAt: Timestamp;
  district: string;
  state: string;
}

interface AnalyticsData {
  totalDownloads: number;
  lastUpdated: Timestamp;
}

// Collection name
const DOWNLOADS_COLLECTION = 'form_downloads';
const ANALYTICS_DOC = 'global_stats';
const ANALYTICS_COLLECTION = 'analytics';

/**
 * Log form download to Firebase
 */
export const logFormDownload = async (formData: Partial<FormDownloadData>) => {
  try {
    // Add download record
    const docRef = await addDoc(collection(db, DOWNLOADS_COLLECTION), {
      complainantName: formData.complainantName || 'Unknown',
      oppositePartyName: formData.oppositePartyName || 'Unknown',
      forumType: formData.forumType || 'Unknown',
      totalValue: formData.totalValue || '0',
      district: formData.district || 'Unknown',
      state: formData.state || 'Unknown',
      downloadedAt: Timestamp.now(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    // Update global statistics
    await updateGlobalStats();

    console.log('✅ Form download tracked:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error logging form download:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Get total number of downloads
 */
export const getTotalDownloads = async (): Promise<number> => {
  try {
    const querySnapshot = await getDocs(collection(db, DOWNLOADS_COLLECTION));
    const count = querySnapshot.size;
    console.log('📊 Total downloads from Firestore:', count);
    return count;
  } catch (error) {
    console.error('❌ Error getting total downloads:', error);
    return 0;
  }
};

/**
 * Get downloads for today
 */
export const getTodayDownloads = async (): Promise<number> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const q = query(
      collection(db, DOWNLOADS_COLLECTION),
      where('downloadedAt', '>=', todayTimestamp)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting today downloads:', error);
    return 0;
  }
};

/**
 * Get all download records
 */
export const getAllDownloadRecords = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, DOWNLOADS_COLLECTION));
    const records: any[] = [];
    querySnapshot.forEach((doc) => {
      records.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return records;
  } catch (error) {
    console.error('Error getting download records:', error);
    return [];
  }
};

/**
 * Get downloads by forum type
 */
export const getDownloadsByForum = async (forumType: string): Promise<number> => {
  try {
    const q = query(
      collection(db, DOWNLOADS_COLLECTION),
      where('forumType', '==', forumType)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting downloads by forum:', error);
    return 0;
  }
};

/**
 * Get downloads by state
 */
export const getDownloadsByState = async (state: string): Promise<number> => {
  try {
    const q = query(
      collection(db, DOWNLOADS_COLLECTION),
      where('state', '==', state)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting downloads by state:', error);
    return 0;
  }
};

/**
 * Get analytics summary
 */
export const getAnalyticsSummary = async () => {
  try {
    const docRef = doc(db, ANALYTICS_COLLECTION, ANALYTICS_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    // If document doesn't exist, create it
    const totalDownloads = await getTotalDownloads();
    return {
      totalDownloads,
      lastUpdated: Timestamp.now(),
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return { totalDownloads: 0, lastUpdated: null };
  }
};

/**
 * Update global statistics
 */
const updateGlobalStats = async () => {
  try {
    const docRef = doc(db, ANALYTICS_COLLECTION, ANALYTICS_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, increment counter
      await updateDoc(docRef, {
        totalDownloads: increment(1),
        lastUpdated: Timestamp.now(),
      });
    } else {
      // Document doesn't exist, create it
      const totalDownloads = await getTotalDownloads();
      await updateDoc(docRef, {
        totalDownloads,
        lastUpdated: Timestamp.now(),
      }).catch(() => {
        // If update fails, it's likely because the doc doesn't exist
        // This is handled by the try-catch in addDoc
      });
    }
  } catch (error) {
    console.error('Error updating global stats:', error);
  }
};

/**
 * Get detailed statistics
 */
export const getDetailedStats = async () => {
  try {
    const records = await getAllDownloadRecords();
    const forumTypes = new Map<string, number>();
    const states = new Map<string, number>();
    const valueRanges = new Map<string, number>();

    records.forEach((record) => {
      // Count by forum type
      const forum = record.forumType;
      forumTypes.set(forum, (forumTypes.get(forum) || 0) + 1);

      // Count by state
      const state = record.state;
      states.set(state, (states.get(state) || 0) + 1);

      // Count by value range
      const value = parseFloat(record.totalValue.replace(/[^0-9.]/g, '')) || 0;
      let range = 'Unknown';
      if (value <= 10000000) range = 'District Forum (≤₹1Cr)';
      else if (value <= 100000000) range = 'State Commission (₹1-10Cr)';
      else range = 'National Commission (>₹10Cr)';

      valueRanges.set(range, (valueRanges.get(range) || 0) + 1);
    });

    return {
      totalDownloads: records.length,
      byForum: Object.fromEntries(forumTypes),
      byState: Object.fromEntries(states),
      byValueRange: Object.fromEntries(valueRanges),
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error getting detailed stats:', error);
    return {
      totalDownloads: 0,
      byForum: {},
      byState: {},
      byValueRange: {},
      lastUpdated: null,
    };
  }
};
