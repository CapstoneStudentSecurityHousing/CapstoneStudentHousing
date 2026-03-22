// Supabase service stub (no DB operations)

export const signInWithFacebook = async () => ({ data: null, error: null });
export const logout = async () => ({ data: null, error: null });
export const loginWithEmail = async (email: string, password: string) => ({ user: { id: 'mock-user', email } });
export const getProfile = async (id: string) => ({ id, email: 'mock@user.com', role: 'student' });
export const updateProfile = async () => ({ data: null, error: null });
export const storeOrder = async (order: any) => ({ data: null, error: null });
