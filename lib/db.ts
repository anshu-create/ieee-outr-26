"use server";

import { db } from "./firebase";
import { 
  collection, getDocs, doc, deleteDoc, updateDoc, 
  setDoc, query, orderBy 
} from "firebase/firestore";

// ── TYPES ──

export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  abstract: string;
  link: string;
  color: string;
  imageUrl?: string;
}

export interface Event {
  id: number;
  type: string;
  date: string;
  title: string;
  description: string;
  location: string;
  status: string;
  link?: string;
  imageUrl?: string;
}

export interface Society {
  abbr: string;
  name: string;
  description: string;
  accentColor: string;
}

export interface Member {
  id: number;
  name: string;
  role?: string;
  category: "faculty" | "executive" | "team";
  photoUrl?: string;
  scholarLink?: string;
  linkedinLink?: string;
  githubLink?: string;
}

// ── PUBLICATIONS METHODS ──

export async function getPublications(): Promise<Publication[]> {
  try {
    const q = query(collection(db, "publications"), orderBy("id", "desc"));
    const querySnapshot = await getDocs(q);
    const publications: Publication[] = [];
    querySnapshot.forEach((doc) => {
      publications.push(doc.data() as Publication);
    });
    return publications;
  } catch (error) {
    console.error("Error getting publications:", error);
    return [];
  }
}

export async function addPublication(newPub: Omit<Publication, "id">): Promise<void> {
  const publications = await getPublications();
  const newId = publications.length > 0 ? Math.max(...publications.map((p) => p.id)) + 1 : 1;
  const docRef = doc(db, "publications", String(newId));
  await setDoc(docRef, { ...newPub, id: newId });
}

export async function deletePublication(id: number): Promise<void> {
  const docRef = doc(db, "publications", String(id));
  await deleteDoc(docRef);
}

export async function updatePublication(id: number, updatedData: Partial<Publication>): Promise<void> {
  const docRef = doc(db, "publications", String(id));
  await updateDoc(docRef, updatedData);
}

// ── EVENTS METHODS ──

export async function getEvents(): Promise<Event[]> {
  try {
    const q = query(collection(db, "events"), orderBy("id", "desc"));
    const querySnapshot = await getDocs(q);
    const events: Event[] = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data() as Event);
    });
    return events;
  } catch (error) {
    console.error("Error getting events:", error);
    return [];
  }
}

export async function addEvent(newEvent: Omit<Event, "id">): Promise<void> {
  const events = await getEvents();
  const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
  const docRef = doc(db, "events", String(newId));
  await setDoc(docRef, { ...newEvent, id: newId });
}

export async function deleteEvent(id: number): Promise<void> {
  const docRef = doc(db, "events", String(id));
  await deleteDoc(docRef);
}

export async function updateEvent(id: number, updatedData: Partial<Event>): Promise<void> {
  const docRef = doc(db, "events", String(id));
  await updateDoc(docRef, updatedData);
}

// ── SOCIETIES METHODS ──

export async function getSocieties(): Promise<Society[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "societies"));
    const societies: Society[] = [];
    querySnapshot.forEach((doc) => {
      societies.push(doc.data() as Society);
    });
    return societies;
  } catch (error) {
    console.error("Error getting societies:", error);
    return [];
  }
}

export async function addSociety(newSoc: Society): Promise<void> {
  const docRef = doc(db, "societies", newSoc.abbr.toLowerCase());
  await setDoc(docRef, newSoc);
}

export async function deleteSociety(abbr: string): Promise<void> {
  const docRef = doc(db, "societies", abbr.toLowerCase());
  await deleteDoc(docRef);
}

export async function updateSociety(abbr: string, updatedData: Partial<Society>): Promise<void> {
  const docRef = doc(db, "societies", abbr.toLowerCase());
  await updateDoc(docRef, updatedData);
}

// ── MEMBERS METHODS ──

export async function getMembers(): Promise<Member[]> {
  try {
    const q = query(collection(db, "members"), orderBy("id", "asc"));
    const querySnapshot = await getDocs(q);
    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
      members.push(doc.data() as Member);
    });
    return members;
  } catch (error) {
    console.error("Error getting members:", error);
    return [];
  }
}

export async function addMember(newMember: Omit<Member, "id">): Promise<void> {
  const members = await getMembers();
  const newId = members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;
  const docRef = doc(db, "members", String(newId));
  await setDoc(docRef, { ...newMember, id: newId });
}

export async function deleteMember(id: number): Promise<void> {
  const docRef = doc(db, "members", String(id));
  await deleteDoc(docRef);
}

export async function updateMember(id: number, updatedData: Partial<Member>): Promise<void> {
  const docRef = doc(db, "members", String(id));
  await updateDoc(docRef, updatedData);
}
