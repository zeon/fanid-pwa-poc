import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { VerificationEmail } from "./_templates/verification-email.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  type: string;
  table: string;
  record: {
    id: string;
    email: string;
    email_confirmed_at: string | null;
  };
  schema: string;
  old_record: null | any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    
    console.log("Webhook received:", payload.type);

    // Only handle new user signups
    if (payload.type !== "INSERT" || payload.table !== "users") {
      return new Response(JSON.stringify({ message: "Not a user insert event" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const { email, id } = payload.record;

    // Generate verification token and link
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const verificationLink = `${supabaseUrl}/auth/v1/verify?token=${id}&type=signup&redirect_to=${Deno.env.get("APP_URL") || "http://localhost:5173"}/verify-email`;

    // Render email template
    const html = await renderAsync(
      React.createElement(VerificationEmail, {
        verificationLink,
        email,
      })
    );

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "FanVerse <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your FanVerse account",
      html,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log("Verification email sent successfully to:", email);

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-verification-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
