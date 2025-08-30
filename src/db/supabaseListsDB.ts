import { supabase } from "./supabase";

// Get all user lists with types
async function getUserLists(userId: string) {
  const { data, error } = await supabase
    .from("lists")
    .select("id, type") // returning id and type
    .eq("user_id", userId);

  if (error) throw error;
  return data || [];
}

// Move a movie
export async function moveMovieToList(
  userId: string,
  movieId: number,
  targetListType: "favourite" | "mustwatch" | "watched"
) {
  // 1. Get all lists
  const allLists = await getUserLists(userId);

  // 2. Find the list with the required type
  const targetList = allLists.find((l) => l.type === targetListType);
  if (!targetList) {
    throw new Error(
      `List with type ${targetListType} not found for user ${userId}`
    );
  } else {
    // 3. Remove the movie from all user lists
    const { error: deleteError } = await supabase
      .from("list_items")
      .delete()
      .in(
        "list_id",
        allLists.map((l) => l.id)
      )
      .eq("movie_id", movieId);

    if (deleteError) throw deleteError;

    // 4. Add the movie to the required list
    const { error: insertError } = await supabase
      .from("list_items")
      .insert([{ list_id: targetList.id, movie_id: movieId }]);

    if (insertError) throw insertError;
  }
}

export async function fetchUserLists(userId: string) {
  const { data, error } = await supabase
    .from("lists")
    .select("id, type, list_items(movie_id)")
    .eq("user_id", userId);

  if (error) throw error;

  // Convert to object format { favourite: [], mustwatch: [], watched: [] }
  const result: Record<"favourite" | "mustwatch" | "watched", number[]> = {
    favourite: [],
    mustwatch: [],
    watched: [],
  };

  data?.forEach((list) => {
    if (
      list.type === "favourite" ||
      list.type === "mustwatch" ||
      list.type === "watched"
    ) {
      result[list.type as "favourite" | "mustwatch" | "watched"] =
        list.list_items.map((li: { movie_id: number }) => li.movie_id);
    }
  });

  return result;
}
