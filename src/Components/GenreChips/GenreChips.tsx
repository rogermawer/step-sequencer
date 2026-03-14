import React from "react";
import "./GenreChipsStyle.scss";

const GENRES = [
  "Hip-Hop",
  "Lo-Fi",
  "Indie Rock",
  "Techno",
  "Reggaeton",
  "Ambient",
  "D&B",
];

interface GenreChipsProps {
  onSelectGenre: (genre: string) => void;
  loadingGenre: string | null;
  isLoading: boolean;
}

export const GenreChips: React.FC<GenreChipsProps> = ({
  onSelectGenre,
  loadingGenre,
  isLoading,
}) => (
  <div className="genre-chips">
    <div className="genre-chips-scroll">
      {GENRES.map((genre) => (
        <button
          key={genre}
          className={`genre-chip${loadingGenre === genre ? " loading" : ""}`}
          onClick={() => onSelectGenre(genre)}
          disabled={isLoading}
        >
          {loadingGenre === genre ? <span className="chip-spinner" /> : genre}
        </button>
      ))}
    </div>
  </div>
);
