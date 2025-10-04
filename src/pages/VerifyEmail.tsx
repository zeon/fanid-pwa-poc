import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const VerifyEmail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // The verification is handled by Supabase automatically via the URL
        // We just need to check if the user is now verified
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.email_confirmed_at) {
          setStatus('success');
          
          // Start countdown for redirect
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/dashboard');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        } else {
          // Check if there's an error in the URL
          const error = searchParams.get('error');
          const errorDescription = searchParams.get('error_description');
          
          if (error) {
            console.error('Verification error:', errorDescription);
            setStatus('error');
          }
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Neon glow effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg blur-md"></div>
          
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 text-center">
            {status === 'verifying' && (
              <>
                <Loader2 className="h-16 w-16 text-cyan-400 animate-spin mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t('auth.verifyEmail.title')}
                </h2>
                <p className="text-gray-400">{t('auth.verifyEmail.verifying')}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="p-4 bg-green-500/10 rounded-full w-fit mx-auto mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t('auth.verifyEmail.success')}
                </h2>
                <p className="text-gray-400 mb-4">
                  {t('auth.verifyEmail.successMessage')}
                </p>
                <p className="text-sm text-cyan-400">
                  {t('auth.verifyEmail.redirecting', { seconds: countdown })}
                </p>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  {t('auth.verifyEmail.continueButton')}
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="p-4 bg-red-500/10 rounded-full w-fit mx-auto mb-4">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t('auth.verifyEmail.error')}
                </h2>
                <p className="text-gray-400 mb-4">
                  {t('auth.verifyEmail.errorMessage')}
                </p>
                <Button
                  onClick={() => navigate('/signin')}
                  className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  Back to Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
