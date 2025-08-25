// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to create a new creator
export const createCreator = async (creatorData) => {
	try {
		const { data, error } = await supabase
			.from("creators")
			.insert([creatorData])
			.select();

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Error creating creator:", error);
		return { data: null, error: error.message };
	}
};

// Helper function to get all creators
export const getCreators = async () => {
	try {
		const { data, error } = await supabase
			.from("creators")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Error fetching creators:", error);
		return { data: null, error: error.message };
	}
};

// Helper function to get a single creator by ID
export const getCreator = async (id) => {
	try {
		const { data, error } = await supabase
			.from("creators")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Error fetching creator:", error);
		return { data: null, error: error.message };
	}
};

// Helper function to update a creator
export const updateCreator = async (id, updatedData) => {
	try {
		const { data, error } = await supabase
			.from("creators")
			.update(updatedData)
			.eq("id", id)
			.select();

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Error updating creator:", error);
		return { data: null, error: error.message };
	}
};

// Helper function to delete a creator
export const deleteCreator = async (id) => {
	try {
		const { data, error } = await supabase
			.from("creators")
			.delete()
			.eq("id", id);

		if (error) throw error;

		return { data, error: null };
	} catch (error) {
		console.error("Error deleting creator:", error);
		return { data: null, error: error.message };
	}
};
