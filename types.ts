export enum FrictionType {
  RageClick = 'Rage Click',
  FormError = 'Repeated Form Error',
  SessionInactivity = 'Session Inactivity',
  RapidNavigation = 'Rapid Navigation',
}

export enum InterventionType {
  Chatbot = 'Chatbot Help',
  HelpArticle = 'Help Article Suggestion',
  PromoOffer = 'Personalized Offer',
}

export interface FrictionEvent {
  id: string;
  type: FrictionType;
  timestamp: Date;
  elementId: string;
  description: string;
  interventionTriggered: InterventionType | null;
  interventionEffective: boolean | null;
  notes?: string;
}

export interface GeminiAnalysis {
  rootCauses: string[];
  recommendations: string[];
}