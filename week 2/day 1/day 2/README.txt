# week 2 - Day 2

## Name
Ahtesham Ali

## What I Learned

-	Mastering Array Transformations: Effectively used .map() , .filter() ,and .reduce() to traverse multiple levels of nested data (e.g., Project → Employee →Tasks).
-	Data Filtering & Validation: Implemented logic to strictly include only "completed" status items, ensuring financial and performance metrics remain accurate.
-	Advanced Conditionals: Learned to use methods like .every() and .some() to identify specific subsets, such as drivers with exclusively incomplete rides.
-	Unique Identification: Gained experience in deduplicating data when extracting flat lists of entities (employees) across multiple parent objects (projects).


## Challenges Faced

-	Deeply Nested Iteration: Managing three levels of nesting required careful focus to avoid "callback hell" and maintain code readability.
-	Calculation Precision: Calculating average ratings while ignoring incomplete rides required implementing checks to prevent division by zero for new or inactive users.
-	Resource Allocation Logic: Identifying "hardworking" employees across all projects involved aggregating data from different root objects, necessitating a temporary data map to track cumulative hours.
-	Efficiency in Large Datasets: Designing the logic to be performant even as the dataset grows "large and messy" by minimizing unnecessary iterations.
