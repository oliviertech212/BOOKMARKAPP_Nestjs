import { Injectable } from '@nestjs/common';

@Injectable()
export class AppllicationService {

    display(){
        console.log("wellcome to bookmark application");
        return "wellcome to bookmark application"
        
    }
}
