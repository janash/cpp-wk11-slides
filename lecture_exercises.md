# C++ Containers Lecture Exercises

Each section in the Lecture Exercises should be completed after watching the corresponding lecture section.

## 1. Basic Vector Operations and Building 🏗️

### Motivation
Understanding how to build and modify vectors is essential for scientific programming. Unlike fixed-size arrays, vectors can grow and shrink as needed, making them perfect for collecting data when the final size isn't known in advance.

### Preparation
In lecture, we saw how `std::vector` provides dynamic sizing through methods like `.push_back()` to add elements, `.size()` to check the current number of elements, and other methods like `.clear()` and `.pop_back()` for managing the collection. We also learned that vectors automatically handle memory management.

### Exercise
Write a C++ program that:

1. Creates an empty vector of integers called `measurements`
2. Uses `.push_back()` to add the values: 15, 23, 31, 19, 27
3. Prints the size of the vector after each addition
4. Uses `.pop_back()` to remove the last element and prints the new size
5. Uses `.clear()` to empty the vector and prints the final size
6. Checks if the vector is empty using `.empty()` and prints the result

**Bonus:** Try adding elements again after clearing and observe that the vector can be reused.

**Type Safety Exploration:**
After completing the basic exercise, try adding these lines to your vector of integers and predict what will happen:

```cpp
std::vector<int> numbers;
numbers.push_back(42);        // This works fine

// Now try these - predict first, then test:
numbers.push_back(3.14);      // What happens with a double?
numbers.push_back("hello");   // What about a string?
numbers.push_back('A');       // What about a character?
```

1. **Before compiling:** Predict which lines will work, which will fail, and why
2. **Compile and run:** What actually happens? Do you get compiler errors or does it run?
3. **Explain:** Why do some types work and others don't? What does this tell you about C++ vectors?

---

## 2. Vector Safety and Bounds Checking 🛡️

### Motivation
One of the most common programming errors is accessing data outside the bounds of a container. Understanding the difference between safe and unsafe access methods helps prevent crashes and undefined behavior in your programs.

### Preparation
In lecture, we discussed how vectors provide two ways to access elements: the `[]` operator (fast but unsafe) and the `.at()` method (safe with bounds checking). We also learned about the dangers of accessing empty vectors and how this differs from languages like Python that automatically raise errors.

### Exercise
Try the following code and observe what happens:

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> data = {10, 20, 30};
    
    // Safe access within bounds
    std::cout << "Safe access: " << data.at(1) << std::endl;
    
    // What happens with out-of-bounds access using []?
    std::cout << "Unsafe access: " << data[10] << std::endl;
    
    // Print some values to see if the program continues
    std::cout << "Program continuing..." << std::endl;
    
    // Empty vector safety check
    std::vector<int> empty_vec;
    if (!empty_vec.empty()) {
        std::cout << "First element: " << empty_vec.front() << std::endl;
    } else {
        std::cout << "Vector is empty - safe check prevented error!" << std::endl;
    }
    
    return 0;
}
```

1. **Before running:** What do you expect each line to output?
2. **Run the code:** Were you surprised by any of the results? Does the program crash or continue?
3. **Experiment:** Try changing `data[10]` to `data.at(10)` - what happens? (The program may crash)
4. **Further experiment:** Remove the safety check and try accessing `empty_vec.front()` directly - what happens?
5. **Safe practice:** Write code that checks the vector size before accessing elements by index

---

## 3. Nested Vectors for 2D Data 📊

### Motivation
Many scientific applications require storing 2D data like coordinates, matrices, or grids. Nested vectors (vectors of vectors) provide a flexible way to handle such data structures, allowing for dynamic sizing in both dimensions.

### Preparation
In lecture, we learned about vectors as dynamic containers. Now we'll extend this concept to create vectors that contain other vectors, enabling us to store 2D data structures. This builds on our knowledge of safe access methods and proper iteration using `size_t`.

### Exercise
Write a C++ program that creates and manipulates a 2D coordinate system:

```cpp
#include <vector>
#include <iostream>

int main() {
    // Create a vector to store 2D coordinates (each point is {x, y})
    std::vector<std::vector<double>> coordinates;
    
    // Add some coordinate points
    coordinates.push_back({1.5, 2.3});
    coordinates.push_back({4.1, -1.2});
    coordinates.push_back({0.0, 3.7});
    coordinates.push_back({-2.1, 1.8});
    
    std::cout << "Coordinate points:" << std::endl;
    
    // Print all coordinates using nested loops with size_t
    for (size_t i = 0; i < coordinates.size(); i++) {
        std::cout << "Point " << i << ": (";
        for (size_t j = 0; j < coordinates[i].size(); j++) {
            std::cout << coordinates[i][j];
            if (j < coordinates[i].size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << ")" << std::endl;
    }
    
    // Calculate the center point (average of all coordinates)
    double sum_x = 0.0, sum_y = 0.0;
    for (size_t i = 0; i < coordinates.size(); i++) {
        sum_x += coordinates[i][0];  // x coordinate
        sum_y += coordinates[i][1];  // y coordinate
    }
    
    double center_x = sum_x / coordinates.size();
    double center_y = sum_y / coordinates.size();
    
    std::cout << "\nCenter point: (" << center_x << ", " << center_y << ")" << std::endl;
    
    return 0;
}
```

1. **Before running:** How many dimensions does this data structure have? How would you access the y-coordinate of the third point?
2. **Run and observe:** Notice how nested loops are used to iterate through 2D data
3. **Extend the program:** Add a function to calculate the distance from each point to the center point
4. **Bonus:** Create a 3x3 grid (matrix) using nested vectors and fill it with values 1-9

---

## 4. Map Safety and Key Management 🗺️

### Motivation
Key-value storage is essential for lookups, associations, and mappings in programming. Understanding the safety implications of different access methods helps prevent subtle bugs where keys are accidentally created or missing keys cause crashes.

### Preparation
In lecture, we learned that `std::map` provides dictionary-like key-value storage with automatic sorting. We saw how the `[]` operator can silently create keys with default values if they don't exist, while `.at()` provides safe access that throws an exception for missing keys. We also learned about `.find()` for checking key existence.

### Exercise
Write a C++ program that demonstrates map safety:

```cpp
#include <map>
#include <string>
#include <iostream>

int main() {
    // Create a map of programming languages to their year of creation
    std::map<std::string, int> languages;
    
    // Add some entries
    languages["C++"] = 1985;
    languages["Python"] = 1991;
    languages["Java"] = 1995;
    
    std::cout << "Original map size: " << languages.size() << std::endl;
    
    // Safe way to check if a key exists
    if (languages.find("JavaScript") != languages.end()) {
        std::cout << "JavaScript found: " << languages["JavaScript"] << std::endl;
    } else {
        std::cout << "JavaScript not found in map" << std::endl;
    }
    
    std::cout << "Map size after find: " << languages.size() << std::endl;
    
    // Dangerous: this creates the key with default value!
    std::cout << "Accessing missing key: " << languages["JavaScript"] << std::endl;
    std::cout << "Map size after [] access: " << languages.size() << std::endl;
    
    // What happens when we use .at() on a missing key?
    std::cout << "Attempting safe access to missing key..." << std::endl;
    // Note: This line may cause the program to crash!
    // std::cout << "Safe access: " << languages.at("Rust") << std::endl;
    std::cout << "Commented out dangerous line to prevent crash" << std::endl;
    
    std::cout << "Final map size: " << languages.size() << std::endl;
    
    // Print all key-value pairs
    std::cout << "\nAll languages in map:" << std::endl;
    for (const auto& pair : languages) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
    
    return 0;
}
```

1. **Before running:** Predict how the map size will change throughout the program
2. **Run and observe:** Were you surprised by when the map size changed?
3. **Experiment:** Uncomment the `languages.at("Rust")` line - what happens? (The program may crash)
4. **Safe practice:** Write a function that checks if a key exists before accessing it