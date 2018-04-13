'use strict';


const GRID_SIZE = 20;
const MAG_COUNT =5;
let mags=[];








//printPlan();



class Mage {
    constructor(xy) {
        this.xy = xy;

    }

    move(dir) {
        if (dir.validate()) {
            let cellxy = new XY(this.xy.x, this.xy.y);
            cellxy.add(dir);
            if (level.getCell(cellxy) == " ") {
                this.xy = cellxy;
            }
            
        }
    }
    is_there(xy)
    {
        return (xy.x==this.xy.x)&&(xy.y==this.xy.y);
    }

}

class XY {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x == other.x && this.y == other.y;
    }

    add(xy) {
        this.x += xy.x;
        this.y += xy.y;
    }
}





class Level
{
    constructor()
    {
        this.plan = `
#########################################
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#                                       #
#########################################`;

this.plan = this.plan.trim().split('\n');

this.planW = this.plan[0].length;
this.planH = this.plan.length;
    }
    /**
 * @param {XY} xy 
 */
    getCell(xy)
    {
        for(let i=0;i<mags.length;i++)
        {
            if (mags[i].is_there(xy))
            {
                return 'M';
            }
            
        }
        return this.plan[xy.y][xy.x];
    }

     
}

class Game 
{
    constructor()
    {
        this.turns=50;
    }
     mageCreator()
{

    for(let i=0;i<MAG_COUNT;i++)
    {
        let xx=getRandomInRange(1,level.planW-1);
        let yy=getRandomInRange(1,level.planH-1);
        while (level.getCell(new XY(xx,yy))!=' ')
        {
            xx=getRandomInRange(1,level.planW-1);
            yy=getRandomInRange(1,level.planH-1);
        }
        mags[i]=new Mage(new XY(xx,yy));
    }
}
 randome_turn(mage)
{
    let com=getRandomInRange(1,4);
    switch (com)
    {
        case 1:mags[mage].move(new Direction(-1,0)); break;
        case 2: mags[mage].move(new Direction(0,1));break;
        case 3:mags[mage].move(new Direction(1,0));break;
        case 4: mags[mage].move(new Direction(0,-1));break;
    }
}

play()
{   
    htmllevel.drawPlan();
    this.mageCreator();
    for(let i=0;i<mags.length;i++)
    {
        htmllevel.drawMage(mags[i],i);
    }
    for (let i=0;i<this.turns;i++)
    {
        let maked_turn=[];
        let maked_turn_count=0;
        while (maked_turn_count<MAG_COUNT)
        {
            let whose_turn=getRandomInRange(0,MAG_COUNT-1);
            let flag=0;
            for (let j=0;j<maked_turn_count;j++)
            {
                if (maked_turn[j]==whose_turn)
                {
                    flag=1;
                }
            }
            if (flag==0)
            {
                maked_turn_count+=1;
                maked_turn[maked_turn_count-1]=whose_turn;
                this.randome_turn(whose_turn);
                htmllevel.drawMage(mags[whose_turn]);

            }
        }
        

    }
}


}


class HtmlLevel extends Level
{
     drawPlan() {
        let planDiv = document.getElementById('plan');
        planDiv.style.width = this.planW * GRID_SIZE + 'px';
        planDiv.style.height = this.planH * GRID_SIZE + 'px';
    
        for (let i = 0; i < this.planH; i++) {
            for (let j = 0; j < this.planW; j++) {
                if (this.plan[i][j] == '#') {
                    let wall = document.createElement('div');
                    wall.style.width = GRID_SIZE + 'px';
                    wall.style.height = GRID_SIZE + 'px';
                    wall.style.backgroundColor = 'grey';
                    wall.style.position = 'absolute';
                    wall.style.top = i * GRID_SIZE + 'px';
                    wall.style.left = j * GRID_SIZE + 'px';
                    planDiv.appendChild(wall);
                }
            }
        }
    }

    drawMage(mage,id) {
        let planDiv = document.getElementById('plan');
        let mageDiv=document.getElementById('mage '+id);
        if (!mageDiv)
        {
            let color;
            let col=getRandomInRange(1,10);
            switch (col)
            {
                case 1:color="orange";break;
                case 2: color="gray";break;
                case 3:color="black";break;
                case 4: color="blue";break;
                case 5:color="green";break;
                case 6:color="yellow";break;
                case 7: color="pink";break;
                case 8:color="red";break;
                case 9: color="salmon";break;
                case 5:color="beige";break;
            }
            mageDiv = document.createElement('div');
            mageDiv.className="mage";
            mageDiv.id="mage "+id;
            // mageDiv.backgroundColor=color;
            planDiv.appendChild(mageDiv);
        }
        
        mageDiv.style.width = GRID_SIZE + 'px';
        mageDiv.style.height = GRID_SIZE + 'px';
        mageDiv.style.top = mage.xy.y * GRID_SIZE + 'px';
        mageDiv.style.left = mage.xy.x * GRID_SIZE + 'px';        
    }

}

function getRandomInRange(min, max) 
{
    Math.random();
    Math.random();
    Math.random();
    Math.random();
    Math.random();
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}



class Direction extends XY {
    validate() {
        return Math.abs(this.x) <= 1 && Math.abs(this.y) <= 1;
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }






let level=new Level();
let htmllevel=new HtmlLevel();


// function keyMove(mage) {
//     let com = prompt('Make turn: ');
//     com = com.toLowerCase();
//     switch (com) {
//         case 'a':
//             mage.move(new Direction(-1, 0));
//             break;
//         case 's':
//             mage.move(new Direction(0, 1));
//             break;
//         case 'd':
//             mage.move(new Direction(1, 0));
//             break;
//         case 'w':
//             mage.move(new Direction(0, -1));
//             break;
//         case 'q':
//             throw 'Stop the game';
//     }
//     drawMage(mage);
// }





// let xy = new XY(1, 2);
// let dir = new Direction(1, 0);

// let mage1 = new Mage(xy);

// drawPlan();
// drawMage(mage1);

// const MAX_TURN = 100;
// let turn = 0;

// function makeTurn() {
//     try {
//         keyMove(mage1);
//         turn++;
//         if (turn <= MAX_TURN) {
//             setTimeout(makeTurn, 200);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

// setTimeout(makeTurn, 0);






// /**

// function move(dir) {
//     if (dir.validate()) {
//         if (plan[mageY + dir.y][mageX + dir.x] == ' ') {
//             mageX += dir.x;
//             mageY += dir.y;
//         }
//     }
// }

// function moveLeft() {
//     if (plan[mageY][mageX - 1] == ' ') {
//         mageX--;
//     }
//     printPlan();
// }

// function moveRight() {
//     if (plan[mageY][mageX + 1] == ' ') {
//         mageX++;
//     }
//     printPlan();
// }