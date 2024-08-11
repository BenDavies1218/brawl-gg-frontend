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
      await createTournament(tournamentData);
      setError(null);
      setSuccess('Tournament created successfully, redirecting to tournament list...');
      setTimeout(() => {
        navigate('/tournaments/all');
      }, 2000);
    } catch (error) {
      setError('Error occurred while creating tournament');
    }
  };

  return (
    <form className="flex flex-col justify-evenly bg-amber-400 content-center h-full w-1/2 text-center" onSubmit={handleSubmit}>
      <h4 className="text-black font-bold text-xl">Create Tournament</h4>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Tournament Name:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="text" value={tournamentName} onChange={(event) => setTournamentName(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Author:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Teams:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="text" value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Enter team name" />
        <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAddTeam(teamName)}>
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

      <label className="mx-auto text-black text-left text-lg font-bold">
        Game:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="text" value={game} onChange={(event) => setGame(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Game Stats:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="text" value={newGameStat} onChange={(event) => setNewGameStat(event.target.value)} placeholder="Add game stat" />
        <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAddGameStat(newGameStat)} >
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

      <label className="mx-auto text-black text-left text-lg font-bold">
        Game Type:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="text" value={gameType} onChange={(event) => setGameType(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Description:
        <br />
        <textarea className="text-black rounded border-black border-2 w-full" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Minimum Players:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="number" value={minimumPlayers} onChange={(event) => setMinimumPlayers(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Maximum Players:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="number" value={maximumPlayers} onChange={(event) => setMaximumPlayers(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Password:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>

      <label className="mx-auto text-black text-left text-lg font-bold">
        Is Author Player:
        <br />
        <input className="text-black rounded border-black border-2 w-full" type="checkbox" checked={isAuthorPlayer} onChange={(event) => setIsAuthorPlayer(event.target.checked)} />
      </label>

      {error && <p className="text-red-500 font-bold">{error}</p>}
      {success && <p className="text-black font-bold">{success}</p>}

      <button className="mx-auto w-fit px-5 py-2 rounded-md text-white font-bold relative bg-black" type="submit">
        Create Tournament
      </button>
    </form>
  );
};

export default TournamentForm;