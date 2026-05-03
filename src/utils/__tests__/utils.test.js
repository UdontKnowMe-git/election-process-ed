import { describe, it, expect } from 'vitest';
import { fetchRepresentativeByPincode } from '../pincode';
import { calculateVoterJourneyProgress } from '../progress';

describe('Pincode Utility', () => {
  it('should return null for invalid pincodes (empty string)', async () => {
    const result = await fetchRepresentativeByPincode('');
    expect(result).toBeNull();
  });

  it('should return null for invalid pincodes (less than 6 digits)', async () => {
    const result = await fetchRepresentativeByPincode('12345');
    expect(result).toBeNull();
  });

  it('should return null for invalid pincodes (more than 6 digits)', async () => {
    const result = await fetchRepresentativeByPincode('1234567');
    expect(result).toBeNull();
  });

  it('should return valid mock data for a 6-digit pincode', async () => {
    const result = await fetchRepresentativeByPincode('110001');
    expect(result).not.toBeNull();
    expect(result.state).toBe('Delhi');
    expect(result.mp.name).toContain('New Delhi MP');
  });

  it('should default to generic response for unmapped 6-digit pincodes', async () => {
    const result = await fetchRepresentativeByPincode('999999');
    expect(result).not.toBeNull();
    expect(result.state).toBe('State');
    expect(result.mp.name).toContain('Local MP');
  });
});

describe('Voter Journey Progress Calculation', () => {
  it('should return 0 when no progress is made', () => {
    expect(calculateVoterJourneyProgress(0, 0, 0, 32)).toBe(0);
  });

  it('should calculate correct percentage for partial progress', () => {
    expect(calculateVoterJourneyProgress(16, 0, 0, 32)).toBe(50);
  });

  it('should cap progress at 100%', () => {
    expect(calculateVoterJourneyProgress(20, 20, 0, 32)).toBe(100);
  });

  it('should handle negative values gracefully', () => {
    expect(calculateVoterJourneyProgress(-5, -5, 0, 32)).toBe(0);
  });

  it('should prioritize larger firestore progress', () => {
    expect(calculateVoterJourneyProgress(10, 6, 80, 32)).toBe(80); // (16/32)=50% vs 80% -> 80%
  });
});
