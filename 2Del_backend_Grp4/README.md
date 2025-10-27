# Supabase Backend
This project uses Supabase as the backend.  
Features: Authentication, Database (Tables), and Storage.  
All backend operations are handled via the Supabase client in the frontend code.  
No local server setup required.

#Database Schema
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.Admin (
  adminid bigint NOT NULL DEFAULT nextval('"Admin_adminid_seq"'::regclass),
  userid bigint,
  CONSTRAINT Admin_pkey PRIMARY KEY (adminid),
  CONSTRAINT Admin_userid_fkey FOREIGN KEY (userid) REFERENCES public.Users(userid)
);
CREATE TABLE public.ChatHistory (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  role text,
  content text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT ChatHistory_pkey PRIMARY KEY (id),
  CONSTRAINT chat_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.Country (
  countryid bigint NOT NULL DEFAULT nextval('"Country_countryid_seq"'::regclass),
  countryname character varying NOT NULL,
  traditions text,
  festivals text,
  dresscode text,
  greetings text,
  etiquette text,
  food text,
  community text,
  CONSTRAINT Country_pkey PRIMARY KEY (countryid)
);
CREATE TABLE public.Itinerary (
  itineraryid bigint NOT NULL DEFAULT nextval('"Itinerary_itineraryid_seq"'::regclass),
  travelerid bigint,
  country character varying,
  traveldates character varying,
  budget numeric,
  interests text,
  CONSTRAINT Itinerary_pkey PRIMARY KEY (itineraryid),
  CONSTRAINT Itinerary_travelerid_fkey FOREIGN KEY (travelerid) REFERENCES public.Traveler(travelerid)
);
CREATE TABLE public.Landmark (
  landmarkid bigint NOT NULL DEFAULT nextval('"Landmark_landmarkid_seq"'::regclass),
  countryid bigint,
  landmarkname character varying,
  description text,
  culturaletiquette text,
  image text,
  CONSTRAINT Landmark_pkey PRIMARY KEY (landmarkid),
  CONSTRAINT Landmark_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.Country(countryid)
);
CREATE TABLE public.Review (
  reviewid bigint NOT NULL DEFAULT nextval('"Review_reviewid_seq"'::regclass),
  travelerid bigint,
  targettype character varying,
  targetid bigint,
  rating integer,
  comment text,
  dateposted timestamp without time zone DEFAULT now(),
  experiencename character varying,
  CONSTRAINT Review_pkey PRIMARY KEY (reviewid),
  CONSTRAINT Review_travelerid_fkey FOREIGN KEY (travelerid) REFERENCES public.Traveler(travelerid)
);
CREATE TABLE public.Traveler (
  travelerid bigint NOT NULL DEFAULT nextval('"Traveler_travelerid_seq"'::regclass),
  userid bigint UNIQUE,
  CONSTRAINT Traveler_pkey PRIMARY KEY (travelerid),
  CONSTRAINT Traveler_userid_fkey FOREIGN KEY (userid) REFERENCES public.Users(userid)
);
CREATE TABLE public.UserSavedLandmarks (
  id bigint NOT NULL DEFAULT nextval('"UserSavedLandmarks_id_seq"'::regclass),
  userid bigint,
  landmarkid bigint,
  CONSTRAINT UserSavedLandmarks_pkey PRIMARY KEY (id),
  CONSTRAINT UserSavedLandmarks_userid_fkey FOREIGN KEY (userid) REFERENCES public.Users(userid),
  CONSTRAINT UserSavedLandmarks_landmarkid_fkey FOREIGN KEY (landmarkid) REFERENCES public.Landmark(landmarkid)
);
CREATE TABLE public.Users (
  userid bigint NOT NULL DEFAULT nextval('"User_userid_seq"'::regclass),
  email character varying NOT NULL UNIQUE,
  password character varying NOT NULL,
  firstname character varying NOT NULL,
  lastname character varying NOT NULL,
  contactnumber character varying,
  preferredlanguage character varying,
  usertype character varying DEFAULT 'Traveler'::character varying,
  CONSTRAINT Users_pkey PRIMARY KEY (userid)
);
