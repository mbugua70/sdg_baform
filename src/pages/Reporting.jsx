import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { fetchTeams, fetchGames, submitPoints } from '../util/api';
import './Reporting.css';

function Reporting() {
  const [formData, setFormData] = useState({
    teamId: '',
    gameId: '',
    points: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showConfirm, setShowConfirm] = useState(false);

  const player = JSON.parse(localStorage.getItem('player') || '{}');

  const { data: teams = [], isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });

  const { data: games = [], isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  const reportMutation = useMutation({
    mutationFn: submitPoints,
    onSuccess: () => {
      setMessage({ type: 'success', text: 'Points submitted successfully!' });
      setFormData({ teamId: '', gameId: '', points: '' });
    },
    onError: (err) => {
      setMessage({ type: 'error', text: err.message });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    reportMutation.mutate({
      player_id: Number(player.id),
      team_id: Number(formData.teamId),
      game_id: Number(formData.gameId),
      points: Number(formData.points),
    });
  };

  const selectedTeam = teams.find((t) => String(t.id) === formData.teamId);
  const selectedGame = games.find((g) => String(g.id) === formData.gameId);

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.team_name,
  }));

  const gameOptions = games.map((game) => ({
    value: game.id,
    label: game.game_name,
  }));

  return (
    <div className="reporting-container">
      <div className="reporting-card">
        <h1>Report Points</h1>
        {player.full_name && <p className="welcome-text">Welcome, {player.full_name}</p>}
        <form onSubmit={handleSubmit} className="reporting-form">
          <FormSelect
            label="Team"
            name="teamId"
            value={formData.teamId}
            onChange={handleChange}
            options={teamOptions}
            placeholder="Select a team"
            required
            isLoading={teamsLoading}
          />
          {teamsError && <p className="error-message">Failed to load teams</p>}
          <FormSelect
            label="Game"
            name="gameId"
            value={formData.gameId}
            onChange={handleChange}
            options={gameOptions}
            placeholder="Select a game"
            required
            isLoading={gamesLoading}
          />
          {gamesError && <p className="error-message">Failed to load games</p>}
          <FormInput
            label="Points"
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            placeholder="Enter points"
            required
          />
          {message.text && (
            <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </p>
          )}
          <button type="submit" className="submit-button" disabled={reportMutation.isPending}>
            {reportMutation.isPending ? 'Submitting...' : 'Submit Points'}
          </button>
        </form>
      </div>
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Submission</h2>
            <div className="modal-details">
              <p><strong>Team:</strong> {selectedTeam?.team_name}</p>
              <p><strong>Game:</strong> {selectedGame?.game_name}</p>
              <p><strong>Points:</strong> {formData.points}</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reporting;
