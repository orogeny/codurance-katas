for a game, we need to know the size of the board (min: 4 x 4)

for each player we need...

1. their name

2. the location of their fleet:
   a) location of their carrier
   b) locations of their two destroyers
   c) locations of their four gunships

   A location needs to by (x, y) + orientation: horizontal | vertical
   Valid location coords are 0 to board width - ship length

Ship details:
type length quantity
Carrier 4 1
Destroyer 3 2
Gunship 1 4

NB we also need to check that no ship overlaps any ships already located

Game
once we have two players setup we can begin the game.

a player fires a torpedo with coords - we should note its location and what it hit: nothing or which ship
a) miss = 'o'
b) hit = 'x' - when a ship is covered by 'x's it has been sunk

at the end of both players' turns, check whether all either of the players ships have been sunk
if not then move to next turn
otherwise, produce report summarising each player's performance.

- this should include a matrix with squares marked with:
- blank - no ship and never targetted
- c,d,g - squares a ship occupies
- o - missed shots
- x - hit
- X - ship sunk
