class AdvisorService {
  constructor() {
    this.boardStorageKey = 'achiever_board';
  }

  // Fetch advisors from API 
  async fetchAdvisors() {
    try {
      const response = await fetch('https://dummyjson.com/c/0f2b-94e6-49c0-935f');
      let data = await response.json();
      // If data is an array, add an id to each advisor
      if (Array.isArray(data)) {
        data = data.map((advisor, idx) => ({
          ...advisor,
          id: advisor.id || `${advisor.name}-${idx}`
        }));
      } else if (Array.isArray(data.advisors)) {
        data = data.advisors.map((advisor, idx) => ({
          ...advisor,
          id: advisor.id || `${advisor.name}-${idx}`
        }));
      }
      return data;
    } catch (error) {
      console.error('Error fetching advisors:', error);
      return [];
    }
  }

  // Get my board from localStorage
  getMyBoard() {
    const stored = localStorage.getItem(this.boardStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Add advisor to board
  addToBoard(advisor) {
    const board = this.getMyBoard();
    if (!board.find(a => a.id === advisor.id)) {
      board.push(advisor);
      localStorage.setItem(this.boardStorageKey, JSON.stringify(board));
      return board;
    }
    return board;
  }

  // Remove advisor from board
  removeFromBoard(advisorId) {
    const board = this.getMyBoard();
    const filteredBoard = board.filter(a => a.id !== advisorId);
    localStorage.setItem(this.boardStorageKey, JSON.stringify(filteredBoard));
    return filteredBoard;
  }

  // Check if advisor is in board
  isInBoard(advisorId) {
    const board = this.getMyBoard();
    return board.some(a => a.id === advisorId);
  }
}

export const advisorService = new AdvisorService();