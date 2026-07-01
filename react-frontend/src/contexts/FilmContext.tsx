import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Movie } from "@/constants/filmData";


interface WatchHistory {
  movieId: string;
  watchedAt: Date;
  progress: number; // 0-100 percentage
}

interface FilmUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface FilmContextType {
  // Auth
  user: FilmUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Bookmarks
  bookmarks: string[];
  isBookmarked: (movieId: string) => boolean;
  toggleBookmark: (movieId: string) => void;

  // Watch history
  history: WatchHistory[];
  addToHistory: (movieId: string, progress?: number) => void;
  getProgress: (movieId: string) => number;
  clearHistory: () => void;
}

const FilmContext = createContext<FilmContextType | null>(null);

export function FilmProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FilmUser | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [history, setHistory] = useState<WatchHistory[]>([]);

  // Load persisted data from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("film_user");
      const savedBookmarks = localStorage.getItem("film_bookmarks");
      const savedHistory = localStorage.getItem("film_history");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.map((h: any) => ({ ...h, watchedAt: new Date(h.watchedAt) })));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist bookmarks and history
  useEffect(() => {
    localStorage.setItem("film_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("film_history", JSON.stringify(history));
  }, [history]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated auth — in production connect to real API
    await new Promise((r) => setTimeout(r, 800));
    if (email && password.length >= 6) {
      const newUser: FilmUser = {
        id: "u1",
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        email,
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
      };
      setUser(newUser);
      localStorage.setItem("film_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    if (name && email && password.length >= 6) {
      const newUser: FilmUser = {
        id: "u_" + Date.now(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
      };
      setUser(newUser);
      localStorage.setItem("film_user", JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("film_user");
  };

  const isBookmarked = (movieId: string) => bookmarks.includes(movieId);

  const toggleBookmark = (movieId: string) => {
    setBookmarks((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const addToHistory = (movieId: string, progress = 0) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.movieId !== movieId);
      return [{ movieId, watchedAt: new Date(), progress }, ...filtered].slice(0, 50);
    });
  };

  const getProgress = (movieId: string) => {
    return history.find((h) => h.movieId === movieId)?.progress || 0;
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("film_history");
  };

  return (
    <FilmContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        bookmarks,
        isBookmarked,
        toggleBookmark,
        history,
        addToHistory,
        getProgress,
        clearHistory,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}

export function useFilm() {
  const ctx = useContext(FilmContext);
  if (!ctx) throw new Error("useFilm must be used inside FilmProvider");
  return ctx;
}

