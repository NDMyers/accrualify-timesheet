// Type file for defining user type for database interactions

interface User {
    // attributes correspond to google account information 
    name: string
    email: string
    image: string
    id: string
}

// Database objects 
interface TimeSheet {
    lineItems: LineItem[]
    description: string
    rate: number
    totalTime: number
    totalCost: number
}

interface LineItem {
    date: string
    minutes: number
}