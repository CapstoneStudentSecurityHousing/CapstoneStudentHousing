import { supabase } from '../supabase';

export type AuditLogType = 'user' | 'property' | 'fraud' | 'support' | 'system' | 'Broadcast';

interface AuditLogParams {
  action: string;
  targetId: string;
  details: any;
  type: AuditLogType;
}

export const createAuditLog = async ({ action, targetId, details, type }: AuditLogParams) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.from('audit_logs').insert({
      admin_id: user?.id || null,
      admin_name: user?.user_metadata?.full_name || user?.email || 'AI System',
      action,
      target_id: targetId,
      target_type: type.toLowerCase(),
      details: typeof details === 'string' ? { message: details } : details
    });
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
};
