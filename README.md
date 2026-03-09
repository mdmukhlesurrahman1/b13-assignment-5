
    - 1️⃣ What is the difference between var, let, and const?

        Ans: 
        var: Function-scoped, hoisted, can be redeclared and updated.
        let: Block-scoped, hoisted (not initialized), cannot be redeclared, can be updated.
        const: Block-scoped, hoisted (not initialized), cannot be redeclared or updated.

    - 2️⃣ What is the spread operator (...)?
         Ans: 
         The spread operator (...) expands elements of arrays and strings or properties of objects into individual values.

    - 3️⃣ What is the difference between map(), filter(), and forEach()?
        Ans:
        The primary difference between map(), filter(), and forEach() is how they handle the return value and their core purpose:

        * forEach() is for performing an action on each element and returns undefined.
        * map() is for transforming each element into a new value and returns a new array of the same size  with the transformed elements.
        * filter() is for selecting a subset of elements based on a condition and returns a new array with only the elements that pass the test.

    - 4️⃣ What is an arrow function?
        Ans:
        Arrow function is a shorter syntax function.  (parameters) => expression
        If there is only one parameter, parentheses are optional (x => x * x). If the body has a single expression, curly braces and return can be ignore.

    - 5️⃣ What are template literals?
        Ans:
        Template literals are JavaScript string literals introduced in ES6 that allow for easier string interpolation and multi-line strings, enclosed by backticks (`) instead of quotes.

        Benefits:
        - String Interpolation: You can directly embed variables or expressions within strings using the ${variable} syntax.

        - Multi-line Strings: Unlike regular strings, template literals can span multiple lines without needing special characters or concatenation.

        - Tagged Templates: A more advanced form that allows you to parse template literals with a function, useful for custom string formatting or sanitization.

        - Readability: They improve code maintainability by reducing the need for plus signs (+) for concatenation. 