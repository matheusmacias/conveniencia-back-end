import IResult from "../interfaces/IResults.interface";

class DoorService{
    public openDoor(): Promise<IResult>{
        return Promise.resolve({
            status: 200,
            message: 'Porta aberta',
        });
    }
}

export default new DoorService();