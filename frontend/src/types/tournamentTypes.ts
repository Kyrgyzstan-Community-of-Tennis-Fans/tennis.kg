export interface TournamentMutation {
  name: string;
  participants: string;
  eventDate: string;
  category: string;
  rank: 'male' | 'female' | 'mixed';
  regulationsDoc: File | null;
  resultsLink: string;
  registrationLink: string;
}

export interface Tournament {
  _id: string;
  name: string;
  participants: number;
  eventDate: string;
  category: string;
  rank: 'male' | 'female' | 'mixed';
  regulationsDoc: string | null;
  resultsLink: string;
  registrationLink: string;
}

export interface Tournaments {
  [month: string]: Tournament[];
}

export interface UpdateTournamentArg {
  id: string;
  tournamentMutation: TournamentMutation;
}
