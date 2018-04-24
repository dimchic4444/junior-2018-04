'use strict';

class StrategyPurpleTeam1 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1), new Direction(1, 1), new Direction(1, -1), new Direction(-1, 1), new Direction(1, -1)];        let mage;

        for (let x of state.mages) {
            if ( x.id == this.id ) {
                mage=x;
                break;
            }
        }

        let coor = mage.xy;

        let target_mage;
        let step=0;
        let steps_to_mage;
        let steps_to_spell;
        let target_spell;
        let target_bottle;
        let steps_to_bottle;

        for (let d of dir) {
            step=0;
            let new_coor = coor;
            
            top:
            while ( true ) {
                step++;
                new_coor = new_coor.add(d);
                if ( level.getCell(state, new_coor) != Cell.EMPTY ) {
                   
                    if ( (level.getCell(state, new_coor) instanceof Mage)  && (level.getCell(state, new_coor).teamId!="Purple team")&&(mage.mana>=10)&&(level.getCell(state, new_coor).status!=Status.DEAD)) {
                        target_mage = d;
                        steps_to_mage=step;
                    } else if ( level.getCell(state, new_coor) instanceof FireballSpell ) {
                        target_spell = d;
                        steps_to_spell=step;
                    }
                    else if (level.getCell(state, new_coor) instanceof Bottle)
                    {
                        target_bottle=d;
                        steps_to_bottle=step;

                    }
                    break top;
                }
            }
        }
        console.log(step);
        if (target_mage && steps_to_mage<=12) {
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = target_mage;
            
        } else if (target_bottle&&(steps_to_bottle==1))
        {
            action.type = ActionType.MOVE;
            action.dir = target_bottle;
        }
        
        
        
        else if (target_spell && steps_to_spell<=12) {
            if ( target_spell == dir[0] || target_spell == dir[1] ) {
                if ( level.getCell(state,coor.add(dir[2])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[2];
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[3];
                }
            } else if ( target_spell == dir[2] || target_spell == dir[3] ) {
                if ( level.getCell(state,coor.add(dir[0])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[0];                
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[1];
                }
            } 
        } else {  
            let n = Math.floor(Math.random() * dir.length);
            action.type = ActionType.MOVE;
            action.dir = dir[n]; 
        }     
        return action;  
    }

}


class StrategyPurpleTeam2 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1), new Direction(1, 1), new Direction(1, -1), new Direction(-1, 1), new Direction(1, -1)];        let mage;

        for (let x of state.mages) {
            if ( x.id == this.id ) {
                mage=x;
                break;
            }
        }

        let coor = mage.xy;

        let target_mage;
        let step=0;
        let steps_to_mage;
        let steps_to_spell;
        let target_spell;
        let target_bottle;
        let steps_to_bottle;

        for (let d of dir) {
            step=0;
            let new_coor = coor;
            
            top:
            while ( true ) {
                step++;
                new_coor = new_coor.add(d);
                if ( level.getCell(state, new_coor) != Cell.EMPTY ) {
                   
                    if ( (level.getCell(state, new_coor) instanceof Mage)  && (level.getCell(state, new_coor).teamId!="Purple team")&&(mage.mana>=10)&&(level.getCell(state, new_coor).status!=Status.DEAD)) {
                        target_mage = d;
                        steps_to_mage=step;
                    } else if ( level.getCell(state, new_coor) instanceof FireballSpell ) {
                        target_spell = d;
                        steps_to_spell=step;
                    }
                    else if (level.getCell(state, new_coor) instanceof Bottle)
                    {
                        target_bottle=d;
                        steps_to_bottle=step;

                    }
                    break top;
                }
            }
        }
        console.log(step);
        if (target_mage && steps_to_mage<=12) {
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = target_mage;
            
        } else if (target_bottle&&(steps_to_bottle==1))
        {
            action.type = ActionType.MOVE;
            action.dir = target_bottle;
        }
        
        
        
        else if (target_spell && steps_to_spell<=12) {
            if ( target_spell == dir[0] || target_spell == dir[1] ) {
                if ( level.getCell(state,coor.add(dir[2])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[2];
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[3];
                }
            } else if ( target_spell == dir[2] || target_spell == dir[3] ) {
                if ( level.getCell(state,coor.add(dir[0])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[0];                
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[1];
                }
            } 
        } else {  
            let n = Math.floor(Math.random() * dir.length);
            action.type = ActionType.MOVE;
            action.dir = dir[n]; 
        }     
        return action;  
    }
}


class StrategyPurpleTeam3 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1), new Direction(1, 1), new Direction(1, -1), new Direction(-1, 1), new Direction(1, -1)];        let mage;

        for (let x of state.mages) {
            if ( x.id == this.id ) {
                mage=x;
                break;
            }
        }

        let coor = mage.xy;

        let target_mage;
        let step=0;
        let steps_to_mage;
        let steps_to_spell;
        let target_spell;
        let target_bottle;
        let steps_to_bottle;

        for (let d of dir) {
            step=0;
            let new_coor = coor;
            
            top:
            while ( true ) {
                step++;
                new_coor = new_coor.add(d);
                if ( level.getCell(state, new_coor) != Cell.EMPTY ) {
                   
                    if ( (level.getCell(state, new_coor) instanceof Mage)  && (level.getCell(state, new_coor).teamId!="Purple team")&&(mage.mana>=10)&&(level.getCell(state, new_coor).status!=Status.DEAD)) {
                        target_mage = d;
                        steps_to_mage=step;
                    } else if ( level.getCell(state, new_coor) instanceof FireballSpell ) {
                        target_spell = d;
                        steps_to_spell=step;
                    }
                    else if (level.getCell(state, new_coor) instanceof Bottle)
                    {
                        target_bottle=d;
                        steps_to_bottle=step;

                    }
                    break top;
                }
            }
        }
        console.log(step);
        if (target_mage && steps_to_mage<=12) {
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = target_mage;
            
        } else if (target_bottle&&(steps_to_bottle==1))
        {
            action.type = ActionType.MOVE;
            action.dir = target_bottle;
        }
        
        
        
        else if (target_spell && steps_to_spell<=12) {
            if ( target_spell == dir[0] || target_spell == dir[1] ) {
                if ( level.getCell(state,coor.add(dir[2])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[2];
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[3];
                }
            } else if ( target_spell == dir[2] || target_spell == dir[3] ) {
                if ( level.getCell(state,coor.add(dir[0])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[0];                
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[1];
                }
            } 
        } else {  
            let n = Math.floor(Math.random() * dir.length);
            action.type = ActionType.MOVE;
            action.dir = dir[n]; 
        }     
        return action;  
    }
}


class StrategyPurpleTeam4 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1), new Direction(1, 1), new Direction(1, -1), new Direction(-1, 1), new Direction(1, -1)];        let mage;

        for (let x of state.mages) {
            if ( x.id == this.id ) {
                mage=x;
                break;
            }
        }

        let coor = mage.xy;

        let target_mage;
        let step=0;
        let steps_to_mage;
        let steps_to_spell;
        let target_spell;
        let target_bottle;
        let steps_to_bottle;

        for (let d of dir) {
            step=0;
            let new_coor = coor;
            
            top:
            while ( true ) {
                step++;
                new_coor = new_coor.add(d);
                if ( level.getCell(state, new_coor) != Cell.EMPTY ) {
                   
                    if ( (level.getCell(state, new_coor) instanceof Mage)  && (level.getCell(state, new_coor).teamId!="Purple team")&&(mage.mana>=10)&&(level.getCell(state, new_coor).status!=Status.DEAD)) {
                        target_mage = d;
                        steps_to_mage=step;
                    } else if ( level.getCell(state, new_coor) instanceof FireballSpell ) {
                        target_spell = d;
                        steps_to_spell=step;
                    }
                    else if (level.getCell(state, new_coor) instanceof Bottle)
                    {
                        target_bottle=d;
                        steps_to_bottle=step;

                    }
                    break top;
                }
            }
        }
        console.log(step);
        if (target_mage && steps_to_mage<=12) {
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = target_mage;
            
        } else if (target_bottle&&(steps_to_bottle==1))
        {
            action.type = ActionType.MOVE;
            action.dir = target_bottle;
        }
        
        
        
        else if (target_spell && steps_to_spell<=12) {
            if ( target_spell == dir[0] || target_spell == dir[1] ) {
                if ( level.getCell(state,coor.add(dir[2])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[2];
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[3];
                }
            } else if ( target_spell == dir[2] || target_spell == dir[3] ) {
                if ( level.getCell(state,coor.add(dir[0])) == Cell.EMPTY ) {
                    action.type = ActionType.MOVE;
                    action.dir = dir[0];                
                } else {
                    action.type = ActionType.MOVE;
                    action.dir = dir[1];
                }
            } 
        } else {  
            let n = Math.floor(Math.random() * dir.length);
            action.type = ActionType.MOVE;
            action.dir = dir[n]; 
        }     
        return action;  
    }
}