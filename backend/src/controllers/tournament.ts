import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Tournament } from '../model/Tournament';
import { format } from 'date-fns';

export const getTournaments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const CURRENT_YEAR = new Date().getFullYear();
    const NEXT_YEAR = CURRENT_YEAR + 1;
    const PREVIOUS_YEAR = CURRENT_YEAR - 1;
    const dateFormat = 'dd.MM.yy';

    const filter: Record<string, unknown> = {};
    if (req.query.rank && req.query.rank !== 'all') {
      filter.rank = req.query.rank;
    }

    const tournaments = await Tournament.find(filter).sort({ eventDate: 1 }).lean();

    const tournamentsByYear: Record<string, Record<number, Array<Record<string, any>>>> = {
      previousYear: {},
      currentYear: {},
      nextYear: {},
    };

    const initializeMonths = () => {
      const months: Record<number, Array<Record<string, any>>> = {};
      for (let month = 1; month <= 12; month++) {
        months[month] = [];
      }
      return months;
    };

    tournamentsByYear.previousYear = initializeMonths();
    tournamentsByYear.currentYear = initializeMonths();
    tournamentsByYear.nextYear = initializeMonths();

    tournaments.forEach((tournament) => {
      const eventDate = new Date(tournament.eventDate);
      const tournamentYear = eventDate.getFullYear();
      const month = eventDate.getMonth() + 1;

      const formattedTournament = {
        ...tournament,
        eventDate: format(eventDate, dateFormat),
      };

      if (tournamentYear === PREVIOUS_YEAR) {
        tournamentsByYear.previousYear[month].push(formattedTournament);
      } else if (tournamentYear === CURRENT_YEAR) {
        tournamentsByYear.currentYear[month].push(formattedTournament);
      } else if (tournamentYear === NEXT_YEAR) {
        tournamentsByYear.nextYear[month].push(formattedTournament);
      }
    });

    return res.send(tournamentsByYear);
  } catch (error) {
    return next(error);
  }
};

export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, participants, eventDate, category, rank, resultsLink, registrationLink, tournamentYear } = req.body;

    const [day, month, year] = eventDate.split('.').map((part: string) => part.padStart(2, '0'));
    const formattedEventDate = new Date(Number(year) + 2000, Number(month) - 1, Number(day));

    const tournament = await Tournament.create({
      name,
      participants: parseFloat(participants),
      eventDate: formattedEventDate,
      category,
      rank,
      regulationsDoc: req.file ? req.file.filename : null,
      resultsLink,
      registrationLink,
      tournamentYear: parseFloat(tournamentYear),
    });

    return res.send(tournament);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};

export const deleteTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const existingTournament = await Tournament.findById(id);

    if (!existingTournament) {
      return res.status(404).send({ error: 'Tournament not found' });
    }

    await Tournament.findByIdAndDelete(id);

    return res.send({ message: 'Tournament deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      name,
      participants,
      eventDate,
      category,
      rank,
      resultsLink,
      registrationLink,
      regulationsDoc,
      tournamentYear,
    } = req.body;

    const [day, month, year] = eventDate.split('.').map((part: string) => part.padStart(2, '0'));
    const formattedEventDate = new Date(Number(year) + 2000, Number(month) - 1, Number(day));

    const updatedData: Record<string, unknown> = {
      name,
      participants: parseFloat(participants),
      eventDate: formattedEventDate,
      category,
      rank,
      resultsLink,
      registrationLink,
      tournamentYear: parseFloat(tournamentYear),
    };

    if (regulationsDoc === 'null') {
      updatedData.regulationsDoc = null;
    } else if (req.file) {
      updatedData.regulationsDoc = req.file.filename;
    }

    const tournament = await Tournament.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!tournament) {
      return res.status(404).send({ error: 'Tournament not found' });
    }

    return res.send(tournament);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
};
