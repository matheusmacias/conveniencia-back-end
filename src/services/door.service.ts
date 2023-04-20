import axios from 'axios';
import { injectable } from "inversify";
import HttpStatus from 'http-status-codes';


import IResult from "../interfaces/IResults.interface";
import { handleError } from '../err/handle.err';

@injectable()
export default class DoorService{
    public async openDoor({authToken}:{authToken: string}): Promise<IResult>{
        try {
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGhldXMgTWFjaWFzIn0.hsf8_qXXPRCR8PoZSpEtq5NjN0J-OjuYpKkBkhIH2m0';
            await axios.get('http://10.10.80.222',{
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