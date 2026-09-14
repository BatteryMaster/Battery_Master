"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type SiteSettings = {
  site_name: string;
  site_tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  about: string;
  logo: string;
};

const DEFAULTS: SiteSettings = {
  site_name:   "Battery Master",
  site_tagline:"Saddar · Karachi",
  phone:       "03329891510",
  whatsapp:    "923329891510",
  email:       "batterymasterofficial78@outlook.com",
  address:     "Shop No 78, Cooperative Electronics Market, Saddar, Karachi",
  about:       "Battery Master is Karachi's trusted battery and EV parts store.",
  logo:        "",
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [ready, setReady]       = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("key,value").then(({ data }) => {
      if (data && data.length > 0) {
        const obj = { ...DEFAULTS };
        data.forEach(row => {
          if (row.key in obj) (obj as Record<string,string>)[row.key] = row.value;
        });
        setSettings(obj);
      }
      setReady(true);
    });
  }, []);

  return { settings, ready };
}
