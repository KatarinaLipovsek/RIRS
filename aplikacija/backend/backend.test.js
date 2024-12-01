const app = require("./index");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

// Mock MySQL2 module
jest.mock("mysql2", () => ({
  createConnection: jest.fn().mockReturnValue({
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  }),
}));

// Mock bcrypt to return true for password comparison
jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

describe("Employee API Tests", () => {
  let mockQuery;

  beforeEach(() => {
    // Reset any mock before each test to avoid interference between tests
    mockQuery = mysql.createConnection().query; // Get the query mock
    mockQuery.mockReset();
  });

  
  describe("POST /api/login", () => {
    it("ispesen login s pravilnimi podatki", async () => {
      const mockUser = { id: 1, username: "johndoe", password: "hashedpassword" };
      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, [mockUser]);  // Simulate successful user lookup
      });

      bcrypt.compare.mockResolvedValue(true);  // Simulate password match

      const response = await request(app)
        .post("/api/login")
        .send({ username: "johndoe", password: "password" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user.username).toBe("johndoe");
    });

    it("mora vrniti error, ce uporabnik ni najden", async () => {
      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, []);  // Simulate no user found
      });

      const response = await request(app)
        .post("/api/login")
        .send({ username: "nonexistentuser", password: "password" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });

    it("mora vrniti error, ce je nepravilno geslo", async () => {
      const mockUser = { id: 1, username: "johndoe", password: "hashedpassword" };
      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, [mockUser]);  // Simulate successful user lookup
      });

      bcrypt.compare.mockResolvedValue(false);  // Simulate password mismatch

      const response = await request(app)
        .post("/api/login")
        .send({ username: "johndoe", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });

    
  });

 

  describe("GET /api/entries", () => {
    
    it("vrne podatke o delu za dolocenega zaposlenega", async () => {
      const mockEntries = [
        { id: 1, employee_id: 1, hours_worked: 8, date: "2024-12-01", description: "Worked on project" },
      ];

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockEntries);  // Simulate fetching entries
      });

      const response = await request(app).get("/api/entries").query({ employeeId: 1 });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("hours_worked");
    });

    it("mora pridobiti podatke o delu", async () => {
      mockQuery.mockImplementation((query, params, callback) => {
        callback(new Error("Database error"));  // Simulate a database error
      });

      const response = await request(app).get("/api/entries").query({ employeeId: 1 });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch entries");
    });
  });

  describe("GET /api/entries/month", () => {
    it("mora vrniti napako, ce employeeId ni podan", async () => {
      const response = await request(app).get("/api/entries/month").query({ month: "12" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Employee ID is required");
    });
    it("mora pridobiti ure za mesec", async () => {
      const mockResults = [
        {
          id: 1,
          name: "John Doe",
          total_hours: 40,
        },
      ];

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockResults);  // Simulate fetching total hours
      });

      const response = await request(app).get("/api/entries/month").query({ employeeId: 1, month: "12" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty("total_hours");
    });

    it("mora vrniti error ce ni najdenih vnosov za mesec", async () => {
      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, []);  // Simulate no entries found
      });

      const response = await request(app).get("/api/entries/month").query({ employeeId: 1, month: "12" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No entries found for the given criteria");
    });

    it("mora obravnavati napake za vnose po mesecih", async () => {
      mockQuery.mockImplementation((query, params, callback) => {
        callback(new Error("Database error"));  // Simulate a database error
      });

      const response = await request(app).get("/api/entries/month").query({ employeeId: 1, month: "12" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch entries");
    });

    
      it("mora vrniti vse vnose za zaposlenega v določenem mesecu", async () => {
        const mockEntries = [
          { id: 1, employee_id: 1, hours_worked: 8, date: "2024-12-01", description: "Worked on project" },
          { id: 2, employee_id: 1, hours_worked: 7, date: "2024-12-02", description: "Worked on meeting" },
        ];
  
        mockQuery.mockImplementation((query, params, callback) => {
          callback(null, mockEntries);  // Simulate fetching entries for the month
        });
  
        const response = await request(app).get("/api/entries/month").query({ employeeId: 1, month: "12" });
  
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty("hours_worked");
      });
       
    });
  });

    

