import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { statusModel } from '../models/status';
import * as statusService from '../services/status';

const NAMESPACE = 'status/controller';

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Updating Status");
    const status: statusModel = req.body;
    
    try{
        //call service layer to execute call
        const result = await statusService.updateStatus(status);

        return res.status(200).json({
            status: 200,
            message: "Status Updated Successfully"
        })

    } catch(e){
        return res.status(500).json(e);
    }

}

const deleteStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Deleting Status");
    const status: statusModel = req.body;
    
    try{
        //call service layer to execute call
        const result = await statusService.deleteStatus(status);

        return res.status(200).json({
            status: 200,
            message: "Status Deleted Successfully"
        })

    } catch(e){
        return res.status(500).json(e);
    }
}

const getStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Fetching Status");
    const status: statusModel = req.body;
    
    try{
        //call service layer to execute call
        const result = await statusService.getStatus(status);

        return res.status(200).json(JSON.parse(JSON.stringify(result)));

    } catch(e){
        return res.status(500).json(e);
    }
}

const getAllStatus = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Fetching All Status");
    const status: statusModel = req.body;
    
    try{
        //call service layer to execute call
        const result = await statusService.getAllStatus(status);

        return res.status(200).json(JSON.parse(JSON.stringify(result)));

    } catch(e){
        return res.status(500).json(e);
    }
}


export default {
    updateStatus,
    deleteStatus,
    getStatus,
    getAllStatus
}