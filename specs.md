# Back-end technical test

# Dynamic Arcads Real Estate

**Objective:** Create an application called "Dynamic Arcads Real Estate" using Node.js and NestJs. The purpose of this app is to provide detailed reporting on the company's activities, helping to streamline operations for Arcads Estates. The app should offer robust tools for managing and reporting real estate transactions.

**Key Functionalities:**

- **Report Viewing:** Access various key performance indicators (KPIs) that summarize all transaction activities.
- **Transaction Registration:** Enter details of real estate transactions.
- **Transaction List Access:** View a complete list of all transactions.

### **Detailed Requirements**

**Endpoints:**

- **Create Transaction (POST /transactions):** Implement an endpoint for users to add new real estate transactions. This should include:
    - **City:** The property's location.
    - **Type of Property:** Options include Apartment, House, or Land.
    - **Area:** The property's area in square meters.
    - **Transaction Date:** The date the transaction was completed.
    - **Transaction Net Value:** The property's sale price.
    - **Transaction Cost:** The total cost, including net value, taxes, and other fees.
- **KPI Endpoints:**
- **Highest Margin Transaction (GET /reports/highest-margin):** Retrieve the top 5 transactions with the highest profit margins.
- **Weekly Average Margin (GET /reports/weekly-average-margin):** Show the average profit margin for the last week and its change compared to the previous week.
- **City Performance (GET /reports/city-performance):** List the top five cities by average transaction value.
- **List All Transactions (GET /transactions):** Retrieve a list of all transactions recorded in the application.

**Data Model:**

- **Model Creation:** Design and implement database models to store all relevant transaction fields, capturing and relating all necessary entities.
- **Database Persistence:** Ensure all data is stored correctly in the database.

### **Additional Specifications**

- **Technologies:** Utilize Node.js and NestJs. If you opt for other technologies, provide a rationale.
- **Code Quality:** The code should be clean and maintainable, with appropriate comments.
- **Documentation:** Include a README.md file with detailed setup instructions, usage steps, and an overview of your implementation and architecture decisions. Highlight significant design choices.

### **Evaluation Criteria**

- **Functionality:** The application should fulfill all user requirements and handle edge cases. If all functionalities cannot be implemented within a reasonable time, prioritize the features that best showcase your technical skills and manage the scope to fit the time frame.
- **Code Quality:** Code should be organized and easy to read.

If you find any of these specifications unclear or lacking, feel free to make reasonable assumptions, ensuring they are documented.

### **Delivery Instructions**

- **Version Control:** Use a private git repository for version control, preferably on GitHub.
- **Project Submission:** Upon completion, share the GitHub repository link with the interviewer. If the repository is private, ensure that gg-arcads has access.