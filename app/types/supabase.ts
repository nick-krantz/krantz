export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
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
					},
				];
			};
			burgers: {
				Row: {
					created_at: string | null;
					description: string;
					id: number;
					latitude: number;
					location: string;
					longitude: number;
					name: string;
					rank: number;
					restaurant: string;
					url: string;
				};
				Insert: {
					created_at?: string | null;
					description: string;
					id?: number;
					latitude: number;
					location: string;
					longitude: number;
					name: string;
					rank: number;
					restaurant: string;
					url: string;
				};
				Update: {
					created_at?: string | null;
					description?: string;
					id?: number;
					latitude?: number;
					location?: string;
					longitude?: number;
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
			recipes: {
				Row: {
					created_at: string | null;
					created_by: string | null;
					id: number;
					image: string | null;
					name: string;
					url: string;
				};
				Insert: {
					created_at?: string | null;
					created_by?: string | null;
					id?: number;
					image?: string | null;
					name: string;
					url: string;
				};
				Update: {
					created_at?: string | null;
					created_by?: string | null;
					id?: number;
					image?: string | null;
					name?: string;
					url?: string;
				};
				Relationships: [
					{
						foreignKeyName: "recipes_created_by_fkey";
						columns: ["created_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
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
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database["public"]["Tables"] & Database["public"]["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
				Database["public"]["Views"])
	  ? (Database["public"]["Tables"] &
				Database["public"]["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
		  }
			? R
			: never
	  : never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database["public"]["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
	  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
		  }
			? I
			: never
	  : never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database["public"]["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
	  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
		  }
			? U
			: never
	  : never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database["public"]["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
	  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
	  : never;
