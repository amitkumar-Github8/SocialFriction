import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { mockRewards, mockUserCredits, mockPurchaseHistory } from '../utils/mockData';

export class RewardsController {
    /**
     * Get all available rewards
     */
    public async getRewards(req: Request, res: Response): Promise<void> {
        try {
            // Return mock rewards data
            res.status(200).json({
                rewards: mockRewards
            });
        } catch (error) {
            console.error('Get rewards error:', error);
            res.status(500).json({ message: 'Server error while fetching rewards' });
        }
    }

    /**
     * Get user's credit balance
     */
    public async getCredits(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore - We'll add the user property to the request in the auth middleware
            const userId = req.user.id;

            // Get credits from mock data
            const credits = mockUserCredits[userId] || 0;

            res.status(200).json({
                credits
            });
        } catch (error) {
            console.error('Get credits error:', error);
            res.status(500).json({ message: 'Server error while fetching credits' });
        }
    }

    /**
     * Earn credits
     */
    public async earnCredits(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore - We'll add the user property to the request in the auth middleware
            const userId = req.user.id;
            const { amount, reason } = req.body;

            if (!amount || amount <= 0) {
                res.status(400).json({ message: 'Invalid amount' });
                return;
            }

            // Update mock credits
            if (!mockUserCredits[userId]) {
                mockUserCredits[userId] = 0;
            }
            mockUserCredits[userId] += amount;

            res.status(200).json({
                message: `Earned ${amount} credits for ${reason}`,
                credits: mockUserCredits[userId]
            });
        } catch (error) {
            console.error('Earn credits error:', error);
            res.status(500).json({ message: 'Server error while earning credits' });
        }
    }

    /**
     * Purchase a reward
     */
    public async purchaseReward(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore - We'll add the user property to the request in the auth middleware
            const userId = req.user.id;
            const { rewardId } = req.body;

            // Find the reward
            const reward = mockRewards.find(r => r.id === rewardId);
            if (!reward) {
                res.status(404).json({ message: 'Reward not found' });
                return;
            }

            // Check if user has enough credits
            const userCredits = mockUserCredits[userId] || 0;
            if (userCredits < reward.cost) {
                res.status(400).json({ message: 'Not enough credits' });
                return;
            }

            // Deduct credits
            mockUserCredits[userId] -= reward.cost;

            // Add to purchase history
            const purchaseId = (mockPurchaseHistory.length + 1).toString();
            mockPurchaseHistory.push({
                id: purchaseId,
                userId,
                rewardId,
                rewardName: reward.name,
                cost: reward.cost,
                purchaseDate: new Date()
            });

            res.status(200).json({
                message: `Successfully purchased ${reward.name}`,
                credits: mockUserCredits[userId],
                reward
            });
        } catch (error) {
            console.error('Purchase reward error:', error);
            res.status(500).json({ message: 'Server error while purchasing reward' });
        }
    }

    /**
     * Get purchase history
     */
    public async getPurchaseHistory(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore - We'll add the user property to the request in the auth middleware
            const userId = req.user.id;

            // Get purchase history from mock data
            const history = mockPurchaseHistory.filter(p => p.userId === userId);

            res.status(200).json({
                history
            });
        } catch (error) {
            console.error('Get purchase history error:', error);
            res.status(500).json({ message: 'Server error while fetching purchase history' });
        }
    }
}