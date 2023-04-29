import axios from 'axios';
import { injectable } from "inversify";
import HttpStatus from 'http-status-codes';


import IResult from "../interfaces/IResults.interface";
import { handleError } from '../err/handle.err';

@injectable()
export default class DoorService{
    public async openDoor({authToken}:{authToken: string}): Promise<IResult>{
        try {
            console.log(authToken);
            await axios.get('http://10.10.80.220',{
                timeout:5000,
                headers:{
                    
                    Authorization: `Bearer ${authToken}`
                }
            });
            return{
                status: HttpStatus.OK,
                message: 'Porta aberta!'
            }
        } catch (error) {
            return handleError(error);
        }
    }
}