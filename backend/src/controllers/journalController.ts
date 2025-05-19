import { Request, Response } from 'express';
import Journal from '../models/Journal';

// Create a new journal entry
export const createJournal = async (req: Request, res: Response) => {
  try {
    const { title, content, mood, date } = req.body;
    
    const journal = await Journal.create({
      user: req.user?.id,
      title,
      content,
      mood,
      date: date || new Date(),
    });

    res.status(201).json({
      success: true,
      data: journal,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while creating journal entry',
    });
  }
};

// Get all journal entries for a user
export const getUserJournals = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, mood } = req.query;
    
    const query: any = { user: req.user?.id };
    
    // Add date range filter if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }
    
    // Add mood filter if provided
    if (mood) {
      query.mood = mood;
    }
    
    const journals = await Journal.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: journals.length,
      data: journals,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching journal entries',
    });
  }
};

// Get a single journal entry
export const getJournal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const journal = await Journal.findById(id);
    
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found',
      });
    }
    
    // Check if journal belongs to user
    if (journal.user.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this journal entry',
      });
    }

    res.status(200).json({
      success: true,
      data: journal,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching journal entry',
    });
  }
};
