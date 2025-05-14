// Simulate a delay for API calls
const simulateApiDelay = async (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Centralized mock API class
class MockApi {
  private dataStore: Record<string, any>;

  constructor(initialData: Record<string, any>) {
    this.dataStore = initialData;
  }

  // Generic GET method
  async get<T>(endpoint: string): Promise<T> {
    await simulateApiDelay();
    if (this.dataStore[endpoint]) {
      return this.dataStore[endpoint] as T;
    }
    throw new Error(`Endpoint ${endpoint} not found`);
  }

  // Generic POST method
  async post<T>(endpoint: string, payload: T): Promise<T> {
    await simulateApiDelay();
    if (!this.dataStore[endpoint]) {
      this.dataStore[endpoint] = [];
    }
    this.dataStore[endpoint].push(payload);
    return payload;
  }

  // Generic PUT method
  async put<T>(endpoint: string, id: string | number, payload: T): Promise<T> {
    await simulateApiDelay();
    if (this.dataStore[endpoint]) {
      const index = this.dataStore[endpoint].findIndex((item: any) => item.id === id);
      if (index !== -1) {
        this.dataStore[endpoint][index] = payload;
        return payload;
      }
    }
    throw new Error(`Resource with id ${id} not found at endpoint ${endpoint}`);
  }

  // Generic DELETE method
  async delete(endpoint: string, id: string | number): Promise<void> {
    await simulateApiDelay();
    if (this.dataStore[endpoint]) {
      const index = this.dataStore[endpoint].findIndex((item: any) => item.id === id);
      if (index !== -1) {
        this.dataStore[endpoint].splice(index, 1);
        return;
      }
    }
    throw new Error(`Resource with id ${id} not found at endpoint ${endpoint}`);
  }

  // Authentication functionality
  async authenticate(credential: string, password: string, method: string): Promise<{ token: string }> {
    await simulateApiDelay();

    // Mock authentication logic
    if (
      (method === "email" && credential === "doctor@example.com" && password === "password123") ||
      (method === "nationalId" && credential === "29001010123456" && password === "password123") ||
      (method === "phone" && credential === "01000000000" && password === "password123")
    ) {
      return { token: "mock-token-12345" };
    }

    throw new Error("Invalid credentials");
  }
}

// Example initial data
const initialData = {
  prescriptions: [
    { id: 1, name: "Prescription A", details: "Details for Prescription A" },
    { id: 2, name: "Prescription B", details: "Details for Prescription B" },
  ],
  appointments: [
    { id: 1, date: "2025-05-13", patient: "John Doe" },
    { id: 2, date: "2025-05-14", patient: "Jane Smith" },
  ],
};

// Export an instance of MockApi
const mockApi = new MockApi(initialData);

export default mockApi;
