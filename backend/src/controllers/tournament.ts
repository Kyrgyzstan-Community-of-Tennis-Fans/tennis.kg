import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Tournament } from '../model/Tournament';
import { format } from 'date-fns';

export const getTournaments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: Record<string, unknown> = {};
    const dateFormat = 'dd.MM.yy';

    if (req.query.rank && req.query.rank !== 'all') {
      filter.rank = req.query.rank;
    }

    const tournaments = await Tournament.find(filter).sort({ eventDate: 1 }).lean();
    const tournamentsByMonth: Record<number, Array<Record<string, any>>> = {};

    for (let month = 1; month <= 12; month++) {
      tournamentsByMonth[month] = [];
    }

    tournaments.forEach((tournament) => {
      const month = tournament.eventDate.getMonth() + 1;
      const formattedTournament = {
        ...tournament,
        eventDate: format(tournament.eventDate, dateFormat),
      };

      if (!tournamentsByMonth[month]) tournamentsByMonth[month] = [];
      tournamentsByMonth[month].push(formattedTournament);
    });

    return res.send(tournamentsByMonth);
  } catch (error) {
    return next(error);
  }
};

export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, participants, eventDate, category, rank, resultsLink, registrationLink } = req.body;

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
    const { name, participants, eventDate, category, rank, resultsLink, registrationLink, regulationsDoc } = req.body;

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
