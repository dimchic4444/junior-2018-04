'use strict';

class MageStrategy {
    constructor(myTeam, myId) {
        this.team = myTeam;
        this.id = myId;
    }

    init(state) {}
    turn(state) {}
}

class KeyboardMageStrategy extends MageStrategy {
    turn(state) {
        let com = prompt('Mage ' + this.id + ': ');
        let action = { id: this.id };
        switch (com) {
            case 'a':
                action.type = ActionType.MOVE;
                action.dir = new Direction(-1, 0);
                break;
            case 's':
                action.type = ActionType.MOVE;
                action.dir = new Direction(0, 1);
                break;
            case 'd':
                action.type = ActionType.MOVE;
                action.dir = new Direction(1, 0);
                break;
            case 'w':
                action.type = ActionType.MOVE;
                action.dir = new Direction(0, -1);
                break;
            case 'j':
                action.type = ActionType.CAST;
                action.spell = new FireballSpell();
                action.spell.dir = new Direction(-1, 0);
                break;
            case 'k':
                action.type = ActionType.CAST;
                action.spell = new FireballSpell();
                action.spell.dir = new Direction(0, 1);
                break;
            case 'l':
                action.type = ActionType.CAST;
                action.spell = new FireballSpell();
                action.spell.dir = new Direction(1, 0);
                break;
            case 'i':
                action.type = ActionType.CAST;
                action.spell = new FireballSpell();
                action.spell.dir = new Direction(0, -1);
                break;
            case 'q':
                throw 'Stop the game';
        }
        return action;
    }
}

class RandomMageStrategy extends MageStrategy {
    turn(state) {
        // TODO: implement throwing a Fireball spell from time to time
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1)];
        let n = Math.floor(Math.random() * dir.length);
        let chance = Math.floor(Math.random() * 100);
        if (chance < 80) {
            action.type = ActionType.MOVE;
            action.dir = dir[n];
        } else {            
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = dir[n];
        }        
        return action;
    }
    
}

class PivasMageStrategy extends MageStrategy {
    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1)];
        let mag;
        for (let x of state.mages)
        {
            if (x.id==2)
            {
                mag=x;
                break;
            }
        }
        // console.log(mag.xy.x+" "+mag.xy.y);
        let cor=mag.xy;
        
        let goal_mag;
        let goal_spell;


//Ищем объекты слева
        let cor_left=cor;
        while(1==1)
        {
            cor_left=cor_left.add(dir[0]);
            if (level.getCell(state,cor_left)!=Cell.EMPTY)
            {
                // console.log(level.getCell(state,cor_left));
                if (level.getCell(state,cor_left) instanceof Mage)
                {
                    goal_mag=dir[0];
                    console.log("MAG DETECTED!!!!!!!");
                }
                else
                if (level.getCell(state,cor_left) instanceof FireballSpell)
                {
                    goal_spell=dir[0];
                }
                break;
            }
        }

        //Ищем объекты справа
        let cor_right=cor;
        while(1==1)
        {
            cor_right=cor_right.add(dir[1]);
            if (level.getCell(state,cor_right)!=Cell.EMPTY)
            {
                // console.log(level.getCell(state,cor_left));
                if (level.getCell(state,cor_right) instanceof Mage)
                {
                    goal_mag=dir[1];
                    console.log("MAG DETECTED!!!!!!!");
                }
                else
                if (level.getCell(state,cor_left) instanceof FireballSpell)
                {
                    goal_spell=dir[1];
                }
                break;
            }
        }

        //Ищем объекты сверху
        let cor_top=cor;
        while(1==1)
        {
            cor_top=cor_top.add(dir[2]);
            if (level.getCell(state,cor_top)!=Cell.EMPTY)
            {
                // console.log(level.getCell(state,cor_left));
                if (level.getCell(state,cor_top) instanceof Mage)
                {
                    goal_mag=dir[2];
                    console.log("MAG DETECTED!!!!!!!");
                }
                else
                if (level.getCell(state,cor_left) instanceof FireballSpell)
                {
                    goal_spell=dir[2];
                }
                break;
            }
        }

        //Ищем объекты снизу
        let cor_bottom=cor;
        while(1==1)
        {
            cor_bottom=cor_bottom.add(dir[3]);
            if (level.getCell(state,cor_bottom)!=Cell.EMPTY)
            {
                // console.log(level.getCell(state,cor_left));
                if (level.getCell(state,cor_bottom) instanceof Mage)
                {
                    goal_mag=dir[3];
                    console.log("MAG DETECTED!!!!!!!");
                }
                else
                if (level.getCell(state,cor_left) instanceof FireballSpell)
                {
                    goal_spell=dir[3];
                }
                break;
            }
        }




        
        

        if (goal_mag)
        {
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = goal_mag;
        }
        else
        if (goal_spell)
        {
            if (goal_spell==dir[0]||goal_spell==dir[1])
            {
                if (level.getCell(state,cor.add(dir[2]))==Cell.EMPTY)
                {
                    action.type = ActionType.MOVE;
                    action.dir = dir[2];
                    console.log("Убежал");
                }
                else
                {
                    action.type = ActionType.MOVE;
                    action.dir = dir[3];
                    console.log("Убежал");

                }
            }
            else
            if (goal_spell==dir[2]||goal_spell==dir[3])
            {
                if (level.getCell(state,cor.add(dir[0]))==Cell.EMPTY)
                {
                    action.type = ActionType.MOVE;
                    action.dir = dir[0];
                    console.log("Убежал");

                }
                else
                {
                    action.type = ActionType.MOVE;
                    action.dir = dir[1];
                    console.log("Убежал");

                }
            }
        }
        else
        {
        
        let n = Math.floor(Math.random() * dir.length);
        let chance = Math.floor(Math.random() * 100);
        if (chance < 80) {
            action.type = ActionType.MOVE;
            action.dir = dir[n];
        } else {            
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = dir[n];
        }    
        }    
        return action;
    }
    
}