export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'professional';
export type UserLevel = 'student' | 'amateur' | 'professional' | 'teacher';
export type LinkType = 'imslp' | 'youtube' | 'wikipedia';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          display_name: string;
          instrument: string | null;
          level: UserLevel | null;
          avatar_url: string | null;
          bio: string;
          website: string | null;
          social_links: Record<string, string>;
          genres: string[];
          location: string | null;
          ensembles: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      discography: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          year: number | null;
          role: string | null;
          url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['discography']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['discography']['Insert']>;
      };
      performances: {
        Row: {
          id: string;
          user_id: string;
          event_name: string;
          venue: string | null;
          date: string | null;
          piece_id: string | null;
          is_upcoming: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['performances']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['performances']['Insert']>;
      };
      pieces: {
        Row: {
          id: string;
          title: string;
          composer_name: string;
          catalog_number: string | null;
          instruments: string[];
          era: string;
          form: string;
          duration_minutes: number | null;
          difficulty: Difficulty;
          description: string;
        };
        Insert: Database['public']['Tables']['pieces']['Row'];
        Update: Partial<Database['public']['Tables']['pieces']['Insert']>;
      };
      editions: {
        Row: {
          id: string;
          piece_id: string;
          publisher: string;
          editor: string;
          year: number | null;
          description: string;
        };
        Insert: Database['public']['Tables']['editions']['Row'];
        Update: Partial<Database['public']['Tables']['editions']['Insert']>;
      };
      edition_reviews: {
        Row: {
          id: string;
          edition_id: string;
          user_id: string;
          rating: number;
          text: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['edition_reviews']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['edition_reviews']['Insert']>;
      };
      discussions: {
        Row: {
          id: string;
          piece_id: string;
          user_id: string;
          text: string;
          created_at: string;
          parent_id: string | null;
        };
        Insert: Omit<Database['public']['Tables']['discussions']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['discussions']['Insert']>;
      };
      working_on: {
        Row: {
          piece_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['working_on']['Row'], 'created_at'>;
        Update: never;
      };
      external_links: {
        Row: {
          id: string;
          piece_id: string;
          type: LinkType;
          url: string;
          label: string;
        };
        Insert: Database['public']['Tables']['external_links']['Row'];
        Update: Partial<Database['public']['Tables']['external_links']['Insert']>;
      };
      reports: {
        Row: {
          id: string;
          discussion_id: string;
          reporter_user_id: string;
          reason: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reports']['Row'], 'created_at'>;
        Update: never;
      };
    };
  };
}

// Convenience types
export type Piece = Database['public']['Tables']['pieces']['Row'];
export type Edition = Database['public']['Tables']['editions']['Row'];
export type EditionReview = Database['public']['Tables']['edition_reviews']['Row'];
export type Discussion = Database['public']['Tables']['discussions']['Row'];
export type ExternalLink = Database['public']['Tables']['external_links']['Row'];
export type User = Database['public']['Tables']['users']['Row'];
