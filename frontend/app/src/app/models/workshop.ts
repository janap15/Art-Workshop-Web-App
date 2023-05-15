export class Workshop {
    _id : string;
    title: string;
    organizer: string;
    photo : string;
    gallery : string[];
    date: Date;
    address : string;
    description_short : string;
    description_long : string;
    number_participants : number;
    number_left : number;
    waiting : string[];
    accepted : string[];
    pending : string[];
    likes : string[];
    comments : string[];
    status : string;
    canRequest : boolean;
}