import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { statusModel } from '../models/status';
import * as statusService from '../services/status';

const NAMESPACE = 'status/controller';

function handleStatusError(error: Error, res: Response) {
    if (error.message == "uid undefined") {
        return res.status(400).json({
            status: 400,
            message: "patientID has to be assigned a value"
        })
    } else if (error.message == "date undefined") {
        return res.status(400).json({
            status: 400,
            message: "date has to be assigned a value"
        })
    } else if (error.message == "no status") {
        return res.status(404).json({
            status: 404,
            message: "status report does not exist"
        })
    } else {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Updating Status");
    const status: statusModel = req.body;

    try {
        await statusService.updateStatus(status);

        return res.status(200).json({
            status: 200,
            message: "Status Updated Successfully"
        })

    } catch (e) {
        const err = e as Error
        return handleStatusError(err, res);
    }

}

const deleteStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Deleting Status");
    const status: statusModel = req.body;

    try {
        await statusService.deleteStatus(status);

        return res.status(200).json({
            status: 200,
            message: "Status Deleted Successfully"
        })

    } catch (e) {
        const err = e as Error
        return handleStatusError(err, res);
    }
}

const getStatus = async (req: Request, res: Response, next: NextFunction) => {
    const status: statusModel = req.body;
    logging.info(NAMESPACE, "Fetching Status");

    try {
        const result = await statusService.getStatus(status);

        return res.status(200).json({
            status: 200,
            message: "success",
            result: result
        });

    } catch (e) {
        const err = e as Error
        return handleStatusError(err, res);
    }
}

const getAllStatus = async (req: Request, res: Response, next: NextFunction) => {
    const status: statusModel = req.body;
    logging.info(NAMESPACE, "Fetching All Status");

    try {
        const result = await statusService.getAllStatus(status);

        return res.status(200).json({
            status: 200,
            message: "success",
            result: result
        });

    } catch (e) {
        const err = e as Error
        return handleStatusError(err, res);
    }
}

const getStatusByPatient = async (req: Request, res: Response, next: NextFunction) => {
    const status: statusModel = req.body;
    logging.info(NAMESPACE, "Fetching All Status for Patient "+status.patientID);

    try {
        const result = await statusService.getStatusByPatient(status);

        return res.status(200).json({
            status: 200,
            message: "Status issued by "+status.patientID,
            result: result
        });

    } catch (e) {
        const err = e as Error
        return handleStatusError(err, res);
    }
}

const getStatusByDate = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Fetching All Status for Date");
    const status: statusModel = req.body;

    try {
        const result = await statusService.getStatusByDate(status);

        return res.status(200).json({
            status: 200,
            message: "Status issued on "+status.date,
            result: result
        });

    } catch (e) {
        const err = e as Error
        return handleStatusError(err, res);
    }
}

export default {
    updateStatus,
    deleteStatus,

    getStatus,
    getAllStatus,
    getStatusByPatient,
    getStatusByDate
}