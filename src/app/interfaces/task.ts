export interface Task {
    id: string | number,
    title: string,
    description: string,
    completed: boolean,
    created: string,
    isSelected?: boolean
}