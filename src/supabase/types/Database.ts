export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      "bookmark-categories": {
        Row: {
          category: string;
          created_at: string | null;
          id: number;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          id?: number;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      bookmarks: {
        Row: {
          category: string;
          created_at: string | null;
          id: number;
          title: string;
          url: string;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          id?: number;
          title: string;
          url: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          id?: number;
          title?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "bookmark-categories";
            referencedColumns: ["category"];
          }
        ];
      };
      burgers: {
        Row: {
          created_at: string | null;
          description: string;
          id: number;
          kitchen_floor: boolean | null;
          latitude: number;
          location: string;
          longitude: number;
          minnesota: boolean;
          name: string;
          rank: number;
          restaurant: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          id?: number;
          kitchen_floor?: boolean | null;
          latitude: number;
          location: string;
          longitude: number;
          minnesota?: boolean;
          name: string;
          rank: number;
          restaurant: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          id?: number;
          kitchen_floor?: boolean | null;
          latitude?: number;
          location?: string;
          longitude?: number;
          minnesota?: boolean;
          name?: string;
          rank?: number;
          restaurant?: string;
          url?: string;
        };
        Relationships: [];
      };
      full_recipes: {
        Row: {
          created_at: string;
          created_by: string;
          id: number;
          image_url: string | null;
          ingredients: Json;
          instructions: Json;
          title: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: number;
          image_url?: string | null;
          ingredients: Json;
          instructions: Json;
          title: string;
          url: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: number;
          image_url?: string | null;
          ingredients?: Json;
          instructions?: Json;
          title?: string;
          url?: string;
        };
        Relationships: [];
      };
      strava: {
        Row: {
          access_token: string;
          created_at: string;
          expires_at: number;
          id: number;
          refresh_token: string;
        };
        Insert: {
          access_token: string;
          created_at?: string;
          expires_at: number;
          id?: number;
          refresh_token: string;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          expires_at?: number;
          id?: number;
          refresh_token?: string;
        };
        Relationships: [];
      };
      workouts: {
        Row: {
          average_speed: number | null;
          created_at: string;
          description: string | null;
          distance: number;
          elapsed_time: number;
          id: number;
          moving_time: number;
          splits_standard: Json;
          sport_type: string;
          start_date: string;
          strava_id: string;
          title: string;
        };
        Insert: {
          average_speed?: number | null;
          created_at?: string;
          description?: string | null;
          distance: number;
          elapsed_time: number;
          id?: number;
          moving_time: number;
          splits_standard: Json;
          sport_type: string;
          start_date: string;
          strava_id: string;
          title: string;
        };
        Update: {
          average_speed?: number | null;
          created_at?: string;
          description?: string | null;
          distance?: number;
          elapsed_time?: number;
          id?: number;
          moving_time?: number;
          splits_standard?: Json;
          sport_type?: string;
          start_date?: string;
          strava_id?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
