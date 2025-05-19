import { Request, Response } from 'express';
import SocialMediaUsage from '../models/SocialMediaUsage';

// Create a new usage record
export const createUsage = async (req: Request, res: Response) => {
  try {
    const { platform, timeSpent, date } = req.body;
    
    const usage = await SocialMediaUsage.create({
      user: req.user?.id,
      platform,
      timeSpent,
      date: date || new Date(),
    });

    res.status(201).json({
      success: true,
      data: usage,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while creating usage record',
    });
  }
};

// Get all usage records for a user
export const getUserUsage = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, platform } = req.query;
    
    const query: any = { user: req.user?.id };
    
    // Add date range filter if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }
    
    // Add platform filter if provided
    if (platform) {
      query.platform = platform;
    }
    
    const usageRecords = await SocialMediaUsage.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: usageRecords.length,
      data: usageRecords,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching usage records',
    });
  }
};

// Get usage summary by platform
export const getUsageSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const matchStage: any = { user: req.user?.id };
    
    // Add date range filter if provided
    if (startDate && endDate) {
      matchStage.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }
    
    const summary = await SocialMediaUsage.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$platform',
          totalTimeSpent: { $sum: '$timeSpent' },
          averageTimeSpent: { $avg: '$timeSpent' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          platform: '$_id',
          totalTimeSpent: 1,
          averageTimeSpent: 1,
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching usage summary',
    });
  }
};
