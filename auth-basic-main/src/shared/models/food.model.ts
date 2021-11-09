import * as mongoose from 'mongoose';
export interface Food {
    _id?:{type: mongoose.Types.ObjectId}
    foodName: string,
    img:string,
    foodPrice:number,
    // foodQty:number,
    
    }