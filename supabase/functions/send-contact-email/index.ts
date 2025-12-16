import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  serviceType: string;
  sport: string;
  message: string;
}

const getServiceLabel = (value: string): string => {
  const services: Record<string, string> = {
    "single-game": "Single Game ($50)",
    "season-pass": "Season Pass ($350)",
    "team-package": "Team Package ($200)",
    "other": "Other"
  };
  return services[value] || value;
};

const getSportLabel = (value: string): string => {
  const sports: Record<string, string> = {
    "basketball": "Basketball",
    "football": "Football",
    "soccer": "Soccer",
    "baseball": "Baseball",
    "other": "Other"
  };
  return sports[value] || value;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, serviceType, sport, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, serviceType, sport });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TD Photography <onboarding@resend.dev>",
        to: ["tysondelise55@gmail.com"],
        subject: `New Inquiry from ${name} - ${getSportLabel(sport)} ${getServiceLabel(serviceType)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Contact Form Submission</h1>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #555; margin-top: 0;">Contact Details</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div style="background: #fff5eb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
              <h2 style="color: #555; margin-top: 0;">Service Request</h2>
              <p><strong>Service Type:</strong> ${getServiceLabel(serviceType)}</p>
              <p><strong>Sport:</strong> ${getSportLabel(sport)}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #555; margin-top: 0;">Message</h2>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #888; font-size: 12px; margin-top: 30px;">This email was sent from the TD Photography website contact form.</p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    console.log("Resend API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
