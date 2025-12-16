import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  athleteName: string;
  eventDate: string;
  eventTime: string;
  location: string;
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

const getServiceDetails = (serviceType: string): { included: string; price: string } => {
  switch (serviceType) {
    case "single-game":
      return {
        included: `
          <li>25+ professionally edited photos</li>
          <li>High-resolution digital images</li>
          <li>Online gallery for easy viewing and downloading</li>
          <li>Estimated delivery within 2-3 days following the session</li>
        `,
        price: "$50"
      };
    case "season-pass":
      return {
        included: `
          <li>8 games covered throughout the season</li>
          <li>300+ professionally edited photos</li>
          <li>High-resolution digital images</li>
          <li>Online gallery with full access</li>
          <li>Priority booking for all games</li>
        `,
        price: "$350"
      };
    case "team-package":
      return {
        included: `
          <li>2 games covered</li>
          <li>Team photos included</li>
          <li>Shared gallery for the entire team</li>
          <li>High-resolution digital images</li>
          <li>Estimated delivery within 3-5 days</li>
        `,
        price: "$200"
      };
    default:
      return {
        included: `<li>Custom package - details to be discussed</li>`,
        price: "TBD"
      };
  }
};

const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
};

const formatTime = (timeStr: string): string => {
  try {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch {
    return timeStr;
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, athleteName, eventDate, eventTime, location, serviceType, sport, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, athleteName, eventDate, eventTime, location, serviceType, sport });

    const serviceDetails = getServiceDetails(serviceType);

    // Email to photographer (Tyson)
    const photographerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TD Photography <onboarding@resend.dev>",
        to: ["tysondelise55@gmail.com"],
        subject: `New Booking Request: ${athleteName} - ${getSportLabel(sport)} on ${formatDate(eventDate)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Booking Request</h1>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #555; margin-top: 0;">Contact Details</h2>
              <p><strong>Booker Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div style="background: #fff5eb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
              <h2 style="color: #555; margin-top: 0;">Session Details</h2>
              <p><strong>Athlete Name:</strong> ${athleteName}</p>
              <p><strong>Date:</strong> ${formatDate(eventDate)}</p>
              <p><strong>Time:</strong> ${formatTime(eventTime)}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Sport:</strong> ${getSportLabel(sport)}</p>
              <p><strong>Service Type:</strong> ${getServiceLabel(serviceType)}</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #555; margin-top: 0;">Additional Message</h2>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #888; font-size: 12px; margin-top: 30px;">This email was sent from the TD Photography website contact form.</p>
          </div>
        `,
      }),
    });

    const photographerData = await photographerEmailRes.json();
    console.log("Photographer email response:", photographerData);

    if (!photographerEmailRes.ok) {
      throw new Error(photographerData.message || "Failed to send email to photographer");
    }

    // Confirmation email to booker
    const bookerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TD Photography <onboarding@resend.dev>",
        to: [email],
        subject: `Booking Confirmation - ${getSportLabel(sport)} Session for ${athleteName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #f97316;">
              <h1 style="margin: 0; color: #111;">TD Photography</h1>
              <p style="color: #666; margin: 5px 0 0;">Sports Photography</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <p style="font-size: 18px; margin-bottom: 20px;">Hello <strong>${name}</strong>,</p>
              
              <p style="line-height: 1.6;">Thank you for booking a sports photography session with me! I'm excited to work with you and capture high-quality images you'll be proud of. Below are the details of your scheduled session for confirmation:</p>
              
              <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f97316;">
                <h2 style="color: #f97316; margin-top: 0; font-size: 20px;">📋 Session Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666;">Athlete Name:</td><td style="padding: 8px 0; font-weight: bold;">${athleteName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Date:</td><td style="padding: 8px 0; font-weight: bold;">${formatDate(eventDate)}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Time:</td><td style="padding: 8px 0; font-weight: bold;">${formatTime(eventTime)}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Location:</td><td style="padding: 8px 0; font-weight: bold;">${location}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Sport / Team:</td><td style="padding: 8px 0; font-weight: bold;">${getSportLabel(sport)}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Session Length:</td><td style="padding: 8px 0; font-weight: bold;">Full Game</td></tr>
                </table>
              </div>
              
              <div style="background: #fff; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e5e5;">
                <h2 style="color: #333; margin-top: 0; font-size: 20px;">📸 What's Included</h2>
                <ul style="line-height: 1.8; padding-left: 20px; color: #555;">
                  ${serviceDetails.included}
                </ul>
              </div>
              
              <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin: 25px 0; border: 1px solid #86efac;">
                <h2 style="color: #166534; margin-top: 0; font-size: 20px;">💰 Pricing & Payment</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666;">Total Cost:</td><td style="padding: 8px 0; font-weight: bold; font-size: 18px; color: #166534;">${serviceDetails.price}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Payment Status:</td><td style="padding: 8px 0;">Due when photos get delivered</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">Accepted Methods:</td><td style="padding: 8px 0;">Cash, Venmo, PayPal</td></tr>
                </table>
              </div>
              
              <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #fcd34d;">
                <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">⚠️ Cancellation & Rescheduling Policy</h3>
                <p style="color: #78350f; margin-bottom: 0; line-height: 1.6;">If you need to cancel or reschedule, please notify me at least 24 hours in advance. Late cancellations may be subject to a fee.</p>
              </div>
              
              <p style="line-height: 1.6;">Please let me know if any of the details above need to be updated or if you have any questions prior to the session. I want to ensure everything goes smoothly and your athlete has a great experience.</p>
              
              <p style="line-height: 1.6; margin-top: 25px;">Thank you for choosing me as your photographer—I'm looking forward to capturing some great moments!</p>
              
              <p style="margin-top: 30px;">Best regards,</p>
              
              <div style="margin-top: 15px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0; font-weight: bold; font-size: 18px;">Tyson Delise</p>
                <p style="margin: 5px 0; color: #f97316;">Sports Photographer</p>
                <p style="margin: 5px 0; color: #666;">📧 <a href="mailto:tysondelise55@gmail.com" style="color: #f97316;">tysondelise55@gmail.com</a></p>
                <p style="margin: 5px 0; color: #666;">📱 317-833-5049</p>
                <p style="margin: 5px 0; color: #666;">📷 <a href="https://tdphotography.lovable.app" style="color: #f97316;">TDPhotography.lovable.app</a></p>
              </div>
            </div>
            
            <div style="background: #111; color: #fff; padding: 20px; text-align: center; margin-top: 30px;">
              <p style="margin: 0; font-size: 12px;">© 2024 TD Photography. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    });

    const bookerData = await bookerEmailRes.json();
    console.log("Booker confirmation email response:", bookerData);

    if (!bookerEmailRes.ok) {
      console.error("Failed to send confirmation to booker:", bookerData);
      // Don't throw - still want to report success since photographer email was sent
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
