import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  image?: string;
}

interface RewardHistory {
  id: string;
  rewardId: string;
  rewardName: string;
  date: string;
  cost: number;
}

const Rewards: React.FC = () => {
  const [focusCredits, setFocusCredits] = useState<number>(0);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [rewardHistory, setRewardHistory] = useState<RewardHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    // Fetch focus credits and available rewards when component mounts
    const fetchRewardsData = async () => {
      try {
        setLoading(true);
        const creditsResponse = await api.get('/rewards/balance');
        setFocusCredits(creditsResponse.data.balance);

        const rewardsResponse = await api.get('/rewards');
        setRewards(rewardsResponse.data);

        const historyResponse = await api.get('/rewards/history');
        setRewardHistory(historyResponse.data);

        setError('');
      } catch (err) {
        setError('Failed to fetch rewards data');
        console.error(err);
        // Set demo data if API fails
        setDemoData();
      } finally {
        setLoading(false);
      }
    };

    fetchRewardsData();
  }, []);

  const setDemoData = () => {
    setFocusCredits(150);

    const demoRewards: Reward[] = [
      {
        id: '1',
        name: 'Extra Break Time',
        description: 'Earn an additional 15 minutes of break time during your next focus session.',
        cost: 50,
        image: '🕒'
      },
      {
        id: '2',
        name: 'Premium Feature Access',
        description: 'Unlock premium features for 1 week, including advanced analytics and custom themes.',
        cost: 100,
        image: '⭐'
      },
      {
        id: '3',
        name: 'Digital Wellbeing E-Book',
        description: 'Download our exclusive e-book on digital wellbeing strategies.',
        cost: 75,
        image: '📚'
      },
      {
        id: '4',
        name: 'Charity Donation',
        description: 'We\'ll donate $5 to a digital wellbeing charity on your behalf.',
        cost: 200,
        image: '🌍'
      },
      {
        id: '5',
        name: 'Personalized Coaching Session',
        description: 'Schedule a 30-minute coaching session with a digital wellbeing expert.',
        cost: 300,
        image: '👨‍🏫'
      }
    ];

    setRewards(demoRewards);

    const demoHistory: RewardHistory[] = [
      {
        id: '1',
        rewardId: '1',
        rewardName: 'Extra Break Time',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        cost: 50
      },
      {
        id: '2',
        rewardId: '3',
        rewardName: 'Digital Wellbeing E-Book',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        cost: 75
      }
    ];

    setRewardHistory(demoHistory);
  };

  const handleRedeemReward = async (reward: Reward) => {
    if (focusCredits < reward.cost) {
      setError(`Not enough focus credits to redeem ${reward.name}`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await api.post('/rewards/redeem', { rewardId: reward.id });
      setFocusCredits(prev => prev - reward.cost);

      // Add to history
      const newHistoryItem: RewardHistory = {
        id: Date.now().toString(),
        rewardId: reward.id,
        rewardName: reward.name,
        date: new Date().toISOString(),
        cost: reward.cost
      };

      setRewardHistory(prev => [newHistoryItem, ...prev]);
      setSuccess(`Successfully redeemed ${reward.name}!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to redeem reward');
      console.error(err);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="rewards-container">
      <h2>Focus Credits & Rewards</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="credits-display">
        <h3>Your Focus Credits</h3>
        <div className="credits-amount">{focusCredits}</div>
        <p>Earn more credits by completing focus sessions!</p>
      </div>

      {loading ? (
        <div className="loading">Loading rewards...</div>
      ) : (
        <>
          <div className="rewards-section">
            <h3>Available Rewards</h3>
            <div className="rewards-list">
              {rewards.map(reward => (
                <div key={reward.id} className="reward-card">
                  {reward.image && <div className="reward-image">{reward.image}</div>}
                  <h4>{reward.name}</h4>
                  <p className="description">{reward.description}</p>
                  <div className="reward-footer">
                    <span className="cost">{reward.cost} credits</span>
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={focusCredits < reward.cost}
                      className={focusCredits < reward.cost ? 'disabled' : ''}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="history-section">
            <h3>Redemption History</h3>
            {rewardHistory.length > 0 ? (
              <div className="history-list">
                {rewardHistory.map(item => (
                  <div key={item.id} className="history-item">
                    <span className="history-date">{formatDate(item.date)}</span>
                    <span className="history-name">{item.rewardName}</span>
                    <span className="history-cost">-{item.cost} credits</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No redemption history yet.</p>
            )}
          </div>
        </>
      )}

      <div className="rewards-explanation">
        <h3>About Focus Credits</h3>
        <p>
          Focus Credits are earned by completing focus sessions and maintaining good digital habits.
          You can redeem these credits for various rewards that enhance your digital wellbeing journey.
          This gamified system helps motivate you to stay focused and mindful of your online activities.
        </p>
      </div>
    </div>
  );
};

export default Rewards;