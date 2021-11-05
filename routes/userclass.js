'use strict';

class User {
    constructor(name, status, avatar, moodcheck, isLead){
        this.name = name;
        this.status = status;
        this.avatar = avatar;
        this.moodcheck = moodcheck;
        this.isLead = isLead;
    }
}

const testUser = new User('Rachel', true, 'puppy', ['happy'], false);

class RetroLead extends User{
    constructor(name, status, avatar, moodcheck, isLead){
        this.name = name;
        this.status = status;
        this.avatar = avatar;
        this.moodcheck = moodcheck;
        this.isLead = true;
    }
}

const retroLead = new RetroLead('Leanne', true, 'alligator', ['happy'], true);

class Participant extends User{
    constructor(name, status, avatar, moodcheck, isLead){
        this.name = name;
        this.status = status;
        this.avatar = avatar;
        this.moodcheck = moodcheck;
        this.isLead = false;
    }
}

const participant = new Participant('Pardi', true, 'seagull', ['happy'], false);

