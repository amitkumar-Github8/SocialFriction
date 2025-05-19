import { Request, Response } from 'express';
import Goal from '../models/Goal';

// Create a new goal
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { platform, targetTimePerDay, startDate, endDate } = req.body;
    
    const goal = await Goal.create({
      user: req.user?.id,
      platform,
      targetTimePerDay,
      startDate: startDate || new Date(),
      endDate,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while creating goal',
    });
  }
};

// Get all goals for a user
export const getUserGoals = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    
    const query: any = { user: req.user?.id };
    
    // Add isActive filter if provided
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const goals = await Goal.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching goals',
    });
  }
};

// Update a goal
export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { targetTimePerDay, endDate, isActive } = req.body;
    
    const goal = await Goal.findById(id);
    
    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }
    
    // Check if goal belongs to user
    if (goal.user.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this goal',
      });
    }
    
    // Update goal
    goal.targetTimePerDay = targetTimePerDay || goal.targetTimePerDay;
    goal.endDate = endDate ? new Date(endDate) : goal.endDate;
    goal.isActive = isActive !== undefined ? isActive : goal.isActive;
    
    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while updating goal',
    });
  }
};
