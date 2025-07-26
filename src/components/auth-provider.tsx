'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/src/lib/supabase-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export type UserRole = 'admin' | 'candidate' | 'employer';
export type AccountStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: AccountStatus;
  profileComplete: boolean;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      
      // Check if user is logged in with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get user profile from database
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData && !error) {
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            status: userData.status,
            profileComplete: userData.profile_complete,
            avatar: userData.avatar_url,
            createdAt: userData.created_at
          });
        }
      }
      
      setLoading(false);
    };

    getUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile from database
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userData && !error) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
              status: userData.status,
              profileComplete: userData.profile_complete,
              avatar: userData.avatar_url,
              createdAt: userData.created_at
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        router.refresh();
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        // Get user profile from database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (userError) {
          throw userError;
        }
        
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          status: userData.status,
          profileComplete: userData.profile_complete,
          avatar: userData.avatar_url,
          createdAt: userData.created_at
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      // First, create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        // Create user profile in database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email,
              name,
              role,
              status: 'pending',
              profile_complete: false
            }
          ])
          .select()
          .single();
        
        if (userError) {
          throw userError;
        }
        
        // Create welcome notification
        await supabase
          .from('notifications')
          .insert([
            {
              user_id: userData.id,
              type: 'info',
              title: 'Welcome to Part Timer!',
              message: 'Your account has been created and is pending approval. You will receive an email once approved.',
              action_url: role === 'candidate' ? '/candidate' : '/employer',
              action_text: 'Get Started'
            }
          ]);
        
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          status: userData.status,
          profileComplete: userData.profile_complete,
          createdAt: userData.created_at
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: data.name || user.name,
          profile_complete: data.profileComplete !== undefined ? data.profileComplete : user.profileComplete,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      setUser({ ...user, ...data });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      // Create notification for user
      await supabase
        .from('notifications')
        .insert([
          {
            user_id: userId,
            type: 'success',
            title: 'Account Approved!',
            message: 'Your account has been approved. You can now access all features of Part Timer.',
            action_url: '/',
            action_text: 'Get Started'
          }
        ]);
      
      toast.success('User approved successfully');
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Failed to approve user');
    }
  };

  const rejectUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) {
        throw error;
      }
      
      // Create notification for user
      await supabase
        .from('notifications')
        .insert([
          {
            user_id: userId,
            type: 'error',
            title: 'Account Application Update',
            message: 'Your account application was not approved.',
            action_url: '/contact',
            action_text: 'Contact Support'
          }
        ]);
      
      toast.success('User rejected successfully');
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Failed to reject user');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      approveUser,
      rejectUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}