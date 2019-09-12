# VLOOKUP in OpenOffice Culc

VLOOKUP is a way to join two sheet in OpenOffice Culc or MS Excel.
This file explaing how to perform VLOOKUP in OpenOffice Culc.

## Syntax
**VLOOKUP(search criterion; array; Index; sort order)**

* search criterion – The value to be looked up in an array.
* array – A range that contains both the search criteria and value to be found. Target data source.
* index – Index number of the column that include value to be inserted. 
* sort order– TRUE or 1 = Ascending order. Default to TRUE

## Example
Let's assume that we have of 10 people distributed across 4 groups.
Workshet "team" shows each team member's ID, name, and team designation.

![Image](/sql/vlookup/team.PNG)

Worksheet "shift" shows each group's shift assignment: Early morning, AM, PM, and late night.

![Image](/sql/vlookup/shift.PNG)


We can fill shift inforamtion into team worksheet usign VLOOKUP

![Image](/sql/vlookup/formula.PNG)

In above example, inside of VLOOKUP shows
* search criterion = C2, or Lookup team name "RED"
* array = Worksheet is "shift" and range is A2 to B5. "$" symbol make the search sliding search.
* index = 2, or get value from the 2nd column. (Worksheet shift's 1st column is team name and 2nd column is teams' shift designation. )

![Image](/sql/vlookup/applied.PNG)


![Image](/sql/vlookup/sliding.PNG)
