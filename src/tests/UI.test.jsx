import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { PoliticalInfo } from '../components/Political/PoliticalInfo';

// Mock dependencies
vi.mock('../store/useElectionStore', () => ({
  useElectionStore: vi.fn((selector) => {
    const state = {
      activeTab: 'timeline',
      setActiveTab: vi.fn(),
      user: null,
      setUser: vi.fn(),
      toggleProfileSidebar: vi.fn(),
      questionsAnswered: 0,
      timelineViewed: 0,
      voterJourneyProgress: 0,
    };
    return selector ? selector(state) : state;
  }),
}));

vi.mock('../hooks/useTranslation', () => ({
  useTranslation: vi.fn((text) => ({ translatedText: text })),
}));

vi.mock('../services/firebase', () => ({
  loginWithGoogle: vi.fn(),
  syncUserDocument: vi.fn(),
  db: {},
}));

describe('UI Smoke Tests', () => {
  it('should render the Navbar and check if Login button is present', () => {
    render(<Navbar />);
    // Check if "Login" is present (as part of the TranslatedText component)
    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });

  it('should render the Political Info (Governance Pyramid) with hierarchy tiers', () => {
    render(<PoliticalInfo />);
    // Check for Governance Pyramid header
    expect(screen.getByText(/Governance Pyramid/i)).toBeInTheDocument();
    
    // Check for typical tiers (Union, State, Local)
    // Assuming POLITICAL_DATA.tiers contains these titles
    // We can check for "Union" or "State" text if they are rendered
    // Since we mock useTranslation to return the original text:
    expect(screen.getAllByText(/Union/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/State/i).length).toBeGreaterThan(0);
  });
});
