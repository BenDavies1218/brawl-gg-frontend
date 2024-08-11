// TournamentForm.js
import React, { useState } from 'react';
import { useTournamentDispatch } from '../contexts/TournamentContext';
import { useNavigate } from 'react-router-dom';

const TournamentForm = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [author, setAuthor] = useState('');
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [game, setGame] = useState('');
  const [gameStats, setGameStats] = useState([]);
  const [newGameStat, setNewGameStat] = useState('');
  const [gameType, setGameType] = useState('');
  const [description, setDescription] = useState('');
  const [minimumPlayers, setMinimumPlayers] = useState('');
  const [maximumPlayers, setMaximumPlayers] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorPlayer, setIsAuthorPlayer] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { createTournament } = useTournamentDispatch();
  const navigate = useNavigate();

  const handleAddTeam = () => {
    setTeams([...teams, teamName]);
    setTeamName(''); // reset the input field
  };

  const handleRemoveTeam = (team) => {
    setTeams(teams.filter((t) => t !== team));
  };

  const handleAddGameStat = (stat) => {
    setGameStats([...gameStats, stat]);
    setNewGameStat(''); // reset the input field
  };

  const handleRemoveGameStat = (stat) => {
    setGameStats(gameStats.filter((s) => s !== stat));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tournamentData = {
        tournamentName,
        author,
        teams,
        game,
        gameStats,
        gameType,
        description,
        minimumPlayers,
        maximumPlayers,
        password,
        isAuthorPlayer,
      };
      await dispatch({ type: 'CREATE_TOURNAMENT', payload: tournamentData });
      setSuccess('Tournament created successfully, redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setError('Error occurred while creating tournament');
    }
  };

  return (
    <form className="flex flex-col justify-center bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto z-10 border-temp-black border-2" onSubmit={handleSubmit}>
        <h4 className="text-[#fbae3c] font-extrabold text-2xl mb-6 text-center">Create Tournament</h4>

        <label className="text-left text-lg font-bold mb-4">
          Tournament Name:
          <br />
          <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="text" value={tournamentName} onChange={(event) => setTournamentName(event.target.value)} />
        </label>

        <label className="text-left text-lg font-bold mb-4">
          Author:
          <br />
          <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </label>

        <label className="text-left text-lg font-bold mb-4">
          Teams:
          <br />
          <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="text" value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Enter team name" />
          <button type="button" className="mx-auto mt-5 w-full px-5 py-2 rounded-md bg-[#fbae3c] text-white font-bold hover:bg-[#f8a32a] active:bg-[#e89c1b] transition-colors duration-300" onClick={() => handleAddTeam(teamName)}>
            Add Team
          </button>
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              {team}{' '}
              <button className="text-red-500 font-bold" onClick={() => handleRemoveTeam(team)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Game:
        <br />
        <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="text" value={game} onChange={(event) => setGame(event.target.value)} />
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Game Stats:
        <br />
        <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="text" value={newGameStat} onChange={(event) => setNewGameStat(event.target.value)} placeholder="Add game stat" />
        <button type="button" className="mx-auto mt-5 w-full px-5 py-2 rounded-md bg-[#fbae3c] text-white font-bold hover:bg-[#f8a32a] active:bg-[#e89c1b] transition-colors duration-300" onClick={() => handleAddGameStat(newGameStat)} >
          Add Game Stat
        </button>
        <ul>
          {gameStats.map((stat, index) => (
            <li key={index}>
              {stat}{' '}
              <button className="text-red-500 font-bold" onClick={() => handleRemoveGameStat(stat)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Game Type:
        <br />
        <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="text" value={gameType} onChange={(event) => setGameType(event.target.value)} />
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Description:
        <br />
        <textarea className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" cols="100" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Minimum Players:
        <br />
        <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" min="0" type="number" value={minimumPlayers} onChange={(event) => setMinimumPlayers(event.target.value)} />
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Maximum Players:
        <br />
        <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" min="0" type="number" value={maximumPlayers} onChange={(event) => setMaximumPlayers(event.target.value)} />
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Password:
        <br />
        <input className="mt-2 w-full px-4 py-2 bg-black border-2 border-temp-black rounded-md text-white placeholder-white/50 focus:border-[#fbae3c] focus:outline-none" size="100" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>

      <label className="text-left text-lg font-bold mb-4">
        Is Author Player:
        <br />
        <input className="text-white rounded border-black border-2 h-6 w-full" type="checkbox" checked={isAuthorPlayer} onChange={(event) => setIsAuthorPlayer(event.target.checked)} />
      </label>

      {error && <p className="text-red-500 font-bold">{error}</p>}
      {success && <p className="text-black font-bold">{success}</p>}

      <button className="mx-auto w-full px-5 py-2 rounded-md bg-[#fbae3c] text-white font-bold hover:bg-[#f8a32a] active:bg-[#e89c1b] transition-colors duration-300" type="submit">
        Create Tournament
      </button>
    </form>
  );
};

export default TournamentForm;