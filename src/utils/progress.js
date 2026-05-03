/**
 * Calculate Voter Journey Progress Percentage
 * @param {number} questionsAnswered - Number of questions answered correctly
 * @param {number} timelineViewed - Number of timeline steps viewed
 * @param {number} firestoreProgress - Progress stored in Firestore (optional overriding progress)
 * @param {number} totalMilestones - Total milestones required to complete the journey
 * @returns {number} Progress percentage from 0 to 100
 */
export const calculateVoterJourneyProgress = (
  questionsAnswered,
  timelineViewed,
  firestoreProgress = 0,
  totalMilestones = 32
) => {
  if (firestoreProgress > 0) {
    // If we have explicit firestore progress, use it.
    // e.g. "Step 4 of 6" => we can handle fractions or just percentage directly
    // Let's assume firestoreProgress is a direct percentage or we calculate standard
  }
  
  const currentProgress = Math.max(0, questionsAnswered) + Math.max(0, timelineViewed);
  const percentage = Math.min((currentProgress / totalMilestones) * 100, 100);
  
  // if firestoreProgress is somehow larger (e.g. from a different device), use the larger one
  return Math.max(percentage, firestoreProgress);
};
