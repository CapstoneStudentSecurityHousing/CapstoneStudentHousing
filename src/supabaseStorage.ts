// Supabase storage stub (no file upload)

export const uploadFile = async (file: File) => ({ publicURL: URL.createObjectURL(file), error: null });
