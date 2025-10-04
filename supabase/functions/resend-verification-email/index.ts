import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@4.0.0";
import React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { VerificationEmail } from "../send-verification-email/_templates/verification-email.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Check if email is already verified
    if (user.email_confirmed_at) {
      return new Response(
        JSON.stringify({ error: "Email already verified" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Rate limiting: Check last sent time (implement with a database table in production)
    // For now, we'll just send the email

    const { email, id } = user;
    if (!email) {
      throw new Error("No email found for user");
    }

    // Generate verification link
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const appUrl = Deno.env.get("APP_URL") || "http://localhost:5173";
    const verificationLink = `${supabaseUrl}/auth/v1/verify?token=${id}&type=signup&redirect_to=${appUrl}/verify-email`;

    // Render email template
    const html = await renderAsync(
      React.createElement(VerificationEmail, {
        verificationLink,
        email,
      })
    );

    // Send email via Resend
    const { data, error: sendError } = await resend.emails.send({
      from: "FanVerse <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your FanVerse account",
      html,
    });

    if (sendError) {
      console.error("Error sending email:", sendError);
      throw sendError;
    }

    console.log("Verification email resent successfully to:", email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification email sent successfully",
        messageId: data?.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in resend-verification-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: error.message === "Unauthorized" ? 401 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
