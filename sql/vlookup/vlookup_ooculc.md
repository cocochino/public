# VLOOKUP in OpenOffice Culc

VLOOKUP is a way to join two sheet in OpenOffice Culc or MS Excel.
This file explaing how to perform VLOOKUP in OpenOffice Culc.

## Syntax
**VLOOKUP(search criterion; array; Index; sort order)**

* search criterion – The value to be looked up in an array. A clue of the puzzle I want to solve.
* array – A range that contains both the "search criterion (aka, a clue, see above)" and values I'm looking for. Target data source.
* index – Index number of the column that include values I'm looking for . 
* sort order– Optional. TRUE or 1 = Ascending order. Default to TRUE. 

## Example
Let's assume that we have of 10 people distributed across 4 groups.
Workshet "team" shows each team member's ID, name, and team designation.

![Image](/sql/vlookup/team.PNG)

Worksheet "shift" shows each group's shift assignment: Early morning, AM, PM, and late night.

![Image](/sql/vlookup/shift.PNG)


We can fill shift inforamtion into team worksheet usign VLOOKUP by plugging values into VLOOKUP.
Search Criterion = Team names in worksheet "team"
Array - Worksheet "shift". It contains both team names and shift assignment.
Index - Index of Shift information column (This column contains the value I'm looking for) 

![Image](/sql/vlookup/formula.PNG)

In above example, inside of VLOOKUP shows
* search criterion = C2, or Lookup team name "RED"
* array = Worksheet is "shift" and range is A2 to B5. "$" symbol make the search sliding search.
* index = 2, or get value from the 2nd column. (Worksheet shift's 1st column is team name and 2nd column is teams' shift designation. )

![Image](/sql/vlookup/applied.PNG)


![Image](/sql/vlookup/sliding.PNG)
